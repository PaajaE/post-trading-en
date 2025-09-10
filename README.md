# JASPER Systems - Active Trading Accounting

Modern, responsive landing page for specialized accounting services for active trading on capital markets. Built with vanilla HTML, CSS, and JavaScript using Pico CSS framework.

## Features

- **Hero Section** - Large headline, subtitle, CTA button, and image
- **Introduction** - Detailed explanation of active trading and accounting importance
- **Target Audience** - Three main customer groups with detailed descriptions
- **Services** - Comprehensive portfolio of 6 specialized services
- **Infrastructure** - Technical background and capabilities
- **References** - Client case study
- **Call to Action** - Consultation request
- **Contact/Footer** - Contact form and company information

## Languages

- **Czech** (`index.html`) - Primary language
- **English** (`en/index.html`) - International version
- Language switcher in navigation

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - Interactive functionality
- **Pico CSS** - Minimal CSS framework (CDN)
- **Font Awesome** - Icons (CDN)
- **Unsplash** - Stock images (CDN)

## File Structure

```
post-trading/
├── index.html          # Czech version (main)
├── en/
│   └── index.html      # English version
├── styles.css          # Shared CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Getting Started

1. **Clone or download** the files to your local machine
2. **Open** `index.html` in your web browser for Czech version
3. **Open** `en/index.html` for English version
4. **Customize** the content, colors, and images as needed

## Customization

### Colors
The color scheme is defined using CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;      /* Blue */
    --secondary-color: #1e40af;   /* Dark Blue */
    --accent-color: #f59e0b;      /* Orange */
    --text-color: #1f2937;        /* Dark Gray */
    --light-text: #6b7280;        /* Light Gray */
}
```

### Content
- Update text content in both `index.html` and `en/index.html`
- Replace placeholder images with your own
- Modify contact information
- Update service descriptions and target audience

### Brand Identity Integration
To integrate your brand identity:

1. **Colors**: Update the CSS variables in `styles.css`
2. **Fonts**: Replace the font-family in the CSS
3. **Logo**: Replace the text logo with your actual logo image
4. **Images**: Replace Unsplash images with your brand photos
5. **Content**: Update all text to match your brand voice
6. **Contact details**: Update phone, email, and address information

## Features

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 480px
- Flexible grid layouts
- Optimized for all screen sizes

### Interactive Elements
- Smooth scrolling navigation
- Form validation and submission
- Hover animations
- Intersection Observer animations
- Notification system

### Performance
- Optimized images
- Lazy loading support
- Minimal JavaScript
- Fast loading times

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Deployment

The site can be deployed to any static hosting service:

- **Netlify** - Drag and drop the folder
- **Vercel** - Connect your repository
- **GitHub Pages** - Push to a repository
- **Traditional hosting** - Upload files via FTP

## Customization Tips

### Adding Your Brand Identity
1. **Extract colors** from your brand guidelines
2. **Choose fonts** that match your brand
3. **Replace images** with your own photography
4. **Update content** to reflect your services
5. **Add your logo** in the navigation

### SEO Optimization
- Update meta tags in the `<head>` section
- Add structured data markup
- Optimize images with alt text
- Include relevant keywords in content

### Analytics
Add Google Analytics or other tracking:

```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or customization help, please contact your development team.
