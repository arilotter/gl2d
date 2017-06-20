import createFullscreenReglContext from "regl";
import createQuad from "./quad";
import getWebcam from "./webcam";

import clm from "clmtrackr/clmtrackr";
import faceModel from "clmtrackr/models/model_pca_20_svm";
import getBounds from "getboundingbox";
const regl = createFullscreenReglContext();

const drawQuad = createQuad(regl);

const webcam = getWebcam({
  regl,
  callback: loop
});

function loop({ texture, video }) {
  regl.frame(({ viewportWidth, viewportHeight }) => {
    regl.clear({
      color: [0, 0, 0, 255],
      depth: 1
    });
    drawQuad({ texture });
  });
}
