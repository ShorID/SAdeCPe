import React from "react";
import Text from "../Text";
import CustomInput from "../CustomInput";
import { formatQuantity, getFormatedDate } from "@/services/common";
import DateInput from "../DateInput";
import Tags from "../Tags";
import DefaultList from "../DefaultList";
import { Button, Col, Form, Row } from "reactstrap";
import fetcher from "@/services/fetcher";
import CustomButton from "../CustomButton";
import { useRouter } from "next/router";
import drawerTypes from "../Drawers/drawerTypes";
import TrainingSession from "../TrainingSession";
import AddCollaboratorModal from "./AddCollaboratorModal";
import moment from "moment";

const TrainingSheet = (props) => {
  const [formData, setFormData] = React.useState(
    props.data || {
      external: false,
      certificated: false,
      totalColEnrolled: 0,
      totalSession: 0,
      creationDate: getFormatedDate(),
      active: true,
    }
  );
  const [states, setStates] = React.useState([]);
  const [orgs, setOrgs] = React.useState([]);
  const [priorities, setPriorities] = React.useState([]);
  const [sessions, setSessions] = React.useState(props.data?.sessions || []);
  const [reasons, setReasons] = React.useState([]);
  const [collaborators, setCollaborators] = React.useState([]);
  const [addModal, setAddModal] = React.useState(false);
  const [validated, setValidated] = React.useState([]);

  const router = useRouter();
  console.log("prro wtf", sessions);
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
  const getReasons = () =>
    fetcher({ url: "/reason" }).then(({ data }) => {
      if (Array.isArray(data)) {
        setReasons(data);
        if (data.length)
          handleChange({
            target: { value: data[0].id, name: "reasonId" },
          });
      }
    });

  React.useEffect(() => {
    getStates();
    getOrgs();
    getPriorities();
    getReasons();
  }, []);

  const handleSelect = (selectedItems, { cleanSelected }) => {
    if (Array.isArray(selectedItems)) {
      setCollaborators(selectedItems);
      setAddModal(() => cleanSelected);
      handleChange({
        target: { value: selectedItems.length, name: "totalColEnrolled" },
      });
    }
  };

  const handleAddSession = () => {
    setSessions((prev) => [...prev, { active: true }]);
    handleChange({
      target: { value: sessions.length + 1, name: "totalSession" },
    });
  };

  const addModalToggle = () => setAddModal((prev) => !prev);

  const handleChangeSession = (idx) => (newData) => {
    let total = 0;
    sessions.forEach(function (a, key) {
      if (idx === key) {
        total += Array.isArray(newData.collaborators)
          ? newData.collaborators.length
          : 0;
      } else {
        total += Array.isArray(a.collaborators) ? a.collaborators.length : 0;
      }
    });
    handleChange({
      target: {
        value: total,
        name: "totalColEnrolled",
      },
    });
    setSessions((prev) =>
      prev.map((item, key) => (key === idx ? { ...item, ...newData } : item))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) return console.log("Error");
    let totalSession = sessions.length;
    let allCollaborators = [];
    let totalColEnrolled = 0;

    sessions.forEach((item) => {
      const newCollaborators = allCollaborators.filter(
        (collaborator) =>
          !item.collaborators.some(
            (savedCollaborators) => savedCollaborators.id === collaborator.id
          )
      );
      allCollaborators = [...allCollaborators, ...newCollaborators];
      totalColEnrolled = allCollaborators.length;
    });

    fetcher({
      url: "/capacitation/" + (props.isCreating ? "create" : "update"),
      method: props.isCreating ? "POST" : "PUT",
      data: {
        ...formData,
        tags:
          Array.isArray(formData.tags) &&
          formData.tags.map((item) =>
            item["__isNew__"] ? { ...item, isNew: true } : item
          ),
        totalColEnrolled,
        totalSession,
        inatecBackground: formData.inatecBackground || 0,
        sessions: sessions.map((item) => ({
          dates: item.formattedDate,
          centerId: item.centerId,
          timeRange: [
            moment(item.from).format("HH:mm"),
            moment(item.to).format("HH:mm"),
          ],
          collaborators: item.collaborators?.map((item) => item.id).join(","),
          trainerId: item.trainerId,
        })),
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
      <Tags name="tags" onChange={handleChange} value={formData["tags"]} />
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
            name="reasonId"
            onChange={handleChange}
            required
            value={formData["reasonId"]}
          >
            {Array.isArray(reasons) &&
              reasons.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
          </CustomInput>
        </Col>
        <Col>
          <CustomInput
            label="Fondo de Exoneracion ($)"
            name="inatecBackground"
            type="number"
            value={formData.inatecBackground}
            onChange={handleChange}
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
            disabled
          />
        </Col>
        <Col md="4" sm="12">
          <CustomInput
            label="Cantidad de sesiones"
            type="number"
            value={sessions.length}
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
      <Text TagName="h6" className="Form-title">
        Añade las sesiones que tendra tu capacitacion!
      </Text>
      {sessions.map((item, key) => (
        <TrainingSession
          title={`Sesion ${key + 1}`}
          data={item}
          onChange={handleChangeSession(key)}
          costUnit={formData.costUnit}
        />
      ))}
      <Button
        color="warning"
        className="w-100 my-2"
        type="button"
        onClick={handleAddSession}
      >
        Añadir Sesion
      </Button>
      <Text
        TagName="h6"
        className="Form-title"
        text={`Selecciona los participantes de esta capacitacion!`}
      />
      {addModal && (
        <AddCollaboratorModal
          isOpen
          toggle={addModalToggle}
          collaborators={collaborators}
          sessions={sessions}
          onSubmit={addModal}
          handleChangeSession={handleChangeSession}
        />
      )}
      <DefaultList
        title="Empleados"
        endpoint="/collaborator"
        listId="employees"
        filters="employeePos,departament"
        itemsQuantity={5}
        withoutEdit
        withoutDelete
        onSaveSelected={handleSelect}
      />
      <CustomButton text="Guardar" type="submit" />
    </Form>
  );
};

TrainingSheet.propTypes = {};

export default TrainingSheet;
