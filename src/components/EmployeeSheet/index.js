import React from "react";
import Text from "../Text";
import CustomInput from "../CustomInput";
import { getFormatedDate } from "@/services/common";
import fetcher from "@/services/fetcher";
import { Form, Spinner } from "reactstrap";
import FileInput from "../FileInput";
import CustomButton from "../CustomButton";
import { useRouter } from "next/router";
import DateInput from "../DateInput";

const EmployeeSheet = (props) => {
  const [formData, setFormData] = React.useState(
    props.data || {
      active: true,
      admissionDate: getFormatedDate(),
    }
  );
  const [departaments, setDepartaments] = React.useState([]);
  const [employeesPosition, setEmployeesPosition] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    fetcher({
      url: "/departament",
    }).then(({ data }) => setDepartaments(data));
    if (props.data)
      getEmployeesPosition({
        field: "id",
        value: props.data.employeePositionId,
      });
  }, []);

  const getEmployeesPosition = async (params) => {
    setLoading(true);
    fetcher({
      url: "/employees-position",
      params,
    }).then(({ data }) => {
      setEmployeesPosition(data);
      setLoading(false);
    });
  };

  const handleChange = async ({ target: { value, name } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "departamentId" ? { employeePositionId: "0" } : {}),
    }));
    if (name === "departamentId") {
      getEmployeesPosition({
        field: "departamentId",
        value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === false) return console.log("Error");
    let newData = { ...formData };
    delete newData["departamentId"];
    fetcher({
      url: "/collaborator/" + (props.isCreating ? "create" : "update"),
      method: props.isCreating ? "POST" : "PUT",
      data: newData,
    }).then(({ data }) => {
      if (props.isCreating) {
        router.push(`/admin/empleados/${data.id}`);
      } else {
        router.reload();
      }
    });
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Text TagName="h5">
        {props.isCreating ? "Creando Empleado" : "Editando Empleado"}
      </Text>
      <div className="row">
        <div className="col-4">
          <CustomInput
            label="Nombre"
            name="name"
            onChange={handleChange}
            value={formData["name"]}
            className="w-100"
            required
          />
        </div>
        <div className="col-4">
          <CustomInput
            label="Apellido"
            onChange={handleChange}
            name="lastName"
            value={formData["lastName"]}
            className="w-100"
            required
          />
        </div>
        <div className="col-4">
          <CustomInput
            label="ID"
            onChange={handleChange}
            name="refNumber"
            value={formData["refNumber"]}
            className="w-100"
            required
          />
        </div>
      </div>
      <CustomInput
        label="Cedula"
        onChange={handleChange}
        name="identification"
        value={formData["identification"]}
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
        value={formData.admissionDate}
        onChange={handleChange}
        disabled
        name="admissionDate"
        required
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
      <CustomInput
        label={
          <>
            Cargo{" "}
            {loading && (
              <Spinner color="primary" size="sm" className="mx-1">
                Loading...
              </Spinner>
            )}
          </>
        }
        type="select"
        name="employeePositionId"
        onChange={handleChange}
        required
        disabled={loading}
        value={formData["employeePositionId"]}
      >
        <option value="0"></option>
        {Array.isArray(employeesPosition) &&
          employeesPosition.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
      </CustomInput>
      <FileInput onChange={handleChange} name="photo" value={formData["photo"]} required/>
      <CustomButton className="ml-auto d-block" type="submit">
        Guardar Cambios
      </CustomButton>
    </Form>
  );
};

EmployeeSheet.propTypes = {};

export default EmployeeSheet;
