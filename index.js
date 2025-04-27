const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// Environment variables
const APP_ID = process.env.APP_ID;
const APP_SECRET = process.env.APP_SECRET;
const SYSTEM_USER_ACCESS_TOKEN = process.env.SYSTEM_USER_ACCESS_TOKEN;
const BUSINESS_ID = process.env.BUSINESS_ID; // your Meta Business Manager ID

// Route to generate deep link for embedded signup
app.get('/generate-deep-link', async (req, res) => {
  try {
    const url = `https://graph.facebook.com/v19.0/${BUSINESS_ID}/whatsapp_business_account_embedded_signup`;

    const params = {
      access_token: SYSTEM_USER_ACCESS_TOKEN,
      // You can optionally specify your own parameters here like:
      // setup fields, business name, etc.
    };

    const response = await axios.post(url, params);

    res.json({
      success: true,
      deep_link: response.data.deep_link_url
    });

  } catch (error) {
    console.error('Error generating deep link:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.response?.data || error.message });
  }
});

// Health check route
app.get('/', (req, res) => {
  res.send('WhatsApp Embedded Signup API is running!');
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
