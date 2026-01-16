<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Events - Regis Innovation Center</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/components.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Ultra-Premium Header Start -->
    <header class="premium-header">
        <!-- Elegant Announcement Bar -->
        <div class="announcement-strip">
            <div class="announcement-content">
                <div class="announcement-pulse"></div>
                <span class="announcement-label">Open House - Night 1</span>
                <span class="announcement-text">3rd floor clarke hall, room 358</span>
                <button class="announcement-dismiss">✕</button>
            </div>
        </div>
        
        <!-- Main Navigation Header -->
        <nav class="main-navigation" role="navigation">
            <div class="nav-container">
                <!-- Brand Section -->
                <div class="brand-zone">
                    <a href="index.html" class="brand-link">
                        <img src="assets/logo.png" alt="Regis Innovation Center" class="official-logo">
                    </a>
                </div>
                
                <!-- Navigation Links -->
                <div class="nav-links-zone">
                    <ul class="nav-menu">
                        <li class="nav-item">
                            <a href="index.html#about" class="nav-link" data-text="About">
                                <span class="link-text">About</span>
                                <span class="link-effect"></span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="events.html" class="nav-link active" data-text="Events">
                                <span class="link-text">Events</span>
                                <span class="link-effect"></span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#ventures" class="nav-link" data-text="Ventures">
                                <span class="link-text">Ventures</span>
                                <span class="link-effect"></span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#stories" class="nav-link" data-text="Stories">
                                <span class="link-text">Stories</span>
                                <span class="link-effect"></span>
                            </a>
                        </li>
                        <li class="nav-item active">
                            <a href="events.php" class="nav-link" data-text="Events">
                                <span class="link-text">Events</span>
                                <span class="link-effect"></span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="index.html#resources" class="nav-link" data-text="Resources">
                                <span class="link-text">Resources</span>
                                <span class="link-effect"></span>
                            </a>
                        </li>
                    </ul>
                    <div class="nav-highlight"></div>
                </div>
                
                <!-- Action Zone -->
                <div class="action-zone">
                    <button class="hamburger-toggle" aria-label="Toggle mobile menu" aria-expanded="false">
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                    </button>
                </div>
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                    </button>
                </div>
            </div>
            
            <!-- Beautiful Separator Line -->
            <div class="header-separator"></div>
        </nav>
            
            <!-- Mobile Menu -->
            <div class="mobile-menu" id="mobileMenu">
                <div class="mobile-menu-content">
                    <ul class="mobile-nav-list">
                        <li><a href="index.html#about" class="mobile-nav-link">About</a></li>
                        <li><a href="events.html" class="mobile-nav-link">Events</a></li>
                        <li><a href="#ventures" class="mobile-nav-link">Ventures</a></li>
                        <li><a href="#stories" class="mobile-nav-link">Stories</a></li>
                        <li><a href="events.php" class="mobile-nav-link">Events</a></li>
                        <li><a href="index.html#resources" class="mobile-nav-link">Resources</a></li>
                        <li><a href="#login" class="mobile-nav-link special">Member Login</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <!-- Ultra-Premium Header End -->

    <!-- Page Header -->
    <section class="page-header gradient-blue">
        <div class="container">
            <h1>Upcoming Events</h1>
            <p>Join our community events, workshops, and networking opportunities</p>
            <nav class="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li class="breadcrumb-item active">Events</li>
                </ol>
            </nav>
        </div>
    </section>

    <!-- Event Filters -->
    <section class="section">
        <div class="container">
            <div class="event-filters">
                <h3>Filter Events</h3>
                <div class="filter-buttons">
                    <button class="btn btn-outline filter-btn active" data-category="all">All Events</button>
                    <button class="btn btn-outline filter-btn" data-category="workshop">Workshops</button>
                    <button class="btn btn-outline filter-btn" data-category="showcase">Showcases</button>
                    <button class="btn btn-outline filter-btn" data-category="competition">Competitions</button>
                    <button class="btn btn-outline filter-btn" data-category="networking">Networking</button>
                    <button class="btn btn-outline filter-btn" data-category="tech-talk">Tech Talks</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Events List -->
    <section class="section section-gray">
        <div class="container">
            <div id="events-grid" class="events-grid">
                <!-- Events will be loaded dynamically -->
            </div>
            
            <!-- Loading indicator -->
            <div id="loading" class="text-center">
                <div class="spinner"></div>
            </div>
            
            <!-- No events message -->
            <div id="no-events" class="text-center" style="display: none;">
                <h3>No events found</h3>
                <p>There are currently no events matching your criteria.</p>
            </div>
        </div>
    </section>

    <!-- Event Registration Modal -->
    <div id="registration-modal" class="modal">
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h2>Event Registration</h2>
            <form id="registration-form">
                <input type="hidden" id="event-id" name="event_id">
                
                <div class="form-group">
                    <label for="reg-name">Full Name</label>
                    <input type="text" id="reg-name" name="name" required>
                </div>
                
                <div class="form-group">
                    <label for="reg-email">Email Address</label>
                    <input type="email" id="reg-email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="reg-phone">Phone Number</label>
                    <input type="tel" id="reg-phone" name="phone">
                </div>
                
                <div class="form-group">
                    <label for="reg-affiliation">Affiliation</label>
                    <select id="reg-affiliation" name="affiliation">
                        <option value="">Select your affiliation</option>
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                        <option value="staff">Staff</option>
                        <option value="alumni">Alumni</option>
                        <option value="community">Community Member</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="reg-notes">Additional Notes (Optional)</label>
                    <textarea id="reg-notes" name="notes" rows="3"></textarea>
                </div>
                
                <button type="submit" class="btn btn-primary">Register for Event</button>
            </form>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <img src="assets/logo.png" alt="Regis Innovation Center" class="footer-logo">
                    <p>Fostering innovation and entrepreneurship in the heart of Denver</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html#about">About</a></li>
                        <li><a href="index.html#programs">Programs</a></li>
                        <li><a href="index.html#resources">Resources</a></li>
                        <li><a href="events.php">Events</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Programs</h4>
                    <ul>
                        <li><a href="#">Innovation Incubator</a></li>
                        <li><a href="#">Skills Workshops</a></li>
                        <li><a href="#">Mentorship Network</a></li>
                        <li><a href="#">Startup Accelerator</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Connect</h4>
                    <div class="social-links">
                        <a href="#" class="social-link">LinkedIn</a>
                        <a href="#" class="social-link">Twitter</a>
                        <a href="#" class="social-link">Facebook</a>
                        <a href="#" class="social-link">Instagram</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Regis Innovation Center. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="assets/js/main.js"></script>
    <script src="assets/js/events.js"></script>
</body>
</html>