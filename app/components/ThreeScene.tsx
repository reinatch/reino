'use client';

import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import {
  InstancedMesh,
  Material,
  NormalBufferAttributes,
  Object3D,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { CameraControls, PerspectiveCamera } from '@react-three/drei';

const SuzanneModel: React.FC = () => {
  const { scene } = useLoader(GLTFLoader, '/ferret.glb');
  return <primitive object={scene} />;
};

const MyThreeComponent: React.FC = () => {
  let mesh: InstancedMesh | undefined;
  const amount =
    typeof window !== 'undefined'
      ? parseInt(window.location.search.slice(1)) || 10
      : 10;
  const count = Math.pow(amount, 3);
  const dummy = new Object3D();
  const animateRef = useRef<boolean>(true);

  const onWindowResize = () => {
    const camera = mesh?.children[0] as any;
    if (camera) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
  };

  const animate = () => {
    if (mesh && animateRef.current) {
      const time = Date.now() * 0.001;

      let i = 0;
      const offset = (amount - 1) / 2;

      for (let x = 0; x < amount; x++) {
        for (let y = 0; y < amount; y++) {
          for (let z = 0; z < amount; z++) {
            dummy.position.set(offset - x, offset - y, offset - z);
            dummy.rotation.y =
              Math.sin(x / 4 + time) +
              Math.sin(y / 4 + time) +
              Math.sin(z / 4 + time);
            dummy.rotation.z = dummy.rotation.y * 2;

            dummy.updateMatrix();
            mesh.setMatrixAt(i++, dummy.matrix);
          }
        }
      }

      mesh.instanceMatrix.needsUpdate = true;
      mesh.computeBoundingSphere();

      requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    animate();
    return () => {
      window.removeEventListener('resize', onWindowResize);
      animateRef.current = false;
    };
  }, []);

  return (
    <Canvas
      style={{ height: '100vh', width: '100vw' }}
      camera={{ position: [0, 0, 30] }}
      onCreated={({ camera }) => {
        camera.lookAt(0, 0, 0);
      }}
    >
      <ambientLight intensity={(Math.PI / 2) * 5} />
      <pointLight position={[1, 1, 1]} />

      {/* Your 3D scene components here */}
      {mesh && (
        <primitive
          object={mesh}
          count={count}
          ref={(ref: InstancedMesh<any, any>) => (mesh = ref as InstancedMesh)}
        />
      )}

      {/* GUI and Stats components from drei */}
      <group>
        <SuzanneModel />
      </group>

      {/* Optional: Set a background color and add a PerspectiveCamera */}
      <color attach='background' args={['white']} />
    </Canvas>
  );
};

export default MyThreeComponent;
