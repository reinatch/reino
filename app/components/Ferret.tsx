'use client';

import * as THREE from 'three';
import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame, useGraph, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Group } from 'three';
import { SkeletonUtils } from 'three-stdlib';
const config = require('../../next.config');

// interface ModelProps {
//   key: string;
//   positions: number[];
//   generateRandomNumber: (actions: any) => void;
//   action: string;
// }
// const actionss = ["IDLE", "WALK", "RUN"];
// export default function Model({
//   positions,
//   generateRandomNumber,
//   action,
// }: ModelProps): JSX.Element {
//   const [clock] = useState(new THREE.Clock());
//   const group = useRef<Group | null>(null);
//   const gltf = useLoader(GLTFLoader, `${config.basePath}/abelC.glb`);
//   const clone = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene]);
//   const { nodes } = useGraph(clone);
//   const { actions } = useAnimations(gltf.animations, group);
//   // const [randomNumber, setRandomNumber] = useState(0);
//   // const [action, setAction] = useState(actionss[0]);
//   console.log(action);
//   const speed = 1; // Adjust the speed as needed
//   const steer = new THREE.Vector3();
//   useEffect(() => {
//     // Set an initial animation action
//     const initialAction = actions[action];
//     if (initialAction) {
//       initialAction.play();
//       initialAction.fadeIn(0.2);
//     }
//   }, [action, actions]);
//   // useFrame((state, delta) => {
//   //   const updateTranslation = () => {
//   //     switch (action) {
//   //       case "IDLE":
//   //         group.current?.translateX(0);
//   //         console.log("IDLE - No translation");
//   //         break;
//   //       case "WALK":
//   //         // Adjust the translation based on the animation state and steering
//   //         steer.set(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
//   //         steer.multiplyScalar(0.5); // Adjust the steering force
//   //         group.current?.translateOnAxis(steer, speed * delta);
//   //         console.log("WALK - Translation:", speed * delta);
//   //         break;
//   //       case "RUN":
//   //         steer.set(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
//   //         steer.multiplyScalar(1); // Adjust the steering force
//   //         group.current?.translateOnAxis(steer, speed * delta);
//   //         console.log("RUN - Translation:", speed * delta);
//   //         break;
//   //       default:
//   //         break;
//   //     }
//   //   };

//   //   updateTranslation();
//   // });
//   const setRandomLookAtDirection = () => {
//     group.current?.lookAt(
//       new THREE.Vector3(
//         Math.floor(Math.random() * (Math.round(Math.random()) ? 2500 : -2500)),
//         -2.5,
//         Math.floor(Math.random() * (Math.round(Math.random()) ? 2500 : -2500))
//       )
//     );
//   };

//   useEffect(() => {
//     setRandomLookAtDirection();
//   }, []); // Initial random look-at direction
//   useEffect(() => {
//     const directionInterval = setInterval(() => {
//       setRandomLookAtDirection();
//     }, 1000 * Math.floor(Math.random() * 120));

//     return () => clearInterval(directionInterval);
//   }, [group]);

//   // useFrame((state, delta) => {
//   //   const updateTranslation = () => {
//   //     switch (action) {
//   //       case "IDLE":
//   //         group.current?.translateX(0);
//   //         console.log("IDLE - No translation");
//   //         break;
//   //       case "WALK":
//   //         // Adjust the translation based on the animation state
//   //         group.current?.translateX(1); // You can adjust the speed
//   //         console.log("WALK - Translation:", 1 * delta);
//   //         break;
//   //       case "RUN":
//   //         group.current?.translateX(2); // You can adjust the speed
//   //         console.log("RUN - Translation:", 2 * delta);
//   //         break;
//   //       default:
//   //         break;
//   //     }
//   //   };

//   //   updateTranslation();
//   // });
//   const positionVector = new THREE.Vector3(
//     positions[0],
//     positions[1],
//     positions[2]
//   );

