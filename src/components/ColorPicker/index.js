import React from "react";
import CustomInput from "../CustomInput";
import { SketchPicker } from "react-color";
import Popup from "../Popup";

const ColorPicker = (props) => {
  const [color, setColor] = React.useState();
  const handleChange = (color) => {
    setColor(color.hex);
    if (typeof props.onChange === "function")
      props.onChange({ target: { value: color.hex , name: props.name } });
  };
  return (
    <Popup
      title="Elige un color"
      description={<SketchPicker onChange={handleChange} color={color} />}
    >
      <CustomInput
        {...props}
        value={color}
        style={{ backgroundColor: color }}
      ></CustomInput>
    </Popup>
  );
};

ColorPicker.propTypes = CustomInput.propTypes;

export default ColorPicker;
