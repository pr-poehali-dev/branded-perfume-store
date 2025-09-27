import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  brand: string;
  description?: string;
  price: number;
  originalPrice?: number;
  competitorPrice?: number;
  image: string;
  category: 'men' | 'women' | 'unisex';
  volumeMl?: number;
  isNew?: boolean;
  discount?: number;
  inStock?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  count: number;
  brands: string[];
  filters: {
    category: string;
    brand: string;
    search: string;
    limit: number;
  };
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const categories = [
    { id: 'all', name: 'Все категории' },
    { id: 'men', name: 'Мужские' },
    { id: 'women', name: 'Женские' },
    { id: 'unisex', name: 'Унисекс' },
    { id: 'new', name: 'Новинки' },
    { id: 'sale', name: 'Скидки' }
  ];

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedBrand) params.append('brand', selectedBrand);
      if (searchQuery) params.append('search', searchQuery);
      params.append('limit', '50');

      const response = await fetch(`https://functions.poehali.dev/d04b8692-7031-4714-b799-5e76b50b53b9?${params}`);
      const data: ProductsResponse = await response.json();
      
      setProducts(data.products || []);
      setBrands(data.brands || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Trigger price scraping
  const triggerPriceScraping = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/efe76dc0-eccb-40b0-a996-4fa36b3e7a9d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      await response.json();
      // Refresh products after price update
      fetchProducts();
    } catch (error) {
      console.error('Failed to trigger price scraping:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedBrand, searchQuery]);

  useEffect(() => {
    // Trigger initial price scraping on component mount
    triggerPriceScraping();
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold text-foreground">LUXURY PERFUMES</h1>
            
            <nav className="hidden md:flex items-center space-x-8">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    selectedCategory === category.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <Icon name="ShoppingBag" size={20} />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина покупок</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">{item.brand}</p>
                            <p className="text-sm font-medium">{item.price.toLocaleString('ru-RU')} ₽</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium">Итого:</span>
                          <span className="font-bold text-lg">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Button className="w-full">Оформить заказ</Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-luxury-black to-luxury-gold/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-heading font-bold text-foreground mb-6 animate-fade-in">
            Коллекция Элитной Парфюмерии
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Откройте для себя мир роскошных ароматов от ведущих мировых брендов. 
            Цены на 30% ниже конкурентов благодаря прямым поставкам.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Icon name="Truck" size={16} className="mr-2" />
              Бесплатная доставка
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Icon name="Shield" size={16} className="mr-2" />
              Гарантия качества
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Icon name="Percent" size={16} className="mr-2" />
              Скидки до 30%
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Icon name="Database" size={16} className="mr-2" />
              {products.length}+ товаров
            </Badge>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <Input
                placeholder="Поиск парфюмов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-xs"
              />
              <Select value={selectedBrand || "all-brands"} onValueChange={(value) => setSelectedBrand(value === "all-brands" ? "" : value)}>
                <SelectTrigger className="max-w-xs">
                  <SelectValue placeholder="Выберите бренд" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-brands">Все бренды</SelectItem>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={triggerPriceScraping} variant="outline" size="sm">
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Обновить цены
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile Categories */}
      <div className="md:hidden border-b border-border bg-card">
        <div className="container mx-auto px-4 py-2">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <Icon name="Loader2" size={48} className="animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Загружаем каталог...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map(product => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 animate-scale-in">
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.isNew && (
                        <Badge className="absolute top-2 left-2 bg-primary">Новинка</Badge>
                      )}
                      {product.discount && (
                        <Badge className="absolute top-2 right-2 bg-destructive">-{product.discount}%</Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground font-medium">{product.brand}</p>
                      <h3 className="font-heading font-semibold text-lg">{product.name}</h3>
                      {product.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                      )}
                      {product.volumeMl && (
                        <p className="text-xs text-muted-foreground">{product.volumeMl} мл</p>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-foreground">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice.toLocaleString('ru-RU')} ₽
                          </span>
                        )}
                      </div>
                      
                      {product.competitorPrice && product.competitorPrice > product.price && (
                        <div className="text-xs text-green-600">
                          Экономия: {(product.competitorPrice - product.price).toLocaleString('ru-RU')} ₽
                        </div>
                      )}
                      
                      <Button
                        onClick={() => addToCart(product)}
                        className="w-full mt-4 bg-luxury-gold hover:bg-luxury-gold/90 text-white"
                        disabled={!product.inStock}
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {!loading && products.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Товары по вашему запросу не найдены</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-heading font-bold text-lg mb-4">LUXURY PERFUMES</h3>
              <p className="text-muted-foreground text-sm">
                Ваш надежный партнер в мире элитной парфюмерии
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Мужские ароматы</li>
                <li>Женские ароматы</li>
                <li>Унисекс</li>
                <li>Новинки</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Доставка</li>
                <li>Возврат</li>
                <li>Гарантии</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>+7 (495) 123-45-67</p>
                <p>info@luxuryperfumes.ru</p>
                <p>Москва, ул. Тверская, 1</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;