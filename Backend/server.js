const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const testimonialRoutes = require("./routes/testimonial.routes");
const indexRoutes = require("./routes/index.routes");
const floatingformRoutes=require("./routes/floatingform.routes");
const contactRoutes = require("./routes/contact.routes");
const path = require("path");

dotenv.config();

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({
  limit: "50mb",
  extended: true
}));

// Static Uploads
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Routes
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/index", indexRoutes);
app.use("/api/floatingform", floatingformRoutes);
app.use("/api/contacts", contactRoutes);
app.get("/", (req, res) => {
  res.send("Backend Server Running Successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});