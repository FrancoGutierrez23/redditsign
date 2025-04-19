import { useState } from "react";
import Image from "./Image.js";

const Gallery = ({ id, images, eager, onImageLoaded }) => {
  const [index, setIndex] = useState(0);
  const total = images.length;

  const prev = () => setIndex((i) => (i === 0 ? i : i - 1));
  const next = () => setIndex((i) => (i === total - 1 ? i : i + 1));
  const goTo = (i) => setIndex(i);

  return (
    <div id={id} className="slideshow-container">
      {/* slide */}
      <div
        className="slides"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Image
          src={images[index]}
          alt={`gallery-${index + 1}`}
          dims={{ maxWidth: "100%", maxHeight: 400 }}
          eager={eager}
          onLoad={onImageLoaded}
        />
        <div className="numbertext">
          {index + 1} / {total}
        </div>
      </div>

      {/* arrows */}
      <span
        className="prev"
        onClick={prev}
        style={{ display: index === 0 ? "none" : "block" }}
      >
        &#10094;
      </span>
      <span
        className="next"
        onClick={next}
        style={{ display: index === total - 1 ? "none" : "block" }}
      >
        &#10095;
      </span>

      {/* dots */}
      <div className="dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot${index === i ? " dot_active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
