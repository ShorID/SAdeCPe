import React from "react";
import CustomInput from "../CustomInput";
import DatePicker from "react-datepicker";

const DateInput = (props) => {
  const [startDate, setStartDate] = React.useState(new Date());
  return (
    <CustomInput {...props}>
      <DatePicker
        showIcon
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        className="d-flex"
        disabled={props.disabled}
      />
    </CustomInput>
  );
};

DateInput.propTypes = CustomInput.propTypes;

export default DateInput;
