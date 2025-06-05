import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <div className="logo">NEURAPIX</div>
            <p>Subscribe to our newsletter for the latest updates on features and releases.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email here" />
              <button type="submit">Join</button>
            </form>
            <p className="disclaimer">By subscribing, you agree to receive emails from Neurapix. You can unsubscribe at any time.</p>
          </div>
          
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home Page</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Blog Posts</a></li>
              <li><a href="#">Support Center</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><a href="#">Help</a></li>
              <li><a href="#">Case Studies</a></li>
              <li><a href="#">Webinars</a></li>
              <li><a href="#">Guides</a></li>
              <li><a href="#">API Docs</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Connect With Us</h3>
            <ul className="social-links">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">X</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 