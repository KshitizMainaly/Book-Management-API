const ErrorResponse = require("../utils/errorResponse");
const Review = require("../models/Review");
const Book = require("../models/Book");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

// Helper for logging
const handleControllerError = (err, context) => {
  console.error(`Error in ${context}:`, err);
  return new ErrorResponse(err.message, err.statusCode || 500);
};

// @desc    Get all reviews for a book
// @route   GET /api/v1/reviews/:bookId
// @access  Public
exports.getReviews = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.bookId)) {
      return next(new ErrorResponse("Invalid book ID format", 400));
    }

    const reviews = await Review.find({ book: req.params.bookId })
      .populate("user", "name email")
      .lean();

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    next(handleControllerError(err, "getReviews"));
  }
};

// @desc    Add a review to a book
// @route   POST /api/v1/reviews/:bookId
// @access  Private
exports.addReview = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse(errors.array()[0].msg, 400));
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.bookId)) {
      return next(new ErrorResponse("Invalid book ID format", 400));
    }

    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return next(
        new ErrorResponse(`Book not found with id ${req.params.bookId}`, 404)
      );
    }

    const existingReview = await Review.findOne({
      book: req.params.bookId,
      user: req.user._id,
    });

    if (existingReview) {
      return next(
        new ErrorResponse("You have already reviewed this book", 400)
      );
    }

    const review = await Review.create({
      title: req.body.title,
      text: req.body.text,
      rating: req.body.rating,
      book: req.params.bookId,
      user: req.user._id,
    });

    await review.populate("user", "name email");

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(
        new ErrorResponse(
          Object.values(err.errors)
            .map((e) => e.message)
            .join(", "),
          400
        )
      );
    }
    next(handleControllerError(err, "addReview"));
  }
};

// @desc    Update a review
// @route   PUT /api/v1/reviews/:id
// @access  Private
exports.updateReview = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse(errors.array()[0].msg, 400));
  }

  try {
    let review = await Review.findById(req.params.id);
    if (!review) {
      return next(
        new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
      );
    }

    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this review`,
          401
        )
      );
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (err) {
    next(handleControllerError(err, "updateReview"));
  }
};

// @desc    Delete a review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(
        new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
      );
    }

    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this review`,
          401
        )
      );
    }

    await review.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(handleControllerError(err, "deleteReview"));
  }
};

// ✅ NEW: Get reviews of the current logged-in user
// @route   GET /api/v1/reviews/me
// @access  Private
exports.getMyReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .populate("book", "title")
      .lean();

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    next(handleControllerError(err, "getMyReviews"));
  }
};
