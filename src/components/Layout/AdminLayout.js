import React from "react";
import Layout from ".";
import { Col, Row } from "reactstrap";
import AdminOptions from "./AdminOptions";

const AdminLayout = (props) => {
  return (
    <Layout>
      <Row className="my-4">
        <Col sm="12" md="3" className="AdminLayout d-none d-md-block">
          <AdminOptions style={{ position: "sticky", top: 0 }} />
        </Col>
        <Col sm="12" md="9">
          {props.children}
        </Col>
      </Row>
    </Layout>
  );
};

AdminLayout.propTypes = {};

export default AdminLayout;
