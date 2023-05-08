import React from "react";
import PropTypes from "prop-types";
import Text from "../Text";
import CustomInput from "../CustomInput";
import { formatQuantity, getFormatedDate } from "@/services/common";
import DateInput from "../DateInput";
import CustomCalendar from "../CustomCalendar";
import Tags from "../Tags";
import DefaultList from "../DefaultList";
import { Col, Form, Row, Table } from "reactstrap";
import fetcher from "@/services/fetcher";
import ReactInputMask from "react-input-mask";
import CustomButton from "../CustomButton";
import { useRouter } from "next/router";
import drawerTypes from "../Drawers/drawerTypes";
import TrainingSessions from "../TrainingSession";
import TrainingSession from "../TrainingSession";

const TrainingSheet = (props) => {
  const [formData, setFormData] = React.useState(
    props.data || {
      external: false,
      certificated: false,
      totalColEnrolled: 0,
      totalSession: 0,
      creationDate: getFormatedDate(),
    }
  );
  const [states, setStates] = React.useState([]);
  const [orgs, setOrgs] = React.useState([]);
  const [priorities, setPriorities] = React.useState([]);
  const [validated, setValidated] = React.useState([]);

  const router = useRouter();

  const handleChange = ({ target: { value, name } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getStates = () =>
    fetcher({
      url: "/state",
      params: {
        field: "stateType",
        value: 1,
      },
    }).then(({ data }) => {
      if (Array.isArray(data)) setStates(data);
      if (data.length)
        handleChange({ target: { value: data[0].id, name: "stateId" } });
    });

  const getOrgs = () =>
    fetcher({ url: "/org" }).then(({ data }) => {
      if (Array.isArray(data)) {
        setOrgs(data);
        if (data.length)
          handleChange({ target: { value: data[0].id, name: "orgId" } });
      }
    });

  const getPriorities = () =>
    fetcher({ url: "/priority" }).then(({ data }) => {
      if (Array.isArray(data)) {
        setPriorities(data);
        if (data.length)
          handleChange({
            target: { value: data[0].id, name: "levelPrioryId" },
          });
      }
    });

  React.useEffect(() => {
    getStates();
    getOrgs();
    getPriorities();
  }, []);

  const handleSelect = (selectedItems) => {
    if (Array.isArray(selectedItems)) {
      handleChange({
        target: { value: selectedItems.length, name: "totalColEnrolled" },
      });
      handleChange({
        target: {
          value: selectedItems,
          name: "collaborators",
        },
      });
    }
  };
  const handleSession = (selectedItems) => {
    if (Array.isArray(selectedItems)) {
      handleChange({
        target: { value: selectedItems.length, name: "totalSession" },
      });
      handleChange({
        target: { value: selectedItems, name: "sessions" },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) return console.log("Error");
    fetcher({
      url: "/capacitation/" + (props.isCreating ? "create" : "update"),
      method: props.isCreating ? "POST" : "PUT",
      data: {
        ...formData,
        costInitial: formData.costUnit * formData.totalColEnrolled,
        costFinal:
          formData.costUnit * formData.totalColEnrolled * formData.totalSession,
        totalColFin: 0,
      },
    }).then(({ data }) => {
      if (props.isCreating) {
        router.push(`/admin/capacitaciones/${data.id}`);
      } else {
        router.reload();
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Text TagName="h5" className="Form-title mt-0">
        {props.isCreating ? "Creando Capacitacion" : "Editando Capacitacion"}
      </Text>
      <Row>
        <Col sm="sm" md="9">
          <CustomInput
            label="Nombre"
            name="name"
            onChange={handleChange}
            value={formData["name"]}
            required
          />
        </Col>
        <Col sm="12" md="3">
          <CustomInput
            label="Estado"
            type="select"
            name="stateId"
            onChange={handleChange}
            required
            value={formData["stateId"]}
            Drawer={drawerTypes["states"]}
            refreshFunc={getStates}
          >
            {Array.isArray(states) &&
              states.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
          </CustomInput>
        </Col>
      </Row>
      <CustomInput
        label="Descripcion"
        type="textarea"
        onChange={handleChange}
        name="description"
        value={formData["description"]}
        required
      />
      <Row>
        <Col sm="12" md="6">
          <CustomInput
            label="Organizacion"
            type="select"
            name="orgId"
            onChange={handleChange}
            required
            value={formData["orgId"]}
            Drawer={drawerTypes["org"]}
            refreshFunc={getOrgs}
          >
            {Array.isArray(orgs) &&
              orgs.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
          </CustomInput>
        </Col>
        <Col sm="12" md="6">
          <CustomInput
            label="Prioridad"
            type="select"
            name="levelPrioryId"
            onChange={handleChange}
            required
            value={formData["levelPrioryId"]}
            Drawer={drawerTypes["priorityLevel"]}
            refreshFunc={getPriorities}
          >
            {Array.isArray(priorities) &&
              priorities.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
          </CustomInput>
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <CustomInput
            label="Tiene certificado?"
            type="switch"
            role="switch"
            name="certificated"
            value={formData.certificated}
            onChange={() =>
              setFormData((prev) => ({
                ...prev,
                certificated: !prev.certificated,
              }))
            }
            required
          />
        </Col>
        <Col md="3">
          <CustomInput
            label="Es externa?"
            type="switch"
            role="switch"
            name="external"
            value={formData.external}
            onChange={() =>
              setFormData((prev) => ({ ...prev, external: !prev.external }))
            }
            required
          />
        </Col>
      </Row>
      <DateInput
        label="Fecha de Creacion"
        value={formData.creationDate}
        onChange={handleChange}
        disabled
        name="creationDate"
        required
      />
      <Tags name="tags" onChange={handleChange} />
      <Text TagName="h6" className="Form-title" text={`Precios y costos.`} />
      <Row>
        <Col>
          <CustomInput
            label="Costo unitario por persona ($)"
            name="costUnit"
            type="number"
            value={formData.costUnit}
            onChange={handleChange}
            required
          />
        </Col>
        <Col>
          <CustomInput
            label="Tipo de exoneracion"
            type="select"
            name="levelPrioryId"
            // onChange={handleChange}
            required
            // value={formData["levelPrioryId"]}
          >
            <option>Fondo Inatec</option>
            <option>Proveedor horas gratuitas</option>
            <option>Por la organizacion</option>
          </CustomInput>
        </Col>
        <Col>
          <CustomInput
            label="Fondo de Exoneracion ($)"
            name="inatecBackground"
            type="number"
            value={formData.inatecBackground}
            onChange={handleChange}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col md="4" sm="12">
          <CustomInput
            label="Cantidad de personas a capacitar"
            type="number"
            name="totalColEnrolled"
            value={formData.totalColEnrolled}
            onChange={handleChange}
            required
          />
        </Col>
        <Col md="4" sm="12">
          <CustomInput
            label="Cantidad de sesiones"
            type="number"
            value={formData.totalSession}
            disabled
            required
          />
        </Col>
        <Col sm="12">
          <CustomInput
            label="Costo inicial ($)"
            name="total"
            value={formatQuantity(
              formData.costUnit * formData.totalColEnrolled
            )}
            onChange={handleChange}
            disabled
            required
          />
        </Col>
        <Col sm="12">
          <CustomInput
            label="Costo final ($)"
            value={formatQuantity(
              formData.costUnit *
                formData.totalColEnrolled *
                formData.totalSession
            )}
            disabled
            required
          />
        </Col>
      </Row>
      <Text
        TagName="h6"
        className="Form-title"
        text={`Selecciona los participantes de esta capacitacion!`}
      />
      <DefaultList
        title="Empleados"
        endpoint="/collaborator"
        listId="employees"
        filters="employeePos,departament"
        withoutEdit
        withoutDelete
        onSelect={handleSelect}
      />
      <Text
        TagName="h6"
        className="Form-title"
        text={`Empleados seleccionados (${formData.totalColEnrolled}).`}
      />
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombres</th>
            <th>Sesiones</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(formData.collaborators) &&
            formData.collaborators.map((item) => (
              <tr>
                <th scope="row">{item.id}</th>
                <td>{`${item.name} ${item.lastName}`}</td>
                <td>Todas las sesiones.</td>
                <td>{item.active ? "Si" : "No"}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Text
        TagName="h6"
        className="Form-title"
        text="Añade las sesiones que tendra tu capacitacion!"
      />
      <TrainingSession title="Sesion 1" />
      <CustomCalendar onChange={handleSession} />
      <CustomButton text="Guardar" />
    </Form>
  );
};

TrainingSheet.propTypes = {};

export default TrainingSheet;
