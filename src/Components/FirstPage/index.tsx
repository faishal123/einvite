import React, { useEffect, useState } from "react";
// import cover from "../../Images/cover.jpeg";
import css from "./FirstPage.module.scss";

const FirstPage = () => {
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

  return (
    <div className={css.container}>
      <div className={css.imageContainer}></div>
      <div className={css.greyBackground1}>
        <div className={css.textPosition}>
          <div className="basic-text-shadow-3 font-bodoni-moda font-18 margin--xlarge-b font-base-white font-letter-spacing-3">
            THE WEDDING OF
          </div>
          <div className="position-relative">
            <div
              id="animated-text"
              style={{
                backgroundSize: supportAccelerometer ? "300%" : undefined,
                backgroundPositionX: supportAccelerometer
                  ? `${accelerometerX}%`
                  : undefined,
                backgroundPositionY: supportAccelerometer
                  ? `${accelerometerY}%`
                  : undefined,
              }}
              className={`font-great-vibes ${css.textContainer} ${
                !supportAccelerometer ? css.textShine : css.textGradient
              }`}
            >
              <div className="font-70 margin--medium-b">Vidya</div>
              <div className="font-40 margin--medium-b">&</div>
              <div className="font-70">Faishal</div>
            </div>
            <div className={`font-great-vibes ${css.textShadow}`}>
              <div className="font-70 margin--medium-b">Vidya</div>
              <div className="font-40 margin--medium-b">&</div>
              <div className="font-70">Faishal</div>
            </div>
          </div>
        </div>
      </div>
      <div className={css.whiteBackground}></div>
      <div className={css.greyBackground2}></div>
    </div>
  );
};

export default FirstPage;
