import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CustomInput from "../CustomInput";

const DeleteModal = (props) => {
  const [value, setValue] = useState("Registro creado por error");
  
  const handleChange = ({ target: { value = "" } }) =>
    (value || "").length <= 200 && setValue(value || "");

  const handleDelete = () => {
    props.onDelete(value);
  };
  return (
    <Modal isOpen toggle={props.onCancel}>
      <ModalHeader toggle={props.onCancel}>Eliminando</ModalHeader>
      <ModalBody>
        Antes de eliminar este registro, deseas agregar una razon?
        <CustomInput
          type="textarea"
          hint={`Maximo 200 caracteres (${value.length}/200)`}
          onChange={handleChange}
          name="comment"
          value={value}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleDelete}>
          Eliminar
        </Button>{" "}
        <Button color="secondary" onClick={props.onCancel}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

DeleteModal.propTypes = {
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
};

export default DeleteModal;
