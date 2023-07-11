import React from "react";
import PropTypes from "prop-types";
import Drawer from ".";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import DateInput from "../DateInput";
import fetcher from "@/services/fetcher";
import { getFormatedDate } from "@/services/common";
import FileInput from "../FileInput";
import { toast } from "react-toastify";
import { promiseToastMsg } from "@/services/toastService";

const OrgDrawer = (props) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) return console.log("Error");
    toast.promise(
      fetcher({
        url: "/org/" + (props.isCreating ? "create" : "update"),
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
      header={props.isCreating ? "Crear Organizacion" : "Editar Organizacion"}
      footer={
        <CustomButton text="Enviar" className="d-block ml-auto" type="submit" />
      }
      form={{
        onSubmit: handleSubmit,
      }}
    >
      <CustomInput
        label="Nombre"
        name="name"
        onChange={handleChange}
        required
        value={formData["name"]}
      />
      <CustomInput
        label="Descripcion"
        type="textarea"
        onChange={handleChange}
        name="description"
        required
        value={formData["description"]}
      />
      <CustomInput
        label="Direccion"
        type="textarea"
        onChange={handleChange}
        name="address"
        required
        value={formData["address"]}
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
      <FileInput
        onChange={handleChange}
        name="photo"
        value={formData["photo"]}
        required
      />
    </Drawer>
  );
};

OrgDrawer.propTypes = {
  data: PropTypes.object,
};

export default OrgDrawer;
