import React, { useContext } from "react";
import { useGyroscope } from "../../Utils/gyroscope";
import { useLocation } from "react-router-dom";
import Button from "../Button";
import { AppContext } from "../../Utils/context";
import Flower from "../Flower";
import css from "./FirstPage.module.scss";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

type FirstPagePropTypes = {
  onClickCta: () => void;
  alreadyOpened: boolean;
};

const FirstPage: React.FC<FirstPagePropTypes> = ({
  onClickCta,
  alreadyOpened,
}) => {
  const { style } = useContext(AppContext);
  const { supported, backgroundPositionX, backgroundPositionY } =
    useGyroscope();

  const supportAccelerometer = supported;

  const query = useQuery();
  const name = (query.get("name") || "Yang Bersangkutan")?.toUpperCase();

  return (
    <div style={{ ...style }} className={css.container}>
      <div className={css.imageContainer}>
        {/* <div className={css.videoOverlay}></div>
        <video id="coverVideo" autoPlay playsInline muted loop>
          <source src={coverVideo} type="video/mp4" />
        </video> */}
      </div>
      <div className={css.greyBackground1}>
        <div className={css.textPosition}>
          <div className="basic-text-shadow-3 font-family-bodoni-moda font-size-15 margin--xlarge-b font-base-white font-letter-spacing-3">
            THE WEDDING OF
          </div>
          <div className="position-relative overflow-hidden">
            <Flower
              style={{
                width: "40%",
                position: "fixed",
                right: "-15%",
                bottom: "0rem",
              }}
            />
            <Flower
              style={{
                width: "40%",
                position: "fixed",
                left: "-15%",
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
              className={`font-family-great-vibes ${css.textContainer} ${
                !supportAccelerometer ? css.textShine : css.textGradient
              }`}
            >
              <div className="font-size-56 margin--medium-b">Vidya</div>
              <div className="font-size-32 margin--medium-b">&</div>
              <div className="font-size-56">Faishal</div>
            </div>
            <div className={`font-family-great-vibes ${css.textShadow}`}>
              <div className="font-size-56 margin--medium-b">Vidya</div>
              <div className="font-size-32 margin--medium-b">&</div>
              <div className="font-size-56">Faishal</div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`font-family-neuton font-letter-spacing-2 ${css.whiteBackground}`}
      >
        <div className="font-size-15 font-weight-regular">Kepada Yth.</div>
        <div className="font-size-18 font-weight-medium ">{name}</div>

        <div className="font-size-15 font-transparent">Kepada Yth.</div>
      </div>
      <div className={css.greyBackground2}>
        <Button
          width="80%"
          text={`${alreadyOpened ? "LIHAT" : "BUKA"} UNDANGAN`}
          onClick={onClickCta}
        />
      </div>
    </div>
  );
};

export default FirstPage;
