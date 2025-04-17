"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Hls from "hls.js";

interface VideoTimelineProps {
  src: string;
}

export default function VideoTimeline({ src }: VideoTimelineProps) {
  const [frames, setFrames] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let canProcess = false;
    const frameCanvas = document.createElement("canvas");
    const frameContext = frameCanvas.getContext("2d");
    let framesCount = 0;
    const maxFrames = 15; // 최대 프레임 수 제한

    const captureFrame = () => {
      if (!frameContext || !canProcess) return;

      frameCanvas.width = video.videoWidth;
      frameCanvas.height = video.videoHeight;
      frameContext.drawImage(
        video,
        0,
        0,
        frameCanvas.width,
        frameCanvas.height
      );

      // 이미지 품질 조정(0.7은 70% 품질)
      const frame = frameCanvas.toDataURL("image/jpeg", 0.3);
      setFrames((prevFrames) => [...prevFrames, frame]);

      framesCount++;

      // 비디오 시간 계산 및 이동
      const duration = video.duration;
      const nextTime = (framesCount * duration) / maxFrames;

      if (framesCount >= maxFrames || nextTime >= duration) {
        canProcess = false;
        setLoading(false);
        video.currentTime = 0;
        return;
      }

      video.currentTime = nextTime;
    };

    const loadVideo = () => {
      const hls = new Hls();
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      } else {
        hls.loadSource(src);
        hls.attachMedia(video);
      }

      video.addEventListener("loadedmetadata", () => {
        setLoading(true);
        canProcess = true;
        framesCount = 0;
        setFrames([]);
        video.currentTime = 0; // 첫 프레임 캡처 시작
      });
    };

    video.addEventListener("seeked", captureFrame);

    loadVideo();

    return () => {
      video.removeEventListener("seeked", captureFrame);
    };
  }, [src]);

  return (
    <div className="not-prose">
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
            <div className="bg-white/90 px-4 py-2 rounded-md">
              <p className="text-sm font-medium">타임라인 생성 중...</p>
            </div>
          </div>
        )}
        <video
          ref={videoRef}
          src={src}
          controls={!loading}
          muted
          className="w-full h-auto rounded-lg"
        />
      </div>

      <div className="relative mt-4">
        <div className="relative flex overflow-hidden h-24 rounded-lg">
          {loading ? (
            // Skeleton loader while frames are being processed
            <div className="bg-neutral-100 animate-pulse w-full h-full" />
          ) : (
            // Actual frames when loading is complete
            frames.map((frame, index) => (
              <Image
                key={index}
                src={frame}
                width={100}
                height={100}
                quality={50}
                alt={`Frame ${index}`}
                className="object-cover h-full absolute"
                style={{
                  left: `${index * (100 / frames.length)}%`,
                  zIndex: index,
                  transform: "translateX(-50%)",
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
