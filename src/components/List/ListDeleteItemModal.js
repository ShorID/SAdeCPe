import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ListDeleteItemModal = (props) => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} {...props}>
      <ModalHeader toggle={props.toggle}>Eliminando registro.</ModalHeader>
      <ModalBody>
        Estas a punto de eliminar el registro "{props.title}", desea continuar?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={props.submit}>
          Eliminar
        </Button>{" "}
        <Button color="secondary" onClick={props.toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ListDeleteItemModal.propTypes = {};

export default ListDeleteItemModal;
