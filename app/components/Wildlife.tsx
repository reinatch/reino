"use client";

import React, { useRef } from "react";
import Archer from "./archer";

interface WildlifeProps {
  animalsQuantity: number;
}

const Wildlife: React.FC<WildlifeProps> = (props) => {
  const group = useRef<THREE.Group | undefined>(undefined);

  const animals = [];

  for (let i = 0; i < props.animalsQuantity; i++)
    animals.push(
      <Archer
        key={"Ferret" + i}
        position={[
          Math.floor(Math.random() * (Math.round(Math.random()) ? 250 : -250)),
          -2.5,
          Math.floor(Math.random() * (Math.round(Math.random()) ? 250 : -250)),
        ]}
      />
    );

  return (
    <group ref={group as React.MutableRefObject<THREE.Group>} dispose={null}>
      {animals}
    </group>
  );
};

export default Wildlife;
