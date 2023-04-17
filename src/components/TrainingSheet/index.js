import React from "react";
import PropTypes from "prop-types";
import Text from "../Text";
import CustomInput from "../CustomInput";
import { getFormatedDate } from "@/services/common";
import DateInput from "../DateInput";
import CustomCalendar from "../CustomCalendar";
import Tags from "../Tags";

const TrainingSheet = (props) => {
  const [formData, setFormData] = React.useState(
    props.data || {
      active: true,
      creationDate: getFormatedDate(),
    }
  );
  const [validated, setValidated] = React.useState([]);

  const handleChange = ({ target: { value, name } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <Text TagName="h5">
        {props.isCreating ? "Creando Capacitacion" : "Editando Capacitacion"}
      </Text>
      <CustomInput
        label="Nombre"
        name="name"
        onChange={handleChange}
        value={formData["name"]}
        required
      />
      <CustomInput
        label="Descripcion"
        type="textarea"
        onChange={handleChange}
        name="description"
        value={formData["description"]}
        required
      />
      <CustomInput
        label="Activo"
        type="switch"
        role="switch"
        name="active"
        value={formData.active}
        onChange={() =>
          setFormData((prev) => ({ ...prev, active: !prev.active }))
        }
        required
      />
      <DateInput
        label="Fecha de Creacion"
        value={formData.creationDate}
        onChange={handleChange}
        disabled
        name="creationDate"
        required
      />
      <Tags />
      <CustomCalendar></CustomCalendar>
      <Text
        TagName="h6"
        className="CustomCalendar-title mt-3"
        text="Selecciona los participantes de esta capacitacion."
      />
    </>
  );
};

TrainingSheet.propTypes = {};

export default TrainingSheet;
