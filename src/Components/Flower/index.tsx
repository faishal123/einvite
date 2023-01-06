import React from "react";
import flower from "../../Images/flower1.svg";

type FlowerPropTypes = {
  style?: Record<string, unknown>;
  opacity?: string;
};

const Flower: React.FC<FlowerPropTypes> = ({ style, opacity = "0.3" }) => {
  return <img style={{ opacity, ...style }} src={flower} alt="flower" />;
};

export default Flower;
