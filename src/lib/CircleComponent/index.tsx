import React from "react";
import { Circle } from "./styled";

interface CircleProps {
  color?: string;
}

function CircleComponent({ color = "blue" }: CircleProps) {
  return <Circle color={color} />;
}

export default CircleComponent;
