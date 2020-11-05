precision mediump float;
precision mediump int;

//attribute mat4 projectionMatrix;
//attribute mat4 modelViewMatrix;
//
//attribute vec3 position;
//attribute vec2 uv;

uniform float uvOffset;

varying vec2 vUv;
void main(){
    vUv = uv + vec2(uvOffset,0.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
