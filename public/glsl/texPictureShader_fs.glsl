precision mediump float;
precision mediump int;

uniform sampler2D textureImage;

varying vec2 vUv;
void main (){
    vec4 color = texture2D(textureImage,vUv);
    gl_FragColor = color;
//    gl_FragColor = vec4(vUv.rgg,1.0);
}
