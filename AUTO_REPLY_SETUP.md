# EmailJS Auto-Reply Setup Guide

## Overview
This guide will help you set up an automatic reply email that gets sent to users when they submit your contact form. This provides immediate confirmation and professional communication.

## Step 1: Create Auto-Reply Template in EmailJS

1. **Go to EmailJS Dashboard**
   - Log into your EmailJS account
   - Navigate to "Email Templates"

2. **Create New Template**
   - Click "Create New Template"
   - Choose "Blank Template"
   - Name it "Auto Reply Template" or similar

## Step 2: Design Your Auto-Reply Template

### Template Structure:
```html
Subject: Děkujeme za vaši zprávu - JASPER Systems

Vážený/á {{from_name}},

děkujeme za váš zájem o naše služby účtování aktivního tradingu na kapitálových trzích.

**Potvrzujeme přijetí vaší zprávy:**
- Jméno: {{from_name}}
- Email: {{from_email}}
- Společnost: {{company}}
- Zvolená služba: {{service}}
- Zpráva: {{message}}

**Co bude následovat:**
- Naši odborníci si vaši zprávu prostudují
- Kontaktujeme vás do 24 hodin
- Naplánujeme osobní konzultaci podle vašich potřeb

**Naše služby:**
✅ Účtování transakcí z bankovních výpisů
✅ Oceňování a přecenění portfolia
✅ Reporting a výkaznictví dle ČNB
✅ Daňové služby a konzultace
✅ SPV a konsolidace

**Kontaktní informace:**
📧 Email: info@jasper.systems
📞 Telefon: +420 XXX XXX XXX
📍 Adresa: Praha, Česká republika

Těšíme se na spolupráci!

S pozdravem,
Tým JASPER Systems

---
Tento email byl odeslán automaticky. Prosím neodpovídejte na něj.
```

## Step 3: Template Variables

Make sure your template uses these variables that match your form:
- `{{from_name}}` - User's name
- `{{from_email}}` - User's email
- `{{company}}` - Company name (optional)
- `{{service}}` - Selected service
- `{{message}}` - User's message

## Step 4: Update Your JavaScript

Add auto-reply functionality to your `script.js`:

```javascript
// After successful form submission, send auto-reply
.then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
    
    // Send auto-reply to user
    const autoReplyParams = {
        to_name: name,
        to_email: email,
        from_name: name,
        from_email: email,
        company: company || 'Neuvedeno',
        service: service || 'Neuvedeno',
        message: message
    };
    
    // Send auto-reply (replace with your auto-reply template ID)
    window.emailjs.send('service_iqjdf2b', 'template_auto_reply', autoReplyParams)
        .then(function(autoReplyResponse) {
            console.log('Auto-reply sent!', autoReplyResponse.status);
        })
        .catch(function(autoReplyError) {
            console.log('Auto-reply failed:', autoReplyError);
        });
    
    showNotification('Děkujeme za vaši zprávu! Budeme vás kontaktovat co nejdříve.', 'success');
    contactForm.reset();
    grecaptcha.reset();
}, function(error) {
```

## Step 5: Service Configuration

### For Auto-Reply, you have two options:

#### Option A: Same Email Service (Recommended)
- Use the same email service as your main form
- Set "From" email to your business email
- Set "To" email to `{{to_email}}` (user's email)

#### Option B: Separate Email Service
- Create a dedicated email service for auto-replies
- Useful if you want different sender addresses

## Step 6: Template Settings

### Email Settings:
- **From Name**: JASPER Systems
- **From Email**: info@jasper.systems (or your business email)
- **To Email**: `{{to_email}}` (user's email)
- **Reply To**: info@jasper.systems

### Advanced Settings:
- **Priority**: Normal
- **Encoding**: UTF-8
- **Format**: HTML

## Step 7: Testing

1. **Test Template**
   - Use EmailJS test feature
   - Send test email to yourself
   - Check formatting and variables

2. **Test Full Flow**
   - Submit your contact form
   - Check that you receive the main email
   - Check that user receives auto-reply

## Step 8: Customization Options

### Professional Styling:
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
        <h2 style="color: #2c3e50;">Děkujeme za vaši zprávu</h2>
        <p>Vážený/á {{from_name}},</p>
        <!-- Your content here -->
    </div>
</div>
```

### Add Company Logo:
```html
<img src="https://yourdomain.com/assets/logos/SVG/Artboard 31.svg" 
     alt="JASPER Systems" 
     style="max-width: 200px; height: auto;">
```

### Add Social Links:
```html
<div style="margin-top: 20px;">
    <a href="https://linkedin.com/company/jasper-systems" style="margin-right: 10px;">LinkedIn</a>
    <a href="https://twitter.com/jasper_systems" style="margin-right: 10px;">Twitter</a>
    <a href="mailto:info@jasper.systems">Email</a>
</div>
```

## Step 9: English Version

Create a separate template for English users:

```html
Subject: Thank you for your message - JASPER Systems

Dear {{from_name}},

thank you for your interest in our active trading accounting services for capital markets.

**We confirm receipt of your message:**
- Name: {{from_name}}
- Email: {{from_email}}
- Company: {{company}}
- Selected service: {{service}}
- Message: {{message}}

**What happens next:**
- Our experts will review your message
- We will contact you within 24 hours
- We will schedule a personal consultation according to your needs

**Our services:**
✅ Transaction accounting from bank statements
✅ Portfolio valuation and revaluation
✅ Reporting and statements according to CNB
✅ Tax services and consulting
✅ SPV and consolidation

**Contact information:**
📧 Email: info@jasper.systems
📞 Phone: +420 XXX XXX XXX
📍 Address: Prague, Czech Republic

We look forward to cooperation!

Best regards,
JASPER Systems Team

---
This email was sent automatically. Please do not reply to it.
```

## Step 10: Implementation Checklist

- [ ] Create auto-reply template in EmailJS
- [ ] Test template with sample data
- [ ] Update JavaScript to send auto-reply
- [ ] Test full form submission flow
- [ ] Create English version if needed
- [ ] Add company branding/styling
- [ ] Set up proper email service configuration
- [ ] Test with real email addresses

## Troubleshooting

### Common Issues:

1. **Auto-reply not sending**
   - Check template ID in JavaScript
   - Verify email service configuration
   - Check browser console for errors

2. **Variables not populating**
   - Ensure variable names match exactly
   - Check template syntax: `{{variable_name}}`

3. **Email formatting issues**
   - Test HTML rendering
   - Check for missing closing tags
   - Verify CSS compatibility

## Best Practices

1. **Professional Tone**: Keep language professional and helpful
2. **Clear Information**: Include all relevant contact details
3. **Next Steps**: Clearly explain what happens next
4. **Branding**: Include company logo and colors
5. **Mobile Friendly**: Ensure email displays well on mobile
6. **Unsubscribe**: Consider adding unsubscribe option for compliance

Your auto-reply system is now ready to provide excellent customer experience!
