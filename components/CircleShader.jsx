import * as React from "react";
import {
  Mesh,
  PerspectiveCamera,
  PlaneBufferGeometry,
  RepeatWrapping,
  Scene,
  ShaderMaterial,
  SphereBufferGeometry,
  WebGLRenderer,
} from "three";
import vertex from "../public/glsl/circleShader_vs.glsl";
import fragment from "../public/glsl/circleShader_fs.glsl";
import loadTexture from "../utils/loadTexture";

class CircleShader extends React.Component {
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

    const geometry = new SphereBufferGeometry(1, 128, 128, -1);

    const material = new ShaderMaterial({
      // wireframe: true,
      uniforms: {
        uTime: {
          value: 0,
        },
        uvOffset: {
          value: 0,
        },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.mesh = new Mesh(geometry, material);

    this.scene.add(this.camera);
    this.camera.position.z = 10;

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    const onWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize, false);

    this.scene.add(this.mesh);
    this.mesh.rotation.x = -45;

    const t0 = performance.now();

    requestAnimationFrame((t1) => {
      this.animate(t1, t0);
    });
  };

  animate(t1, t0) {
    requestAnimationFrame((t1) => {
      this.animate(t1, t0);
    });

    // const amplitude = 1; // 振幅
    // const frequency = 1; // 周波数
    // const phase = 1; // 位相
    // 振幅 * sin( x * 周波数 + 位相 )
    // const y = amplitude * Math.sin(x * frequency + phase);

    const dur = 10000;
    const dt = t1 - t0; // animationTimeStamp - performance.now
    const t = (dt % dur) / dur; // 0 ~ 360

    const rad = t * Math.PI;

    this.mesh.material.uniforms.uTime.value = t;
    // (Math.PI / 360) * Math.sin(rad * 3); // 振幅 * sin( x * 周波数 + 位相 )

    // this.mesh.material.uniforms.uvOffset.value +=
    //   (Math.PI / 720) * Math.sin(rad * 1); // 振幅 * sin( x * 周波数 + 位相 )

    // this.mesh.rotation.x = ((30 * Math.PI) / 180) * Math.sin(rad * 2);
    // this.mesh.rotation.y = ((120 * Math.PI) / 180) * Math.sin(rad * 1);

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

export default CircleShader;
