// Install dependencies first: npm install express axios
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const consumerKey = '7vDzyJyp1riBzKmHUHhp3ms5iasB4cAIUlp80A4eR2Q2QupG';
const consumerSecret = 'fH1e5iA71mF49wkV3txMeBBcu73DlIPV5E8XCSFIDkcQAAybpH2fnj1L8xFZuVr7';
const shortcode = '174379';
const passkey = 'YOUR_PASSKEY';
const callbackURL = 'https://yourdomain.com/api/mpesa/callback';

async function getAccessToken(){
  const token = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  const res = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: { Authorization: `Basic ${token}` }
  });
  return res.data.access_token;
}

app.post('/api/mpesa/stk', async (req, res) => {
  const { phone, amount } = req.body;
  const accessToken = await getAccessToken();
  const timestamp = new Date().toISOString().replace(/[-:TZ.]/g,'').slice(0,14);
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

  const stkData = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: callbackURL,
    AccountReference: "BMG-TECH",
    TransactionDesc: "Purchase on BMG-TECH"
  };

  const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', stkData, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  res.json(response.data);
});

app.listen(3000, ()=>console.log("MPESA server running on port 3000"));
