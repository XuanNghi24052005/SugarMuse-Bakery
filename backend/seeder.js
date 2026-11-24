import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "config", "config.env"),
});

const sugarMuseProducts = [
  // ── CAKES (1-8) ───────────────────────────────────────────────
  {
    name: "Chocolate Ganache Cake",
    price: 35,
    category: "Cake",
    description: "Rich dark Belgian chocolate sponge layered with silky ganache and chocolate curls.",
    ratings: 4.9,
    numReviews: 24,
    image: "/images/products/chocolate-cake.jpg",
    flavor: "Dark Chocolate",
    stock: 20,
    featured: true,
  },
  {
    name: "Strawberry Cream Cake",
    price: 32,
    category: "Cake",
    description: "Light vanilla sponge cake enveloped in fresh Hokkaido whipped cream and hand-picked strawberries.",
    ratings: 4.8,
    numReviews: 18,
    image: "/images/products/strawberry-cake.jpg",
    flavor: "Strawberry Vanilla",
    stock: 25,
    featured: true,
  },
  {
    name: "Classic Tiramisu",
    price: 18,
    category: "Cake",
    description: "Authentic Italian tiramisu with espresso-soaked savoiardi, mascarpone cream and cocoa powder.",
    ratings: 4.8,
    numReviews: 31,
    image: "/images/products/tiramisu.jpg",
    flavor: "Coffee Mascarpone",
    stock: 30,
    featured: true,
  },
  {
    name: "Matcha Cream Cake",
    price: 30,
    category: "Cake",
    description: "Ceremonial grade Uji matcha sponge with delicate white chocolate chantilly cream.",
    ratings: 4.7,
    numReviews: 20,
    image: "/images/products/matcha-cake.jpg",
    flavor: "Uji Matcha",
    stock: 18,
    featured: false,
  },
  {
    name: "Blueberry Vanilla Cake",
    price: 34,
    category: "Cake",
    description: "Soft vanilla bean sponge infused with wild blueberry compote and lavender cream.",
    ratings: 4.9,
    numReviews: 16,
    image: "/images/products/blueberry-vanilla-cake.jpg",
    flavor: "Wild Blueberry",
    stock: 15,
    featured: false,
  },
  {
    name: "Red Velvet Cake",
    price: 33,
    category: "Cake",
    description: "Velvety cocoa buttermilk cake layered with smooth vanilla bean cream cheese frosting.",
    ratings: 4.8,
    numReviews: 21,
    image: "/images/products/red-velvet-cake.jpg",
    flavor: "Red Velvet",
    stock: 20,
    featured: false,
  },
  {
    name: "Lemon Berry Cake",
    price: 31,
    category: "Cake",
    description: "Zesty Meyer lemon curd and mixed summer berries between moist citrus sponge layers.",
    ratings: 4.7,
    numReviews: 14,
    image: "/images/products/lemon-berry-cake.jpg",
    flavor: "Lemon & Mixed Berry",
    stock: 16,
    featured: false,
  },
  {
    name: "Caramel Lotus Cake",
    price: 36,
    category: "Cake",
    description: "Caramelized Biscoff spread infused layers with crushed Lotus cookies and salted caramel drip.",
    ratings: 4.9,
    numReviews: 19,
    image: "/images/products/caramel-lotus-cake.jpg",
    flavor: "Caramel Lotus Biscoff",
    stock: 15,
    featured: true,
  },

  // ── PASTRIES (9-16) ───────────────────────────────────────────
  {
    name: "Butter Croissant",
    price: 4.5,
    category: "Pastry",
    description: "Golden flaky croissant laminated with 100% French AOP butter, crispy outside and honeycomb airy inside.",
    ratings: 4.8,
    numReviews: 27,
    image: "/images/products/croissant.jpg",
    flavor: "French Butter",
    stock: 50,
    featured: true,
  },
  {
    name: "Cinnamon Swirl",
    price: 5.5,
    category: "Pastry",
    description: "Tender brioche swirled with Ceylon cinnamon sugar and topped with vanilla glaze.",
    ratings: 4.7,
    numReviews: 17,
    image: "/images/products/cinnamon-roll.jpg",
    flavor: "Ceylon Cinnamon",
    stock: 35,
    featured: false,
  },
  {
    name: "Almond Danish",
    price: 5.8,
    category: "Pastry",
    description: "Flaky Danish pastry filled with rich almond frangipane cream and topped with toasted almond flakes.",
    ratings: 4.8,
    numReviews: 13,
    image: "/images/products/almond-danish.jpg",
    flavor: "Almond Frangipane",
    stock: 30,
    featured: false,
  },
  {
    name: "Fresh Fruit Tart",
    price: 8,
    category: "Pastry",
    description: "Crisp sweet pastry shell filled with Tahitian vanilla pastry cream and topped with seasonal berries.",
    ratings: 4.9,
    numReviews: 25,
    image: "/images/products/fruit-tart.jpg",
    flavor: "Vanilla & Fresh Fruit",
    stock: 25,
    featured: true,
  },
  {
    name: "Vanilla Cupcake",
    price: 4,
    category: "Pastry",
    description: "Moist Madagascan vanilla cupcake with whipped buttercream swirl and edible pearl sprinkles.",
    ratings: 4.7,
    numReviews: 12,
    image: "/images/products/cupcake.jpg",
    flavor: "Madagascar Vanilla",
    stock: 40,
    featured: false,
  },
  {
    name: "Chocolate Danish",
    price: 5.9,
    category: "Pastry",
    description: "Crispy laminated layers folded around rich Belgian chocolate ganache filling.",
    ratings: 4.8,
    numReviews: 15,
    image: "/images/products/chocolate-danish.jpg",
    flavor: "Dark Chocolate",
    stock: 30,
    featured: false,
  },
  {
    name: "Cream Puff",
    price: 4.8,
    category: "Pastry",
    description: "Light choux pastry with a crunchy craquelin crust, bursting with diplomat vanilla bean cream.",
    ratings: 4.6,
    numReviews: 11,
    image: "/images/products/cream-puff.jpg",
    flavor: "Vanilla Custard",
    stock: 35,
    featured: false,
  },
  {
    name: "Strawberry Danish",
    price: 6.2,
    category: "Pastry",
    description: "Buttery layered pastry filled with vanilla custard and glazed ripe strawberries.",
    ratings: 4.8,
    numReviews: 18,
    image: "/images/products/strawberry-danish.jpg",
    flavor: "Strawberry Custard",
    stock: 28,
    featured: true,
  },

  // ── SAVORY (17-24) ────────────────────────────────────────────
  {
    name: "Chicken Mushroom Pie",
    price: 7.5,
    category: "Savory",
    description: "Slow-cooked tender chicken breast and portobello mushrooms in a creamy thyme white sauce.",
    ratings: 4.8,
    numReviews: 20,
    image: "/images/products/chicken-mushroom-pie.jpg",
    flavor: "Chicken & Mushroom",
    stock: 25,
    featured: true,
  },
  {
    name: "Spinach Mushroom Quiche",
    price: 8.5,
    category: "Savory",
    description: "French savory tart filled with sauteed baby spinach, wild mushrooms, gruyere cheese and egg custard.",
    ratings: 4.9,
    numReviews: 18,
    image: "/images/products/spinach-quiche.jpg",
    flavor: "Spinach & Gruyere",
    stock: 20,
    featured: false,
  },
  {
    name: "Ham & Cheese Croissant",
    price: 6.5,
    category: "Savory",
    description: "Flaky butter croissant stuffed with smoked country ham and melted emmental cheese with bechamel.",
    ratings: 4.7,
    numReviews: 14,
    image: "/images/products/ham-cheese-croissant.jpg",
    flavor: "Smoked Ham & Emmental",
    stock: 35,
    featured: true,
  },
  {
    name: "Classic Sausage Roll",
    price: 6,
    category: "Savory",
    description: "Seasoned pork mince wrapped in crisp puff pastry with a hint of sage, apple and black pepper.",
    ratings: 4.6,
    numReviews: 12,
    image: "/images/products/classic-sausage-roll.jpg",
    flavor: "Pork & Herb",
    stock: 30,
    featured: false,
  },
  {
    name: "Mini Savory Tart",
    price: 7,
    category: "Savory",
    description: "Assorted bite-sized quiches with caramelized onion, goat cheese, and sundried tomato.",
    ratings: 4.7,
    numReviews: 15,
    image: "/images/products/mini-savory-tart.jpg",
    flavor: "Caramelized Onion & Goat Cheese",
    stock: 25,
    featured: false,
  },
  {
    name: "Chicken Puff Pastry",
    price: 6.8,
    category: "Savory",
    description: "Golden puff parcel filled with mild curry-spiced chicken, sweet onions and green peas.",
    ratings: 4.8,
    numReviews: 16,
    image: "/images/products/chicken-puff-pastry.jpg",
    flavor: "Curry Spiced Chicken",
    stock: 28,
    featured: false,
  },
  {
    name: "Cheese Garlic Roll",
    price: 5.5,
    category: "Savory",
    description: "Soft brioche roll filled with sweet cream cheese and drenched in roasted garlic herb butter.",
    ratings: 4.6,
    numReviews: 10,
    image: "/images/products/cheese-garlic-roll.jpg",
    flavor: "Garlic Butter Cream Cheese",
    stock: 30,
    featured: false,
  },
  {
    name: "Bacon Egg Tart",
    price: 7.8,
    category: "Savory",
    description: "Flaky puff pastry base topped with smoked bacon, fresh cage-free eggs and cheddar cheese.",
    ratings: 4.8,
    numReviews: 13,
    image: "/images/products/bacon-egg-tart.jpg",
    flavor: "Bacon & Cheddar",
    stock: 22,
    featured: false,
  },

  // ── GIFT BOXES (25-32) ────────────────────────────────────────
  {
    name: "Macaron Gift Box",
    price: 24,
    category: "Gift Box",
    description: "Luxury box of 12 artisan French macarons in assorted flavors: pistachio, salted caramel, rose, chocolate, vanilla and raspberry.",
    ratings: 4.9,
    numReviews: 21,
    image: "/images/products/macaron-box.jpg",
    flavor: "Assorted 12 Flavors",
    stock: 20,
    featured: true,
  },
  {
    name: "Cookie Gift Box",
    price: 20,
    category: "Gift Box",
    description: "Handcrafted butter cookies and sablés assortment including matcha sablé, chocolate diamond and earl grey shortbread.",
    ratings: 4.8,
    numReviews: 17,
    image: "/images/products/cookies.jpg",
    flavor: "Butter Sablé & Chocolate",
    stock: 25,
    featured: false,
  },
  {
    name: "Afternoon Tea Box",
    price: 28,
    category: "Gift Box",
    description: "A delightful tea-time set with mini scones, fruit tarts, macarons, clotted cream and strawberry jam.",
    ratings: 4.9,
    numReviews: 19,
    image: "/images/products/afternoon-tea-box.jpg",
    flavor: "Tea Time Assortment",
    stock: 18,
    featured: true,
  },
  {
    name: "Birthday Treat Box",
    price: 30,
    category: "Gift Box",
    description: "Celebration box featuring 2 mini bento cakes, 4 decorated cupcakes, candles and a custom greeting card.",
    ratings: 4.8,
    numReviews: 23,
    image: "/images/products/birthday-treat-box.jpg",
    flavor: "Celebration Set",
    stock: 15,
    featured: true,
  },
  {
    name: "Mixed Pastry Box",
    price: 26,
    category: "Gift Box",
    description: "Morning baker's box featuring 6 of our best fresh pastries: croissants, pain au chocolat, cinnamon rolls and danishes.",
    ratings: 4.7,
    numReviews: 16,
    image: "/images/products/mixed-pastry-box.jpg",
    flavor: "Pastry Selection",
    stock: 20,
    featured: false,
  },
  {
    name: "Mini Cake Gift Box",
    price: 32,
    category: "Gift Box",
    description: "4 distinct miniature layer cakes: Chocolate Truffle, Strawberry Shortcake, Earl Grey Lavender and Mango Coconut.",
    ratings: 4.9,
    numReviews: 20,
    image: "/images/products/mini-cake-gift-box.jpg",
    flavor: "4 Mini Flavors",
    stock: 16,
    featured: true,
  },
  {
    name: "Sweet Celebration Box",
    price: 35,
    category: "Gift Box",
    description: "Grand assortment of artisanal chocolates, macarons, cake pops and meringue kisses in our signature Sugar Muse gift packaging.",
    ratings: 4.9,
    numReviews: 25,
    image: "/images/products/sweet-celebration-box.jpg",
    flavor: "Deluxe Assortment",
    stock: 15,
    featured: true,
  },
  {
    name: "Sugar Muse Signature Box",
    price: 38,
    category: "Gift Box",
    description: "Our crowning collection: the ultimate curation of Sugar Muse's most beloved artisan creations tied with a silk ribbon.",
    ratings: 5.0,
    numReviews: 29,
    image: "/images/products/sugar-muse-signature-box.jpg",
    flavor: "Chef's Signature Selection",
    stock: 12,
    featured: true,
  },
];

