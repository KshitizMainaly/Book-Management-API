
# 📚 Book Management API

A robust and secure RESTful API for managing books and user reviews, built with **Node.js**, **Express.js**, and **MongoDB**. Designed with clean architecture, JWT-based authentication, and role-based access control.

## 🚀 Features

- ✅ **Admin-only Book CRUD**: Create, read, update, and delete books.
- 🧾 **User Reviews**: Authenticated users can add, edit, and delete reviews.
- 🔐 **Authentication & Authorization**: JWT-based login system with role-based access.
- 🔎 **Advanced Filtering**: Search books by title, author, genre, or rating.
- 📊 **Pagination & Sorting**: Efficient navigation for large datasets.
- ⚠️ **Validation & Error Handling**: Centralized and consistent response handling.

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Tools**: Postman, VS Code, dotenv, ESLint

## 📁 Folder Structure

```
book-management-api/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── config/
├── app.js
└── .env
```

## 🧪 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/KshitizMainaly/book-management-api.git
cd book-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the server

```bash
npm run dev
```

API will be running at `http://localhost:5000`

## 🧪 API Endpoints (Examples)

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| POST   | /api/auth/register        | Register new user               |
| POST   | /api/auth/login           | Login and get JWT               |
| GET    | /api/books                | Get all books                   |
| GET    | /api/books/:id            | Get a single book               |
| POST   | /api/books                | Create a new book (admin only)  |
| PUT    | /api/books/:id            | Update a book (admin only)      |
| DELETE | /api/books/:id            | Delete a book (admin only)      |
| POST   | /api/books/:id/reviews    | Add review (user only)          |

## 🔒 Authentication

- Use the `/login` endpoint to receive a JWT token.
- Pass the token in the `Authorization` header as:  
  `Bearer <your_token>`



## 🙋‍♂️ Author

Made with ❤️ by [Kshitiz Mainaly](https://github.com/KshitizMainaly)
