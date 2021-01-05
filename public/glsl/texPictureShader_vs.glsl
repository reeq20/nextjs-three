precision mediump float;
precision mediump int;

uniform float uvOffset;
uniform float uTime;

varying vec2 vUv;

float calcHeight(
float amplitude,
float frequency,
float phase,
vec2 direction // normalizeされている想定
){
    return amplitude *
    sin(
    (
    (direction.x * position.x + direction.y * position.y)
    + phase)
    * frequency);
}

vec2 calcDir(float deg){
    float s = sin(radians(deg));
    float c = cos(radians(deg));

    return normalize(
    vec2(c, s)
    );
}

void main(){
    vUv = uv;
    vec4 pos = vec4(position, 1.0);

//    float height = 0.0;
//
//    height += calcHeight(0.02, 8.0, uTime * 3.0, calcDir(20.0));
//    height += calcHeight(0.04, 2.0, uTime * 2.0, calcDir(10.0));
//    height += calcHeight(0.03, 16.0, uTime * 5.0, calcDir(50.0));
//    height += calcHeight(0.05, 16.0, uTime * 5.0, calcDir(10.0));
//
//    pos.z += height;
    gl_Position = projectionMatrix * modelViewMatrix * pos;
}
