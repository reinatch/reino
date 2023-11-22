"use client";

import React, { useRef, useState } from "react";
import Model from "./Ferret";

interface WildlifeProps {
  animalsQuantity: number;
}

const Wildlife: React.FC<WildlifeProps> = (props) => {
  const group = useRef<THREE.Group | undefined>(undefined);

  const actionss = ["IDLE", "WALK", "RUN"];

  // State to keep track of the current random animation
  const [randomNumber, setRandomNumber] = useState(0);
  const [action, setAction] = useState(actionss[randomNumber]);

  // Function to generate a random number and play the corresponding animation
  const generateRandomNumber = (actions: any) => {
    const randomNumber = Math.floor(Math.random() * actionss.length);
    setRandomNumber(randomNumber);

    const newAction = actionss[randomNumber];

    const currentAction = actions[newAction];
    const previousAction = actions[action];

    if (currentAction) {
      if (previousAction) {
        previousAction.stop();
        previousAction.fadeOut(0.2);
      }

      currentAction.play();
      currentAction.fadeIn(0.2);

      setAction(newAction);
    }
  };

  const animals = [];

  for (let i = 0; i < props.animalsQuantity; i++)
    animals.push(
      <Model
        key={"Ferret" + i}
        positions={[Math.random() * 4 - 2, 0, Math.random() * 4 - 2]}
        generateRandomNumber={generateRandomNumber}
        action={action}
      />
    );
  return (
    <group ref={group as React.MutableRefObject<THREE.Group>} dispose={null}>
      {animals}
    </group>
  );
};

export default Wildlife;
