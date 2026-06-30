const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

const testimonialRoutes = require("./routes/testimonial.routes");
const indexRoutes = require("./routes/index.routes");
const floatingformRoutes = require("./routes/floatingform.routes");
const contactRoutes = require("./routes/contact.routes");
const submitformRoutes = require("./routes/submitform.routes");
const editorRoutes = require("./routes/editor.routes");
const authorRoutes = require("./routes/author.routes");

const editorialboardRoutes = require("./routes/editorialboard.routes");

dotenv.config();

const app = express();

// Database Connection
connectDB();
      app.use(
        cors({
          origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
            "http://localhost:5176",
            "http://localhost:5177",
          ],
          credentials: true,
        })
      );
      
      app.use(express.json({ limit: "50mb" }));
      
      app.use(
        express.urlencoded({
    limit: "50mb",
    extended: true,
  }),
);

// Static Uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/index", indexRoutes);
app.use("/api/floatingform", floatingformRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/submitform", submitformRoutes);
app.use("/api/editor", editorRoutes);
app.use("/api/author", authorRoutes);

app.use("/api/editorialboard", editorialboardRoutes);

app.get("/", (req, res) => {
  res.send("Backend Server Running Successfully");
});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
