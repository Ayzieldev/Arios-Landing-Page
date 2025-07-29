# Facebook Messenger Live Chat Setup Guide

## Overview
The Arios Cafe website now includes a live chat widget that connects directly to your Facebook Messenger. This allows customers to message you instantly through Facebook Messenger.

## Features
- **Floating Chat Button** - Always visible on your website
- **Direct Messenger Integration** - Opens Facebook Messenger directly
- **Professional Design** - Matches your cafe's branding
- **Mobile Responsive** - Works on all devices
- **Minimize/Maximize** - Customers can minimize the chat window

## Setup Instructions

### Step 1: Get Your Facebook Page ID
1. Go to your Facebook Page
2. Click on "About" in the left sidebar
3. Scroll down to find your "Page ID" (it's a long number)
4. Copy this number

### Step 2: Update the LiveChat Component
1. Open `src/components/LiveChat.tsx`
2. Find this line:
   ```typescript
   const messengerUrl = 'https://m.me/YOUR_FACEBOOK_PAGE_ID';
   ```
3. Replace `YOUR_FACEBOOK_PAGE_ID` with your actual Facebook Page ID

### Step 3: Optional - Facebook App ID (Advanced)
If you want to use Facebook SDK features:
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Get your App ID
4. Replace `YOUR_FACEBOOK_APP_ID` in the LiveChat component

## How It Works

### For Customers:
1. **Click the chat button** (💬) in the bottom-right corner
2. **Chat window opens** with information about your cafe
3. **Click "Open Messenger"** to start chatting
4. **Facebook Messenger opens** in a new window/tab
5. **Customer can message you** directly through Messenger

### For You (Business Owner):
1. **Receive messages** in your Facebook Messenger app
2. **Reply instantly** from your phone or computer
3. **Manage conversations** like normal Messenger chats
4. **Set up auto-replies** in Facebook Page settings

## Customization

### Change Chat Button Position
Edit the styles in `LiveChat.tsx`:
```typescript
bottom: '20px',  // Distance from bottom
right: '20px',   // Distance from right
```

### Change Chat Window Size
```typescript
width: '350px',  // Chat window width
height: '500px', // Chat window height
```

### Update Chat Content
Modify the text in the chat window:
- Welcome message
- Quick info section
- Button text

## Benefits

### For Your Business:
- **Instant Customer Support** - No phone calls needed
- **Order Management** - Customers can order through chat
- **24/7 Availability** - Auto-replies when you're offline
- **Customer Engagement** - Easy way for customers to reach you

### For Customers:
- **Convenient** - No need to call or email
- **Instant** - Get responses right away
- **Familiar** - Most people already use Messenger
- **Mobile-Friendly** - Works great on phones

## Troubleshooting

### Chat Button Not Appearing
1. Check if the LiveChat component is imported in App.tsx
2. Verify there are no JavaScript errors in browser console
3. Make sure the component is rendered

### Messenger Not Opening
1. Verify your Facebook Page ID is correct
2. Check if your Facebook Page is public
3. Test the m.me link directly in browser

### Mobile Issues
1. Test on different devices
2. Check if popup blockers are enabled
3. Verify responsive design is working

## Advanced Features

### Auto-Reply Setup
1. Go to your Facebook Page
2. Click "Settings" → "Messaging"
3. Set up instant replies for when you're offline
4. Add quick replies for common questions

### Messenger Extensions
You can add more features like:
- Order buttons
- Menu previews
- Payment integration
- Appointment booking

## Security & Privacy
- Messages go through Facebook's secure platform
- No customer data stored on your website
- Facebook handles all privacy and security
- Compliant with data protection regulations

## Support
If you need help setting up:
1. Check Facebook's official documentation
2. Verify your Facebook Page settings
3. Test the integration step by step 