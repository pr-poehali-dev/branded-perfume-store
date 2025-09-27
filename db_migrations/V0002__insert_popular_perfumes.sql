-- Insert popular perfumes into products table
INSERT INTO products (name, brand, description, price, original_price, competitor_price, category, volume_ml, is_new, discount_percent, image_url, in_stock) VALUES
-- Women's Perfumes
('Chanel No. 5', 'Chanel', 'Легендарный аромат с нотами альдегидов, иланг-иланга и сандала', 8990, 12850, 12850, 'women', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Miss Dior', 'Dior', 'Роскошный цветочный аромат с нотами розы и жасмина', 7490, 10700, 10700, 'women', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Coco Mademoiselle', 'Chanel', 'Современный восточный аромат с нотами апельсина и пачули', 9590, 13700, 13700, 'women', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('La Vie Est Belle', 'Lancôme', 'Сладкий гурманский аромат с нотами ириса и ванили', 6790, 9700, 9700, 'women', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Flower by Kenzo', 'Kenzo', 'Нежный цветочный аромат с нотами фиалки и белых цветов', 5590, 7990, 7990, 'women', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Alien', 'Thierry Mugler', 'Загадочный восточный аромат с нотами жасмина и амбры', 6390, 9130, 9130, 'women', 90, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Black Opium', 'Yves Saint Laurent', 'Соблазнительный аромат с нотами кофе и ванили', 7190, 10270, 10270, 'women', 90, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Good Girl', 'Carolina Herrera', 'Дерзкий аромат с нотами туберозы и какао', 7890, 11270, 11270, 'women', 80, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Poison', 'Dior', 'Классический восточный аромат с нотами специй и амбры', 6990, 9990, 9990, 'women', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Angel', 'Thierry Mugler', 'Гурманский аромат с нотами карамели и пачули', 6190, 8840, 8840, 'women', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),

-- Men's Perfumes
('Sauvage', 'Dior', 'Свежий древесный аромат с нотами бергамота и амброксана', 7990, 11420, 11420, 'men', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Bleu de Chanel', 'Chanel', 'Элегантный древесно-ароматический аромат с нотами грейпфрута и кедра', 8490, 12130, 12130, 'men', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Acqua di Gio', 'Giorgio Armani', 'Морской свежий аромат с нотами морской воды и розмарина', 6790, 9700, 9700, 'men', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('One Million', 'Paco Rabanne', 'Соблазнительный восточный аромат с нотами корицы и амбры', 6490, 9270, 9270, 'men', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Invictus', 'Paco Rabanne', 'Спортивный древесный аромат с нотами морского ветра и амбры', 6190, 8840, 8840, 'men', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('The One', 'Dolce & Gabbana', 'Теплый восточный аромат с нотами табака и амбры', 6990, 9990, 9990, 'men', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Gentleman', 'Givenchy', 'Современный древесный аромат с нотами груши и ветивера', 7490, 10700, 10700, 'men', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('212 VIP Men', 'Carolina Herrera', 'Энергичный аромат с нотами лайма и имбиря', 5990, 8560, 8560, 'men', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Stronger With You', 'Giorgio Armani', 'Теплый гурманский аромат с нотами каштана и ванили', 6790, 9700, 9700, 'men', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Ultra Male', 'Jean Paul Gaultier', 'Интенсивный аромат с нотами грушы и ванили', 6490, 9270, 9270, 'men', 125, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),

-- Unisex Perfumes
('Black Tea', 'By Kilian', 'Изысканный аромат с нотами черного чая и инжира', 15990, 22850, 22850, 'unisex', 50, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Oud Wood', 'Tom Ford', 'Роскошный древесный аромат с нотами уда и сандала', 18990, 27130, 27130, 'unisex', 50, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Aventus', 'Creed', 'Легендарный аромат с нотами ананаса и бергамота', 19990, 28560, 28560, 'unisex', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Santal 33', 'Le Labo', 'Культовый аромат с нотами сандала и кедра', 16990, 24270, 24270, 'unisex', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Tobacco Vanille', 'Tom Ford', 'Гурманский аромат с нотами табака и ванили', 17990, 25700, 25700, 'unisex', 50, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Portrait of a Lady', 'Frederic Malle', 'Роскошный розовый аромат с нотами турецкой розы и пачули', 16490, 23560, 23560, 'unisex', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Philosykos', 'Diptyque', 'Зеленый аромат с нотами листьев и сока инжира', 12990, 18560, 18560, 'unisex', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Another 13', 'Le Labo', 'Минималистичный аромат с нотами мускуса и амброксана', 15990, 22850, 22850, 'unisex', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Bergamote 22', 'Le Labo', 'Свежий цитрусовый аромат с нотами бергамота и белого чая', 14990, 21420, 21420, 'unisex', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true),
('Rose 31', 'Le Labo', 'Современная интерпретация розы с древесными нотами', 15490, 22130, 22130, 'unisex', 100, false, 30, '/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg', true);

-- Mark some as new arrivals
UPDATE products SET is_new = true WHERE name IN ('Black Tea', 'Santal 33', 'Good Girl', 'Gentleman', 'Sauvage');