import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function RangeSlider({
  min,
  max,
  value,
  handleSlide,
  minType,
  maxType,
  steps,
}) {
  const marks = {
    [value[0]]: `${value[0]} ${minType}`,
    [value[1]]: `${value[1]} ${maxType}`,
  };

  return (
    <Slider
      range
      min={min}
      max={max}
      marks={marks}
      allowCross={false}
      value={value}
      reverse
      step={steps}
      onChange={handleSlide}
      trackStyle={[{ backgroundColor: "#410c9e", opacity: 1 }]}
      railStyle={{ backgroundColor: "#d3d3d3" }}
      handleStyle={[
        {
          borderColor: "#410c9e",
          backgroundColor: "#410c9e",
          opacity: 1,
          boxShadow: "none",
        },
        {
          borderColor: "#410c9e",
          backgroundColor: "#410c9e",
          opacity: 1,
          boxShadow: "none",
        },
      ]}
    />
  );
}

export default RangeSlider;
