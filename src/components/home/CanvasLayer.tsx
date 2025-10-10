"use client"

import React, { useEffect, useRef } from 'react';

function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end;
}

export default function CanvasLayer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const sideMargin = 24;
    const topMargin = 48;

    const lineLeft = {
      targetX1: sideMargin,
      targetY1: topMargin * 2,
      targetX2: sideMargin,
      targetY2: height - topMargin * 2,
      x1: sideMargin,
      y1: height / 2,
      x2: sideMargin,
      y2: height / 2,
    };

    const lineRight = {
      targetX1: width - sideMargin,
      targetY1: topMargin * 2,
      targetX2: width - sideMargin,
      targetY2: height - topMargin * 2,
      x1: width - sideMargin,
      y1: height / 2,
      x2: width - sideMargin,
      y2: height / 2,
    };

    const arc = {
      x: width / 2,
      y: height / 2,
      radius: window.innerHeight - topMargin * 4.5,
      start: (280 * Math.PI) / 180,
      end: (280 * Math.PI) / 180,
      targetStart: (280 * Math.PI) / 180,
      targetEnd: (350 * Math.PI) / 180,
    };

    const startTime = performance.now();

    function draw(now: number) {
      const t = now - startTime;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = '#12203F';
      ctx.lineWidth = 2;

      if (t > 1300) {
        lineLeft.x2 = lerp(lineLeft.x2, lineLeft.targetX2, 0.05);
        lineLeft.y2 = lerp(lineLeft.y2, lineLeft.targetY2, 0.05);
        lineLeft.x1 = lerp(lineLeft.x1, lineLeft.targetX1, 0.05);
        lineLeft.y1 = lerp(lineLeft.y1, lineLeft.targetY1, 0.05);

        lineRight.x2 = lerp(lineRight.x2, lineRight.targetX2, 0.05);
        lineRight.y2 = lerp(lineRight.y2, lineRight.targetY2, 0.05);
        lineRight.x1 = lerp(lineRight.x1, lineRight.targetX1, 0.05);
        lineRight.y1 = lerp(lineRight.y1, lineRight.targetY1, 0.05);
      }

      if (t > 200) {
        arc.start = lerp(arc.start, arc.targetStart, 0.05);
        arc.end = lerp(arc.end, arc.targetEnd, 0.05);
      }

      ctx.beginPath();
      ctx.moveTo(lineLeft.x1, lineLeft.y1);
      ctx.lineTo(lineLeft.x2, lineLeft.y2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(lineRight.x1, lineRight.y1);
      ctx.lineTo(lineRight.x2, lineRight.y2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(arc.x, arc.y, arc.radius, arc.start, arc.end);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      arc.x = width / 2;
      arc.y = height / 2;
      arc.radius = window.innerHeight - topMargin * 4.5;
    }

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}
