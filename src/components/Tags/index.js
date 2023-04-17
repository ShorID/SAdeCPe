import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import CustomInput from "../CustomInput";

const Tags = (props) => {
  return (
    <CustomInput label="Escoga los temas de esta capacitacion">
      <Select
        // defaultValue={[colourOptions[2], colourOptions[3]]}
        isMulti
        name="colors"
        // options={colourOptions}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </CustomInput>
  );
};

Tags.propTypes = {};

export default Tags;
