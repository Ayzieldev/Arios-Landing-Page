import React, { useState, useEffect, useRef } from 'react';

// Facebook SDK types
declare global {
  interface Window {
    FB?: {
      init: (params: any) => void;
    };
  }
}

interface LiveChatProps {
  className?: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const LiveChat: React.FC<LiveChatProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! Welcome to Arios Cafe! I can help you with our menu, hours, location, and more. For detailed questions or to place an order, click the 📱 Messenger button below to chat with us directly! 😊',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Chatbot responses
  const botResponses: { [key: string]: string } = {
    // Greetings
    'hello': 'Hello! Welcome to Arios Cafe! How can I assist you today? ☕',
    'hi': 'Hi there! Thanks for reaching out to Arios Cafe! What can I help you with? 😊',
    'hey': 'Hey! Welcome to Arios Cafe! How may I help you?',
    
    // Hours
    'hours': 'Our opening hours are:\n• Monday - Friday: 7:00 AM - 10:00 PM\n• Saturday - Sunday: 8:00 AM - 11:00 PM\n\nWe\'re open daily to serve you! 🕒',
    'opening hours': 'Our opening hours are:\n• Monday - Friday: 7:00 AM - 10:00 PM\n• Saturday - Sunday: 8:00 AM - 11:00 PM\n\nWe\'re open daily to serve you! 🕒',
    'when are you open': 'We\'re open:\n• Monday - Friday: 7:00 AM - 10:00 PM\n• Saturday - Sunday: 8:00 AM - 11:00 PM\n\nCome visit us anytime! ☕',
    'what time do you open': 'We open at 7:00 AM on weekdays and 8:00 AM on weekends! 🕐',
    'what time do you close': 'We close at 10:00 PM on weekdays and 11:00 PM on weekends! 🌙',
    
    // Location
    'location': 'We\'re located at:\n📍 Complex Lubigan Sampaloc Road\nPlaza Aldea Tanay, 915 Manila E Rd\nPililla, 1910 Rizal\n\nYou can find us easily! 🗺️',
    'address': 'Our address is:\n📍 Complex Lubigan Sampaloc Road\nPlaza Aldea Tanay, 915 Manila E Rd\nPililla, 1910 Rizal\n\nCome visit us! 🏠',
    'where are you': 'We\'re located at Complex Lubigan Sampaloc Road, Plaza Aldea Tanay, Pililla, Rizal! 📍',
    
    // Menu
    'menu': 'We offer a variety of delicious items:\n\n☕ Coffee & Beverages\n🍳 Breakfast items\n🍽️ Main courses\n🍰 Desserts\n\nFor detailed menu items and prices, click the 📱 Messenger button below to chat with us directly! 📋',
    'food': 'Our menu includes:\n• Fresh coffee and beverages\n• Breakfast favorites\n• Gourmet main courses\n• Delicious desserts\n\nWhat type of food are you looking for? 🍽️',
    'coffee': 'We serve premium coffee including:\n• Espresso\n• Cappuccino\n• Latte\n• Americano\n• Specialty drinks\n\nWhat\'s your favorite? ☕',
    'breakfast': 'Our breakfast menu includes:\n• Eggs Benedict\n• Pancakes\n• French Toast\n• Breakfast sandwiches\n• Fresh pastries\n\nAvailable until 11 AM! 🍳',
    
    // Prices
    'price': 'Our prices range from ₱50 for beverages to ₱300+ for main courses. For specific menu items and current prices, click the 📱 Messenger button below to chat with us directly! 💰',
    'cost': 'Our menu prices are:\n• Beverages: ₱50-₱150\n• Breakfast: ₱80-₱200\n• Main courses: ₱150-₱350\n• Desserts: ₱80-₱180\n\nGreat value for quality food! 💵',
    'expensive': 'We offer great value for quality food! Our prices are competitive and we use fresh, high-quality ingredients. 💰',
    
    // Delivery
    'delivery': 'Currently, we offer dine-in and takeaway services. For delivery options and to place an order, click the 📱 Messenger button below to chat with us directly! 🚚',
    'takeaway': 'Yes! We offer takeaway services. You can call us to place your order or visit us in person! 📞',
    'dine in': 'Yes, we have comfortable seating for dine-in customers! Our cafe has a cozy atmosphere perfect for enjoying your meal. 🪑',
    
    // Contact
    'phone': 'You can reach us at:\n📞 +1 (555) 123-4567\n📞 +1 (555) 987-6543\n\nCall us anytime during business hours! 📱',
    'call': 'Feel free to call us at:\n📞 +1 (555) 123-4567\n📞 +1 (555) 987-6543\n\nWe\'re here to help! 📞',
    'contact': 'You can contact us through:\n📞 Phone: +1 (555) 123-4567\n📧 Email: info@arioscafe.com\n💬 Facebook Messenger\n📍 Visit us in person\n\nWe\'d love to hear from you! 📞',
    
    // Special requests
    'reservation': 'For reservations, please click the 📱 Messenger button below to chat with us directly, or call us at +1 (555) 123-4567! 📅',
    'booking': 'To make a booking, call us at +1 (555) 123-4567 or send us a message on Facebook! 📞',
    'party': 'We can accommodate groups! For parties or large groups, please call us in advance at +1 (555) 123-4567. 🎉',
    'private': 'We offer private dining options for special occasions. Contact us for more details! 🎊',
    
    // General
    'wifi': 'Yes, we offer free WiFi for our customers! Just ask our staff for the password. 📶',
    'parking': 'We have parking available for our customers! 🚗',
    'pet': 'We\'re pet-friendly! Well-behaved pets are welcome in our outdoor seating area. 🐕',
    'kids': 'We\'re family-friendly! We have a kids menu and high chairs available. 👶',
    
    // Default response
    'default': 'I\'m not sure about that specific question, but I\'d be happy to help you with our menu, hours, location, or contact information! For detailed questions or to place an order, please click the 📱 Messenger button below to chat with us directly. We\'re here to help! 😊'
  };

