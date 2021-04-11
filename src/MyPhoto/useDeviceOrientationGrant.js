import { useCallback, useEffect, useMemo, useState } from "react";

const permissionRequested = () =>
  typeof DeviceOrientationEvent !== "undefined" &&
  typeof DeviceOrientationEvent.requestPermission === "function";

const useDeviceOrientationGrant = () => {
  let [granted, setGranted] = useState(permissionRequested() ? false : null);

  const getGrant = useCallback(async () => {
    if (granted === false) {
      let result = await DeviceOrientationEvent.requestPermission();
      let isGranted = result === "granted";
      setGranted(isGranted);
    }
  });

  useEffect(() => {
    if (granted === false) getGrant();
  }, []);

  return useMemo(
    () => ({
      granted,
      getGrant,
    }),
    [granted, getGrant]
  );
};

export default useDeviceOrientationGrant;
