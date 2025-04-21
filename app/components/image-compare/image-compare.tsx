"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageCompareProps {
  beforeImage: string;
  afterImage: string;
  // 선택적 prop 추가 예시
  altBefore?: string;
  altAfter?: string;
  containerClassName?: string; // 컨테이너 스타일링을 위한 prop
}

export default function ImageCompare({
  beforeImage,
  afterImage,
  altBefore = "Before image",
  altAfter = "After image",
  containerClassName = "w-full aspect-video", // 기본값으로 aspect-ratio 사용 예시
}: ImageCompareProps) {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div
      className={`not-prose relative ${containerClassName} overflow-hidden rounded-lg`}
    >
      <Image
        src={beforeImage}
        alt={altBefore}
        layout="fill"
        objectFit="cover"
        className="select-none"
      />

      <Image
        src={afterImage}
        alt={altAfter}
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

      <div
        className="absolute top-0 bottom-0 w-1 bg-white pointer-events-none z-10 shadow-md h-full"
        style={{
          left: `${sliderPos}%`,
          transform: "translateX(-50%)",
        }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-9 h-9 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-600 rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
