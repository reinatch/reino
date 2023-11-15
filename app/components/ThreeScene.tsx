import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  oscSine,
  timerLocal,
  mix,
  range,
  color,
  MeshStandardNodeMaterial,
  OperatorNode,
  NodeBuilder,
} from "three/examples/jsm/nodes/Nodes";
import {
  roughness,
  metalness,
  diffuseColor,
} from "example/node/core/PropertyNode.js";

import {
  // FloatNode,
  // ColorNode,
  MathNode,
} from "three/examples/jsm/nodes/Nodes";
const colorNode = new ColorNode(new THREE.Color(0xff0000));
let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer = new THREE.WebGLRenderer({ antialias: true });

let mixer: THREE.AnimationMixer, clock: THREE.Clock;

function ThreeScene(): JSX.Element {
  useEffect(() => {
    init();
    return () => {
      // Cleanup code if needed
    };
  }, []);

  function init(): void {
    if (typeof window !== "undefined") {
      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.01,
        100
      );
      camera.position.set(1, 2, 3);

      scene = new THREE.Scene();
      camera.lookAt(0, 1, 0);

      clock = new THREE.Clock();

      const centerLight = new THREE.PointLight(0xff9900, 1, 100);
      centerLight.position.y = 4.5;
      centerLight.position.z = -2;
      centerLight.power = 1700;
      scene.add(centerLight);

      const cameraLight = new THREE.PointLight(0x0099ff, 1, 100);
      cameraLight.power = 1700;
      camera.add(cameraLight);
      scene.add(camera);

      const loader = new GLTFLoader();
      loader.load("models/gltf/Michelle.glb", function (gltf: GLTF) {
        const object = gltf.scene;

        mixer = new THREE.AnimationMixer(object);

        const action = mixer.clipAction(gltf.animations[0]);
        action.play();

        const instanceCount = 30;
        const dummy = new THREE.Object3D();

        object.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.InstancedMesh) {
            const oscNode = oscSine(timerLocal(0.1));
            const roughnessNode = new MathNode(
              colorNode.r,
              "multiply",
              new MathNode(colorNode.g, "multiply", colorNode.b)
            );
            const metalnessNode = mix(new FloatNode(0.0), range(0, 1), oscNode);
            const colorNode = mix(
              color(0xffffff),
              range(new THREE.Color(0x000000), new THREE.Color(0xffffff)),
              oscNode
            );

            const material = new MeshStandardNodeMaterial();
            material.roughness = new OperatorNode(
              roughnessNode,
              OperatorNode.ADD
            );
            material.metalness = metalnessNode;
            const color = new THREE.Color(0xff0000); // Set your desired color
            material.color = color;

            const instancedMesh = child as THREE.InstancedMesh;
            instancedMesh.material = material;

            instancedMesh.count = instanceCount;

            for (let i = 0; i < instanceCount; i++) {
              dummy.position.x = -200 + (i % 5) * 70;
              dummy.position.y = Math.floor(i / 5) * -200;

              dummy.updateMatrix();

              instancedMesh.setMatrixAt(i, dummy.matrix);
            }

            instancedMesh.instanceMatrix.needsUpdate = true;
          }
        });

        scene.add(object);
      });

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setAnimationLoop(animate);
      document.body.appendChild(renderer.domElement);

      window.addEventListener("resize", onWindowResize);
    }
  }

  function onWindowResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate(): void {
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    renderer.render(scene, camera);
  }

  return <></>;
}

export default ThreeScene;
