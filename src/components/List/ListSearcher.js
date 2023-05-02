import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Searcher from "../Searcher";
import ListBody from "./ListBody";
import CustomInput from "../CustomInput";
import fetcher from "@/services/fetcher";
import ListContext from "@/contexts/list-context";
import Collapse from "../Collapse";
import Text from "../Text";

export const filters = [
  {
    label: "Escoge un tipo de estado",
    endpoint: "/type-state",
    paramName: "stateType",
  },
  {
    label: "Escoge un departamento",
    endpoint: "/departament",
    paramName: "departament",
  },
  {
    label: "Escoge un cargo",
    endpoint: "/employees-position",
    paramName: "employeePos",
  },
];

const ListSearcher = ({ filters: allowedFilters = "", withoutFilters }) => {
  const [filtersData, setFiltersData] = useState([]);
  const [formData, setFormData] = useState();

  const { refresh, selectedItems } = useContext(ListContext);

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
    if (!withoutFilters) {
      setFiltersData([]);
      getFiltersData();
    }
  }, []);

  useEffect(() => {
    if (formData) refresh(formData);
  }, [formData]);

  const handleChange = ({ target: { value, name } }) =>
    setFormData((prev) =>
      prev ? { ...prev, [name]: value } : { [name]: value }
    );

  return (
    <ListBody className="ListSearcher">
      <Searcher onChange={handleChange} />
      {Array.isArray(selectedItems) && !!selectedItems.length && (
        <CustomInput
          type="checkbox"
          size="sm"
          label="Mostrar seleccionados."
          wrapperClass="d-flex flex-row-reverse justify-content-start ml-auto"
          id="showSelected"
        />
      )}
      {!withoutFilters && (
        <div className="mt-3">
          <Collapse header={<Text size="sm">Mas filtros</Text>}>
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
          </Collapse>
        </div>
      )}
    </ListBody>
  );
};

ListSearcher.propTypes = {
  filters: PropTypes.string,
  withoutFilters: PropTypes.bool,
};

export default ListSearcher;
