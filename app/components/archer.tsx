import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { AnimationAction, AnimationMixer, Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
const config = require('../../next.config');
interface ModelProps {
  key: string;
  position: number[];
}
export default function Model({}: ModelProps): JSX.Element {
  const group: RefObject<Group> = useRef<Group>(null);
  const gltf = useLoader(GLTFLoader, '/abel.glb');
  const anim = useLoader(GLTFLoader, '/aleb.glb');
  console.log(anim);
  const { actions } = useAnimations(anim.animations, group);
  const actionss = [
    'armada',
    'armada-to-esquiva',
    'au',
    'au-to-r',
    'bencao',
    'capo',
    'capo2',
    'capo3',
    'chapa-1',
    'chapa-g',
    'chapa-gira',
    'chapa2',
    'chapeu-de-couro',
    'esquiva1',
    'esquiva2',
    'esquiva3',
    'esquiva4',
    'ginga-b',
    'ginga-f',
    'ginga-s',
    'ginga-s-1',
    'ginga-s-t-au',
    'ginga1',
    'ginga2',
    'ginga3',
    'macaco-side',
    'martelo-do-chao',
    'martelo-do-chao-sem-mao',
    'martelo2',
    'martelo3',
    'meia-lua-de-compasso',
    'meia-lua-de-compasso-back',
    'meia-lua-de-frente',
    'pontera',
    'quesada1',
    'queshada2',
    'rasteira1',
    'rasteira2',
    'troca',
  ];
  const [randomNumber, setRandomNumber] = useState(0);
  const [action, setAction] = useState(actionss[randomNumber]);
  const previousAction = usePrevious(action);

  useEffect(() => {
    // Set an initial animation action
    const initialAction = actions[action];
    if (initialAction) {
      initialAction.play();
      initialAction.fadeIn(0.2);
    }
  }, [action, actions]);
  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * actionss.length);
    console.log('Random Number:', randomNumber);
    setRandomNumber(randomNumber);
    const newAction = actionss[randomNumber];
    console.log('New Action:', newAction);

    // Access the current action and previous action from the actions object
    const currentAction = actions[newAction];
    const previousAction = actions[action];

    if (currentAction) {
      // Stop the previous action
      if (previousAction) {
        previousAction.stop();
        previousAction.fadeOut(0.2);
      }

      // Start the new action
      currentAction.play();
      currentAction.fadeIn(0.2);
      console.log('Playing animation: ' + newAction);

      // Update the state
      setAction(newAction);
    }
  };

  //   const generateRandomNumber = () => {
  //     const randomNumber = Math.floor(Math.random() * actionss.length);
  //     console.log("Random Number:", randomNumber);
  //     setRandomNumber(randomNumber);
  //     const newAction = actionss[randomNumber];
  //     console.log("New Action:", newAction);
  //     setAction(newAction);
  //     const currentAction = actions[action];

  //       if (currentAction) {
  //         currentAction?.fadeOut(0.2);
  //         currentAction.paused = true; // Start or resume the animation
  //         console.log("Playing animation: " + action);
  //       }
  //       //    else {
  //       //     console.error("Action not found: " + action);
  //       //   }
  //       //   actions[action].play();
  //       //   actions[action].fadeIn(0.2);

  //     currentAction?.play();
  //     currentAction?.fadeIn(0.2);
  //     console.log("Current Action:", action);
  //   };
  //   useEffect(() => {
  //     if (previousAction.current !== null) {
  //       const currentAction = actions[action];
  //       // if (currentAction) {
  //       //   currentAction.fadeOut(0.2);
  //       //   currentAction.paused = false; // Start or resume the animation
  //       //   currentAction.fadeIn(0.2);
  //       //   console.log("Playing animation: " + action);
  //       // } else {
  //       //   console.error("Action not found: " + action);
  //       // }
  //       currentAction?.play();
  //       currentAction?.fadeIn(0.2);
  //     }
  //     console.log("Current Action:", action);
  //   }, [actions, action, previousAction]);

  return (
    <group ref={group} dispose={null} onClick={() => generateRandomNumber()}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={gltf.nodes.mixamorig9Hips} />
        <group name='Ch06'>
          <skinnedMesh
            name='Mesh'
            geometry={(gltf.nodes.Mesh as THREE.SkinnedMesh).geometry}
            material={gltf.materials.Ch06_body}
            skeleton={(gltf.nodes.Mesh as THREE.SkinnedMesh).skeleton}
          />
          <skinnedMesh
            name='Mesh_1'
            geometry={(gltf.nodes.Mesh_1 as THREE.SkinnedMesh).geometry}
            material={gltf.materials.Ch06_eyelashes}
            skeleton={(gltf.nodes.Mesh_1 as THREE.SkinnedMesh).skeleton}
          />
          <skinnedMesh
            name='Mesh_2'
            geometry={(gltf.nodes.Mesh_2 as THREE.SkinnedMesh).geometry}
            material={gltf.materials.Ch06_body1}
            skeleton={(gltf.nodes.Mesh_2 as THREE.SkinnedMesh).skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/abel.glb');

function usePrevious<T>(value: T): React.MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}
