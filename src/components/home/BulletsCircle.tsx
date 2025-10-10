"use client"

import React, { useEffect, useRef, useState } from 'react';
import Bullet from './Bullet';

function mapValue(value: number, fromMin: number, fromMax: number, toMin: number, toMax: number) {
  const ratio = (value - fromMin) / (fromMax - fromMin);
  return toMin + ratio * (toMax - toMin);
}

function weightedRandomNumber(min: number, max: number) {
  const values: number[] = [];
  for (let i = min; i <= max; i++) values.push(i);
  const weights = values.map((v) => v);
  const total = weights.reduce((s, w) => s + w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < values.length; i++) {
    r -= weights[i];
    if (r <= 0) return values[i];
  }
  return min;
}

export default function BulletsCircle({ projects, onSelect, activeIndex }: { projects: { titulo?: string }[]; onSelect: (i: number) => void; activeIndex: number | null; }) {
  const n = projects.length || 1;

  // store computed positions
  const [positions, setPositions] = useState<{ rotation: number; radius: number }[]>([]);
  const rotationIncrement = useRef(0);
  const rafRef = useRef<number | null>(null);

  // compute positions once (or when projects length changes)
  useEffect(() => {
    const usedPositions: number[][] = [];
    const numberOfCircles = 5;
    for (let i = 0; i < numberOfCircles; i++) usedPositions.push([]);

    const result: { rotation: number; radius: number }[] = [];
    for (let i = 0; i < n; i++) {
      // pick a radial layer (1..numberOfCircles)
      const layer = weightedRandomNumber(1, numberOfCircles);
      // compute radius mapped to layer
      const minCircleSize = 120;
      const maxCircleSize = 320;
      const diameter = mapValue(layer, 1, numberOfCircles, minCircleSize, maxCircleSize);
      const radius = Math.round(diameter);

      // find a rotation angle not too close to others in same layer
      let tries = 0;
      let rot = Math.ceil(Math.random() * 360);
      while (tries < 600) {
        const arr = usedPositions[layer - 1];
        let threshold = 20;
        switch (layer) {
          case 1: threshold = 30; break;
          case 2: threshold = 26; break;
          case 3: threshold = 22; break;
          case 4: threshold = 20; break;
          case 5: threshold = 12; break;
        }
        let isClose = false;
        for (const p of arr) {
          if (Math.abs(rot - p) < threshold) { isClose = true; break; }
        }
        if (!isClose) { arr.push(rot); break; }
        rot = Math.ceil(Math.random() * 360);
        tries++;
      }

      result.push({ rotation: rot, radius });
    }

    setPositions(result);
  }, [n]);

  // continuous small rotation increment like original script
  useEffect(() => {
    const id = setInterval(() => {
      rotationIncrement.current += 0.6;
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          setPositions((p) => p.slice());
        });
      }
    }, 300);

    return () => {
      clearInterval(id);
      if (rafRef.current) cancelAnimationFrame(rafRef.current!);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-10">
      <div className="relative w-full max-w-[640px] aspect-square flex items-center justify-center">
        {positions.map((pos, i) => {
          const baseRot = pos.rotation;
          const rot = baseRot + rotationIncrement.current;
          const radius = pos.radius;
          const style: React.CSSProperties = {
            ['--radialRotation' as any]: `${rot}deg`,
            ['--radius' as any]: `${radius}px`,
            position: 'absolute',
            transform: `rotate(${rot}deg) translate(${radius}px) rotate(-${rot}deg)`,
            transition: 'transform 300ms ease',
            cursor: 'pointer',
          };

          return <Bullet key={i} title={projects[i].titulo} onClick={() => onSelect(i)} style={style} isActive={activeIndex === i} />;
        })}
      </div>
    </div>
  );
}
