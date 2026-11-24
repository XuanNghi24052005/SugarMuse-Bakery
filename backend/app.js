import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoute from "./routes/paymentRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import wishlistRoute from "./routes/wishlistRoute.js";
import addressRoute from "./routes/addressRoute.js";
import notificationRoute from "./routes/notificationRoute.js";
import contactRoute from "./routes/contactRoute.js";
import errorHandlerMiddleware from "./middleware/error.js";
import { stripeWebhook } from "./controller/webhookController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "config", "config.env"),
});

const mongoUrl =
  process.env.DB_URL ||
  process.env.DB_URI ||
  process.env.MONGO_URI ||
  process.env.MONGODB_URI;

if (!mongoUrl) {
  throw new Error(
    "MongoDB connection URL is missing. Please check backend/config/config.env."
  );
}

if (!process.env.SESSION_SECRET) {
  throw new Error(
    "SESSION_SECRET is missing in backend/config/config.env."
  );
}

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.post(
  "/api/v1/payment/webhook",
  express.raw({
    type: "application/json",
  }),
  stripeWebhook
);

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use(cookieParser());

app.use(
  fileUpload({
    limits: {
      fileSize: 50 * 1024 * 1024,
      fieldSize: 50 * 1024 * 1024,
    },
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl,
      ttl: 14 * 24 * 60 * 60,
    }),

    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    },
  })
);

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", cartRoutes);
app.use("/api/v1", paymentRoute);
app.use("/api/v1", couponRoutes);
app.use("/api/v1", wishlistRoute);
app.use("/api/v1", addressRoute);
app.use("/api/v1", notificationRoute);
app.use("/api/v1", contactRoute);

app.use(
  express.static(
    path.join(__dirname, "../frontend/dist")
  )
);

app.all("/*splat", (req, res) => {
  res.status(404).send("Not Found");
});

app.use(errorHandlerMiddleware);

export default app;