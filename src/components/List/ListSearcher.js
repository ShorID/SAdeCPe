import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Searcher from "../Searcher";
import ListBody from "./ListBody";
import CustomInput from "../CustomInput";
import fetcher from "@/services/fetcher";
import ListContext from "@/contexts/list-context";
import Text from "../Text";
import { Card, CardBody, Col, Collapse, Row } from "reactstrap";

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
  const [showFilters, setShowFilters] = useState(false);

  const { refresh } = useContext(ListContext);

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

  const showInactives = ({ target: { checked } }) => {
    handleChange({
      target: { name: "status", value: +!checked },
    });
  };

  const handleShowFilters = () => setShowFilters((prev) => !prev);

  return (
    <ListBody className="ListSearcher">
      <Searcher
        onChange={handleChange}
        withoutFilters={withoutFilters}
        onFilter={handleShowFilters}
        showFilters={showFilters}
      />
      <CustomInput
        label="Mostrar inactivos"
        className="font-sm-size"
        type="switch"
        role="switch"
        name="status"
        onChange={showInactives}
        size="sm"
      />
      {!withoutFilters && (
        <div>
          <Collapse isOpen={showFilters}>
            <Card className="mb-3">
              <CardBody>
                <Row>
                  {filtersData.map(
                    (filter, i) =>
                      Array.isArray(filter.options) && (
                        <Col sm="12" md="3" key={i}>
                          <CustomInput
                            type="select"
                            name={filter.paramName}
                            size="sm"
                            label={filter.label}
                            onChange={handleChange}
                          >
                            <option value="0">Todos</option>
                            {filter.options.map((item) => (
                              <option value={item.id} key={item.id}>
                                {item.name || item.nameType}
                              </option>
                            ))}
                          </CustomInput>
                        </Col>
                      )
                  )}
                </Row>
              </CardBody>
            </Card>
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
