import React, { useState, useEffect } from 'react';
import '../styles/components/_menu.scss';

// Import images
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
import 'aos/dist/aos.css';
// @ts-ignore
import AOS from 'aos';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Mushroom Pizza",
    description: "Fresh mushrooms, mozzarella cheese, and our signature tomato sauce on crispy crust",
    price: 450,
    image: mushroomPizza,
    category: "Main Course",
    popular: true
  },
  {
    id: 2,
    name: "Cheese Pizza",
    description: "Classic cheese pizza with premium mozzarella and our homemade tomato sauce",
    price: 420,
    image: cheesePizza,
    category: "Main Course",
    popular: true
  },
  {
    id: 3,
    name: "Butter Croissant",
    description: "Flaky, buttery croissant made fresh daily with premium butter",
    price: 120,
    image: croissant,
    category: "Desserts" // Changed from Breakfast to Desserts
  },
  {
    id: 4,
    name: "Chocolate Cake",
    description: "Rich chocolate cake with chocolate ganache and fresh berries",
    price: 180,
    image: chocolateCake,
    category: "Desserts",
    popular: true
  },
  {
    id: 5,
    name: "Chicken Wings",
    description: "Crispy chicken wings served with your choice of sauce",
    price: 280,
    image: chickenWings,
    category: "Appetizers"
  },
  {
    id: 6,
    name: "Spaghetti with Meatballs",
    description: "Al dente spaghetti with homemade meatballs in rich tomato sauce",
    price: 320,
    image: spaghettiMeatballs,
    category: "Main Course"
  },
  {
    id: 7,
    name: "Chocolate Latte",
    description: "Rich espresso with steamed milk and chocolate syrup",
    price: 150,
    image: chocoLatte,
    category: "Beverages",
    popular: true
  },
  {
    id: 8,
    name: "Beef Burger & Fries",
    description: "Juicy beef patty with fresh vegetables and crispy golden fries",
    price: 380,
    image: beefBurgerFries,
    category: "Main Course"
  },
  {
    id: 9,
    name: "Fresh Garden Salad",
    description: "Mixed greens with cherry tomatoes, cucumber, and house dressing",
    price: 220,
    image: salad,
    category: "Appetizers"
  },
  {
    id: 10,
    name: "Waffle with Ice Cream",
    description: "Crispy waffle served with vanilla ice cream and maple syrup",
    price: 200,
    image: waffleIceCream,
    category: "Desserts"
  },
  {
    id: 11,
    name: "Waffle Cookies & Cream",
    description: "Delicious waffle topped with cookies & cream ice cream",
    price: 220,
    image: waffleCookiesCream,
    category: "Desserts",
    popular: true
  },
  {
    id: 12,
    name: "Ube Frappe",
    description: "Smooth ube (purple yam) frappe with whipped cream",
    price: 160,
    image: ubeFrappe,
    category: "Beverages"
  },
  {
    id: 13,
    name: "Mango Frappe",
    description: "Refreshing mango frappe with fresh mango chunks",
    price: 160,
    image: mangoFrappe,
    category: "Beverages"
  },
  {
    id: 14,
    name: "Fries & Chicken Nuggets",
    description: "Crispy chicken nuggets with golden fries and dipping sauce",
    price: 250,
    image: friesChickenNuggets,
    category: "Appetizers"
  },
  {
    id: 15,
    name: "Coffee Milky Latte",
    description: "Smooth coffee latte with creamy milk and rich espresso",
    price: 140,
    image: coffeeMilkyLatte,
    category: "Beverages"
  }
];

const categories = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'appetizers', name: 'Appetizers', icon: '🥗' },
  { id: 'main-course', name: 'Main Course', icon: '🍽️' },
  { id: 'beverages', name: 'Beverages', icon: '☕' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' }
];

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAllItems, setShowAllItems] = useState(false);
  const [showFullMenuModal, setShowFullMenuModal] = useState(false);
  const [showSnacksDrinksModal, setShowSnacksDrinksModal] = useState(false);
  const [currentMenuImage, setCurrentMenuImage] = useState(fullMenu);

  const filteredItems = menuItems.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category.toLowerCase().replace(' ', '-') === activeCategory;
  });

  // Show only 6 items initially, or all items if showAllItems is true
  const displayedItems = showAllItems ? filteredItems : filteredItems.slice(0, 6);
  const hasMoreItems = filteredItems.length > 6;

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

  return (
    <>
      <section id="menu" className="menu">
        <div className="container">
          <div className="section-title" data-aos="fade-up" data-aos-delay="50" data-aos-offset="50">
            <h2>Our Featured Menu</h2>
            <p>Discover our carefully curated selection of delicious dishes and beverages</p>
          </div>
          
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
            {displayedItems.map((item) => (
              <div key={item.id} className={`menu-item ${item.popular ? 'menu-item--popular' : ''}`} >
                {item.popular && (
                  <div className="popular-badge">
                    <span>🔥 Popular</span>
                  </div>
                )}
                
                <div className="menu-item__image">
                  <img src={item.image} alt={item.name} />
                  <div className="menu-item__overlay">
                    <div className="menu-item__details">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                      <span className="price">₱{item.price.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="menu-item__content">
                  <div className="menu-item__header">
                    <h3 className="menu-item__name">{item.name}</h3>
                    <span className="menu-item__price">₱{item.price.toFixed(0)}</span>
                  </div>
                  <p className="menu-item__description">{item.description}</p>
                  <div className="menu-item__category">{item.category}</div>
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
                {showAllItems ? 'View Less' : `View More (${filteredItems.length - 6} more items)`}
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