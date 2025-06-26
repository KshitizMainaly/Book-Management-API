const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middlewares/auth");
const rolesMiddleware = require("../middlewares/roles");

// Public routes
router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBook);

// Protected routes (require authentication)
router.use(authMiddleware.protect);

// Admin-only routes
router.use(rolesMiddleware.authorize("admin"));

router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("author", "Author is required").not().isEmpty(),
    check("genre", "Genre is required").not().isEmpty(),
    check("publishedDate", "Published date is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  bookController.createBook
);

router.put(
  "/:id",
  [
    check("title", "Title is required").not().isEmpty(),
    check("author", "Author is required").not().isEmpty(),
    check("genre", "Genre is required").not().isEmpty(),
    check("publishedDate", "Published date is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  bookController.updateBook
);

router.delete("/:id", bookController.deleteBook);

module.exports = router;
