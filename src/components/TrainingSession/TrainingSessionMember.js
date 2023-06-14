import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Row, Spinner } from "reactstrap";
import Icon from "../Icon";
import Text from "../Text";
import classNames from "classnames";
import CustomCheck from "../CustomCheck";
import { fileUploader } from "../FileInput";
import CustomInput from "../CustomInput";

const TrainingSessionMember = (props) => {
  const fileInputRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    setLoading(true);
    const fileUploaded = await fileUploader(event);
    setLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    props.onChange({ name: "certificate", value: fileUploaded });
  };

  const onDisable = (value) => {
    props.onChange({ name: "active", value });
  };

  return (
    <>
      <tr
        className={classNames(
          "TrainingSessionMember",
          !props.active && "TrainingSessionMember-disabled"
        )}
      >
        <td scope="row">{`${props.name} ${props.lastName}`}</td>
        <td className="text-center">
          <CustomCheck
            checked={props.active}
            onChange={onDisable}
            tooltip={false}
          />
        </td>
        <td>
          <CustomInput name="qualification" size="sm" />
        </td>
      </tr>
      <tr>
      <td colSpan={3}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button
            size="sm"
            color="primary"
            type="button"
            className="mx-1"
            disabled={!props.active}
            onClick={handleFileUpload}
          >
            {loading ? (
              <Spinner size="sm" className="mx-1" />
            ) : (
              <Icon
                name={props.certificate ? "faCloudArrowDown" : "faCloudUpload"}
              />
            )}
          </Button>
        </td>
      </tr>
    </>
  );
};

TrainingSessionMember.propTypes = {};

export default TrainingSessionMember;
