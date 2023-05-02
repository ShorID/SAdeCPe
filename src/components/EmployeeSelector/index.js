import React from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";
import { useState } from "react";
import { filters } from "../List/ListSearcher";
import { useEffect } from "react";
import CustomInput from "../CustomInput";
import fetcher from "@/services/fetcher";

const options = [
  { value: "England", label: "England", icon: "/check.svg" },
  { value: "Germany", label: "Germany", icon: "/check.svg" },
];

const { Option } = components;
const IconOption = (props) => (
  <Option {...props}>
    <img
      src={props.data.icon}
      style={{ width: 36 }}
      alt={props.data.label}
    />
    {props.data.label}
  </Option>
);

const allowedFilters = "employeePos,departament";

const EmployeeSelector = (props) => {
  const [filtersData, setFiltersData] = useState([]);
  const [formData, setFormData] = useState();

  const getFiltersData = () => {
    let requests = [];
    filters.forEach((filter) => {
      if (allowedFilters.includes(filter.paramName) || !allowedFilters)
        fetcher({
          url: filter.endpoint,
        }).then(
          ({ data }) =>
            Array.isArray(data) &&
            setFiltersData((prev) => [...prev, { ...filter, options: data }])
        );
    });
    Promise.all(requests);
  };

  useEffect(() => {
    setFiltersData([]);
    getFiltersData();
  }, []);

  const handleChange = ({ target: { value, name } }) =>
    setFormData((prev) =>
      prev ? { ...prev, [name]: value } : { [name]: value }
    );

  return (
    <div className="EmployeeSelector">
      {filtersData.map(
        (filter, i) =>
          Array.isArray(filter.options) && (
            <CustomInput
              type="select"
              name={filter.paramName}
              size="sm"
              className="w-25"
              label={filter.label}
              key={i}
              onChange={handleChange}
            >
              <option value="0">Todos</option>
              {filter.options.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name || item.nameType}
                </option>
              ))}
            </CustomInput>
          )
      )}
      <CustomInput label="Escoga los empleados">
        <Select
          defaultValue={options[0]}
          options={options}
          components={{ Option: IconOption }}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </CustomInput>
    </div>
  );
};

EmployeeSelector.propTypes = {};

export default EmployeeSelector;
