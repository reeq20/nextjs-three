import * as React from "react";
import {
  DoubleSide,
  Mesh,
  Object3D,
  PerspectiveCamera,
  PlaneBufferGeometry,
  RepeatWrapping,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
import vertex from "../public/glsl/texPictureShader_vs.glsl";
import fragment from "../public/glsl/texPictureShader_fs.glsl";
import loadTexture from "../utils/loadTexture";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";

class Cat extends React.Component {
  constructor(props) {
    super(props);
  }

  onLoadCanvas = async (canvas) => {
    if (!canvas) {
      return;
    }
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(35, width / height, 0.1, 1000);
    this.renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });

    const texImage = await loadTexture("./images/tex_cat.jpeg");
    texImage.wrapS = RepeatWrapping;
    texImage.wrapT = RepeatWrapping;
    texImage.needsUpdate = true;

    this.object = new Object3D();
    this.scene.add(this.object);

    // const screen = new SphereBufferGeometry(1, 128, 128, 1);
    const screen = new PlaneBufferGeometry(1.5, 1, 1, 1);
    // const screen = new BoxBufferGeometry(1, 1, 1, 1, 1);

    this.material = new ShaderMaterial({
      // wireframe: true,
      side: DoubleSide,
      uniforms: {
        textureImage: { value: texImage },
        uvOffset: { value: 0 },
        uTime: { value: 0 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.mesh = new Mesh(screen, this.material);
    // mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.4;
    this.object.add(this.mesh);
    this.scene.add(this.camera);
    this.camera.position.z = 4;

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    this.glitchPass = new GlitchPass();
    this.composer.addPass(this.glitchPass);
    //
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.composer.setSize(width, height);
    this.composer.setPixelRatio(window.devicePixelRatio);

    // this.object.rotation.x += 0.5;
    // this.object.rotation.y += 0.1;

    const onWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize, false);

    const t0 = performance.now();
    requestAnimationFrame((t1) => {
      this.animate(t1, t0);
    });
  };

  animate(t1, t0) {
    requestAnimationFrame((t1) => {
      this.animate(t1, t0);
    });

    const dur = 10000;
    const dt = t1 - t0; // animationTimeStamp - performance.now
    const t = (dt % dur) / dur; // 0 ~ 360

    // console.log(t);
    const rad = t * Math.PI;

    this.object.rotation.x += 0.001 * Math.sin(rad * 3 - Math.PI * 2);
    this.object.rotation.y += 0.001 * Math.sin(rad * 2 - Math.PI * 2);
    this.object.rotation.z += 0.001 * Math.sin(rad * 0.3 - Math.PI * 2);
    this.object.children[0].material.uniforms.uTime.value += t;
    this.composer.render();
  }

  render() {
    return (
      <>
        <canvas ref={this.onLoadCanvas} />
      </>
    );
  }
}

export default Cat;
