import React from "react";
import PropTypes from "prop-types";
import CustomInput from "../CustomInput";
import fetcher from "@/services/fetcher";

const FileInput = (props) => {
  const inputRef = React.useRef(null);
  const [value, setValue] = React.useState(
    props.value ? `${fetcher.defaults.baseURL}${props.value}` : null
  );

  const handleChange = async (inputEvent) => {
    const { target = {} } = inputEvent;
    const value = target && target.files[0];
    const data = new FormData();
    data.append("file", value);

    const { data: fileUploaded } = await fetcher({
      url: `/image/upload-file`,
      method: "POST",
      data,
    });
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
      {value && (
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
