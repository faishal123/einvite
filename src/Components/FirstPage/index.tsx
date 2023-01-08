import React, { useEffect, useState } from "react";
// import cover from "../../Images/cover.jpeg";
import { useGyroscope } from "../../Utils/gyroscope";
import { useLocation } from "react-router-dom";
import Button from "../Button";
import Flower from "../Flower";
import cover from "../../Images/cover.mp4";
import coverGif from "../../Images/cover.gif";
import css from "./FirstPage.module.scss";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

type FirstPagePropTypes = {
  onClickCta: () => void;
};

const FirstPage: React.FC<FirstPagePropTypes> = ({ onClickCta }) => {
  const { supported, backgroundPositionX, backgroundPositionY } =
    useGyroscope();

  const supportAccelerometer = supported;

  const query = useQuery();
  const name = (query.get("name") || "Yang Bersangkutan")?.toUpperCase();

  return (
    <div className={css.container}>
      <div className={css.imageContainer}></div>
      <div className={css.greyBackground1}>
        <div className={css.textPosition}>
          <div className="basic-text-shadow-3 font-bodoni-moda font-15 margin--xlarge-b font-base-white font-letter-spacing-3">
            THE WEDDING OF
          </div>
          <div className="position-relative overflow-hidden">
            <Flower
              style={{
                width: "40%",
                position: "fixed",
                right: "-15%",
                opacity: "0.3",
                bottom: "0rem",
              }}
            />
            <Flower
              style={{
                width: "40%",
                position: "fixed",
                left: "-15%",
                opacity: "0.3",
                bottom: "0rem",
              }}
            />
            <div
              id="animated-text"
              style={{
                backgroundSize: supportAccelerometer ? "300%" : undefined,
                backgroundPositionX,
                backgroundPositionY,
              }}
              className={`font-great-vibes ${css.textContainer} ${
                !supportAccelerometer ? css.textShine : css.textGradient
              }`}
            >
              <div className="font-56 margin--medium-b">Vidya</div>
              <div className="font-32 margin--medium-b">&</div>
              <div className="font-56">Faishal</div>
            </div>
            <div className={`font-great-vibes ${css.textShadow}`}>
              <div className="font-56 margin--medium-b">Vidya</div>
              <div className="font-32 margin--medium-b">&</div>
              <div className="font-56">Faishal</div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`font-neuton font-letter-spacing-2 ${css.whiteBackground}`}
      >
        <div className="font-15 font-regular">Kepada Yth.</div>
        <div className="font-18 font-medium ">{name}</div>

        <div className="font-15 font-transparent">Kepada Yth.</div>
      </div>
      <div className={css.greyBackground2}>
        <Button width="80%" text="BUKA UNDANGAN" onClick={onClickCta} />
      </div>
    </div>
  );
};

export default FirstPage;
