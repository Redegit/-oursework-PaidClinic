import React from "react";

import "./Slider.scss"

export default function SlideImage({ src, alt }) {
  return <img src={src} alt={alt} className="slide-image" draggable="false"/>;
}
