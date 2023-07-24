import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";
import CustomButton from "../CustomButton";
import Text from "../Text";
import ReactSelect from "react-select";
import moment from "moment";

const Option = ({ innerProps, innerRef, data: { data } }) => {
  return (
    <div
      ref={innerRef}
      className="AddCollaboratorModal-sessionOpt"
      {...innerProps}
    >
      <Text TagName="div" bold>
        {data.title}
      </Text>
      {
        <Text TagName="div" size="sm">
          {Array.isArray(data.formattedDate)
            ? `De ${data.formattedDate[0]} hasta ${data.formattedDate[1]}`
            : "La sesion no cuenta con una fecha definida"}
        </Text>
      }
      <Text TagName="div" size="sm">{`Hora: ${
        data.from ? moment(data.from).format("h:mm a") : "?"
      } - ${data.to ? moment(data.to).format("h:mm a") : "?"}`}</Text>
    </div>
  );
};

const AddCollaboratorModal = (props) => {
  const [sessions, setSessions] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  React.useEffect(() => {
    if (Array.isArray(props.sessions)) {
      const tempSessions = props.sessions.map((item, key) => ({
        value: key,
        label: item.title,
        data: item,
      }));
      setSessions(tempSessions);
      setSelected(tempSessions);
    }
  }, [props.sessions]);

  const handleSave = () => {
    try {
      selected.forEach((item) => {
        const newData = {
          ...item.data,
          collaborators: Array.isArray(item.data.collaborators)
            ? [
                ...item.data.collaborators,
                ...props.collaborators
                  .filter(
                    (collaborator) =>
                      !item.data.collaborators.some(
                        (savedCollaborators) =>
                          savedCollaborators.collaboratorId === collaborator.id
                      )
                  )
                  .map((item) => {
                    const newData = {
                      comment: "",
                      ...item,
                      collaboratorId: item.id,
                    };
                    delete newData.id;
                    return newData;
                  }),
              ]
            : props.collaborators.map((item) => {
                const newData = {
                  comment: "",
                  ...item,
                  collaboratorId: item.id,
                };
                delete newData.id;
                return newData;
              }),
        };
        props.handleChangeSession(item.value)(newData);
      });
      if (props.onSubmit) props.onSubmit();
    } catch (e) {
      console.log("error saving collaborators");
    }
    if (props.toggle) props.toggle();
  };

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Añadiendo participantes</ModalHeader>
      <ModalBody>
        <div className="mb-3">
          <Text
            TagName="h6"
            className="Form-title mt-0"
            text={`Selecciones las sesiones en las que participarán.`}
          />
          {!!sessions?.length ? (
            <ReactSelect
              defaultValue={sessions}
              isMulti
              name="sessions"
              closeMenuOnSelect={false}
              options={sessions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={setSelected}
              components={{
                Option,
              }}
            />
          ) : (
            "No se ha añadido ninguna sesion! Añade una sesion para poder continuar"
          )}
        </div>
        <Text
          TagName="h6"
          className="Form-title mt-0"
          text={`Empleados seleccionados (${
            Array.isArray(props.collaborators)
              ? props.collaborators.length
              : 0
          }).`}
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
          <tbody style={{ maxHeight: "500px" }}>
            {Array.isArray(props.collaborators) &&
              props.collaborators.map((item, key) => (
                <tr key={key}>
                  <th scope="row">{item.id}</th>
                  <td>{`${item.name} ${item.lastName}`}</td>
                  <td>Todas las sesiones.</td>
                  <td>{item.active ? "Si" : "No"}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <CustomButton
          withoutCustom
          btnColor="success"
          onClick={handleSave}
          disabled={!sessions?.length}
        >
          Añadir!
        </CustomButton>
        <CustomButton withoutCustom btnColor="secondary" onClick={props.toggle}>
          Cancelar
        </CustomButton>
      </ModalFooter>
    </Modal>
  );
};

AddCollaboratorModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  submit: PropTypes.func,
  collaborators: PropTypes.array,
  sessions: PropTypes.array,
  handleChangeSession: PropTypes.func,
};

export default AddCollaboratorModal;
