import getUserMedia from "getusermedia";
import clm from "clmtrackr/clmtrackr";
import faceModel from "clmtrackr/models/model_pca_20_svm";
import getBounds from "getboundingbox";

function getFaceTexture({ regl, error, callback }) {
  const tracker = new clm.tracker({ useWebGL: true });
  tracker.init(faceModel);
  getUserMedia({ video: true, audio: false }, function(err, stream) {
    if (err) {
      error && error(err);
      return;
    }
    const video = document.createElement("video");
    video.src = window.URL.createObjectURL(stream);
    const { canvas, ctx } = createCanvas(256, 256);

    document.body.appendChild(video);
    document.body.appendChild(canvas);

    video.addEventListener("loadedmetadata", () => {
      video.play();

      // this hack fixes clmtrackr
      video.width = video.videoWidth;
      video.height = video.videoHeight;

      tracker.start(video);
      const face = regl.texture(ctx);
      regl.frame(() => {
        const positions = tracker.getCurrentPosition();
        const { minX, minY, maxX, maxY } = getBounds(positions);
        // stretch the tracked face to the size of the canvas
        ctx.drawImage(
          video,
          minX,
          minY,
          maxX - minX,
          maxY - minY,
          0,
          0,
          canvas.width,
          canvas.height
        );
        // update the regl texture
        face.subimage(ctx);
      });
      callback({ texture: face, video });
    });
  });
}

function createCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  return { canvas, ctx };
}

export default getFaceTexture;
