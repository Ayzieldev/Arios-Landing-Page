# Arios Cafe - Modern Food Website

A beautiful, responsive e-commerce food website built with React and SASS, featuring a modern sky blue color scheme and elegant design.

## 🚀 Features

- **Modern Design**: Clean, professional layout with sky blue color scheme
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Components**: Smooth animations and hover effects
- **Interactive Map**: Google Maps integration with fallback option
- **SASS Architecture**: Well-organized SASS structure with variables and mixins
- **TypeScript**: Type-safe React components
- **Component-Based**: Modular component architecture

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **SASS** - Advanced CSS with variables, mixins, and nesting
- **CSS Grid & Flexbox** - Modern layout techniques
- **Responsive Design** - Mobile-first approach

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Menu.tsx        # Menu showcase
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer
├── styles/             # SASS styles
│   ├── _variables.scss # Design tokens
│   ├── _mixins.scss    # Reusable mixins
│   ├── main.scss       # Main stylesheet
│   └── components/     # Component-specific styles
│       ├── _header.scss
│       ├── _hero.scss
│       ├── _about.scss
│       ├── _menu.scss
│       ├── _contact.scss
│       └── _footer.scss
└── assets/             # Images and other assets
    └── images/
```

## 🎨 Design System

### Colors
- **Primary**: Sky Blue (#87CEEB)
- **Primary Dark**: Darker Sky Blue (#5F9EA0)
- **Primary Light**: Light Sky Blue (#B0E0E6)
- **Secondary**: Steel Blue (#4682B4)
- **Accent**: Deep Sky Blue (#00BFFF)

### Typography
- **Primary Font**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Secondary Font**: Georgia, serif

### Spacing
- Consistent spacing system using rem units
- Responsive breakpoints for mobile, tablet, and desktop

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd arios-cafe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Mobile**: < 576px
- **Tablet**: 576px - 991px
- **Desktop**: ≥ 992px
- **Large Desktop**: ≥ 1200px

## 🎯 Key Sections

1. **Header** - Fixed navigation with logo and menu
2. **Hero** - Eye-catching hero section with call-to-action
3. **About** - Company information with animated elements
4. **Menu** - Featured food items with category filtering
5. **Contact** - Contact form and interactive map
6. **Footer** - Links, social media, and company info

## 🎨 Customization

### Changing Colors
Edit `src/styles/_variables.scss` to modify the color scheme:

```scss
$primary-color: #87CEEB; // Sky Blue
$primary-dark: #5F9EA0;  // Darker Sky Blue
$primary-light: #B0E0E6; // Light Sky Blue
```

### Adding New Components
1. Create a new component in `src/components/`
2. Create corresponding SASS file in `src/styles/components/`
3. Import and use in `App.tsx`

### Interactive Map Setup
See `MAP_SETUP.md` for detailed instructions on configuring the interactive map functionality.

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspired by modern food websites
- Icons and emojis for visual elements
- SASS best practices and architecture

---

**Arios Cafe** - Crafting perfect moments since 2019 ☕
