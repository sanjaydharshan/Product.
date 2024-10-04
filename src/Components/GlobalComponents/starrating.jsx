import React from "react";
const FullStar = () => <span style={{marginRight:"3px",color:"#F4A003"}}><i class="bi bi-star-fill"></i></span>;
const HalfStar = () => <span style={{marginRight:"3px",color:"#F4A003"}}><i class="bi bi-star-half"></i></span>;
const EmptyStar = () => <span style={{marginRight:"3px",color:"#F4A003"}}><i class="bi bi-star"></i></span>;

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div>
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <FullStar key={index} />
        ))}

      {hasHalfStar && <HalfStar />}

      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <EmptyStar key={index} />
        ))}
    </div>
  );
};
export { StarRating };
