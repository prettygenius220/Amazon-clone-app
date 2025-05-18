Amazon Clone with Make.com Webhook Integration

This project is a simplified clone of Amazon's shopping experience. It allows users to browse products, add them to the cart, and place orders. When an order is placed, the details are sent in real time to a Make.com webhook for automation workflows (e.g., order processing, notifications, storage).

Features:
Product listing UI with images and prices

Cart system with quantity updates and delete options

Delivery options with dynamic pricing and dates

Order confirmation flow

Sends order data to a Make.com webhook

Tech Stack: 
HTML/CSS/JavaScript — Frontend UI

Make.com — Webhook-based backend logic for handling orders

Day.js — For handling and formatting delivery dates

How It Works:
User browses and adds items to the cart.

Upon checkout, the order details are formatted.

A POST request is made to a Make.com webhook URL with the full order payload.

Make.com handles the automation (e.g., email confirmation, Google Sheets logging, etc.).

