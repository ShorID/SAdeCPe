import React from "react";
import PropTypes from "prop-types";
import Drawer from ".";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import fetcher from "@/services/fetcher";

const TrainerDrawer = (props) => {
  const [formData, setFormData] = React.useState(
    props.data || {
      active: true,
    }
  );
  const [validated, setValidated] = React.useState([]);
  const [orgs, setOrgs] = React.useState([]);

  React.useEffect(() => {
    fetcher({
      url: "/org",
    }).then(({ data }) => setOrgs(data));
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
      url: "/trainer/" + (props.isCreating ? "create" : "update"),
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
      header={props.isCreating ? "Crear Capacitador" : "Editar Capacitador"}
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
        label="Identificacion"
        name="identification"
        onChange={handleChange}
        required
        value={formData["identification"]}
      />
      <CustomInput
        label="Organizacion"
        type="select"
        name="orgId"
        onChange={handleChange}
        value={formData["orgId"]}
        required
      >
        <option></option>
        {Array.isArray(orgs) &&
          orgs.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
      </CustomInput>
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
    </Drawer>
  );
};

TrainerDrawer.propTypes = {
  data: PropTypes.object,
};

export default TrainerDrawer;
