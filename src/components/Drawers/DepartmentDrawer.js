import React from "react";
import PropTypes from "prop-types";
import Drawer from ".";
import CustomButton from "../CustomButton";
import { Form } from "reactstrap";
import CustomInput from "../CustomInput";
import DateInput from "../DateInput";
import fetcher from "@/services/fetcher";
import moment from "moment";

const DepartmentDrawer = (props) => {
  const [formData, setFormData] = React.useState({
    active: true,
    creationDate: new Date(),
  });
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
    fetcher({
      url: "/departament/create",
      method: "POST",
      data: {
        ...formData,
        creationDate: moment(formData.creationDate).format("yyyy-mm-dd"),
      },
    });
  };

  return (
    <Drawer
      {...props}
      header={props.isCreating ? "Crear Departamento" : "Editar Departamento"}
      footer={
        <CustomButton text="Enviar" className="d-block ml-auto" type="submit" />
      }
    >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
        <CustomButton text="Enviar" className="d-block ml-auto" type="submit" />
      </Form>
    </Drawer>
  );
};

DepartmentDrawer.propTypes = {};

export default DepartmentDrawer;
