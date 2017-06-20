const int numIterations = 10;
float mandelbrot(vec2 uv, float scale, vec2 center) {
  vec2 z, c;

  c.x = 1.3333 * (uv.x - 0.5) * scale - center.x;
  c.y = (uv.y - 0.5) * scale - center.y;

  int iterCount;
  z = c;
  for(int i = 0; i < numIterations; i++) {
    float x = (z.x * z.x - z.y * z.y) + c.x;
    float y = (z.y * z.x + z.x * z.y) + c.y;

    if((x * x + y * y) > 4.0) break;
    z.x = x;
    z.y = y;
    iterCount = i;
  }
  if (iterCount == numIterations) {
    return 0.0;
  } else {
    return float(iterCount) / 200.0;
  }
}

#pragma glslify: export(mandelbrot)
