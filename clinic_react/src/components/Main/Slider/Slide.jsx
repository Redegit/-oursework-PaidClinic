import React from "react";
import SlideText from "./SlideText";
import SlideImage from "./SlideImage";

import "./Slider.scss"

export default function Slide({ data: { url, title , description } }) {
  return (
    <div className="slide">
      <SlideText title={title} description={description}/>
      <SlideImage src={url} alt={title} />
    </div>
  );
}
