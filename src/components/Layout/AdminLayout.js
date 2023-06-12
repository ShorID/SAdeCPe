import React from "react";
import PropTypes from "prop-types";
import Layout from ".";
import { Col, Row } from "reactstrap";
import AdminOptions from "./AdminOptions";

const AdminLayout = (props) => {
  return (
    <Layout>
      <Row className="my-4">
        <Col sm="12" md="3" className="AdminLayout d-none d-md-block">
          <AdminOptions />
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
