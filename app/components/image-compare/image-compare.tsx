"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageCompareProps {
  beforeImage: string;
  afterImage: string;
}

export default function ImageCompare({
  beforeImage,
  afterImage,
}: ImageCompareProps) {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="not-prose relative w-full aspect-video overflow-hidden rounded-lg">
      <Image
        src={beforeImage}
        alt="Before"
        layout="fill"
        objectFit="cover"
        className="select-none"
      />

      <Image
        src={afterImage}
        alt="After"
        layout="fill"
        objectFit="cover"
        className="select-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      />

      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        aria-label="Image comparison slider"
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full cursor-ew-resize appearance-none bg-transparent focus:outline-none z-20"
      />
    </div>
  );
}
