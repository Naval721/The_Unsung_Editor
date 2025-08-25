# Email Notification Setup Guide

This guide shows you how to set up email notifications when someone sends a message through your contact form.

## Option 1: EmailJS (Recommended - Easiest)

EmailJS is a service that allows you to send emails directly from your frontend without a backend server.

### Step 1: Sign up for EmailJS
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Create a free account
3. Verify your email

### Step 2: Set up Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note down your **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```html
Subject: New Contact Form Message from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your website contact form.
```

4. Note down your **Template ID**

### Step 4: Get Your Public Key
1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

### Step 5: Update Your Code
Replace the placeholders in `src/components/sections/contact.tsx`:

```typescript
// Replace these values:
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY') // Your public key
'YOUR_SERVICE_ID' // Your service ID
'YOUR_TEMPLATE_ID' // Your template ID
'your-email@example.com' // Your email address
```

### Step 6: Test
1. Fill out the contact form on your website
2. Submit the form
3. Check your email for the notification

---

## Option 2: Formspree (Alternative - Also Easy)

Formspree is another popular service for handling form submissions.

### Step 1: Sign up for Formspree
1. Go to [Formspree.io](https://formspree.io/)
2. Create a free account
3. Create a new form

### Step 2: Update Your Form
Replace the form action in your contact component:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    
    if (response.ok) {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } else {
      throw new Error('Failed to send message')
    }
  } catch (error) {
    toast({
      title: "Error sending message",
      description: "Please try again or contact us directly.",
      variant: "destructive"
    })
  } finally {
    setIsSubmitting(false)
  }
}
```

---

## Option 3: Netlify Forms (If using Netlify)

If you're deploying on Netlify, you can use their built-in form handling.

### Step 1: Update Your Form
Add `data-netlify="true"` to your form:

```html
<form onSubmit={handleSubmit} className="space-y-6" data-netlify="true">
  <!-- form fields -->
</form>
```

### Step 2: Add Hidden Input
Add this hidden input to your form:

```html
<input type="hidden" name="form-name" value="contact" />
```

### Step 3: Configure in Netlify
1. Deploy your site to Netlify
2. Go to your site dashboard
3. Navigate to "Forms"
4. Configure email notifications

---

## Option 4: Backend API (Advanced)

If you have a backend server, you can create an API endpoint.

### Step 1: Create API Endpoint
Create a new file `src/api/contact.ts`:

```typescript
export const sendContactEmail = async (formData: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  
  if (!response.ok) {
    throw new Error('Failed to send email')
  }
  
  return response.json()
}
```

### Step 2: Update Contact Form
Update your contact form to use the API:

```typescript
import { sendContactEmail } from '@/api/contact'

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  
  try {
    await sendContactEmail(formData)
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    })
    setFormData({ name: '', email: '', subject: '', message: '' })
  } catch (error) {
    toast({
      title: "Error sending message",
      description: "Please try again or contact us directly.",
      variant: "destructive"
    })
  } finally {
    setIsSubmitting(false)
  }
}
```

---

## Recommended Setup

For most users, **EmailJS (Option 1)** is the best choice because:
- ✅ No backend required
- ✅ Free tier available
- ✅ Easy to set up
- ✅ Reliable delivery
- ✅ Customizable templates

## Security Notes

1. **Never expose API keys in client-side code** - EmailJS public keys are safe to use
2. **Validate form data** - Always validate inputs on both frontend and backend
3. **Rate limiting** - Consider adding rate limiting to prevent spam
4. **CAPTCHA** - For production sites, consider adding reCAPTCHA

## Troubleshooting

### EmailJS Issues:
- Check that all IDs are correct
- Verify your email service is properly connected
- Check the browser console for errors

### Formspree Issues:
- Verify your form ID is correct
- Check that the form is properly configured in Formspree dashboard

### General Issues:
- Test with a simple message first
- Check your spam folder
- Verify your email address is correct

---

## Next Steps

1. Choose your preferred option
2. Follow the setup instructions
3. Test the form submission
4. Configure email templates as needed
5. Set up spam protection if needed

Your contact form will now send you email notifications whenever someone submits a message! 