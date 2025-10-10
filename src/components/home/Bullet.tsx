"use client"

import React from 'react';

export default function Bullet({
  title,
  onClick,
  style,
  isActive,
}: {
  title?: string;
  onClick: () => void;
  style?: React.CSSProperties;
  isActive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={title}
      className={`bullet inline-flex items-center justify-center rounded-full bg-white border shadow p-3 ${isActive ? 'ring-2 ring-accent' : ''}`}
      style={style}
    >
      <span className="text-xs">{title}</span>
    </button>
  );
}
