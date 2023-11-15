"use client";
import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Wildlife from "./Wildlife";

const Home: React.FC = () => {
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      //if (e.key === 'c') showAllys();
    };

    document.addEventListener("keydown", keyHandler);

    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  }, []);

  return (
    <div tabIndex={0}>
      <Canvas>
        <ambientLight intensity={0.9} />
        <Suspense fallback={null}>
          <Wildlife animalsQuantity={500} />
        </Suspense>
        <OrbitControls enableRotate={true} />
      </Canvas>
    </div>
  );
};

export default Home;
