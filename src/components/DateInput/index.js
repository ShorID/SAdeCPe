import React from "react";
import CustomInput from "../CustomInput";
import DatePicker from "react-datepicker";
import moment from "moment";

const DateInput = (props) => {
  const [startDate, setStartDate] = React.useState(props.value);
  
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
