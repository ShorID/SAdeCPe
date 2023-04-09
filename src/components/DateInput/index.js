import React from "react";
import CustomInput from "../CustomInput";
import DatePicker from "react-datepicker";
import moment from "moment";

const DateInput = (props) => {
  const value =
    props.value && !props.value.includes("T")
      ? new Date(props.value + "T00:00:00")
      : props.value;
  const [startDate, setStartDate] = React.useState(value);
  console.log("prro", { props, startDate });
  return (
    <CustomInput {...props} value={moment(startDate).format("yyyy-mm-dd")}>
      <DatePicker
        showIcon
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        className="d-flex form-control"
        disabled={props.disabled}
      />
    </CustomInput>
  );
};

DateInput.propTypes = CustomInput.propTypes;

export default DateInput;
