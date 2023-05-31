import React from "react";
import PropTypes from "prop-types";
import Drawer from ".";
import CustomButton from "../CustomButton";
import { Form } from "reactstrap";
import CustomInput from "../CustomInput";
import DateInput from "../DateInput";
import fetcher from "@/services/fetcher";
import moment from "moment";
import { getFormatedDate } from "@/services/common";
import { toast } from "react-toastify";
import { promiseToastMsg } from "@/services/toastService";

const DepartmentDrawer = (props) => {
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
        url: "/departament/" + (props.isCreating ? "create" : "update"),
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
      header={props.isCreating ? "Crear Departamento" : "Editar Departamento"}
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
    </Drawer>
  );
};

DepartmentDrawer.propTypes = {
  data: PropTypes.object,
};

export default DepartmentDrawer;
