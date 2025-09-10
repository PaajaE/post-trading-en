# EmailJS Setup Guide

## Overview
This guide will help you set up EmailJS to connect your contact form to an emailing service. EmailJS allows you to send emails directly from your website without a backend server.

## Step 1: EmailJS Account Setup

1. **Create an EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account
   - Verify your email address

2. **Add Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the authentication steps
   - Note down your **Service ID** (you'll need this later)

## Step 2: Create Email Template

1. **Create Template**
   - Go to "Email Templates" in your EmailJS dashboard
   - Click "Create New Template"
   - Choose "Blank Template"

2. **Design Your Template**
   Use this template structure:

```html
Subject: New Contact Form Submission from {{from_name}}

Hello,

You have received a new contact form submission:

**Name:** {{from_name}}
**Email:** {{from_email}}
**Company:** {{company}}
**Service Interest:** {{service}}
**Message:**

{{message}}

---
This message was sent from your website contact form.
```

3. **Save Template**
   - Save the template with a name like "Contact Form Template"
   - Note down your **Template ID** (you'll need this later)

## Step 3: Get Your Public Key

1. **Find Public Key**
   - Go to "Account" → "API Keys" in your EmailJS dashboard
   - Copy your **Public Key**

## Step 4: Update Your Code

Replace the placeholder values in your `script.js` file:

```javascript
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
emailjs.init('YOUR_PUBLIC_KEY');

// Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

**Example with real values:**
```javascript
emailjs.init('user_abc123def456ghi789');

emailjs.send('service_xyz789', 'template_contact_form', templateParams)
```

## Step 5: Test Your Setup

1. **Test the Form**
   - Fill out your contact form
   - Submit it
   - Check your email for the received message
   - Check the browser console for any errors

## Troubleshooting

### Common Issues:

1. **"emailjs is not defined"**
   - Make sure the EmailJS SDK is loaded before your script.js
   - Check that the CDN link is working

2. **"Service ID not found"**
   - Verify your Service ID is correct
   - Make sure your email service is properly connected

3. **"Template ID not found"**
   - Verify your Template ID is correct
   - Make sure your template is published

4. **Emails not being sent**
   - Check your email service connection
   - Verify your public key is correct
   - Check browser console for error messages

### Debug Mode:
Add this to your JavaScript for debugging:
```javascript
emailjs.init('YOUR_PUBLIC_KEY', undefined, undefined, true);
```

## Security Notes

1. **Public Key Exposure**
   - Your public key is safe to expose in client-side code
   - EmailJS uses this key to identify your account

2. **Rate Limiting**
   - Free accounts have limits on emails per month
   - Consider upgrading for higher limits

3. **Spam Protection**
   - EmailJS includes basic spam protection
   - Consider adding CAPTCHA for additional protection

## Advanced Features

### 1. Add CAPTCHA Protection
Consider adding reCAPTCHA to prevent spam:

```html
<!-- Add to your form -->
<div class="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY"></div>
```

### 2. Custom Success/Error Messages
You can customize the notification messages in the JavaScript code.

### 3. Email Validation
The current code includes basic email validation, but you can enhance it further.

## Support

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Community: [https://community.emailjs.com/](https://community.emailjs.com/)

## File Structure After Setup

```
post-trading/
├── index.html (updated with EmailJS SDK)
├── en/index.html (updated with EmailJS SDK)
├── script.js (updated with EmailJS integration)
├── styles.css
└── EMAILJS_SETUP.md (this file)
```

Your contact form is now ready to send emails through EmailJS!
