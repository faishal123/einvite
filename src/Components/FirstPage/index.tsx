import React from "react";
// import cover from "../../Images/cover.jpeg";
import css from "./FirstPage.module.scss";

const FirstPage = () => {
  return (
    <div className={css.container}>
      <div className={css.imageContainer}>
        <div className="basic-text-shadow-3 font-bodoni-moda font-18 margin--xlarge-b font-base-white font-letter-spacing-3">
          THE WEDDING OF
        </div>
        <div className={`font-great-vibes ${css.textContainer}`}>
          <div className="font-70 margin--medium-b">Vidya</div>
          <div className="font-40 margin--medium-b">&</div>
          <div className="font-70">Faishal</div>
        </div>
      </div>
      <div className={css.greyBackground1}>test</div>
      <div className={css.whiteBackground}></div>
      <div className={css.greyBackground2}></div>
    </div>
  );
};

export default FirstPage;
