import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import OrderDetail from "./models/orderDetailModel.js";
import Coupon from "./models/couponModel.js";
import Address from "./models/addressModel.js";
import Contact from "./models/contactModel.js";
import Notification from "./models/notificationModel.js";
import Wishlist from "./models/wishListModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

async function seedAllRemainingData() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected successfully to SugarMuse database!\n");

    // Fetch existing users & products
    const users = await User.find({ role: "user" });
    const products = await Product.find({});

    if (users.length === 0 || products.length === 0) {
      console.error("Missing users or products! Please ensure users and products exist first.");
      process.exit(1);
    }

    console.log(`Found ${users.length} users and ${products.length} products to link data.\n`);

    // ──────────────────────────────────────────────────────────
    // 1. COUPONS / VOUCHERS
    // ──────────────────────────────────────────────────────────
    console.log("Seeding Coupons (Vouchers)...");
    await Coupon.deleteMany({});
    const couponsData = [
      {
        code: "SUGARMUSE10",
        discount: 10,
        discountType: "percent",
        minAmount: 30,
        expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
      {
        code: "SWEET20",
        discount: 20,
        discountType: "percent",
        minAmount: 50,
        expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
      {
        code: "FREESHIP",
        discount: 0,
        discountType: "freeship",
        minAmount: 25,
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
      {
        code: "WELCOME15",
        discount: 15,
        discountType: "percent",
        minAmount: 20,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
      {
        code: "SAVE5OFF",
        discount: 5,
        discountType: "fixed",
        minAmount: 40,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
      {
        code: "VIP50",
        discount: 50,
        discountType: "fixed",
        minAmount: 150,
        expiresAt: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    ];
    const createdCoupons = await Coupon.insertMany(couponsData);
    console.log(`-> Added ${createdCoupons.length} Coupons.`);

    // ──────────────────────────────────────────────────────────
    // 2. ADDRESSES
    // ──────────────────────────────────────────────────────────
    console.log("Seeding Addresses...");
    await Address.deleteMany({});
    const addressesData = [
      {
        user: users[0]._id,
        fullName: users[0].name,
        phoneNumber: "0901234567",
        addressLine: "124 Pasteur Street, District 1",
        city: "Ho Chi Minh City",
        state: "District 1",
        postalCode: "700000",
        country: "Vietnam",
        isDefault: true,
      },
      {
        user: users[0]._id,
        fullName: users[0].name,
        phoneNumber: "0901234567",
        addressLine: "45 Le Loi Boulevard",
        city: "Ho Chi Minh City",
        state: "District 1",
        postalCode: "700000",
        country: "Vietnam",
        isDefault: false,
      },
      {
        user: users[1]._id,
        fullName: users[1].name,
        phoneNumber: "0912345678",
        addressLine: "18 Trang Tien Street, Hoan Kiem",
        city: "Hanoi",
        state: "Hoan Kiem",
        postalCode: "100000",
        country: "Vietnam",
        isDefault: true,
      },
      {
        user: users[2]._id,
        fullName: users[2].name,
        phoneNumber: "0923456789",
        addressLine: "88 Tran Phu Street, Hai Chau",
        city: "Da Nang",
        state: "Hai Chau",
        postalCode: "550000",
        country: "Vietnam",
        isDefault: true,
      },
      {
        user: users[3]._id,
        fullName: users[3].name,
        phoneNumber: "0934567890",
        addressLine: "72 Nguyen Hue Walking Street",
        city: "Ho Chi Minh City",
        state: "District 1",
        postalCode: "700000",
        country: "Vietnam",
        isDefault: true,
      },
      {
        user: users[4]._id,
        fullName: users[4].name,
        phoneNumber: "0945678901",
        addressLine: "205 Thao Dien Road, Thu Duc City",
        city: "Ho Chi Minh City",
        state: "District 2",
        postalCode: "710000",
        country: "Vietnam",
        isDefault: true,
      },
    ];
    const createdAddresses = await Address.insertMany(addressesData);
    console.log(`-> Added ${createdAddresses.length} Addresses.`);

    // ──────────────────────────────────────────────────────────
    // 3. ORDERS & ORDER DETAILS
    // ──────────────────────────────────────────────────────────
    console.log("Seeding Orders & Order Details...");
    await Order.deleteMany({});
    await OrderDetail.deleteMany({});

    const orderStatuses = ["Delivered", "Shipped", "Processing", "Delivered", "Delivered", "Processing", "Shipped", "Delivered"];
    const createdOrdersCount = 8;
    let detailCount = 0;

    for (let i = 0; i < createdOrdersCount; i++) {
      const user = users[i % users.length];
      const status = orderStatuses[i % orderStatuses.length];

      // Pick 1-3 products for this order
      const prod1 = products[i % products.length];
      const prod2 = products[(i + 3) % products.length];
      const qty1 = (i % 2) + 1;
      const qty2 = 1;

      const itemPrice = prod1.price * qty1 + prod2.price * qty2;
      const taxPrice = Number((itemPrice * 0.08).toFixed(2));
      const shippingPrice = itemPrice > 50 ? 0 : 5;
      const totalPrice = Number((itemPrice + taxPrice + shippingPrice).toFixed(2));

      const isDelivered = status === "Delivered";
      const createdAt = new Date(Date.now() - (createdOrdersCount - i) * 36 * 60 * 60 * 1000);

      const order = await Order.create({
        user: user._id,
        shippingInfo: {
          address: `${100 + i * 15} Flower Street, Ward ${i + 1}`,
          city: i % 2 === 0 ? "Ho Chi Minh City" : "Hanoi",
          state: i % 2 === 0 ? "District 1" : "Hoan Kiem",
          country: "Vietnam",
          pinCode: 70000,
          phoneNumber: 901234560 + i,
        },
        orderStatus: status,
        paymentInfo: {
          id: `pi_stripe_sugarmuse_${Date.now()}_${i}`,
          status: "Succeeded",
        },
        paidAt: createdAt,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        deliveredAt: isDelivered ? new Date(createdAt.getTime() + 24 * 60 * 60 * 1000) : null,
        createdAt,
      });

      // Insert Order Details
      await OrderDetail.create({
        order: order._id,
        product: prod1._id,
        name: prod1.name,
        price: prod1.price,
        quantity: qty1,
        image: Array.isArray(prod1.image) && prod1.image.length > 0 ? prod1.image[0].url : "/images/products/strawberry-cake.jpg",
        stock: prod1.stock || 20,
      });
      detailCount++;

      await OrderDetail.create({
        order: order._id,
        product: prod2._id,
        name: prod2.name,
        price: prod2.price,
        quantity: qty2,
        image: Array.isArray(prod2.image) && prod2.image.length > 0 ? prod2.image[0].url : "/images/products/croissant.jpg",
        stock: prod2.stock || 20,
      });
      detailCount++;
    }
    console.log(`-> Added ${createdOrdersCount} Orders and ${detailCount} OrderDetails.`);

    // ──────────────────────────────────────────────────────────
    // 4. CONTACTS / MESSAGES
    // ──────────────────────────────────────────────────────────
    console.log("Seeding Customer Contact Messages...");
    await Contact.deleteMany({});
    const contactsData = [
      {
        name: "Alex",
        email: "user1@gmail.com",
        subject: "Custom Birthday Cake Consultation",
        message: "Hi Sugar Muse! I would like to order a 2-tier strawberry floral cake for my sister's 25th birthday next Saturday. Do you provide custom message piping?",
        status: "Read",
      },
      {
        name: "Emma",
        email: "user5@gmail.com",
        subject: "Allergen Information for Macarons",
        message: "Hello, are your French Macarons prepared in an area completely free of peanut traces? Thanks!",
        status: "Responded",
      },
      {
        name: "David",
        email: "user4@gmail.com",
        subject: "Corporate Bulk Gift Boxes",
        message: "We need 30 Sugar Muse Signature Boxes for our end-of-quarter team celebration in District 1. Can we schedule delivery for 9 AM?",
        status: "Pending",
      },
      {
        name: "Jack",
        email: "user6@gmail.com",
        subject: "Wedding Tasting Appointment",
        message: "Would love to book a weekend afternoon cake tasting for our upcoming autumn wedding reception.",
        status: "Pending",
      },
    ];
    const createdContacts = await Contact.insertMany(contactsData);
    console.log(`-> Added ${createdContacts.length} Contact inquiries.`);

    // ──────────────────────────────────────────────────────────
    // 5. NOTIFICATIONS
    // ──────────────────────────────────────────────────────────
    console.log("Seeding Notifications...");
    await Notification.deleteMany({});
    const notificationsData = [
      {
        user: users[0]._id,
        title: "Order Confirmed!",
        message: "Your order for Chocolate Ganache Cake has been confirmed and is being freshly prepared in our bakery kitchen.",
        type: "order",
        isRead: false,
        link: "/account",
      },
      {
        user: users[0]._id,
        title: "Weekend Promotion 15% OFF",
        message: "Use code WELCOME15 on checkout for 15% off all artisan pastries this weekend!",
        type: "promotion",
        isRead: true,
        link: "/products",
      },
      {
        user: users[1]._id,
        title: "Welcome to Sugar Muse Bakery",
        message: "Thank you for creating an account! Enjoy handcrafted cakes made with Hokkaido cream and premium ingredients.",
        type: "system",
        isRead: true,
        link: "/",
      },
      {
        user: users[2]._id,
        title: "Order Delivered Successfully",
        message: "Your Sweet Celebration Box has been delivered. We hope every bite brings you joy!",
        type: "order",
        isRead: false,
        link: "/account",
      },
    ];
    const createdNotifications = await Notification.insertMany(notificationsData);
    console.log(`-> Added ${createdNotifications.length} Notifications.`);

    // ──────────────────────────────────────────────────────────
    // 6. WISHLISTS
    // ──────────────────────────────────────────────────────────
    console.log("Seeding Wishlists...");
    await Wishlist.deleteMany({});
    const wishlistsData = [
      {
        user: users[0]._id,
        products: [
          { product: products[0]._id },
          { product: products[1]._id },
          { product: products[5]._id },
        ],
      },
      {
        user: users[1]._id,
        products: [
          { product: products[2]._id },
          { product: products[8]._id },
        ],
      },
      {
        user: users[2]._id,
        products: [
          { product: products[3]._id },
          { product: products[10]._id },
        ],
      },
    ];
    const createdWishlists = await Wishlist.insertMany(wishlistsData);
    console.log(`-> Added ${createdWishlists.length} Wishlists.`);

    // ──────────────────────────────────────────────────────────
    // 7. PRODUCT REVIEWS
    // ──────────────────────────────────────────────────────────
    console.log("Adding Customer Reviews to Products...");
    const sampleReviews = [
      {
        user: users[0]._id,
        name: "Alex",
        rating: 5,
        comment: "Absolutely breathtaking! The Hokkaido cream is so airy and not too sweet. Everyone at our party raved about it.",
      },
      {
        user: users[1]._id,
        name: "Bob",
        rating: 5,
        comment: "Rich Belgian chocolate flavor with immaculate balance. Best chocolate cake in town!",
      },
      {
        user: users[4]._id,
        name: "Emma",
        rating: 5,
        comment: "Flaky, buttery, and heavenly aroma. Arrived warm and fresh!",
      },
    ];

    // Add review to the first 3 products
    for (let j = 0; j < 3 && j < products.length; j++) {
      const p = products[j];
      p.reviews = [sampleReviews[j]];
      p.numReviews = 1;
      p.ratings = 5;
      await p.save();
    }
    console.log("-> Attached genuine reviews to featured products.");

    console.log("\n=======================================================");
    console.log("✅ ALL DATABASE COLLECTIONS SUCCESSFULLY POPULATED!");
    console.log("=======================================================");

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seeding remaining data failed:", err);
    process.exit(1);
  }
}

seedAllRemainingData();
