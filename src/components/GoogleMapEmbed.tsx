import React from 'react';

interface GoogleMapEmbedProps {
  className?: string;
}

const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({ className = '' }) => {
  return (
    <div 
      className={`google-map-embed ${className}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '400px'
      }}
    >
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.9243838878742!2d121.30369957585249!3d14.48903018598419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397eb1082d66043%3A0xae7bf937438e01d1!2sArios%20Cafe!5e0!3m2!1sen!2sph!4v1753561880426!5m2!1sen!2sph" 
        width="100%" 
        height="100%" 
        style={{
          border: 0,
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '100%',
          height: '100%'
        }}
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Arios Cafe Location"
      />
    </div>
  );
};

export default GoogleMapEmbed; 