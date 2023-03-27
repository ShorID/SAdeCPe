import React from "react";
import PropTypes from "prop-types";
import Drawer from ".";
import CustomInput from "../CustomInput";
import DateInput from "../DateInput";

const SchedulesDrawer = (props) => {
  return (
    <Drawer
      {...props}
      header={props.isCreating ? "Crear Horario" : "Editar Horario"}
    >
      <CustomInput label="Nombre" />
      <CustomInput label="Activo" type="switch" role="switch" />
      <DateInput label="Fecha de Creacion" disabled />
      <CustomInput label="Creador" />
    </Drawer>
  );
};

SchedulesDrawer.propTypes = {
  isCreating: PropTypes.bool,
};

export default SchedulesDrawer;
