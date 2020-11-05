import * as React from "react";
import {
  BoxBufferGeometry,
  FontLoader,
  Mesh,
  Object3D,
  ObjectLoader,
  PerspectiveCamera,
  PlaneBufferGeometry,
  RepeatWrapping,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
import vertex from "../public/glsl/textShader_vs.glsl";
import fragment from "../public/glsl/textShader_fs.glsl";
import loadTexture from "../utils/loadTexture";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import loadGeometry from "../utils/loadGeometry";
import loadObj from "../utils/loadObj";

class TextShader extends React.Component {
  constructor(props) {
    super(props);
    // this.onLoadCanvas = React.createRef();
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

    // this.geometry = new BoxBufferGeometry(1, 1, 1, 1, 1);
    const geometry = await loadGeometry("./obj/textShader.obj");

    this.material = new ShaderMaterial({
      wireframe: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    const mesh = new Mesh(geometry.O_Text, this.material);

    this.scene.add(mesh);
    this.scene.add(this.camera);
    this.camera.position.z = 10;

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    const onWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      // this.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize, false);

    requestAnimationFrame((t) => {
      this.animate(t);
    });
  };

  animate(t) {
    requestAnimationFrame((t) => {
      this.animate(t);
    });
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <>
        <canvas ref={this.onLoadCanvas} />
      </>
    );
  }
}

export default TextShader;
