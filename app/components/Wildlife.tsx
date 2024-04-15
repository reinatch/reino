'use client';

import React, { useEffect, useRef, useState } from 'react';
import Model from './Ferret';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WildlifeProps {
  animalsQuantity: number;
}

const Wildlife: React.FC<WildlifeProps> = ({ animalsQuantity }) => {
  const group = useRef<THREE.Group>(new THREE.Group());

  const actionss = ['IDLE', 'WALK', 'RUN'];

  // State to keep track of the current random animation
  const [randomNumber, setRandomNumber] = useState(0);
  const [action, setAction] = useState(actionss[randomNumber]);
  const [positions, setPositions] = useState<Array<[number, number, number]>>(
    []
  );
  const [actions, setActions] = useState<any>({}); // Add state for actions

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
  useEffect(() => {
    // Update positions when animalsQuantity changes
    setPositions((prevPositions) => {
      const newPositions = [...prevPositions];

      for (let i = prevPositions.length; i < animalsQuantity; i++) {
        newPositions.push([
          Math.random() * 400 - 200,
          0,
          Math.random() * 400 - 200,
        ]);
      }

      return newPositions;
    });
  }, [animalsQuantity]);

  useFrame(() => {
    group.current.children.forEach((animal, index) => {
      const [x, y, z] = positions[index];
      animal.position.set(x, y, z);
    });
  });

  return (
    <group ref={group} dispose={null}>
      {positions.map((position, index) => (
        <Model
          key={`Ferret${index}`}
          positions={position}
          generateRandomNumber={() => generateRandomNumber(actions)}
        />
      ))}
    </group>
  );
};

export default Wildlife;
