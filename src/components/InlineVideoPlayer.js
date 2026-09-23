"use client";
import React, { useState } from 'react';

const getYoutubeId = (url) => {
  if (!url) return null;
  const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
  return match ? match[1] : null;
};

export default function InlineVideoPlayer({ 
  videoUrl, 
  posterUrl, 
  title, 
  children,
  className = "relative aspect-[16/9] rounded-2xl overflow-hidden bg-black mb-4 group cursor-pointer",
  imageClassName = "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90",
  overlayClassName = "absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYoutubeId(videoUrl);

  const handlePlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoId) {
      setIsPlaying(true);
    } else if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };

  if (isPlaying && videoId) {
    return (
      <div className={className}>
        <iframe
          className="w-full h-full absolute inset-0"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <div className={className} onClick={handlePlay}>
      <img
        src={posterUrl}
        alt={title || "Video thumbnail"}
        className={imageClassName}
      />
      {overlayClassName && <div className={overlayClassName}></div>}
      {children}
    </div>
  );
}
