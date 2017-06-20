precision highp float;
uniform sampler2D texture;
uniform float time;
varying vec2 vUv;

#pragma glslify: noise = require(glsl-noise/simplex/3d)

void main() {
  // UV coords are inverted
  vec2 uv = 1.0 - vUv;
  float n = noise(vec3(uv * 1.2, time / 30.0));
  float x = mod(uv.x + n, 1.0) * time;
  float y = mod(uv.y + n, 1.0) * time;
  gl_FragColor = mix(texture2D(texture, vec2(sin(x), y)), vec4(n, x, y, 1.0), n);
  // gl_FragColor = vec4(uv, 0.0, 1.0);
}
