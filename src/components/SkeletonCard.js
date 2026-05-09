// components/SkeletonCard.js
import React from "react";
import "./Skeleton.css";

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton shimmer title"></div>
      <div className="skeleton shimmer text"></div>
      <div className="skeleton shimmer text short"></div>
    </div>
  );
}

export default SkeletonCard;