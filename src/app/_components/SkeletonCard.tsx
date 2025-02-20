import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export const SkeletonCard: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "20px",
  borderRadius = "8px",
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "#e4e4e7",
        animation: "shimmer 1.5s infinite linear",
      }}
      className="skeleton"
    ></div>
  );
};
