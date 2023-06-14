import React from "react";
import classNames from "classnames";
import CustomCheck from "../CustomCheck";
import FileInput from "../FileInput";
import CustomInput from "../CustomInput";
import { useState } from "react";
import DeleteModal from "../DeleteModal";

const TrainingSessionMember = (props) => {
  const [show, setShow] = useState(false);
  const toggleDeleteModal = () => setShow((prev) => !prev);

  const handleChange = ({ target }) => {
    props.onChange(target);
  };

  const handleActive = (value) => {
    if (value) {
      props.onChange({ active: true, comment: ""  }, true);
    } else {
      toggleDeleteModal();
    }
  };

  const onDelete = (comment) => {
    props.onChange({ active: false, comment  }, true);
    toggleDeleteModal();
  };

  return (
    <tr className={classNames("TrainingSessionMember")}>
      <td scope="row">
        {`${props.name} ${props.lastName}`}
        <FileInput
          onChange={handleChange}
          name="certificate"
          label="Sube su evidencia"
          value={props.certificate}
          disabled={!props.active}
        />
      </td>
      <td className="text-center">
        <CustomCheck
          checked={props.active}
          onChange={handleActive}
          tooltip={false}
          noDepency={false}
        />
        {show && (
          <DeleteModal onCancel={toggleDeleteModal} onDelete={onDelete} />
        )}
      </td>
      <td>
        <CustomInput
          name="qualification"
          size="sm"
          type="number"
          disabled={!props.active}
          onChange={handleChange}
        />
      </td>
    </tr>
  );
};

TrainingSessionMember.propTypes = {};

export default TrainingSessionMember;
