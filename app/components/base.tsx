"use client";
import React, { Suspense, memo, useEffect, useState } from "react";
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
    cellThickness: 0.5,
    cellColor: "#808080",
    sectionSize: 100,
    sectionThickness: 0.5,
    sectionColor: "#909090",
    fadeDistance: 1000,
    fadeStrength: 0.5,
    followCamera: true,
    infiniteGrid: true,
  };
  return <Grid position={[0, 0, 0]} args={[10, 10]} {...gridConfig} />;
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
interface NavbarProps {
  onControlButtonClick: () => void;
  onIncreaseAnimals: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onControlButtonClick,
  onIncreaseAnimals,
}) => {
  const [isProjectsDropdownOpen, setProjectsDropdownOpen] = useState(false);

  const toggleProjectsDropdown = () => {
    setProjectsDropdownOpen((prevState) => !prevState);
  };

  const closeProjectsDropdown = () => {
    setProjectsDropdownOpen(false);
  };

  const handleProjectClick = () => {
    // Add your logic for handling project click
    // For example, navigating to a project page
    console.log("Project clicked");
    closeProjectsDropdown();
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4 bg-white shadow-md">
      <div className="relative inline-block">
        <button
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleProjectsDropdown}
        >
          Projects
        </button>
        {isProjectsDropdownOpen && (
          <div className="absolute left-0 bottom-[2em] bg-white border rounded shadow-lg">
            {/* Main projects menu */}
            <ul>
              <li>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={handleProjectClick}
                >
                  Project 1
                </button>
              </li>
              <li>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={handleProjectClick}
                >
                  Project 2
                </button>
              </li>
              {/* Add more projects as needed */}
            </ul>

            {/* Submenu */}
            <div className="py-2 px-4">
              <p className="text-gray-500 text-sm">Submenu Item 1</p>
              <p className="text-gray-500 text-sm">Submenu Item 2</p>
              {/* Add more submenu items as needed */}
            </div>
          </div>
        )}
      </div>
      <button
        className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
        onClick={onControlButtonClick}
      >
        about
      </button>
      <button
        className="ml-2 bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={onIncreaseAnimals}
      >
        Add
      </button>
    </div>
  );
};

const Home: React.FC = () => {
  const [animalsQuantity, setAnimalsQuantity] = React.useState(1);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      //if (e.key === 'c') showAllys();
    };

    document.addEventListener("keydown", keyHandler);

    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  }, []);
  const handleControlButtonClick = () => {
    // Implement the logic to control the instance
    console.log("Control button clicked");
  };
  const handleIncreaseAnimals = () => {
    setAnimalsQuantity((prevQuantity) => prevQuantity + 1);
  };
  return (
    // <div tabIndex={0}>
    <div className="h-screen flex flex-col w-full overflow-hidden">
      <Canvas
        flat
        className="flex-grow"
        camera={{ fov: 5, near: 0.1, far: 1000, position: [0, 150, 125] }}
      >
        <Fisheye zoom={0}>
          <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />
          <ambientLight intensity={(Math.PI / 2) * 2} />

          {/* <ambientLight intensity={0.9} /> */}
          <Suspense fallback={null}>
            <Wildlife animalsQuantity={animalsQuantity} />
          </Suspense>
          {/* <Ground /> */}
          {/* <Shadows /> */}
          <OrbitControls enableRotate={true} />
          <color attach="background" args={["white"]} />
          <PerspectiveCamera />
        </Fisheye>
      </Canvas>
      <Navbar
        onControlButtonClick={handleControlButtonClick}
        onIncreaseAnimals={handleIncreaseAnimals}
      />
    </div>
  );
};

export default Home;
