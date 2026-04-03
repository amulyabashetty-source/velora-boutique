import React from "react";

const StarRating = ({ rating = 0, setRating, editable = false }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-2xl ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          } ${editable ? "cursor-pointer" : ""}`}
          onClick={() => editable && setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;