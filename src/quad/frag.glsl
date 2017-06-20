precision highp float;
uniform sampler2D texture;
uniform float time;
varying vec2 vUv;

#pragma glslify: noise = require(glsl-noise/simplex/2d)

float noisify(vec2 a) {
  float n = 0.;
  n += noise(vec2(a.x * 10.2, a.y + time / 30.0)) * 0.5;
  n += noise(vec2(sin(a.x) * 10., a.y + time / 15.0)) * 0.01;
  return n;
}

void main() {
  // UV coords are inverted
  vec2 uv = 1.0 - vUv;
  float x = noisify(uv.xy) / 2. + 0.3;
  float y = noisify(uv.yx) / 2. + 0.3; 
  // gl_FragColor = vec4(x / 2. + 0.3, 0., 0.0, 1.0);
  gl_FragColor = texture2D(texture, vec2(y, x));
  // gl_FragColor = vec4(uv, 0.0, 1.0);
}

