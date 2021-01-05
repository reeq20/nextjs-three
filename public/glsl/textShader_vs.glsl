precision mediump float;
precision mediump int;

uniform vec3 offset;

varying vec2 vUv;
void main(){
    vUv = uv;
    vec4 pos = vec4(position * offset.xyz,1.0);
    gl_Position = projectionMatrix * modelViewMatrix * pos;
}
