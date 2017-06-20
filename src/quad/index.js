import vert from "./vert.glsl";
import frag from "./frag.glsl";

import createQuad from "primitive-quad";
import dereference from "../dereference";

const { positions, cells, uvs } = createQuad();
const dereferenceQuad = x => dereference(cells, x);

const positionsFlat = dereferenceQuad(positions);
const uvsFlat = dereferenceQuad(uvs);

const quad = regl =>
  regl({
    frag,
    vert,
    attributes: {
      position: positionsFlat,
      uv: uvsFlat
    },
    count: positionsFlat.length,
    uniforms: {
      texture: regl.prop("texture"),
      time: ({ tick }) => 0.1 * tick
    }
  });

export default quad;
