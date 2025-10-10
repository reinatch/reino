"use client"

import React, { useEffect, useState } from 'react';
import CanvasLayer from './CanvasLayer';
import BulletsCircle from './BulletsCircle';
import { HomeExampleProps } from './types';

export default function HomeExample({ projects, activeIndex, onSelect }: HomeExampleProps) {
  const [linesFinished, setLinesFinished] = useState(false);

  useEffect(() => {
    setLinesFinished(false);
  }, [activeIndex]);

  return (
    <div className="w-full h-screen relative bg-trasparent overflow-hidden">
      {/* <CanvasLayer />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {!linesFinished && <div className="text-xl">Animating...</div>}
      </div> */}

      {activeIndex === null ? (
        <BulletsCircle projects={projects} onSelect={onSelect} activeIndex={activeIndex} />
      ) : (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-2xl pointer-events-auto">
          {projects[activeIndex]?.titulo && (
            <div className="p-2 bg-white/80 rounded-md shadow-sm text-center">{projects[activeIndex].titulo}</div>
          )}
        </div>
      )}
    </div>
  );
}
