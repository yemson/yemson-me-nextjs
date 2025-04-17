"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;
    const loadVideo = () => {
      const hls = new Hls();
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      } else {
        hls.loadSource(src);
        hls.attachMedia(video);
      }
    };
    loadVideo();
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="w-full h-auto rounded-lg"
      controls
      crossOrigin="anonymous"
    ></video>
  );
}
