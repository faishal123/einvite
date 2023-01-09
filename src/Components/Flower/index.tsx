import React from "react";
import flower from "../../Images/flower1.svg";
import css from "./Flower.module.scss";

type FlowerPropTypes = {
  style?: Record<string, unknown>;
  opacity?: string;
  variant?: "black" | "white";
};

const Flower: React.FC<FlowerPropTypes> = ({
  style,
  opacity = "0.3",
  variant = "white",
}) => {
  const isBlack = variant === "black";
  return (
    <img
      className={isBlack ? css.black : css.white}
      style={{ opacity, ...style }}
      src={flower}
      alt="flower"
    />
  );
};

export default Flower;
