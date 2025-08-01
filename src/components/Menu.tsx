import React, { useState, useEffect } from 'react';
import '../styles/components/_menu.scss';
import { api, Product } from '../logic/api';
import 'aos/dist/aos.css';

// Import fallback images for when API images fail to load
import mushroomPizza from '../assets/images/Mushroom Pizza.jpg';
import cheesePizza from '../assets/images/Cheeze Pizza.jpg';
import croissant from '../assets/images/croissant.jpg';
import chocolateCake from '../assets/images/Chocolate Cake.jpg';
import chickenWings from '../assets/images/Chicken Wings.jpg';
import spaghettiMeatballs from '../assets/images/Spaghetti with meatballs.jpg';
import chocoLatte from '../assets/images/Choco Latte.jpg';
import beefBurgerFries from '../assets/images/Beef Burger & Fries.jpg';
import salad from '../assets/images/Salad.jpg';
import waffleIceCream from '../assets/images/Waffle Ice cream.jpg';
import waffleCookiesCream from '../assets/images/Waffle Ice cream Cookies and Cream.jpg';
import ubeFrappe from '../assets/images/Ube Frappe.jpg';
import mangoFrappe from '../assets/images/Mango Frappe.jpg';
import friesChickenNuggets from '../assets/images/Fires & Chicken Nuggets With Dip.jpg';
import coffeeMilkyLatte from '../assets/images/Coffee Milky Latte.jpg';
import fullMenu from '../assets/images/Full Menu.jpg';
import fullMenuSnacksDrinks from '../assets/images/Full-Menu-Snacks-Drinks.jpg';

// Fallback images mapping
const fallbackImages: { [key: string]: string } = {
  'Mushroom Pizza': mushroomPizza,
  'Cheese Pizza': cheesePizza,
  'Butter Croissant': croissant,
  'Chocolate Cake': chocolateCake,
  'Chicken Wings': chickenWings,
  'Spaghetti with Meatballs': spaghettiMeatballs,
  'Chocolate Latte': chocoLatte,
  'Beef Burger & Fries': beefBurgerFries,
  'Salad': salad,
  'Waffle Ice Cream': waffleIceCream,
  'Waffle Cookies and Cream': waffleCookiesCream,
  'Ube Frappe': ubeFrappe,
  'Mango Frappe': mangoFrappe,
  'Fries & Chicken Nuggets': friesChickenNuggets,
  'Coffee Milky Latte': coffeeMilkyLatte,
};

// Static fallback data
const staticProducts: Product[] = [
  {
    _id: '1',
    name: 'Mushroom Pizza',
    description: 'Fresh mushrooms, mozzarella cheese, and our signature tomato sauce on crispy crust',
    price: 450,
    category: 'main-course',
    images: [mushroomPizza],
    stock: 10,
    rating: 4.5,
    numReviews: 12,
    isActive: true,
    featured: true,
    tags: ['pizza', 'mushroom'],
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    name: 'Cheese Pizza',
    description: 'Classic cheese pizza with premium mozzarella and our homemade tomato sauce',
    price: 420,
    category: 'main-course',
    images: [cheesePizza],
    stock: 15,
    rating: 4.3,
    numReviews: 8,
    isActive: true,
    featured: true,
    tags: ['pizza', 'cheese'],
    createdAt: new Date().toISOString()
  },
  {
    _id: '3',
    name: 'Chocolate Latte',
    description: 'Rich espresso with steamed milk and chocolate syrup',
    price: 150,
    category: 'beverages',
    images: [chocoLatte],
    stock: 20,
    rating: 4.2,
    numReviews: 6,
    isActive: true,
    featured: true,
    tags: ['coffee', 'chocolate'],
    createdAt: new Date().toISOString()
  },
  {
    _id: '4',
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with chocolate ganache and fresh berries',
    price: 180,
    category: 'desserts',
    images: [chocolateCake],
    stock: 8,
    rating: 4.6,
    numReviews: 7,
    isActive: true,
    featured: true,
    tags: ['cake', 'chocolate'],
    createdAt: new Date().toISOString()
  },
  {
    _id: '5',
    name: 'Chicken Wings',
    description: 'Crispy chicken wings served with your choice of sauce',
    price: 280,
    category: 'appetizers',
    images: [chickenWings],
    stock: 12,
    rating: 4.1,
    numReviews: 5,
    isActive: true,
    featured: false,
    tags: ['wings', 'chicken'],
    createdAt: new Date().toISOString()
  },
  {
    _id: '6',
    name: 'Beef Burger & Fries',
    description: 'Juicy beef patty with fresh vegetables and crispy golden fries',
    price: 380,
    category: 'main-course',
    images: [beefBurgerFries],
    stock: 18,
    rating: 4.4,
    numReviews: 10,
    isActive: true,
    featured: false,
    tags: ['burger', 'beef'],
    createdAt: new Date().toISOString()
  }
];

const categories = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'main-course', name: 'Main Course', icon: '🍽️' },
  { id: 'appetizers', name: 'Appetizers', icon: '🍗' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'beverages', name: 'Beverages', icon: '☕' },
  { id: 'breakfast', name: 'Breakfast', icon: '🥐' },
  { id: 'snacks', name: 'Snacks', icon: '🍴' },
];

