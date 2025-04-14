/**
 * Streaming Theme JavaScript - Prime Video Inspired
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Horizontal scrolling for content rows with mouse wheel
    const contentRows = document.querySelectorAll('.content-row');
    
    contentRows.forEach(row => {
        row.addEventListener('wheel', function(e) {
            if (e.deltaY !== 0) {
                e.preventDefault();
                this.scrollLeft += e.deltaY;
            }
        });
    });
    
    // Category filtering for blog posts
    const categoryTabs = document.querySelectorAll('.category-tab');
    const contentCards = document.querySelectorAll('.content-card[data-categories]');
    
    if (categoryTabs.length > 0 && contentCards.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                categoryTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Show/hide content cards based on category
                contentCards.forEach(card => {
                    if (category === 'all') {
                        card.style.display = '';
                    } else {
                        const cardCategories = card.getAttribute('data-categories').split(',');
                        if (cardCategories.includes(category)) {
                            card.style.display = '';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Add hover effect to content cards
    const allContentCards = document.querySelectorAll('.content-card');
    
    allContentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.zIndex = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.zIndex = '';
        });
    });
    
    // Smooth scrolling for navigation links
    const navAnchors = document.querySelectorAll('a[href^="#"]');
    
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to section titles when they come into view
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const animateTitles = () => {
        sectionTitles.forEach(title => {
            const titlePosition = title.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (titlePosition < screenPosition) {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    animateTitles();
    window.addEventListener('scroll', animateTitles);
});