import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import CustomInput from "../CustomInput";
import fetcher from "@/services/fetcher";

const Tags = (props) => {
  const [trainingTags, setTrainingTags] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [newTag, setNewTag] = React.useState("");
  const [newTagCount, setNewTagCount] = React.useState(0);

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

  React.useEffect(() => {
    if (props.onChange)
      props.onChange({ target: { value: selected, name: props.name } });
  }, [selected]);

  const handleChange = (newValue = "") => {
    setNewTag(newValue);
  };

  const handleSelect = (newValue) => {
    setSelected(newValue);
  };

  const handleKey = (e) => {
    if ((e.key === "Enter" || e.keyCode === 13) && newTag) {
      e.nativeEvent.preventDefault();
      const newValue = { isNew: true, label: newTag, value: newTagCount };
      setNewTagCount((prev) => prev - 1);
      setNewTag("");
      setSelected((prev) => [...prev, newValue]);
      return setTrainingTags((prev) => [...prev, newValue]);
    }
  };

  return (
    <CustomInput
      label="Escoga los temas de esta capacitacion"
      hint="Puedes añadir tu tema tan solo presionando 'Enter'"
    >
      <Select
        defaultValue={props.value}
        isMulti
        value={selected}
        name={props.name}
        options={trainingTags}
        inputValue={newTag}
        className="basic-multi-select"
        classNamePrefix="select"
        onInputChange={handleChange}
        onChange={handleSelect}
        onKeyDown={handleKey}
      />
    </CustomInput>
  );
};

Tags.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default Tags;
