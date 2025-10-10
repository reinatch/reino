"use client"

import Image from 'next/image';
import React, { useState } from 'react';
import type { Project } from './types';

const Media: React.FC<{ src: string; alt?: string; className?: string }> = ({ src, alt, className }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src="/placeholders/placeholder.png" alt="placeholder" className={className} />;
  }

  const lower = src.split('?')[0].toLowerCase();
  const isVideo = lower.endsWith('.mp4') || lower.endsWith('.webm');
  const isGif = lower.endsWith('.gif');

  if (isVideo) {
    return (
      <video className={className} controls playsInline onError={() => setHasError(true)}>
        <source src={src} />
        Your browser does not support the video tag.
      </video>
    );
  }

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement | HTMLDivElement>) => {
    setHasError(true);
  };

  return (
    <Image src={src} alt={alt || ''} width={1600} height={900} className={className} unoptimized={isGif} onError={handleImageError} />
  );
};

export default Media;
