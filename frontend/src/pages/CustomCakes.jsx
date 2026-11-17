import React, { useRef, useState } from "react";

import "../pageStyles/CustomCakes.css";

const CalendarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 10h18" />
  </svg>
);

const PencilIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z" />
  </svg>
);

const ChatIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.4 9.4 0 0 1-4-.9L3 21l1.6-4.3A8.3 8.3 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z" />
  </svg>
);

const CakeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 10h14v10H5V10Z" />
    <path d="M3 20h18" />
    <path d="M8 10V7M12 10V6M16 10V7" />
    <path d="M8 4h.01M12 3h.01M16 4h.01" />
  </svg>
);

const GiftIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 12v9H4v-9" />
    <path d="M2 7h20v5H2V7Z" />
    <path d="M12 7v14" />
    <path d="M12 7H7.5A2.5 2.5 0 1 1 10 4.5L12 7Z" />
    <path d="M12 7h4.5A2.5 2.5 0 1 0 14 4.5L12 7Z" />
  </svg>
);

const UploadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 16V4" />
    <path d="m7 9 5-5 5 5" />
    <path d="M5 15a4 4 0 0 0 0 8h14a4 4 0 0 0 0-8" />
  </svg>
);

const InfoIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 5h16v15H4V5Z" />
    <path d="M8 5V3h8v2" />
    <path d="M8 10h8M8 14h6" />
  </svg>
);

const HeadsetIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <path d="M4 14h3v6H5a1 1 0 0 1-1-1v-5Z" />
    <path d="M20 14h-3v6h2a1 1 0 0 0 1-1v-5Z" />
    <path d="M17 20c0 1-2 2-5 2" />
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

const colorOptions = [
  "#f8d8d3",
  "#f8bdc4",
  "#f8e7d2",
  "#e1ebcf",
  "#dfd8f1",
];

