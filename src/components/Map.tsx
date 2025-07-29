import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapProps {
  className?: string;
}

const Map: React.FC<MapProps> = ({ className = '' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [mapType, setMapType] = useState<'google' | 'fallback'>('fallback');

  useEffect(() => {
    const initMap = async () => {
      // Try to load Google Maps first
      const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY',
        version: 'weekly',
        libraries: ['places']
      });

      try {
        const google = await loader.load();
        
        if (mapRef.current && !mapInstanceRef.current) {
          setMapType('google');
          
          // Cafe location coordinates (example: Downtown area)
          const cafeLocation = { lat: 40.7128, lng: -74.0060 }; // New York coordinates as example
          
          const map = new google.maps.Map(mapRef.current, {
            center: cafeLocation,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
              {
                featureType: 'poi.business',
                stylers: [{ visibility: 'off' }]
              },
              {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          // Add marker for the cafe
          const marker = new google.maps.Marker({
            position: cafeLocation,
            map: map,
            title: 'Arios Cafe',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" fill="#87CEEB" stroke="#5F9EA0" stroke-width="2"/>
                  <text x="20" y="25" text-anchor="middle" fill="white" font-size="20" font-family="Arial, sans-serif">☕</text>
                </svg>
              `),
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 20)
            }
          });

          // Add info window
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 10px; max-width: 200px;">
                <h3 style="margin: 0 0 5px 0; color: #5F9EA0; font-size: 16px;">Arios Cafe</h3>
                <p style="margin: 0 0 5px 0; font-size: 14px;">123 Cafe Street</p>
                <p style="margin: 0 0 5px 0; font-size: 14px;">Downtown District</p>
                <p style="margin: 0; font-size: 14px;">City, State 12345</p>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: #87CEEB;">
                  <strong>Hours:</strong> Mon-Fri 7AM-10PM<br>
                  Sat-Sun 8AM-11PM
                </p>
              </div>
            `
          });

          // Show info window on marker click
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          // Store references
          mapInstanceRef.current = map;
          markerRef.current = marker;

          // Add some interactive features
          map.addListener('zoom_changed', () => {
            const zoom = map.getZoom();
            if (zoom && zoom > 17) {
              // Show more details at higher zoom levels
              map.setOptions({
                styles: []
              });
            }
          });
        }
      } catch (error) {
        console.log('Google Maps not available, using fallback map');
        initFallbackMap();
      }
    };

    const initFallbackMap = () => {
      if (mapRef.current) {
        setMapType('fallback');
        
        // Create an interactive fallback map using OpenStreetMap
        const mapContainer = mapRef.current;
        mapContainer.innerHTML = `
          <div class="fallback-map-container" style="
            width: 100%; 
            height: 100%; 
            position: relative;
            background: linear-gradient(135deg, #87CEEB, #5F9EA0);
            border-radius: 8px;
            overflow: hidden;
          ">
            <div class="map-overlay" style="
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
              opacity: 0.3;
            "></div>
            
            <div class="map-content" style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              text-align: center;
              color: white;
              z-index: 2;
            ">
              <div class="map-icon" style="
                font-size: 48px; 
                margin-bottom: 16px;
                animation: mapPulse 2s ease-in-out infinite;
              ">🗺️</div>
              <h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 600;">Interactive Map</h3>
              <p style="margin: 0 0 16px 0; font-size: 14px; opacity: 0.9;">
                Our location: 123 Cafe Street, Downtown District
              </p>
              
              <div class="map-actions" style="
                display: flex;
                gap: 12px;
                justify-content: center;
                flex-wrap: wrap;
              ">
                <button class="map-btn" onclick="window.open('https://maps.google.com/?q=123+Cafe+Street+Downtown+District', '_blank')" style="
                  background: rgba(255,255,255,0.2);
                  border: 1px solid rgba(255,255,255,0.3);
                  color: white;
                  padding: 8px 16px;
                  border-radius: 6px;
                  cursor: pointer;
                  font-size: 14px;
                  transition: all 0.3s ease;
                  backdrop-filter: blur(10px);
                " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                  📍 Open in Google Maps
                </button>
                <button class="map-btn" onclick="window.open('https://www.openstreetmap.org/search?query=123%20Cafe%20Street', '_blank')" style="
                  background: rgba(255,255,255,0.2);
                  border: 1px solid rgba(255,255,255,0.3);
                  color: white;
                  padding: 8px 16px;
                  border-radius: 6px;
                  cursor: pointer;
                  font-size: 14px;
                  transition: all 0.3s ease;
                  backdrop-filter: blur(10px);
                " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                  🗺️ Open in OpenStreetMap
                </button>
              </div>
              
              <div class="location-info" style="
                margin-top: 20px;
                padding: 16px;
                background: rgba(255,255,255,0.1);
                border-radius: 8px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.2);
              ">
                <h4 style="margin: 0 0 8px 0; font-size: 16px; color: #5F9EA0;">📍 Location Details</h4>
                <p style="margin: 0 0 4px 0; font-size: 14px;">123 Cafe Street</p>
                <p style="margin: 0 0 4px 0; font-size: 14px;">Downtown District</p>
                <p style="margin: 0 0 8px 0; font-size: 14px;">City, State 12345</p>
                <p style="margin: 0; font-size: 12px; opacity: 0.8;">
                  <strong>Hours:</strong> Mon-Fri 7AM-10PM | Sat-Sun 8AM-11PM
                </p>
              </div>
            </div>
            
            <style>
              @keyframes mapPulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
              }
            </style>
          </div>
        `;
      }
    };

    initMap();

    // Cleanup function
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      if (mapInstanceRef.current) {
        // Google Maps doesn't have a direct destroy method, but we can clear the container
        if (mapRef.current) {
          mapRef.current.innerHTML = '';
        }
      }
    };
  }, []);

  return (
    <div 
      ref={mapRef} 
      className={`interactive-map ${className}`}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    />
  );
};

export default Map; 