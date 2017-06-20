precision highp float;
uniform sampler2D texture;
uniform float time;
varying vec2 vUv;

void main() {
  // UV coords are inverted
  vec2 uv = 1.0 - vUv;
  float pi = asin(-1.0);
  float t = 0.0;
  float s = sin(t), c = cos(t);
  uv += 0.3 * sin(uv.yx * 8.0 + s) - vec2(c, s) * 0.1; // wavy effect
  gl_FragColor = texture2D(texture, vec2(uv.x, uv.y));
  // gl_FragColor = texture2D(texture, uv) + vec4(uv * sin(time), 0.0, 1.0);
  // gl_FragColor = vec4(uv, 0.0, 1.0);
}
