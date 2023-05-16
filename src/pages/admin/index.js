import React from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import { PieExample } from "@/components/PieExample";
import Text from "@/components/Text";
import { Col, Row, Table } from "reactstrap";

const Admin = (props) => {
  return (
    <AdminLayout>
      <Text
        TagName="h6"
        className="Form-title mt-0"
        text={`Capacitaciones realizadas por cada departamento`}
      />
      <Row>
        <Col sm="12" md="4">
          <PieExample />
        </Col>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre del departamento</th>
                <th>Sesiones</th>
                <th>Activo</th>
              </tr>
            </thead>
            <tbody style={{ maxHeight: "500px" }}>
              <tr>
                <th scope="row">2</th>
                <td>RRHH</td>
                <td>Todas las sesiones.</td>
                <td>Si</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </AdminLayout>
  );
};

Admin.propTypes = {};

export default Admin;
