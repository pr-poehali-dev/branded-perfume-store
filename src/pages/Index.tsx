import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'men' | 'women' | 'unisex';
  isNew?: boolean;
  discount?: number;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const products: Product[] = [
    {
      id: 1,
      name: "Elegance Elixir",
      brand: "Chanel",
      price: 8990,
      originalPrice: 12990,
      image: "/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg",
      category: "women",
      isNew: true,
      discount: 30
    },
    {
      id: 2,
      name: "Royal Oud",
      brand: "Tom Ford",
      price: 15990,
      image: "/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg",
      category: "men"
    },
    {
      id: 3,
      name: "Mystic Rose",
      brand: "Dior",
      price: 7490,
      originalPrice: 8990,
      image: "/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg",
      category: "women",
      discount: 15
    },
    {
      id: 4,
      name: "Amber Dreams",
      brand: "Hermès",
      price: 11990,
      image: "/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg",
      category: "unisex",
      isNew: true
    },
    {
      id: 5,
      name: "Black Noir",
      brand: "Yves Saint Laurent",
      price: 6790,
      originalPrice: 7990,
      image: "/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg",
      category: "men",
      discount: 15
    },
    {
      id: 6,
      name: "Crystal Bloom",
      brand: "Versace",
      price: 5990,
      image: "/img/6b6f7b09-3c39-40fc-8a49-53871a24d72a.jpg",
      category: "women"
    }
  ];

  const categories = [
    { id: 'all', name: 'Все категории' },
    { id: 'men', name: 'Мужские' },
    { id: 'women', name: 'Женские' },
    { id: 'unisex', name: 'Унисекс' },
    { id: 'new', name: 'Новинки' },
    { id: 'sale', name: 'Скидки' }
  ];

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

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'new') return product.isNew;
    if (selectedCategory === 'sale') return product.discount;
    return product.category === selectedCategory;
  });

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
            Эксклюзивные предложения и цены ниже рыночных.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
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
                    
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full mt-4 bg-luxury-gold hover:bg-luxury-gold/90 text-white"
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      Добавить в корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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