const Menu: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAllItems, setShowAllItems] = useState(false);
  const [showFullMenuModal, setShowFullMenuModal] = useState(false);
  const [showSnacksDrinksModal, setShowSnacksDrinksModal] = useState(false);
  const [currentMenuImage, setCurrentMenuImage] = useState(fullMenu);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Attempting to fetch products from API...');
        const response = await api.getProducts({
          limit: 50, // Get more products to have variety
        });
        
        console.log('✅ API products received:', response.products.length);
        setProducts(response.products);
      } catch (err) {
        console.error('❌ Failed to fetch products from API:', err);
        console.log('🔄 Falling back to static data...');
        setProducts(staticProducts);
        setError('Using sample data - API connection failed');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    if (activeCategory === 'all') return true;
    return product.category.toLowerCase().replace(' ', '-') === activeCategory;
  });

  // Show only 6 items initially, or all items if showAllItems is true
  const displayedItems = showAllItems ? filteredProducts : filteredProducts.slice(0, 6);
  const hasMoreItems = filteredProducts.length > 6;

  // Handle keyboard events for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showFullMenuModal) {
        setShowFullMenuModal(false);
      }
    };

    if (showFullMenuModal) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showFullMenuModal]);

  const handleViewMoreToggle = () => {
    setShowAllItems(!showAllItems);
  };

  const handleViewFullMenu = () => {
    setCurrentMenuImage(fullMenu);
    setShowFullMenuModal(true);
  };

  const handleViewSnacksDrinks = () => {
    setCurrentMenuImage(fullMenuSnacksDrinks);
    setShowSnacksDrinksModal(true);
  };

  const handleCloseModal = () => {
    setShowFullMenuModal(false);
    setShowSnacksDrinksModal(false);
  };

  // Get image for product
  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    // Fallback to static images based on product name
    return fallbackImages[product.name] || fallbackImages['Mushroom Pizza'];
  };

  if (loading) {
    return (
      <section id="menu" className="menu">
        <div className="container">
          <div className="section-title" data-aos="fade-up" data-aos-delay="50" data-aos-offset="50">
            <h2>Our Featured Menu</h2>
            <p>Discover our carefully curated selection of delicious dishes and beverages</p>
          </div>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading menu items...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="menu" className="menu">
        <div className="container">
          <div className="section-title" data-aos="fade-up" data-aos-delay="50" data-aos-offset="50">
            <h2>Our Featured Menu</h2>
            <p>Discover our carefully curated selection of delicious dishes and beverages</p>
          </div>
          
          {error && (
            <div className="error-notice" style={{ 
              background: '#fff3cd', 
              border: '1px solid #ffeaa7', 
              padding: '10px', 
              margin: '10px 0', 
              borderRadius: '5px',
              textAlign: 'center',
              color: '#856404'
            }}>
              <p>{error}</p>
            </div>
          )}
          
          <div className="menu__categories" data-aos="fade-up" data-aos-delay="50" data-aos-offset="50">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'category-btn--active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
          
          <div className="menu__grid" data-aos-delay="50">
            {displayedItems.map((product) => (
              <div key={product._id} className={`menu-item ${product.featured ? 'menu-item--popular' : ''}`} >
                {product.featured && (
                  <div className="popular-badge">
                    <span>🔥 Popular</span>
                  </div>
                )}
                
                <div className="menu-item__image">
                  <img src={getProductImage(product)} alt={product.name} />
                  <div className="menu-item__overlay">
                    <div className="menu-item__details">
                      <h4>{product.name}</h4>
                      <p>{product.description}</p>
                      <span className="price">₱{product.price.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="menu-item__content">
                  <div className="menu-item__header">
                    <h3 className="menu-item__name">{product.name}</h3>
                    <span className="menu-item__price">₱{product.price.toFixed(0)}</span>
                  </div>
                  <p className="menu-item__description">{product.description}</p>
                  <div className="menu-item__category">{product.category}</div>
                </div>
              </div>
            ))}
          </div>
          
          {hasMoreItems && (
            <div className="menu__view-more">
              <button 
                className="btn btn-secondary btn-large"
                onClick={handleViewMoreToggle}
              >
                {showAllItems ? 'View Less' : `View More (${filteredProducts.length - 6} more items)`}
              </button>
            </div>
          )}
          
          <div className="menu__cta">
            <button className="btn btn-primary btn-large" onClick={handleViewFullMenu}>
              Main Menu
            </button>
            <button className="btn btn-secondary btn-large" onClick={handleViewSnacksDrinks}>
              Snacks & Drinks Menu
            </button>
          </div>
        </div>
      </section>

      {/* Full Menu Modal */}
      {showFullMenuModal && (
        <div className="full-menu-modal" onClick={handleCloseModal}>
          <div className="full-menu-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="full-menu-modal__close" onClick={handleCloseModal}>
              ×
            </button>
            <img src={currentMenuImage} alt="Full Menu" className="full-menu-modal__image" />
          </div>
        </div>
      )}

      {/* Snacks & Drinks Menu Modal */}
      {showSnacksDrinksModal && (
        <div className="full-menu-modal" onClick={handleCloseModal}>
          <div className="full-menu-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="full-menu-modal__close" onClick={handleCloseModal}>
              ×
            </button>
            <img src={currentMenuImage} alt="Snacks & Drinks Menu" className="full-menu-modal__image" />
          </div>
        </div>
      )}
    </>
  );
};

export default Menu; 