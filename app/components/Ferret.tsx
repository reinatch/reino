"use client";

import * as THREE from "three";
import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useGraph, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Group } from "three";
import { SkeletonUtils } from "three-stdlib";
const config = require("../../next.config");

interface ModelProps {
  key: string;
  position: number[];
  generateRandomNumber: (actions: any) => void;
}
const actionss = ["IDLE", "WALK", "RUN"];
export default function Model({
  position,
  generateRandomNumber,
}: ModelProps): JSX.Element {
  const group = useRef<Group | null>(null);
  const gltf = useLoader(GLTFLoader, `${config.basePath}/abelC.glb`);
  const clone = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene]);
  const { nodes } = useGraph(clone);
  const { actions } = useAnimations(gltf.animations, group);
  const [randomNumber, setRandomNumber] = useState(0);
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
    const directionInterval = setInterval(() => {
      group.current?.lookAt(
        new THREE.Vector3(
          Math.floor(
            Math.random() * (Math.round(Math.random()) ? 2500 : -2500)
          ),
          -2.5,
          Math.floor(Math.random() * (Math.round(Math.random()) ? 2500 : -2500))
        )
      );
    }, 1000 * Math.floor(Math.random() * 120));

    return () => clearInterval(directionInterval);
  }, [group]);

  useFrame((state, delta) => {
    group.current?.translateX(-0.5);
  });
  return (
    <group
      ref={group}
      dispose={null}
      onClick={() => generateRandomNumber(actions)}
    >
      <group name="Scene">
        <group
          name="Armature"
          position={[0, 0, 0]}
          rotation={[1.5, 0, 0]}
          scale={100}
        >
          <primitive object={nodes.mixamorigHips} />
          <group name="body">
            <skinnedMesh
              name="bodymesh"
              geometry={(nodes.bodymesh as THREE.SkinnedMesh).geometry}
              material={gltf.materials["Material.003"]}
              skeleton={(nodes.bodymesh as THREE.SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="bodymesh_1"
              geometry={(nodes.bodymesh_1 as THREE.SkinnedMesh).geometry}
              material={gltf.materials.bota}
              skeleton={(nodes.bodymesh_1 as THREE.SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="bodymesh_2"
              geometry={(nodes.bodymesh_2 as THREE.SkinnedMesh).geometry}
              material={gltf.materials.body}
              skeleton={(nodes.bodymesh_2 as THREE.SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="bodymesh_3"
              geometry={(nodes.bodymesh_3 as THREE.SkinnedMesh).geometry}
              material={gltf.materials["Material.006"]}
              skeleton={(nodes.bodymesh_3 as THREE.SkinnedMesh).skeleton}
            />
          </group>
          <skinnedMesh
            name="hair"
            geometry={(nodes.hair as THREE.SkinnedMesh).geometry}
            material={gltf.materials["Material.001"]}
            skeleton={(nodes.hair as THREE.SkinnedMesh).skeleton}
          />
          <skinnedMesh
            name="head"
            geometry={(nodes.head as THREE.SkinnedMesh).geometry}
            material={gltf.materials["Face.002"]}
            skeleton={(nodes.head as THREE.SkinnedMesh).skeleton}
          />
        </group>
      </group>
    </group>
  );
}
useGLTF.preload(`${config.basePath}/abelC.glb`);
