import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Searcher from "../Searcher";
import ListBody from "./ListBody";
import CustomInput from "../CustomInput";
import fetcher from "@/services/fetcher";
import ListContext from "@/contexts/list-context";
import Collapse from "../Collapse";
import Text from "../Text";

const filters = [
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
];

const ListSearcher = ({ skipFilters = "" }) => {
  const [filtersData, setFiltersData] = useState([]);
  const [formData, setFormData] = useState();

  const { refresh } = useContext(ListContext);

  const getFiltersData = () => {
    let requests = [];
    filters.forEach((filter) => {
      if (!skipFilters.includes(filter.paramName))
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
    setFiltersData([])
    getFiltersData();
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
    </ListBody>
  );
};

ListSearcher.propTypes = {
  skipFilters: PropTypes.string,
};

export default ListSearcher;
