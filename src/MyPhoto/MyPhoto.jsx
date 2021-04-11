import React, { useEffect, useState } from "react";
import FaceImage from "./src/dogmf_face_face.png";
import GlassesImage from "./src/dogmf_face_glasses.png";
import ShadowImage from "./src/dogmf_face_shadow.png";
import HairImage from "./src/dogmf_face_hair.png";
import CLASSES from "./src/myPhoto.module.css";
import subscribeToMotion from "./subscribeToMotion";
import useDeviceOrientationGrant from "./useDeviceOrientationGrant";

const imageMoveStyle = (
  [x = 0, y = 0] = [0, 0],
  k = 10,
  type = "translate"
) => ({ position: "absolute", transform: `translate(${x * k}px, ${y * k}px)` });

function MyPhoto() {
  const [coords, setCoords] = useState([0, 0]);
  const { granted, getGrant } = useDeviceOrientationGrant();

  useEffect(() => {
    return subscribeToMotion(setCoords);
  }, []);

  return (
    <div
      onClick={granted === false && getGrant}
      className={CLASSES.containerBlock}
    >
      <img
        className={CLASSES.image}
        src={FaceImage}
        style={imageMoveStyle(coords, -5)}
        alt="FaceImage_image"
      />
      <img
        className={CLASSES.image}
        src={HairImage}
        style={imageMoveStyle(coords, -10)}
        alt="HairImage_image"
      />
      <img
        className={CLASSES.image}
        src={GlassesImage}
        style={imageMoveStyle(coords, -2)}
        alt="GlassesImage_image"
      />
      <img
        className={CLASSES.image}
        src={ShadowImage}
        style={imageMoveStyle(coords, 5)}
        alt="ShadowImage_image"
      />
    </div>
  );
}

export default MyPhoto;
