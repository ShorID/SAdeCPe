import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";
import withAuthValidation from "@/hocs/withAuthValidation";
import OrgEffectiveness from "@/components/Charts/OrgEffectiveness";
import { Col, Row, Table } from "reactstrap";
import Text from "@/components/Text";
import ChartContext from "@/contexts/chart-context";

const Organizations = (props) => {
  const { graphsRes, graphsRefresh } = React.useContext(ChartContext);
  return (
    <AdminLayout>
      <Text
        TagName="h6"
        className="Form-title mt-0"
        text={`Efectividad de las organizaciones activas actualmente.`}
      />
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Nombre de la organizacion</th>
                <th className="text-center">Porcentaje de efectividad</th>
              </tr>
            </thead>
            <tbody style={{ maxHeight: "500px" }}>
              {Array.isArray(graphsRes["orgEffectiveness"]?.labels) &&
                graphsRes["orgEffectiveness"].labels.map((item, key) => (
                  <tr key={key}>
                    <td>{item}</td>
                    <td className="text-center">
                      {graphsRes["orgEffectiveness"].effective[key]}%
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
        <Col sm="12" md="4">
          <OrgEffectiveness />
        </Col>
      </Row>
      <Text
        TagName="h6"
        className="Form-title"
        text={`Lista de Organizaciones`}
      />
      <DefaultList
        title="Organizaciones"
        endpoint="/org"
        listId="org"
        onRefresh={graphsRefresh["orgEffectiveness"]}
        withoutFilters
      />
    </AdminLayout>
  );
};

Organizations.propTypes = {};

export default withAuthValidation(Organizations);
