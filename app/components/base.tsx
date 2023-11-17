"use client";
import React, { Suspense, memo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  AccumulativeShadows,
  CameraControls,
  Grid,
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
} from "@react-three/drei";
import Wildlife from "./Wildlife";
import { Fisheye } from "../Fisheye";
function Ground() {
  const gridConfig = {
    cellSize: 10,
    cellThickness: 1,
    cellColor: "#6f6f6f",
    sectionSize: 3,
    sectionThickness: 1,
    sectionColor: "#9d4b4b",
    fadeDistance: 300,
    fadeStrength: 1,
    followCamera: true,
    infiniteGrid: true,
  };
  return <Grid position={[0, 0, 0]} args={[100.5, 100.5]} {...gridConfig} />;
}

// const Shadows = memo(() => (
//   <AccumulativeShadows
//     temporal
//     frames={100}
//     color="#9d4b4b"
//     colorBlend={0.5}
//     alphaTest={0.9}
//     scale={20}
//   >
//     <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
//   </AccumulativeShadows>
// ));
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
    // <div tabIndex={0}>
    <Canvas>
      <Fisheye zoom={0}>
        <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />
        <ambientLight intensity={(Math.PI / 2) * 2} />

        {/* <ambientLight intensity={0.9} /> */}
        <Suspense fallback={null}>
          <Wildlife animalsQuantity={50} />
        </Suspense>
        <Ground />
        {/* <Shadows /> */}
        <OrbitControls enableRotate={true} />
        <color attach="background" args={["white"]} />
        <PerspectiveCamera makeDefault position={[0, 0, 100]} />
      </Fisheye>
    </Canvas>
    // </div>
  );
};

export default Home;
