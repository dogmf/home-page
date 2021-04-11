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

const getP = (size, point) => (point - size / 2) / (size / 2);

const setMouseMoveListener = (callback) => {
  const handler = (e) => {
    let [w, h] = getSize();
    callback([getP(w, e.x), getP(h, e.y)]);
  };
  window.addEventListener("mousemove", handler);
  const removeListener = () => window.removeEventListener("mousemove", handler);
  return removeListener;
};
const DEFAULT_RATIO = 30;

//TODO: "cure breakpoint on difference between -180 and 180"
const getCenter = (point, center = point, ratio) => {
  let difference = center - point;
  if (Math.abs(difference) < ratio) return center;
  return point + Math.sign(difference) * ratio;
};
const modifyPoint = (point, center, ratio) => {
  return (point - center) / ratio;
};
const setDeviceMoveListener = (callback) => {
  let xCenter;
  let yCenter;
  const handler = (e) => {
    console.log(e);
    let x = e.beta;
    let y = e.gamma;
    xCenter = getCenter(x, xCenter, DEFAULT_RATIO);
    yCenter = getCenter(y, yCenter, DEFAULT_RATIO);
    let mx = modifyPoint(x, xCenter, DEFAULT_RATIO);
    let my = modifyPoint(y, yCenter, DEFAULT_RATIO);
    console.log({
      x,
      y,
      xCenter,
      yCenter,
      coords: [my, mx],
    });
    callback([my, mx]);
  };
  window.addEventListener("deviceorientation", handler);
  const removeListener = () =>
    window.removeEventListener("deviceorientation", handler);
  return removeListener;
};
const subscribeToMotion = (callback) => {
  let cb = (coords) => callback(coords.map((n) => n.toFixed(2)));
  const removeDeviceMoveListener = setDeviceMoveListener(cb);
  const removeMouseMoveListener = setMouseMoveListener(cb);
  return () => {
    removeMouseMoveListener();
    removeDeviceMoveListener();
  };
};
export default subscribeToMotion;
