import React from 'react'
import { Link } from 'react-router-dom'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import '../componentStyles/Footer.css'

const Footer = () => {
  return (
    <footer className="mocha-footer">
      <div className="mocha-footer-main">
        <section>
          <strong>Sugar Muse</strong>
          <p>
            Artisan cakes, pastries &amp; breads baked fresh every morning —
            crafted with love in Ho Chi Minh City.
          </p>
        </section>
        <section>
          <h3>Our Menu</h3>
          <Link to="/products?category=cake">Cake</Link>
          <Link to="/products?category=pastry">Pastry</Link>
          <Link to="/products?category=savory">Savory</Link>
          <Link to="/products?category=combo">Combo</Link>
        </section>
        <section>
          <h3>Customer Care</h3>
          <Link to="/orders">My Orders</Link>
          <Link to="/products">Delivery Info</Link>
          <Link to="/custom-cakes">Custom Cake Orders</Link>
          <Link to="/contact">FAQ &amp; Contact</Link>
        </section>
        <section>
          <h3>Contact</h3>
          <p>
            <EmailOutlinedIcon /> hello@sugarmuse.vn
          </p>
          <p>
            <PhoneOutlinedIcon /> 0900 123 456
          </p>
          <p>
            <LocationOnOutlinedIcon /> District 1, Ho Chi Minh City
          </p>
        </section>
      </div>
      <div className="mocha-footer-bottom">
        <span>© 2026 Sugar Muse. All rights reserved.</span>
        <div>
          <Link to="/products">Privacy Policy</Link>
          <Link to="/products">Terms &amp; Conditions</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
