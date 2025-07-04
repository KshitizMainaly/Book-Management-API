const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/auth");

// Public route: Get all reviews for a book
router.get("/:bookId", reviewController.getReviews);

// ✅ NEW: Protected route to get user’s own reviews
router.get("/me", authMiddleware.protect, reviewController.getMyReviews);

// Protected routes: create, update, delete
router.use(authMiddleware.protect);

router.post(
  "/:bookId",
  [
    check("title", "Please add a title for the review").not().isEmpty().trim(),
    check("text", "Please add some text").not().isEmpty().trim(),
    check("rating", "Please add a rating between 1 and 5").isInt({
      min: 1,
      max: 5,
    }),
  ],
  reviewController.addReview
);

router.put(
  "/:id",
  [
    check("title", "Please add a title for the review").not().isEmpty().trim(),
    check("text", "Please add some text").not().isEmpty().trim(),
    check("rating", "Please add a rating between 1 and 5").isInt({
      min: 1,
      max: 5,
    }),
  ],
  reviewController.updateReview
);

router.delete("/:id", reviewController.deleteReview);

module.exports = router;
