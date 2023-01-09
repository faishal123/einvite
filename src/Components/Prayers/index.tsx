/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useContext } from "react";
import { AppContext } from "../../Utils/context";
import css from "./Prayers.module.scss";
import { useWindowSize } from "../../Utils/common";
import maskIcon from "../../Images/mask.svg";
import distanceIcon from "../../Images/distance.svg";
import temperatureIcon from "../../Images/temperature.svg";
import washHandIcon from "../../Images/washhand.svg";
import { SinglePrayerType } from "../../Utils/types";

type PrayersPropTypes = {
  prayers: SinglePrayerType[];
};

const cautionIcons = [maskIcon, distanceIcon, temperatureIcon, washHandIcon];

const Prayers: React.FC<PrayersPropTypes> = ({ prayers }) => {
  const { height } = useContext(AppContext);
  return (
    <div
      className={`box-sizing-border-box padding--xxlarge-b padding--xxlarge-t padding--xxlarge-l padding--xxlarge-r`}
      style={{ minHeight: height, transition: "0.2s" }}
    >
      {prayers?.length > 0 && (
        <>
          <div className="margin--large-b font-family-neuton font-size-20 font-letter-spacing-2 font-base-white font-align-justify">
            Sebuah Kebahagian yang sangat dalam bagi kami apabila
            Bapak/Ibu/Saudara/i semua turut mendoakan pada hari bahagia kami.
          </div>
          <div className={css.prayersContainer}>
            {prayers?.map((prayer, i) => {
              const prayersLength = prayers?.length;
              const isLast = i + 1 === prayersLength;
              return (
                <div
                  className={`${!isLast ? "margin--large-b" : ""} ${
                    css.singlePrayer
                  }`}
                  key={`${prayer?.prayer}${i}`}
                >
                  <div className="font-size-15 font-weight-medium margin--xsmall-b">
                    {prayer?.name}
                  </div>
                  <div>{prayer?.prayer}</div>
                </div>
              );
            })}
          </div>
          <div className={css.line}></div>
        </>
      )}
      <div className="font-base-white margin--xxxlarge-t font-align-justify font-letter-spacing-2 font-family-neuton font-size-20">
        Dengan tidak mengurangi rasa hormat kami, untuk menjaga kesehatan kita
        semua serta tetap mengikuti protokol kesehatan yang berlaku dimasa
        pandemi. Semoga kita semua senantiasa diberikan kesehatan & kebahagiaan,
        Amin.
      </div>
      <div className={css.covidCautionContainer}>
        {cautionIcons?.map((icon) => (
          <div className={css.covidCaution}>
            <img src={icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prayers;
