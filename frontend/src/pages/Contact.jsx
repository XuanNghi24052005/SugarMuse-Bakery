import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../pageStyles/Contact.css";

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 5h18v14H3V5Z" />
    <path d="m3 6 9 7 9-7" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7.2 3H4.5A1.5 1.5 0 0 0 3 4.5C3 13.6 10.4 21 19.5 21a1.5 1.5 0 0 0 1.5-1.5v-2.7l-5-1-1.2 3a16.4 16.4 0 0 1-9.6-9.6l3-1.2-1-5Z" />
  </svg>
);

const LocationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m14 7 5 5-5 5" />
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-overlay" />

        <div className="contact-container contact-hero-inner">
          <div className="contact-hero-glass">
            <span className="contact-eyebrow">
              WE&apos;D LOVE TO HEAR FROM YOU
            </span>

            <h1>
              Let&apos;s Make Something
              <span>Sweet Together</span>
            </h1>

            <p>
              Have a question, need help with an order, or simply want to say
              hello? Our Sugar Muse team is always happy to help.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-info-section">
        <div className="contact-container">
          <div className="contact-info-grid">
            <article className="contact-info-card">
              <div className="contact-info-icon">
                <LocationIcon />
              </div>

              <h3>Visit Our Bakery</h3>

              <p>
                20 Cong Hoa Street, Tan Binh District
                <br />
                Ho Chi Minh City, Vietnam
              </p>

              <a href="#contact-map">
                Get Directions
                <ArrowIcon />
              </a>
            </article>

            <article className="contact-info-card">
              <div className="contact-info-icon">
                <PhoneIcon />
              </div>

              <h3>Call Us</h3>

              <p>
                Need a quick answer?
                <br />
                We&apos;re happy to chat.
              </p>

              <a href="tel:+84123456789">
                +84 123 456 789
                <ArrowIcon />
              </a>
            </article>

            <article className="contact-info-card">
              <div className="contact-info-icon">
                <MailIcon />
              </div>

              <h3>Email Us</h3>

              <p>
                Send us a message anytime
                <br />
                and we&apos;ll get back to you.
              </p>

              <a href="mailto:hello@sugarmusebakery.com">
                hello@sugarmusebakery.com
                <ArrowIcon />
              </a>
            </article>

            <article className="contact-info-card">
              <div className="contact-info-icon">
                <ClockIcon />
              </div>

              <h3>Opening Hours</h3>

              <p>
                Mon – Fri: 8:00 AM – 7:00 PM
                <br />
                Sat – Sun: 8:00 AM – 8:00 PM
              </p>

              <span className="contact-open-label">
                Open Daily
              </span>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="contact-container contact-main-grid">
          <div className="contact-form-side">
            <span className="contact-section-eyebrow">
              GET IN TOUCH
            </span>

            <h2>Send Us a Message</h2>

            <p className="contact-section-copy">
              Tell us how we can help. For custom cake enquiries, you can also
              visit our Custom Cakes page and submit a detailed request.
            </p>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="firstName">
                    First Name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="lastName">
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+84 ..."
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="subject">
                  What can we help with?
                </label>

                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option
                    value=""
                    disabled
                  >
                    Select a topic
                  </option>

                  <option value="general">
                    General Enquiry
                  </option>

                  <option value="order">
                    Order Support
                  </option>

                  <option value="custom-cake">
                    Custom Cake
                  </option>

                  <option value="gifting">
                    Gifting
                  </option>

                  <option value="delivery">
                    Pickup & Delivery
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </div>

              <div className="contact-field">
                <label htmlFor="message">
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Tell us a little more..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="contact-submit-button"
              >
                Send Message
                <ArrowIcon />
              </button>

              {submitted && (
                <p className="contact-success-message">
                  Thank you! Your message has been received.
                </p>
              )}
            </form>
          </div>

          <div className="contact-visual-side">
            <div className="contact-image-frame">
              <img
                src="/images/products/custom-bakery.jpg"
                alt="Sugar Muse Bakery custom cake"
              />

              <div className="contact-image-badge">
                <span>SUGAR MUSE</span>
                <strong>BAKERY</strong>
              </div>
            </div>

            <div className="contact-note-card">
              <span className="contact-note-script">
                A little note
              </span>

              <h3>
                Planning a custom cake?
              </h3>

              <p>
                For bespoke cakes, please send your request at least several
                days in advance so our bakers have enough time to create
                something special for your celebration.
              </p>

              <Link to="/custom-cakes">
                Explore Custom Cakes
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="contact-map-section"
        id="contact-map"
      >
        <div className="contact-container">
          <div className="contact-map-heading">
            <div>
              <span className="contact-section-eyebrow">
                COME SAY HELLO
              </span>

              <h2>
                Find Sugar Muse
              </h2>
            </div>

            <p>
              Stop by for freshly baked cakes, pastries and a little something
              sweet.
            </p>
          </div>

          <div className="contact-map-placeholder">
            <div className="contact-map-pattern" />

            <div className="contact-map-pin">
              <LocationIcon />
            </div>

            <div className="contact-map-card">
              <span>
                SUGAR MUSE BAKERY
              </span>

              <strong>
                20 Cong Hoa Street, Tan Binh District
              </strong>

              <p>
                Ho Chi Minh City, Vietnam
              </p>

              <a
                href="https://maps.app.goo.gl/2wTbsUHXBinBDSta8"
                target="_blank"
                rel="noreferrer"
              >
                Open in Maps
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;