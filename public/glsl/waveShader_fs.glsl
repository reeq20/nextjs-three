precision mediump float;
precision mediump int;

uniform sampler2D texWater;

varying vec2 vUv;
void main (){
//    vec4 texColor = texture2D(
//    texWater,
//    vUv
//    );
//    gl_FragColor = vec4(texColor.rgb, 1.0);
    gl_FragColor = vec4(vUv.grg + 0.3, 1.0);
}
