import React, { useState } from "react";
import PropTypes from "prop-types";
import Drawer from ".";
import CustomInput from "../CustomInput";
import DateInput from "../DateInput";
import ColorPicker from "../ColorPicker";
import { Form } from "reactstrap";
import CustomButton from "../CustomButton";
import fetcher from "@/services/fetcher";
import moment from "moment";

const StatesDrawer = (props) => {
  const [formData, setFormData] = React.useState({
    active: true,
    creationDate: new Date(),
  });
  const [stateTypes, setStateTypes] = React.useState([]);
  const [validated, setValidated] = React.useState([]);

  React.useEffect(() => {
    fetcher({
      url: "/type-state",
    }).then(({ data }) => setStateTypes(data));
  }, []);

  const handleChange = ({ target: { value, name } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) return console.log("Error");
    fetcher({
      url: "/state/create",
      method: "POST",
      data: {
        ...formData,
        creationDate: moment(formData.creationDate).format("yyyy-MM-DD"),
      },
    }).then(({ data }) => data?.id && props.toggle());
  };

  return (
    <Drawer
      {...props}
      header={props.isCreating ? "Crear Estado" : "Editar Estado"}
      footer={
        <CustomButton text="Enviar" className="d-block ml-auto" type="submit" />
      }
      form={{
        validated,
        onSubmit: handleSubmit,
      }}
    >
      <CustomInput
        label="Nombre"
        name="name"
        onChange={handleChange}
        required
      />
      <CustomInput
        label="Descripcion"
        type="textarea"
        onChange={handleChange}
        name="description"
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
      <CustomInput
        label="Tipo de estado"
        type="select"
        name="stateType"
        onChange={handleChange}
        required
      >
        <option></option>
        {Array.isArray(stateTypes) &&
          stateTypes.map((item) => (
            <option value={item.id} key={item.id}>
              {item.nameType}
            </option>
          ))}
      </CustomInput>
      <ColorPicker
        label="Escoge un color para identificar tu estado"
        onChange={handleChange}
        name="color"
        required
      />
    </Drawer>
  );
};

StatesDrawer.propTypes = {
  toggle: PropTypes.func,
};

export default StatesDrawer;
