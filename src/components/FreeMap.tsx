import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface FreeMapProps {
  className?: string;
}

const FreeMap: React.FC<FreeMapProps> = ({ className = '' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Fix for default marker icons in Leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      // Create custom cafe marker icon
      const cafeIcon = L.divIcon({
        className: 'custom-cafe-marker',
        html: `
          <div style="
            width: 40px;
            height: 40px;
            background: #87CEEB;
            border: 3px solid #5F9EA0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            animation: markerPulse 2s ease-in-out infinite;
          ">
            ☕
          </div>
          <style>
            @keyframes markerPulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
          </style>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });

      // Cafe location - Complex Lubigan Sampaloc Road Plaza Aldea Tanay, Pililla, Rizal
      const cafeLocation: [number, number] = [14.4547, 121.3064]; // Pililla, Rizal coordinates

      // Initialize the map
      const map = L.map(mapRef.current, {
        center: cafeLocation,
        zoom: 15,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        dragging: true,
        touchZoom: true
      });

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      // Add cafe marker
      const marker = L.marker(cafeLocation, { icon: cafeIcon }).addTo(map);

      // Add popup with cafe information
      const popupContent = `
        <div style="
          padding: 10px;
          max-width: 200px;
          font-family: 'Segoe UI', sans-serif;
        ">
          <h3 style="
            margin: 0 0 8px 0;
            color: #5F9EA0;
            font-size: 16px;
            font-weight: 600;
          ">☕ Arios Cafe</h3>
          <p style="margin: 0 0 4px 0; font-size: 14px; color: #333;">
            <strong>📍 Address:</strong><br>
            Complex Lubigan Sampaloc Road<br>
            Plaza Aldea Tanay, 915 Manila E Rd<br>
            Pililla, 1910 Rizal
          </p>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #87CEEB;">
            <strong>🕒 Hours:</strong><br>
            Mon-Fri: 7AM-10PM<br>
            Sat-Sun: 8AM-11PM
          </p>
          <div style="
            margin-top: 12px;
            padding-top: 8px;
            border-top: 1px solid #eee;
          ">
                         <a href="https://maps.google.com/?q=Complex+Lubigan+Sampaloc+Road+Plaza+Aldea+Tanay+915+Manila+E+Rd+Pililla+Rizal"  
               target="_blank" 
               style="
                 display: inline-block;
                 background: #87CEEB;
                 color: white;
                 padding: 6px 12px;
                 border-radius: 4px;
                 text-decoration: none;
                 font-size: 12px;
                 margin-right: 8px;
               "
               onmouseover="this.style.background='#5F9EA0'"
               onmouseout="this.style.background='#87CEEB'">
              📍 Directions
            </a>
            <a href="tel:+15551234567" 
               style="
                 display: inline-block;
                 background: #5F9EA0;
                 color: white;
                 padding: 6px 12px;
                 border-radius: 4px;
                 text-decoration: none;
                 font-size: 12px;
               "
               onmouseover="this.style.background='#87CEEB'"
               onmouseout="this.style.background='#5F9EA0'">
              📞 Call
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      // Add some interactive features
      map.on('zoomend', () => {
        const zoom = map.getZoom();
        if (zoom > 17) {
          // Add more detailed information at higher zoom levels
          console.log('High zoom level - showing detailed view');
        }
      });

      // Store map instance
      mapInstanceRef.current = map;

      // Add a custom control for cafe information
      const InfoControl = L.Control.extend({
        onAdd: function() {
          const div = L.DomUtil.create('div', 'info-control');
          div.innerHTML = `
            <div style="
              background: rgba(255,255,255,0.9);
              padding: 8px 12px;
              border-radius: 6px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              font-family: 'Segoe UI', sans-serif;
              font-size: 12px;
              color: #333;
              border: 1px solid #ddd;
            ">
              <strong>📍 Arios Cafe</strong><br>
              Click the marker for details
            </div>
          `;
          return div;
        }
      });
      
      new InfoControl({ position: 'bottomleft' }).addTo(map);
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={mapRef} 
      className={`free-map ${className}`}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    />
  );
};

export default FreeMap; 