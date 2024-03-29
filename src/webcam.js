import getUserMedia from "getusermedia";

function reglWebcam(options) {
  const regl = options.regl;
  getUserMedia({ video: true, audio: false }, function(err, stream) {
    if (err) {
      options.error && options.error(err);
      return;
    }
    const video = document.createElement("video");
    video.src = window.URL.createObjectURL(stream);
    document.body.appendChild(video);
    video.addEventListener("loadedmetadata", () => {
      video.play();
      const webcam = regl.texture(video);
      regl.frame(() => webcam.subimage(video));
      options.done(webcam);
    });
  });
}

export default reglWebcam;
