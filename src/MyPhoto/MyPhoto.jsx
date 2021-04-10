import React, { Fragment, useEffect, useState } from "react";
import FaceImage from "./dogmf_face_face.png";
import GlassesImage from "./dogmf_face_glasses.png";
import ShadowImage from "./dogmf_face_shadow.png";
import HairImage from "./dogmf_face_hair.png";
import CLASSES from "./myPhoto.module.css";

const imageMoveStyle = (
  [x = 0, y = 0] = [0, 0],
  k = 10,
  type = "translate"
) => ({ position: "absolute", transform: `translate(${x * k}px, ${y * k}px)` });

const getSize = () => {
  var body = document.body,
    html = document.documentElement;

  var height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  var width = Math.max(
    body.scrollWidth,
    body.offsetWidth,
    html.clientWidth,
    html.scrollWidth,
    html.offsetWidth
  );
  return [width, height];
};

const getP = (s, p) => (p - s / 2) / (s / 2);
const getMoveHandler = (callback) => {
  return (e) => {
    let [w, h] = getSize();
    callback([getP(w, e.x), getP(h, e.y)]);
  };
};

function MyPhoto() {
  const [coords, setCoords] = useState([0, 0]);

  useEffect(() => {
    let moveHandler = getMoveHandler(setCoords);
    window.addEventListener("mousemove", moveHandler);
    return () => window.removeEventListener("mousemove", moveHandler);
  }, []);

  return (
    <div className={CLASSES.containerBlock}>
      <img
        className={CLASSES.image}
        src={FaceImage}
        style={imageMoveStyle(coords, -5)}
      />
      <img
        className={CLASSES.image}
        src={HairImage}
        style={imageMoveStyle(coords, -10)}
      />
      <img
        className={CLASSES.image}
        src={GlassesImage}
        style={imageMoveStyle(coords, -2)}
      />
      <img
        className={CLASSES.image}
        src={ShadowImage}
        style={imageMoveStyle(coords, 5)}
      />
    </div>
  );
}

export default MyPhoto;
