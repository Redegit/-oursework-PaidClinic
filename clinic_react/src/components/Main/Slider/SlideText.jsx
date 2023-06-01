import React from "react";

import "./Slider.scss"

export default function SlideText({ title, description }) {
  return (
    <div className="slide-text">
      <div className="slide-title">{title}</div>
      <div className="slide-description">{description}</div>
    </div>
  );
}
