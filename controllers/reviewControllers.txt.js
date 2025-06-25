const ErrorResponse = require('../utils/errorResponse');
const Review = require('../models/Review');
const Book = require('../models/Book');
const { validationResult } = require('express-validator');

// @desc    Get reviews for a book
// @route   GET /api/v1/books/:bookId/reviews
// @access  Public
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).populate({
      path: 'user',
      select: 'name'
    });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add review
// @route   POST /api/v1/books/:bookId/reviews
// @access  Private
exports.addReview = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse(errors.array()[0].msg, 400));
  }

  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return next(
        new ErrorResponse(`No book with the id of ${req.params.bookId}`, 404)
      );
    }

    // Check if user already submitted a review for this book
    const existingReview = await Review.findOne({
      book: req.params.bookId,
      user: req.user.id
    });

    if (existingReview) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} has already reviewed this book`,
          400
        )
      );
    }

    const review = await Review.create({
      ...req.body,
      book: req.params.bookId,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update review
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

    // Make sure review belongs to user or user is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this review`,
          401
        )
      );
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete review
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

    // Make sure review belongs to user or user is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
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
      data: {}
    });
  } catch (err) {
    next(err);
  }
};