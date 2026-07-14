const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

// Import your routes
const testimonialRoutes = require("./routes/testimonial.routes");
const indexRoutes = require("./routes/index.routes");
const floatingformRoutes = require("./routes/floatingform.routes");
const contactRoutes = require("./routes/contact.routes");
const submitformRoutes = require("./routes/submitform.routes");
const editorRoutes = require("./routes/editor.routes");
const authorRoutes = require("./routes/author.routes");
const editorialboardRoutes = require("./routes/editorialboard.routes");
const notificationRoutes = require("./routes/notification.routes");
const paymentRoutes = require("./routes/payment.routes");

dotenv.config();
const app = express();

// 1. CORS Configuration: Defined BEFORE any other middleware or routes
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:5177",
  "https://ijpasr.com",
  "https://www.ijpasr.com",
  "https://admin.ijpasr.com",
  "https://author.ijpasr.com",
  "https://editor.ijpasr.com",
  "https://reviewer.ijpasr.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 200, 
  })
);

// 2. Parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 3. Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 4. Routes
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/index", indexRoutes);
app.use("/api/floatingform", floatingformRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/submitform", submitformRoutes);
app.use("/api/editor", editorRoutes);
app.use("/api/author", authorRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/editorialboard", editorialboardRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Backend Server Running Successfully");
});

// 5. Database & Server Start
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});