precision mediump float;
precision mediump int;


varying vec2 vUv;
void main (){
    gl_FragColor = vec4(vUv.ggr + 0.2 , 1.0);
}