export async function seedProducts() {
  const mongoUrl =
    process.env.DB_URL ||
    process.env.DB_URI ||
    process.env.MONGO_URI ||
    process.env.MONGODB_URI;

  if (!mongoUrl || mongoUrl.includes("<username>") || mongoUrl.includes("YOUR-CLUSTER")) {
    console.error("❌ ERROR: DB_URL in backend/config/config.env is invalid or contains placeholders.");
    console.error(`Current DB_URL: ${mongoUrl}`);
    console.error("Please update DB_URL with your valid MongoDB connection string and rerun.");
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB successfully!");

    // 1. Find or create an Admin user to associate products with
    let admin = await User.findOne({ role: "admin" });
    if (!admin) {
      console.log("No admin found. Creating default Sugar Muse Admin user...");
      admin = await User.create({
        name: "Sugar Muse Admin",
        email: "admin@sugarmuse.vn",
        password: "SugarMuseAdmin@2026",
        role: "admin",
        avatar: {
          public_id: "sugar_muse_admin_avatar",
          url: "/images/sugar-muse-favicon.svg",
        },
        isVerified: true,
      });
      console.log(`Created admin: ${admin.email}`);
    } else {
      console.log(`Using existing admin: ${admin.email}`);
    }

    // 2. Clear old products
    console.log("Clearing existing products in database...");
    await Product.deleteMany({});

    // 3. Prepare formatted product documents
    const formattedProducts = sugarMuseProducts.map((p) => {
      const filename = p.image.split("/").pop().replace(/\.[^/.]+$/, "");
      return {
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        flavor: p.flavor || "",
        stock: p.stock || 20,
        ratings: p.ratings || 5,
        numReviews: p.numReviews || 0,
        featured: !!p.featured,
        image: [
          {
            public_id: `sugarmuse_${filename}`,
            url: p.image,
          },
        ],
        user: admin._id,
      };
    });

    // 4. Insert all Sugar Muse products
    console.log(`Inserting ${formattedProducts.length} Sugar Muse products...`);
    const inserted = await Product.insertMany(formattedProducts);
    console.log(`Successfully saved ${inserted.length} Sugar Muse products to MongoDB!`);

    await mongoose.disconnect();
    console.log("Database connection closed. Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed with error:", error);
    process.exit(1);
  }
}

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].endsWith("seeder.js")) {
  seedProducts();
}
