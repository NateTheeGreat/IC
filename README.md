# Regis Innovation Center Website

A modern, responsive website for the Regis Innovation Center, inspired by the Harvard Innovation Center design. Built with HTML, CSS, JavaScript for the frontend and PHP for the backend.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with beautiful layouts across all devices
- **Modern UI/UX**: Clean, professional design inspired by Harvard Innovation Center
- **Interactive Components**: Smooth animations, hover effects, and user-friendly navigation
- **Event Management**: Dynamic events loading with filtering and registration
- **Contact System**: Working contact form with email notifications
- **Performance Optimized**: Fast loading times and optimized assets

## 📁 Project Structure

```
IC website/
├── index.html                 # Main homepage
├── events.php                 # Events listing page
├── assets/
│   ├── css/
│   │   ├── style.css         # Main styles
│   │   └── components.css    # Component-specific styles
│   ├── js/
│   │   ├── main.js          # Main JavaScript functionality
│   │   └── events.js        # Events page specific scripts
│   └── images/              # Image assets (placeholder references)
├── api/
│   ├── contact.php          # Contact form handler
│   ├── events.php           # Events API endpoint
│   └── config/
│       └── database.php     # Database configuration and setup
└── .github/
    └── copilot-instructions.md
```

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Flexbox/Grid, animations, and responsive design
- **JavaScript (ES6+)**: Interactive functionality and API integration
- **Google Fonts**: Inter font family for modern typography

### Backend
- **PHP 7.4+**: Server-side logic and API endpoints
- **MySQL**: Database for events, contacts, and content management
- **PDO**: Database abstraction layer for security

## 🔧 Setup & Installation

### Prerequisites
- Web server (Apache/Nginx) with PHP 7.4+ support
- MySQL 5.7+ or MariaDB
- Modern web browser

### Local Development Setup

1. **Clone/Download the project** to your web server directory
   ```bash
   # If using XAMPP/WAMP, place in htdocs/
   # If using MAMP, place in htdocs/
   ```

2. **Database Setup**
   - Create a MySQL database named `regis_innovation_center`
   - Update database credentials in `api/config/database.php`
   - Uncomment the initialization line at the bottom of `database.php` and run it once to create tables

3. **Configure Email Settings**
   - Update email settings in `api/contact.php`
   - Set proper `$to_email` and `$from_email` addresses

4. **Add Images**
   - Add actual images to the `assets/images/` directory
   - Required images:
     - `regis-logo.png` - Main logo
     - `regis-logo-white.png` - White version for footer
     - `hero-bg.jpg` - Hero section background
     - `about-image.jpg` - About section image
     - Various event and resource images

### Production Deployment

1. **Upload files** to your web hosting server
2. **Update configurations**:
   - Database credentials in `api/config/database.php`
   - Email settings in `api/contact.php`
   - Update any hardcoded URLs if necessary
3. **Set proper file permissions**
4. **Test all functionality**

## 📱 Pages & Features

### Homepage (`index.html`)
- Hero section with call-to-action
- About section with statistics
- Programs showcase
- Resources gallery
- Upcoming events preview
- Contact form
- Footer with links and social media

### Events Page (`events.php`)
- Complete events listing
- Category filtering
- Event registration modal
- Event sharing functionality
- Responsive event cards

### API Endpoints
- `api/contact.php` - Handle contact form submissions
- `api/events.php` - Serve events data with filtering options
- `api/config/database.php` - Database setup and configuration

## 🎨 Design Features

- **Color Scheme**: Primary blue (#2c5aa0) with professional grays
- **Typography**: Inter font family for modern, readable text
- **Components**: Reusable CSS components with hover effects
- **Animations**: Smooth transitions and scroll-based animations
- **Responsive**: Mobile-first design with breakpoints at 768px and 480px

## 🔧 Customization

### Adding New Events
Events can be added through the database or by modifying the sample data in `api/events.php`. For a full CMS, consider integrating with an admin panel.

### Styling Changes
- Main styles in `assets/css/style.css`
- Component styles in `assets/css/components.css`
- CSS custom properties for easy color/font changes

### Adding New Pages
Follow the same structure as `events.php` with:
1. HTML structure with navigation
2. Page-specific CSS
3. JavaScript functionality
4. PHP backend if needed

## 📧 Contact Form Configuration

The contact form requires:
1. PHP mail() function configured on server
2. Proper SMTP settings (for production)
3. Valid email addresses in `api/contact.php`

## 🔒 Security Considerations

- Input validation and sanitization in PHP
- SQL injection prevention with PDO prepared statements
- XSS protection with `htmlspecialchars()`
- CSRF protection recommended for production

## 🚀 Performance Optimization

- Optimized CSS and JavaScript
- Image optimization recommended
- Lazy loading for images
- Minimal external dependencies

## 📞 Support & Maintenance

For questions or issues:
- Check browser console for JavaScript errors
- Verify server error logs for PHP issues
- Ensure database connection is working
- Test email functionality

## 🔄 Future Enhancements

Potential additions:
- Admin panel for content management
- User authentication system
- Event registration with payment
- Newsletter integration
- Blog/news section
- Social media integration
- Analytics integration

## 📄 License

This project is created for the Regis Innovation Center. All rights reserved.

---

Built with ❤️ for the Regis Innovation Center community.