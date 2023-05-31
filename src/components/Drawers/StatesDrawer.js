import React, { useState } from "react";
import PropTypes from "prop-types";
import Drawer from ".";
import CustomInput from "../CustomInput";
import DateInput from "../DateInput";
import ColorPicker from "../ColorPicker";
import { Form } from "reactstrap";
import CustomButton from "../CustomButton";
import fetcher from "@/services/fetcher";
import { getFormatedDate } from "@/services/common";
import { toast } from "react-toastify";
import { promiseToastMsg } from "@/services/toastService";

const StatesDrawer = (props) => {
  const [formData, setFormData] = React.useState(
    props.data || {
      active: true,
      creationDate: getFormatedDate(),
    }
  );
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
    toast.promise(
      fetcher({
        url: "/state/" + (props.isCreating ? "create" : "update"),
        method: props.isCreating ? "POST" : "PUT",
        data: formData,
      }).then(() => {
        props.toggle();
        props.refresh();
      }),
      promiseToastMsg
    );
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
      <CustomInput
        label="Tipo de estado"
        type="select"
        name="stateType"
        onChange={handleChange}
        value={formData["stateType"]}
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
        value={formData["color"]}
        required
      />
    </Drawer>
  );
};

StatesDrawer.propTypes = {
  toggle: PropTypes.func,
  refresh: PropTypes.func,
  data: PropTypes.object,
};

export default StatesDrawer;