  const findBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // Check for common variations
    if (lowerMessage.includes('open') && lowerMessage.includes('time')) return botResponses['hours'];
    if (lowerMessage.includes('close') && lowerMessage.includes('time')) return botResponses['hours'];
    if (lowerMessage.includes('where') && lowerMessage.includes('located')) return botResponses['location'];
    if (lowerMessage.includes('what') && lowerMessage.includes('serve')) return botResponses['menu'];
    if (lowerMessage.includes('how') && lowerMessage.includes('much')) return botResponses['price'];
    
    return botResponses['default'];
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const openMessenger = () => {
    const messengerUrl = 'https://www.facebook.com/messages/t/108856035174485';
    
    // Check if user is on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // For mobile devices, try to open Messenger app first, fallback to browser
      const messengerAppUrl = `fb-messenger://user/108856035174485`;
      
      // Try to open the app
      window.location.href = messengerAppUrl;
      
      // Fallback to browser after a short delay if app doesn't open
      setTimeout(() => {
        window.open(messengerUrl, '_blank');
      }, 1000);
    } else {
      // For desktop, open in new window
      window.open(messengerUrl, '_blank', 'width=400,height=600');
    }
  };

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
    setIsOpen(false);
  };

  return (
    <div className={`live-chat-widget ${className}`}>
      {/* Chat Button */}
      <div 
        className={`chat-button ${isOpen ? 'chat-button--active' : ''}`}
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #87CEEB, #5F9EA0)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          border: 'none',
          color: 'white',
          fontSize: '24px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
      >
        💬
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="chat-window"
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '350px',
            height: '500px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid #e0e0e0'
          }}
        >
          {/* Chat Header */}
          <div 
            className="chat-header"
            style={{
              background: 'linear-gradient(135deg, #87CEEB, #5F9EA0)',
              color: 'white',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '20px' }}>☕</div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '16px' }}>Arios Cafe</div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>Online now</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={minimizeChat}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '16px',
                  padding: '4px'
                }}
              >
                ➖
              </button>
              <button
                onClick={toggleChat}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '16px',
                  padding: '4px'
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div 
            className="chat-messages"
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              background: '#f8f9fa',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '8px'
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: message.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: message.sender === 'user' ? '#87CEEB' : 'white',
                    color: message.sender === 'user' ? 'white' : '#333',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '18px 18px 18px 4px',
                    background: 'white',
                    color: '#666',
                    fontSize: '14px',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <span style={{ animation: 'typing 1.4s infinite' }}>●</span>
                  <span style={{ animation: 'typing 1.4s infinite 0.2s' }}>●</span>
                  <span style={{ animation: 'typing 1.4s infinite 0.4s' }}>●</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div 
            className="chat-input"
            style={{
              padding: '16px',
              borderTop: '1px solid #e0e0e0',
              background: 'white',
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!inputText.trim()}
              style={{
                background: '#87CEEB',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                opacity: inputText.trim() ? 1 : 0.5
              }}
            >
              ➤
            </button>
          </div>

          {/* Quick Actions */}
          <div 
            className="quick-actions"
            style={{
              padding: '12px 16px',
              borderTop: '1px solid #e0e0e0',
              background: '#f8f9fa',
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}
          >
            <button
              onClick={() => setInputText('hours')}
              style={{
                background: 'white',
                border: '1px solid #ddd',
                borderRadius: '16px',
                padding: '6px 12px',
                fontSize: '12px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              🕒 Hours
            </button>
            <button
              onClick={() => setInputText('menu')}
              style={{
                background: 'white',
                border: '1px solid #ddd',
                borderRadius: '16px',
                padding: '6px 12px',
                fontSize: '12px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              📋 Menu
            </button>
            <button
              onClick={() => setInputText('location')}
              style={{
                background: 'white',
                border: '1px solid #ddd',
                borderRadius: '16px',
                padding: '6px 12px',
                fontSize: '12px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              📍 Location
            </button>
                         <button
               onClick={openMessenger}
               style={{
                 background: 'linear-gradient(135deg, #0084FF, #0073E6)',
                 border: '1px solid #0084FF',
                 borderRadius: '16px',
                 padding: '8px 16px',
                 fontSize: '12px',
                 cursor: 'pointer',
                 color: 'white',
                 fontWeight: '600',
                 boxShadow: '0 2px 8px rgba(0, 132, 255, 0.3)',
                 transition: 'all 0.3s ease'
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.transform = 'translateY(-1px)';
                 e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 132, 255, 0.4)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 132, 255, 0.3)';
               }}
             >
               📱 Chat with Us
             </button>
          </div>
        </div>
      )}

      {/* Minimized Chat */}
      {isMinimized && (
        <div 
          className="chat-minimized"
          onClick={toggleChat}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '90px',
            background: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            cursor: 'pointer',
            zIndex: 999,
            border: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#5F9EA0',
            fontWeight: '500'
          }}
        >
          <span>💬</span>
          <span>Chat with us</span>
        </div>
      )}

      <style>
        {`
          @keyframes typing {
            0%, 60%, 100% { opacity: 0.3; }
            30% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default LiveChat; 