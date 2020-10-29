import React from "react";
import {
  Mesh,
  PerspectiveCamera,
  PlaneBufferGeometry,
  Scene,
  ShaderMaterial,
  TextureLoader,
  WebGLRenderer,
} from "three";

import vertex from "../public/glsl/boxShader_vs.glsl";
import fragment from "../public/glsl/boxShader_fs.glsl";
//
// const loadTexture = (url) => {
//   return new Promise((resolve) => {
//     new TextureLoader().load(url, (texture) => {
//       resolve(texture);
//     });
//   });
// };

const Stage = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const onCanvasLoad = (canvas) => {
    if (!canvas) {
      return;
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, width / height, 0.1, 1000);
    const renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });

    const geometry = new PlaneBufferGeometry(1, 1, 1, 1);
    const material = new ShaderMaterial({
      wireframe: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    const mesh = new Mesh(geometry, material);

    scene.add(mesh);
    scene.add(camera);
    camera.position.z = 0.1;

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.render(scene, camera);
  };
  return (
    <>
      <canvas ref={onCanvasLoad} />
    </>
  );
};

export default Stage;
