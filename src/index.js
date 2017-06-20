import createFullscreenReglContext from "regl";
import createQuad from "./quad";
import getWebcam from "./webcam";

const regl = createFullscreenReglContext();

const drawQuad = createQuad(regl);

const webcam = getWebcam({
  regl,
  done: loop
});

function loop(texture) {
  regl.frame(({ viewportWidth, viewportHeight }) => {
    regl.clear({
      color: [0, 0, 0, 255],
      depth: 1
    });
    drawQuad({ texture });
  });
}
