# Interactive Map Setup Guide

## Overview
The Arios Cafe website now includes an interactive map in the Contact section. The map component is designed to work with or without a Google Maps API key.

## Features
- **Interactive Google Maps** (when API key is provided)
- **Fallback Interactive Map** (when no API key is available)
- **Clickable markers** with cafe information
- **Direct links** to Google Maps and OpenStreetMap
- **Responsive design** that works on all devices

## Setup Options

### Option 1: Using Google Maps (Recommended)
1. Get a Google Maps API key from [Google Cloud Console](https://developers.google.com/maps/documentation/javascript/get-api-key)
2. Create a `.env` file in the project root
3. Add your API key:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```
4. Restart the development server

### Option 2: Using Fallback Map (No API Key Required)
The map will automatically use the fallback version if no Google Maps API key is provided. This includes:
- Interactive buttons to open maps in new tabs
- Location information display
- Animated map icon
- Responsive design

## Customization

### Changing Location
To change the cafe location, edit the coordinates in `src/components/Map.tsx`:

```typescript
const cafeLocation = { lat: 40.7128, lng: -74.0060 }; // Update these coordinates
```

### Styling
The map styling can be customized in:
- `src/components/Map.tsx` - Map appearance and behavior
- `src/styles/components/_contact.scss` - Container styling

### Location Information
Update the cafe information in the Map component:
- Address
- Phone numbers
- Opening hours
- Contact details

## Troubleshooting

### Map Not Loading
1. Check browser console for errors
2. Verify internet connection
3. If using Google Maps, ensure API key is valid
4. Check if the API key has the necessary permissions

### Fallback Map Issues
1. Ensure JavaScript is enabled
2. Check if popup blockers are preventing map links from opening

## Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Performance
- Google Maps: Loads external resources, may take 1-2 seconds
- Fallback Map: Instant loading, no external dependencies 