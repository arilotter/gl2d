precision highp float;
uniform sampler2D texture;
uniform float time;
varying vec2 vUv;

#pragma glslify: noise = require(glsl-noise/simplex/2d)

float noisify(float a) {
  float n = 0.;
  n += noise(vec2(a * 1.2, a + time / 30.0)) * 0.5;
  n += noise(vec2(sin(a) * 10., a + time / 15.0)) * 0.01;
  return n;
}

void main() {
  // UV coords are inverted
  vec2 uv = 1.0 - vUv;
  float x = mod(uv.x + noisify(uv.y), 1.0);
  float y = mod(uv.y + noisify(uv.x), 1.0);
  gl_FragColor = texture2D(texture, vec2(y, x));
  // gl_FragColor = vec4(uv, 0.0, 1.0);
}

