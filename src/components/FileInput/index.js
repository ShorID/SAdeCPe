import React from "react";
import PropTypes from "prop-types";
import CustomInput from "../CustomInput";
import fetcher from "@/services/fetcher";
import { Spinner } from "reactstrap";

const FileInput = (props) => {
  const inputRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(
    props.value ? `${fetcher.defaults.baseURL}${props.value}` : null
  );

  const handleChange = async (inputEvent) => {
    const { target = {} } = inputEvent;
    const value = target && target.files[0];
    const data = new FormData();
    data.append("file", value);
    setLoading(true);
    const { data: fileUploaded } = await fetcher({
      url: `/image/upload-file`,
      method: "POST",
      data,
    });
    setLoading(false);
    if (inputRef.current) inputRef.current.value = "";
    if (fileUploaded) {
      if (props.onChange)
        props.onChange({ target: { value: fileUploaded, name: props.name } });
      setValue(`${fetcher.defaults.baseURL}${fileUploaded}`);
    }
  };

  return (
    <>
      <CustomInput label="Foto de Perfil" type="file" onChange={handleChange} />
      {loading && (
        <Spinner color="primary" size="sm" className="mx-1">
          Loading...
        </Spinner>
      )}
      {value && !loading && (
        <img
          key={value}
          src={`${value}`}
          style={{
            maxHeight: "100px",
            maxWidth: "100px",
            objectFit: "contain",
            objectPosition: "center",
          }}
          alt="preview"
        />
      )}
    </>
  );
};

FileInput.propTypes = CustomInput.propTypes;

export default FileInput;
