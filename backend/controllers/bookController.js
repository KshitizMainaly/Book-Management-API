const ErrorResponse = require("../utils/errorResponse");
const Book = require("../models/Book");
const APIFeatures = require("../utils/apiFeatures");
const { validationResult } = require("express-validator");

// @desc    Get all books
// @route   GET /api/v1/books
// @access  Public
exports.getBooks = async (req, res, next) => {
  try {
    const features = new APIFeatures(Book.find(), req.query)
      .search()
      .filter()
      .sort()
      .paginate();

    const books = await features.query.populate({
      path: "user",
      select: "name email",
    });

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single book
// @route   GET /api/v1/books/:id
// @access  Public
exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate({
      path: "user",
      select: "name email",
    });

    if (!book) {
      return next(
        new ErrorResponse(`Book not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new book
// @route   POST /api/v1/books
// @access  Private/Admin
exports.createBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse(errors.array()[0].msg, 400));
  }

  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update book
// @route   PUT /api/v1/books/:id
// @access  Private/Admin
exports.updateBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse(errors.array()[0].msg, 400));
  }

  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return next(
        new ErrorResponse(`Book not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is book owner or admin
    if (book.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this book`,
          401
        )
      );
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete book
// @route   DELETE /api/v1/books/:id
// @access  Private/Admin
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return next(
        new ErrorResponse(`Book not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is book owner or admin
    if (book.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this book`,
          401
        )
      );
    }

    await book.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
