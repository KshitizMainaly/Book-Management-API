const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/auth");

// Public routes
router.get("/books/:bookId/reviews", reviewController.getReviews);

// Protected routes (require authentication)
router.use(authMiddleware.protect);

router.post(
  "/books/:bookId/reviews",
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