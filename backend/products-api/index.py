import json
import os
import psycopg2
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API for fetching perfume products from database with filtering and search
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with attributes: request_id, function_name, function_version, memory_limit_in_mb
    Returns: HTTP response dict with products data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'GET':
        # Connect to database
        database_url = os.environ.get('DATABASE_URL')
        if not database_url:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Database connection not configured'})
            }
        
        try:
            conn = psycopg2.connect(database_url)
            cur = conn.cursor()
            
            # Get query parameters
            params = event.get('queryStringParameters') or {}
            category = params.get('category', 'all')
            brand = params.get('brand', '')
            search = params.get('search', '')
            limit = int(params.get('limit', '50'))
            
            # Build SQL query with filters
            base_query = """
                SELECT id, name, brand, description, price, original_price, competitor_price, 
                       category, volume_ml, is_new, discount_percent, image_url, in_stock
                FROM products 
                WHERE in_stock = true
            """
            
            query_params = []
            
            # Add category filter
            if category != 'all':
                if category == 'new':
                    base_query += " AND is_new = true"
                elif category == 'sale':
                    base_query += " AND discount_percent > 0"
                else:
                    base_query += " AND category = %s"
                    query_params.append(category)
            
            # Add brand filter
            if brand:
                base_query += " AND LOWER(brand) = LOWER(%s)"
                query_params.append(brand)
            
            # Add search filter
            if search:
                base_query += " AND (LOWER(name) LIKE LOWER(%s) OR LOWER(brand) LIKE LOWER(%s) OR LOWER(description) LIKE LOWER(%s))"
                search_param = f"%{search}%"
                query_params.extend([search_param, search_param, search_param])
            
            # Add ordering and limit
            base_query += " ORDER BY is_new DESC, name ASC LIMIT %s"
            query_params.append(limit)
            
            cur.execute(base_query, query_params)
            products_data = cur.fetchall()
            
            # Format products data
            products = []
            for row in products_data:
                product = {
                    'id': row[0],
                    'name': row[1],
                    'brand': row[2],
                    'description': row[3],
                    'price': float(row[4]) if row[4] else 0,
                    'originalPrice': float(row[5]) if row[5] else None,
                    'competitorPrice': float(row[6]) if row[6] else None,
                    'category': row[7],
                    'volumeMl': row[8],
                    'isNew': row[9],
                    'discount': row[10],
                    'image': row[11] or '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg',
                    'inStock': row[12]
                }
                products.append(product)
            
            # Get total count for pagination
            count_query = """
                SELECT COUNT(*) FROM products WHERE in_stock = true
            """
            count_params = []
            
            if category != 'all':
                if category == 'new':
                    count_query += " AND is_new = true"
                elif category == 'sale':
                    count_query += " AND discount_percent > 0"
                else:
                    count_query += " AND category = %s"
                    count_params.append(category)
            
            if brand:
                count_query += " AND LOWER(brand) = LOWER(%s)"
                count_params.append(brand)
            
            if search:
                count_query += " AND (LOWER(name) LIKE LOWER(%s) OR LOWER(brand) LIKE LOWER(%s) OR LOWER(description) LIKE LOWER(%s))"
                search_param = f"%{search}%"
                count_params.extend([search_param, search_param, search_param])
            
            cur.execute(count_query, count_params)
            total_count = cur.fetchone()[0]
            
            # Get unique brands for filter
            cur.execute("SELECT DISTINCT brand FROM products WHERE in_stock = true ORDER BY brand")
            brands = [row[0] for row in cur.fetchall()]
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'products': products,
                    'total': total_count,
                    'count': len(products),
                    'brands': brands,
                    'filters': {
                        'category': category,
                        'brand': brand,
                        'search': search,
                        'limit': limit
                    }
                })
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Database error: {str(e)}'})
            }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }