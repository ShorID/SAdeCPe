import React from "react";
import PropTypes from "prop-types";
import CreatableSelect from "react-select/creatable";
import CustomInput from "../CustomInput";
import fetcher from "@/services/fetcher";

const Tags = (props) => {
  const [trainingTags, setTrainingTags] = React.useState([]);
  const [selected, setSelected] = React.useState(props.value || []);

  React.useEffect(() => {
    fetcher({
      url: "/tag",
    }).then(
      ({ data }) =>
        Array.isArray(data) &&
        setTrainingTags(
          data.map((item) => ({
            ...item,
            label: item.name,
            value: item.id,
            tagId: item.id,
          }))
        )
    );
  }, []);

  React.useEffect(() => {
    if (props.onChange)
      props.onChange({ target: { value: selected, name: props.name } });
  }, [selected]);

  const handleSelect = (newValue) => {
    setSelected(newValue);
  };

  return (
    <CustomInput
      label="Escoja los temas de esta capacitacion"
      hint="Puedes añadir tu tema tan solo presionando 'Enter'"
    >
      <CreatableSelect
        defaultValue={props.value}
        isMulti
        value={selected}
        name={props.name}
        options={trainingTags}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleSelect}
        placeholder="Busca o agrega tu tema..."
        formatCreateLabel={(value) =>
          `Parece que el tema que buscas no existe, deseas crear "${value}" como tema?`
        }
      />
    </CustomInput>
  );
};

Tags.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default Tags;
