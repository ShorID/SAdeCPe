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

const EmployeesPositionDrawer = (props) => {
  const [formData, setFormData] = React.useState(
    props.data || {
      active: true,
      manager: false,
      creationDate: getFormatedDate(),
    }
  );
  const [validated, setValidated] = React.useState([]);
  const [departaments, setDepartaments] = React.useState([]);

  React.useEffect(() => {
    fetcher({
      url: "/departament",
    }).then(({ data }) => setDepartaments(data));
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
      url: "/employees-position/" + (props.isCreating ? "create" : "update"),
      method: props.isCreating ? "POST" : "PUT",
      data: formData,
    }).then(() => {
      props.toggle();
      props.refresh();
    });
  };

  return (
    <Drawer
      {...props}
      header={props.isCreating ? "Crear Cargo" : "Editar Cargo"}
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
      <CustomInput
        label="Gerente"
        type="switch"
        role="switch"
        name="manager"
        value={formData.manager}
        onChange={() =>
          setFormData((prev) => ({ ...prev, manager: !prev.active }))
        }
      />
      <CustomInput
        label="Departamento"
        type="select"
        name="departamentId"
        onChange={handleChange}
        required
        value={formData["departamentId"]}
      >
        <option value="0"></option>
        {Array.isArray(departaments) &&
          departaments.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
      </CustomInput>
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

EmployeesPositionDrawer.propTypes = {
  data: PropTypes.object,
};

export default EmployeesPositionDrawer;
