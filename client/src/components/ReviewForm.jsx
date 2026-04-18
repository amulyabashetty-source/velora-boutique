import React, { useState } from "react";
import axios from "axios";
import StarRating from "./StarRating";

const ReviewForm = ({ productId, refreshProduct }) => {
  const [user, setUser] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Basic validation
    if (!user || !rating || !comment) {
      alert("All fields required");
      return;
    }

    try {
      await axios.post(
  `${import.meta.env.VITE_API_URL}/api/products/${productId}/review`,
        {
          user,
          rating,
          comment,
        }
      );

      //  Reset form
      setUser("");
      setRating(0);
      setComment("");

      //  Refresh product data (important)
      refreshProduct();

    } catch (error) {
      console.log("REVIEW ERROR:", error);
    }
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-lg font-semibold mb-4">Write a Review</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* USER NAME */}
        <input
          type="text"
          placeholder="Your Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="border p-2 rounded"
        />

        {/* STAR RATING */}
        <StarRating
          rating={rating}
          setRating={setRating}
          editable={true}
        />

        {/* COMMENT */}
        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 rounded"
        />

        {/* BUTTON */}
        <button className="bg-black text-white py-2 rounded hover:bg-gray-800">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;