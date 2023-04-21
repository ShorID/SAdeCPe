import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import CustomInput from "../CustomInput";
import fetcher from "@/services/fetcher";

const Tags = (props) => {
  const [trainingTags, setTrainingTags] = React.useState([]);
  const [newTag, setNewTag] = React.useState("");

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

  const handleChange = (newValue = "") => {
    setNewTag(newValue);
  };
  const handleKey = (e) => {
    if ((e.key === "Enter" || e.keyCode === 13) && newTag)
      return setTrainingTags((prev) => [
        ...prev,
        { isNew: true, label: newTag, value: 0 },
      ]);
  };

  return (
    <CustomInput label="Escoga los temas de esta capacitacion">
      <Select
        // defaultValue={[colourOptions[2], colourOptions[3]]}
        isMulti
        name="colors"
        options={trainingTags}
        inputValue={newTag}
        className="basic-multi-select"
        classNamePrefix="select"
        onInputChange={handleChange}
        onKeyDown={handleKey}
      />
    </CustomInput>
  );
};

Tags.propTypes = {};

export default Tags;
