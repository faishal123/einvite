import React from "react";
import flower from "../../../Images/flower1.svg";

type FlowerPropTypes = {
  style?: Record<string, unknown>;
};

const Flower: React.FC<FlowerPropTypes> = ({ style }) => {
  return <img style={style} src={flower} alt="flower" />;
};

export default Flower;
