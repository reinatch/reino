'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import {
  CameraControls,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Mesh } from 'three';
import Model from './Capo';
// import Archer from "./archer.tsx.hold";
import Wildlife from './Wildlife';
import MyThreeComponent from './ThreeScene';
// function MeshComponent() {
//   const fileUrl = "/shiba/scene.gltf";
//   const mesh = useRef<Mesh>(null!);
//   const gltf = useLoader(GLTFLoader, fileUrl);

//   useFrame(() => {
//     mesh.current.rotation.y += 0.01;
//   });

//   return (
//     <mesh ref={mesh}>
//       <primitive object={gltf.scene} />
//     </mesh>
//   );
// }
export function Shiba() {
  return (
    <div className='flex h-screen items-center justify-center'>
      {/* <Canvas className="h-full w-full"> */}
      <Canvas flat className='h-full w-full' camera={{ position: [0, 0, 30] }}>
        {/* <Fisheye zoom={0}> */}
        <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />
        <ambientLight intensity={(Math.PI / 2) * 5} />

        <pointLight position={[1, 1, 1]} />
        {/* <Archer key="" position={[1, 1, 1]} /> */}
        {/* <MeshComponent /> */}
        <MyThreeComponent />
        <color attach='background' args={['white']} />
        <PerspectiveCamera makeDefault position={[0, 0, 18.5]} />
        {/* </Fisheye> */}
      </Canvas>
      hello
    </div>
  );
}
