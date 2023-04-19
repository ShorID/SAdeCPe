import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import CustomInput from "../CustomInput";
import fetcher from "@/services/fetcher";

const Tags = (props) => {
  const [trainingTags, setTrainingTags] = React.useState([]);

  React.useEffect(() => {
    fetcher({
      url: "/tag",
    }).then(
      ({ data }) =>
        Array.isArray(data) &&
        setTrainingTags(
          data.map((item) => ({ ...item, label: item.name, value: item.id }))
        )
    );
  }, []);

  return (
    <CustomInput label="Escoga los temas de esta capacitacion">
      <Select
        // defaultValue={[colourOptions[2], colourOptions[3]]}
        isMulti
        name="colors"
        options={trainingTags}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </CustomInput>
  );
};

Tags.propTypes = {};

export default Tags;
