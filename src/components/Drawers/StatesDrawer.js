import React, { useState } from "react";
import PropTypes from "prop-types";
import Drawer from ".";
import CustomInput from "../CustomInput";
import DateInput from "../DateInput";
import { SketchPicker } from "react-color";

const pp = {
  estadoID: "number",
  nombre: "string",
  descripcion: "string",
  color: "string",
  fechaCreacion: "string",
  activo: "boolean",
};

const StatesDrawer = (props) => {
  const [color, setColor] = useState();
  const handleChange = (color) => setColor(color.hex);
  return (
    <Drawer
      {...props}
      header={props.isCreating ? "Crear Horario" : "Editar Horario"}
    >
      <CustomInput label="Nombre" />
      <CustomInput label="Descripcion" type="textarea" />
      <CustomInput label="Activo" type="switch" role="switch" />
      <DateInput label="Fecha de Creacion" disabled />
      <CustomInput label="Creador" />
      <SketchPicker onChange={handleChange} color={color} />
    </Drawer>
  );
};

StatesDrawer.propTypes = {};

export default StatesDrawer;
