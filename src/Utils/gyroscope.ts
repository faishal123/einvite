import { useEffect, useState } from "react";

export const useGyroscope = () => {
  //gamma is phone's side rotation
  //beta is phone's up and down rotation
  const [accelerometerData, setAccelerometerData] =
    useState<DeviceOrientationEvent | null>(null);
  useEffect(() => {
    window.addEventListener("deviceorientation", (e) => {
      setAccelerometerData(e);
    });
  }, []);

  const supportAccelerometer =
    accelerometerData?.alpha !== null &&
    accelerometerData?.beta !== null &&
    accelerometerData?.gamma !== null;

  let accelerometerX = 0;
  let accelerometerY = 0;
  if (supportAccelerometer) {
    accelerometerX = (((accelerometerData?.gamma || 0) + 90) / 180) * 100;
    accelerometerY = (((accelerometerData?.beta || 0) + 90) / 180) * 100;
  }

  return {
    gamma: accelerometerData?.gamma,
    beta: accelerometerData?.beta,
    x: accelerometerX,
    y: accelerometerY,
    supported: supportAccelerometer,
    backgroundPositionX: supportAccelerometer
      ? `${accelerometerX}%`
      : undefined,
    backgroundPositionY: supportAccelerometer
      ? `${accelerometerY}%`
      : undefined,
  };
};