//   return (
//     <group
//       ref={group}
//       dispose={null}
//       onClick={() => generateRandomNumber(actions)}
//     >
//       <group name="Scene">
//         <group
//           name="Armature"
//           // position={positionVector}
//           position={[0, 0, 0]}
//           rotation={[1.5, 0, 0]}
//           scale={1}
//         >
//           <primitive object={nodes.mixamorigHips} />
//           <group name="body">
//             <skinnedMesh
//               name="bodymesh"
//               geometry={(nodes.bodymesh as THREE.SkinnedMesh).geometry}
//               material={gltf.materials["Material.003"]}
//               skeleton={(nodes.bodymesh as THREE.SkinnedMesh).skeleton}
//             />
//             <skinnedMesh
//               name="bodymesh_1"
//               geometry={(nodes.bodymesh_1 as THREE.SkinnedMesh).geometry}
//               material={gltf.materials.bota}
//               skeleton={(nodes.bodymesh_1 as THREE.SkinnedMesh).skeleton}
//             />
//             <skinnedMesh
//               name="bodymesh_2"
//               geometry={(nodes.bodymesh_2 as THREE.SkinnedMesh).geometry}
//               material={gltf.materials.body}
//               skeleton={(nodes.bodymesh_2 as THREE.SkinnedMesh).skeleton}
//             />
//             <skinnedMesh
//               name="bodymesh_3"
//               geometry={(nodes.bodymesh_3 as THREE.SkinnedMesh).geometry}
//               material={gltf.materials["Material.006"]}
//               skeleton={(nodes.bodymesh_3 as THREE.SkinnedMesh).skeleton}
//             />
//           </group>
//           <skinnedMesh
//             name="hair"
//             geometry={(nodes.hair as THREE.SkinnedMesh).geometry}
//             material={gltf.materials["Material.001"]}
//             skeleton={(nodes.hair as THREE.SkinnedMesh).skeleton}
//           />
//           <skinnedMesh
//             name="head"
//             geometry={(nodes.head as THREE.SkinnedMesh).geometry}
//             material={gltf.materials["Face.002"]}
//             skeleton={(nodes.head as THREE.SkinnedMesh).skeleton}
//           />
//         </group>
//       </group>
//     </group>
//   );
// }
// Define an object to keep track of pressed keys
const keys: { [key: string]: boolean } = {};
interface ModelProps {
  key: string;
  positions: number[];
  generateRandomNumber: (actions: any) => void;
  // action: string;
}
const actionss = ['IDLE', 'WALK', 'RUN', 'TURN-L', 'TURN-R', 'JUMP'];
export default function Model({
  positions,
  generateRandomNumber,
}: ModelProps): JSX.Element {
  const group = useRef<Group | null>(null);
  const gltf = useLoader(GLTFLoader, `${config.basePath}/abelC.glb`);
  const clone = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene]);
  const { nodes } = useGraph(clone);
  const { actions } = useAnimations(gltf.animations, group);
  const [randomNumber, setRandomNumber] = useState(1);
  const [action, setAction] = useState(actionss[randomNumber]);
  console.log(gltf);
  useEffect(() => {
    // Set an initial animation action
    const initialAction = actions[action];
    if (initialAction) {
      initialAction.play();
      initialAction.fadeIn(0.2);
    }
  }, [action, actions]);

  useEffect(() => {
    const directionInterval = setInterval(
      () => {
        group.current?.lookAt(
          new THREE.Vector3(
            Math.floor(
              Math.random() * (Math.round(Math.random()) ? 2500 : -2500)
            ),
            -2.5,
            Math.floor(
              Math.random() * (Math.round(Math.random()) ? 2500 : -2500)
            )
          )
        );
      },
      1000 * Math.floor(Math.random() * 120)
    );

    return () => clearInterval(directionInterval);
  }, [group]);

  // useFrame((state, delta) => {
  //   group.current?.rotateY(-0.01);
  // });
  useFrame(({ clock, camera }, delta) => {
    // Handle arrow key controls
    const moveSpeed = 50;
    const moveDistance = moveSpeed * delta;

    if (keys['ArrowUp']) {
      group.current?.translateZ(-moveDistance);
    }

    if (keys['ArrowDown']) {
      group.current?.translateZ(moveDistance);
    }

    if (keys['ArrowLeft']) {
      group.current?.rotateY(0.1);
    }

    if (keys['ArrowRight']) {
      group.current?.rotateY(-0.1);
    }

    // Your other animation logic goes here
  });
  useEffect(() => {
    // Event listeners for keydown and keyup
    const handleKeyDown = (event: KeyboardEvent) => {
      keys[event.key] = true;
      console.log('Key Down:', event.key);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keys[event.key] = false;
      console.log('Key Up:', event.key);
    };

    // Attach event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Detach event listeners on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  const positionVector = new THREE.Vector3(
    positions[0],
    positions[1],
    positions[2]
  );
  return (
    <group
      ref={group}
      dispose={null}
      onClick={() => generateRandomNumber(actions)}
    >
      <group name='Scene'>
        <group
          name='Armature'
          position={positionVector}
          rotation={[1.5, 0, 0]}
          scale={100}
        >
          <primitive object={nodes.mixamorigHips} />
          <group name='body'>
            <skinnedMesh
              name='bodymesh'
              geometry={(nodes.bodymesh as THREE.SkinnedMesh).geometry}
              material={gltf.materials['Material.003']}
              skeleton={(nodes.bodymesh as THREE.SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name='bodymesh_1'
              geometry={(nodes.bodymesh_1 as THREE.SkinnedMesh).geometry}
              material={gltf.materials.bota}
              skeleton={(nodes.bodymesh_1 as THREE.SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name='bodymesh_2'
              geometry={(nodes.bodymesh_2 as THREE.SkinnedMesh).geometry}
              material={gltf.materials.body}
              skeleton={(nodes.bodymesh_2 as THREE.SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name='bodymesh_3'
              geometry={(nodes.bodymesh_3 as THREE.SkinnedMesh).geometry}
              material={gltf.materials['Material.006']}
              skeleton={(nodes.bodymesh_3 as THREE.SkinnedMesh).skeleton}
            />
          </group>
          <skinnedMesh
            name='hair'
            geometry={(nodes.hair as THREE.SkinnedMesh).geometry}
            material={gltf.materials['Material.001']}
            skeleton={(nodes.hair as THREE.SkinnedMesh).skeleton}
          />
          <skinnedMesh
            name='head'
            geometry={(nodes.head as THREE.SkinnedMesh).geometry}
            material={gltf.materials['Face.002']}
            skeleton={(nodes.head as THREE.SkinnedMesh).skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(`${config.basePath}/abelC.glb`);
