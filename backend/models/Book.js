const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    author: {
      type: String,
      required: [true, "Please add an author"],
      trim: true,
      maxlength: [50, "Author name cannot be more than 50 characters"],
    },
    genre: {
      type: String,
      required: [true, "Please add a genre"],
      enum: [
        "Fiction",
        "Non-Fiction",
        "Science Fiction",
        "Fantasy",
        "Mystery",
        "Thriller",
        "Romance",
        "Biography",
        "History",
        "Self-Help",
        "Poetry",
        "Drama",
        "Horror",
        "Other",
      ],
    },
    publishedDate: {
      type: Date,
      required: [true, "Please add a published date"],
    },
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
      default: 3,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    coverImage: {
      type: String,
      default: "no-image.jpg",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// ✅ Virtual populate for reviews
BookSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "book",
  justOne: false,
});

// Create text index for search
BookSchema.index({ title: "text", author: "text" }, { unique: true });

module.exports = mongoose.model("Book", BookSchema);
