# Velora Boutique

## Description

Velora Boutique is a full-stack MERN e-commerce web application designed for modern fashion shopping. The platform enables users to explore curated fashion collections, manage their shopping experience, and receive personalized style recommendations based on face shape and occasion.

---
## Live Demo

🔗 https://velora-boutique.vercel.app

## Features

### User Features

* Browse products by categories (Sarees, Lehengas, etc.)
* View detailed product information
* Add/remove items to Cart and Wishlist
* Secure user authentication (Signup/Login using JWT)
* Place and track orders
* Manage user profile

### Admin Features

* Add, edit, and delete products
* Upload and manage product images via Cloudinary
* Manage hairstyle recommendations

### Unique Feature

#### Style Recommendation System

* Select face shape and occasion
* Get personalized suggestions including:

  * Outfits
  * Accessories
  * Hairstyles

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Integrations

* Cloudinary (Image Upload)
* JWT (Authentication)

---

## Project Structure

Velora/
│
├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── assets/
│ │ └── App.jsx
│
├── server/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── utils/
│ └── server.js
│
└── README.md


---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/velora-boutique.git
cd velora-boutique
```

---

### 2. Frontend Setup

```bash
cd client
npm install
npm start
```

---

### 3. Backend Setup

```bash
cd server
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file in the `server` directory and add the following:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## How to Run the Project

1. Start the backend server:

```bash
cd server
npm run dev
```

2. Start the frontend application:

```bash
cd client
npm start
```

3. Open the application in browser:

```
http://localhost:3000
```

---

## Key Highlights

* Full-stack MERN architecture
* Modular and scalable folder structure
* Secure authentication using JWT
* Cloud-based image handling via Cloudinary
* Personalized fashion recommendation system
* Clean and responsive UI with Tailwind CSS

---

## Future Enhancements

* Payment gateway integration (Stripe/Razorpay)
* Advanced search and filtering
* Product reviews and ratings
* AI-based recommendation improvements
* Mobile application version
* Order history analytics dashboard

---

## Author

**Amulya Bashetty**
