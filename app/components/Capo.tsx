"use client";

import React, { RefObject, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group } from "three";
import { useLoader } from "@react-three/fiber";
const config = require("../../next.config");
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
interface ModelProps {
  // props: any;
}
export default function Model({}: ModelProps): JSX.Element {
  const group: RefObject<Group> = useRef<Group>(null);
  // // const { nodes, materials, animations } = useGLTF('/capo-T.glb')
  const gltf = useLoader(GLTFLoader, "/capo-T.glb");
  const { actions } = useAnimations(gltf.animations, group);
  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={gltf.nodes.mixamorig9Hips} />
          <group name="Ch06">
            <skinnedMesh
              name="Mesh"
              geometry={(gltf.nodes.Mesh as THREE.SkinnedMesh).geometry}
              material={gltf.materials.Ch06_body}
              skeleton={(gltf.nodes.Mesh as THREE.SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Mesh_1"
              geometry={(gltf.nodes.Mesh_1 as THREE.SkinnedMesh).geometry}
              material={gltf.materials.Ch06_eyelashes}
              skeleton={(gltf.nodes.Mesh_1 as THREE.SkinnedMesh).skeleton}
            />
            <skinnedMesh
              name="Mesh_2"
              geometry={(gltf.nodes.Mesh_2 as THREE.SkinnedMesh).geometry}
              material={gltf.materials.Ch06_body1}
              skeleton={(gltf.nodes.Mesh_2 as THREE.SkinnedMesh).skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/capo-T.glb");
