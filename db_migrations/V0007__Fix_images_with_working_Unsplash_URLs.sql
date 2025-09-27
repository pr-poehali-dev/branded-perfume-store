-- Заменяем на рабочие URL из Unsplash с ключевыми словами парфюмерии

-- Chanel
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=400&h=400&fit=crop&q=80' WHERE name = 'Chanel No. 5';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop&q=80' WHERE name = 'Coco Mademoiselle';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1594736797933-d0bba22eb30c?w=400&h=400&fit=crop&q=80' WHERE name = 'Bleu de Chanel';

-- Dior
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80' WHERE name = 'Sauvage';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop&q=80' WHERE name = 'Miss Dior';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop&q=80' WHERE name = 'Poison';

-- Популярные ароматы
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop&q=80' WHERE name = 'La Vie Est Belle';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=400&fit=crop&q=80' WHERE name = 'Flower by Kenzo';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=400&fit=crop&q=80' WHERE name = 'Alien';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&q=80' WHERE name = 'Black Opium';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=400&h=400&fit=crop&q=80' WHERE name = 'Angel';

-- Мужские ароматы
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=400&fit=crop&q=80' WHERE name = 'Acqua di Gio';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop&q=80' WHERE name = 'One Million';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop&q=80' WHERE name = 'Invictus';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1592318446997-ea8a7b95e904?w=400&h=400&fit=crop&q=80' WHERE name = 'The One';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1596996104842-35eb9b17ad92?w=400&h=400&fit=crop&q=80' WHERE name = '212 VIP Men';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&q=80' WHERE name = 'Stronger With You';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1593998066526-65fcab3021a2?w=400&h=400&fit=crop&q=80' WHERE name = 'Ultra Male';

-- Премиум и нишевые
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1584302179602-e4df291ee270?w=400&h=400&fit=crop&q=80' WHERE name = 'Oud Wood';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1592886546545-0c0b30fc7dc7?w=400&h=400&fit=crop&q=80' WHERE name = 'Aventus';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=400&fit=crop&q=80' WHERE name = 'Tobacco Vanille';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1594825713399-0c1c814bd3fa?w=400&h=400&fit=crop&q=80' WHERE name = 'Portrait of a Lady';

-- Le Labo и другие нишевые
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?w=400&h=400&fit=crop&q=80' WHERE name = 'Philosykos';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1588962299647-c78e0047db95?w=400&h=400&fit=crop&q=80' WHERE name = 'Another 13';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1596817474156-c9c4d8ee1b5b?w=400&h=400&fit=crop&q=80' WHERE name = 'Bergamote 22';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop&q=80' WHERE name = 'Rose 31';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1594041584831-9df7df441993?w=400&h=400&fit=crop&q=80' WHERE name = 'Santal 33';

-- Остальные
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1575049903798-0a6f249bd37a?w=400&h=400&fit=crop&q=80' WHERE name = 'Good Girl';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1596458147519-21c064c04e26?w=400&h=400&fit=crop&q=80' WHERE name = 'Gentleman';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?w=400&h=400&fit=crop&q=80' WHERE name = 'Black Tea';