const CustomCakes = () => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    occasion: "",
    dateNeeded: "",
    servings: "",
    budget: "",
    flavor: "",
    filling: "",
    frosting: "",
    shape: "",
    designTheme: "",
    message: "",
    notes: "",
    deliveryMethod: "",
  });

  const [selectedColors, setSelectedColors] = useState([]);
  const [referenceImages, setReferenceImages] = useState([]);
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

  const toggleColor = (color) => {
    setSelectedColors((current) =>
      current.includes(color)
        ? current.filter((item) => item !== color)
        : [...current, color]
    );
  };

  const handleImages = (event) => {
    const files = Array.from(event.target.files || []).slice(0, 5);
    setReferenceImages(files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestData = {
      ...formData,
      colors: selectedColors,
      referenceImages,
    };

    console.log("Custom cake request:", requestData);

    setSubmitted(true);
  };

  return (
    <main className="custom-request-page">

      <section className="custom-request-hero">
        <div className="custom-request-hero-copy">
          <span className="custom-request-eyebrow">
            CUSTOM CAKES
          </span>

          <h1>
            Request a
            <span> Custom Cake</span>
          </h1>

          <p>
            Tell us about your special occasion, design ideas and preferences.
            Our bakers will review your request and get back to you with a
            personalized quote.
          </p>
        </div>

        <div className="custom-request-hero-image">
          <img
            src="/images/products/request-cake.jpg"
            alt="Sugar Muse custom cake"
          />
        </div>
      </section>

      <section className="custom-request-content">
        <div className="custom-request-container">

          <form
            className="custom-request-form"
            onSubmit={handleSubmit}
          >

            <section className="request-form-section">
              <div className="request-section-title">
                <span>1</span>
                <h2>About Your Cake</h2>
              </div>

              <div className="request-two-columns">
                <div className="request-field">
                  <label htmlFor="occasion">
                    Occasion <strong>*</strong>
                  </label>

                  <select
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select an occasion
                    </option>

                    <option value="birthday">
                      Birthday
                    </option>

                    <option value="wedding">
                      Wedding
                    </option>

                    <option value="anniversary">
                      Anniversary
                    </option>

                    <option value="baby-shower">
                      Baby Shower
                    </option>

                    <option value="graduation">
                      Graduation
                    </option>

                    <option value="celebration">
                      Celebration
                    </option>

                    <option value="other">
                      Other
                    </option>
                  </select>
                </div>

                <div className="request-field">
                  <label htmlFor="dateNeeded">
                    Date Needed <strong>*</strong>
                  </label>

                  <div className="request-input-icon">
                    <CalendarIcon />

                    <input
                      id="dateNeeded"
                      name="dateNeeded"
                      type="date"
                      value={formData.dateNeeded}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="request-field">
                  <label htmlFor="servings">
                    Servings (Estimated) <strong>*</strong>
                  </label>

                  <select
                    id="servings"
                    name="servings"
                    value={formData.servings}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select size / servings
                    </option>

                    <option value="6-8">
                      6 – 8 servings
                    </option>

                    <option value="10-12">
                      10 – 12 servings
                    </option>

                    <option value="15-20">
                      15 – 20 servings
                    </option>

                    <option value="20-30">
                      20 – 30 servings
                    </option>

                    <option value="30-plus">
                      30+ servings
                    </option>
                  </select>
                </div>

                <div className="request-field">
                  <label htmlFor="budget">
                    Budget
                    <span> (Optional)</span>
                  </label>

                  <input
                    id="budget"
                    name="budget"
                    type="text"
                    placeholder="e.g. 1,000,000 – 2,000,000 VND"
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            <section className="request-form-section">
              <div className="request-section-title">
                <span>2</span>
                <h2>Cake Details</h2>
              </div>

              <div className="request-three-columns">
                <div className="request-field">
                  <label htmlFor="flavor">
                    Flavor <strong>*</strong>
                  </label>

                  <select
                    id="flavor"
                    name="flavor"
                    value={formData.flavor}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select a flavor
                    </option>

                    <option value="vanilla">
                      Vanilla
                    </option>

                    <option value="chocolate">
                      Chocolate
                    </option>

                    <option value="strawberry">
                      Strawberry
                    </option>

                    <option value="red-velvet">
                      Red Velvet
                    </option>

                    <option value="matcha">
                      Matcha
                    </option>

                    <option value="lemon">
                      Lemon
                    </option>
                  </select>
                </div>

                <div className="request-field">
                  <label htmlFor="filling">
                    Filling
                  </label>

                  <select
                    id="filling"
                    name="filling"
                    value={formData.filling}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select a filling
                    </option>

                    <option value="vanilla-cream">
                      Vanilla Cream
                    </option>

                    <option value="chocolate-ganache">
                      Chocolate Ganache
                    </option>

                    <option value="strawberry">
                      Strawberry Cream
                    </option>

                    <option value="cream-cheese">
                      Cream Cheese
                    </option>

                    <option value="lemon-curd">
                      Lemon Curd
                    </option>
                  </select>
                </div>

                <div className="request-field">
                  <label htmlFor="frosting">
                    Frosting
                  </label>

                  <select
                    id="frosting"
                    name="frosting"
                    value={formData.frosting}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select a frosting
                    </option>

                    <option value="buttercream">
                      Buttercream
                    </option>

                    <option value="whipped-cream">
                      Whipped Cream
                    </option>

                    <option value="cream-cheese">
                      Cream Cheese
                    </option>

                    <option value="ganache">
                      Chocolate Ganache
                    </option>
                  </select>
                </div>
              </div>

              <div className="request-details-row">
                <div className="request-field request-shape-field">
                  <label htmlFor="shape">
                    Cake Shape
                  </label>

                  <select
                    id="shape"
                    name="shape"
                    value={formData.shape}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select a shape
                    </option>

                    <option value="round">
                      Round
                    </option>

                    <option value="square">
                      Square
                    </option>

                    <option value="heart">
                      Heart
                    </option>

                    <option value="rectangle">
                      Rectangle
                    </option>

                    <option value="custom">
                      Custom Shape
                    </option>
                  </select>
                </div>

                <div className="request-field request-theme-field">
                  <label htmlFor="designTheme">
                    Design / Theme
                  </label>

                  <input
                    id="designTheme"
                    name="designTheme"
                    type="text"
                    placeholder="e.g. floral, minimalist, vintage, cartoon..."
                    value={formData.designTheme}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="request-details-row">
                <div className="request-field">
                  <label>
                    Color Palette
                    <span> (Optional)</span>
                  </label>

                  <div className="request-color-options">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`request-color ${
                          selectedColors.includes(color)
                            ? "selected"
                            : ""
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select color ${color}`}
                        onClick={() => toggleColor(color)}
                      />
                    ))}

                    <button
                      type="button"
                      className="request-color request-color-add"
                      aria-label="More colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="request-field">
                  <label htmlFor="message">
                    Message on Cake
                    <span> (Optional)</span>
                  </label>

                  <input
                    id="message"
                    name="message"
                    type="text"
                    placeholder="e.g. Happy Birthday, Our Anniversary..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            <section className="request-form-section request-last-section">
              <div className="request-section-title">
                <span>3</span>
                <h2>Additional Information</h2>
              </div>

              <div className="request-field">
                <label htmlFor="notes">
                  Tell Us More
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  rows="5"
                  placeholder="Share any special requests, reference details, or important notes..."
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              <div className="request-field">
                <label htmlFor="deliveryMethod">
                  Pickup / Delivery
                </label>

                <select
                  id="deliveryMethod"
                  name="deliveryMethod"
                  value={formData.deliveryMethod}
                  onChange={handleChange}
                >
                  <option value="">
                    Select an option
                  </option>

                  <option value="pickup">
                    Pickup at Sugar Muse
                  </option>

                  <option value="delivery">
                    Delivery
                  </option>
                </select>
              </div>

              <div className="request-field">
                <label>
                  Reference Images
                  <span> (Optional)</span>
                </label>

                <input
                  ref={fileInputRef}
                  className="request-hidden-file"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  multiple
                  onChange={handleImages}
                />

                <button
                  type="button"
                  className="request-upload-box"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadIcon />

                  <strong>
                    Click to upload images or drag and drop
                  </strong>

                  <span>
                    JPG, PNG or WebP · up to 5 images
                  </span>
                </button>

                {referenceImages.length > 0 && (
                  <div className="request-files">
                    {referenceImages.map((file) => (
                      <span key={`${file.name}-${file.size}`}>
                        {file.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="request-submit-row">
                <button
                  type="submit"
                  className="request-submit-button"
                >
                  Submit Request
                  <ArrowIcon />
                </button>

                <p>
                  We&apos;ll review your request and get back to you within
                  1–2 business days with a personalized quote.
                </p>
              </div>

              {submitted && (
                <div className="request-success">
                  Thank you! Your custom cake request has been submitted.
                </div>
              )}
            </section>
          </form>

          <aside className="custom-request-sidebar">

            <section className="request-sidebar-card request-how-card">
              <h2>
                How It Works
              </h2>

              <div className="request-how-list">

                <div className="request-how-item">
                  <div className="request-how-icon">
                    <PencilIcon />
                  </div>

                  <div>
                    <strong>
                      1. Submit Your Request
                    </strong>

                    <p>
                      Tell us about your idea, occasion and preferences.
                    </p>
                  </div>
                </div>

                <div className="request-how-item">
                  <div className="request-how-icon">
                    <ChatIcon />
                  </div>

                  <div>
                    <strong>
                      2. Get a Quote
                    </strong>

                    <p>
                      We&apos;ll review your request and send a personalized
                      quote.
                    </p>
                  </div>
                </div>

                <div className="request-how-item">
                  <div className="request-how-icon">
                    <CakeIcon />
                  </div>

                  <div>
                    <strong>
                      3. We Bake with Care
                    </strong>

                    <p>
                      Our bakers create your cake fresh and to perfection.
                    </p>
                  </div>
                </div>

                <div className="request-how-item">
                  <div className="request-how-icon">
                    <GiftIcon />
                  </div>

                  <div>
                    <strong>
                      4. Enjoy Your Cake
                    </strong>

                    <p>
                      Pick it up or have it delivered, and celebrate!
                    </p>
                  </div>
                </div>

              </div>
            </section>

            <section className="request-sidebar-card request-know-card">
              <div className="request-sidebar-heading">
                <InfoIcon />

                <h2>
                  A Few Things to Know
                </h2>
              </div>

              <ul>
                <li>
                  Please place your request at least 3–5 days in advance.
                </li>

                <li>
                  Custom cakes are subject to quote based on size, design
                  complexity and ingredients.
                </li>

                <li>
                  Final design and price will be confirmed via email or phone.
                </li>
              </ul>
            </section>

            <section className="request-sidebar-card request-help-card">
              <div className="request-help-icon">
                <HeadsetIcon />
              </div>

              <div className="request-help-copy">
                <h2>
                  Need Help?
                </h2>

                <p>
                  Have a question about your custom cake?
                  We&apos;re happy to help!
                </p>

                <a href="tel:+84123456789">
                  <PhoneIcon />
                  +84 123 456 789
                </a>

                <a href="mailto:hello@sugarmusebakery.com">
                  <MailIcon />
                  hello@sugarmusebakery.com
                </a>
              </div>
            </section>

          </aside>
        </div>
      </section>
    </main>
  );
};

export default CustomCakes;