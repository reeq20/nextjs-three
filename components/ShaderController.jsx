import * as React from "react";
import {
  AmbientLight,
  BoxBufferGeometry,
  DirectionalLight,
  Group,
  Mesh,
  Object3D,
  PerspectiveCamera,
  PlaneBufferGeometry,
  RawShaderMaterial,
  RepeatWrapping,
  Scene,
  ShaderMaterial,
  SphereBufferGeometry,
  WebGLRenderer,
} from "three";
import vertex from "../public/glsl/boxShader_vs.glsl";
import fragment from "../public/glsl/boxShader_fs.glsl";
import loadTexture from "../utils/loadTexture";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";

class ShaderController extends React.Component {
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
    this.camera = new PerspectiveCamera(35, width / height, 0.01, 1000);
    this.renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });

    const texImage = await loadTexture("./images/texture1024.jpg");
    texImage.wrapS = RepeatWrapping;
    texImage.wrapT = RepeatWrapping;
    texImage.needsUpdate = true;

    this.object = new Object3D();
    this.scene.add(this.object);

    // const screen = new SphereBufferGeometry(1, 128, 128, 1);
    // const screen = new PlaneBufferGeometry(1, 1, 1, 1);
    const screen = new BoxBufferGeometry(1, 1, 1, 1, 1);

    let mesh;
    this.material = new ShaderMaterial({
      // wireframe: true,
      uniforms: {
        textureImage: { value: texImage },
        uvOffset: { value: 0 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    mesh = new Mesh(screen, this.material);
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 50;
    this.object.add(mesh);
    // for (let i = 0; i < 10; i++) {
    //   mesh = new Mesh(screen, this.material);
    //   mesh.position
    //     .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
    //     .normalize();
    //   mesh.position.multiplyScalar(Math.random() * 400);
    //   mesh.rotation.set(
    //     Math.random() * 2,
    //     Math.random() * 2,
    //     Math.random() * 2
    //   );
    //   mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
    //   this.object.add(mesh);
    // }

    // const material = new ShaderMaterial({
    //   // wireframe: true,
    //   uniforms: {
    //     textureImage: { value: texImage },
    //     uvOffset: { value: 0 },
    //   },
    //   vertexShader: vertex,
    //   fragmentShader: fragment,
    // });
    // this.group.add(this.mesh, this.mesh2, this.mesh3, this.mesh4, this.mesh5);

    // this.scene.add(this.group);
    // this.scene.add(this.mesh);
    this.scene.add(this.camera);
    this.camera.position.z = 200;

    // this.scene.add(new AmbientLight(0x222222));

    // const light = new DirectionalLight(0xffffff);
    // light.position.set(1, 1, 1);
    // this.scene.add(light);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    this.glitchPass = new GlitchPass();
    this.composer.addPass(this.glitchPass);

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.composer.setSize(width, height);
    this.composer.setPixelRatio(window.devicePixelRatio);

    this.object.rotation.x += 0.5;
    this.object.rotation.y += 0.1;

    const onWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize, false);
    requestAnimationFrame((t) => {
      this.animate(t);
    });
  };

  animate(t) {
    let degree = 0;
    degree += 3;
    requestAnimationFrame((t) => {
      this.animate(t);
    });
    // console.log(Math.sin(t) / degree);
    this.object.rotation.x += 0.005;
    this.object.rotation.y += 0.01;
    // console.log(Math.sin(((2 * Math.PI) / 100) * t));
    // this.material.uniforms.uvOffset.value += Math.sin(t) / degree;
    // this.renderer.render(this.scene, this.camera);
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

export default ShaderController;
