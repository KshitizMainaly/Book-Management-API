const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/connect.db");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors({
  origin: [
    'https://book-management-api-tau.vercel.app',               // main prod frontend
    'https://book-management-api-git-main-kshitizmainalys-projects.vercel.app', // preview/main branch
    'https://book-management-r4x68b03k-kshitizmainalys-projects.vercel.app',    // another preview
    'http://localhost:3000' // for local dev
  ],
  credentials: true,
}));

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes - Specific routes first
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/reviews", require("./routes/reviewRoutes")); // Mount at root level
app.use("/api/v1/books", require("./routes/bookRoutes"));
// Error handling middleware
app.use(require("./middlewares/error"));

app.get('/', (req, res) => {
  res.send('✅ Book Management API is running. Visit the frontend!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
