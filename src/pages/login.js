import React from "react";
import PropTypes from "prop-types";
import Layout from "@/components/Layout";
import { Col, Row } from "reactstrap";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

const Login = (props) => {
  return (
    <Layout>
      <Row>
        <Col md="5" className="mx-auto">
          <div className="Login">
            <div className="Login-title">Iniciar Sesion</div>
            <CustomInput label="Usuario" />
            <CustomInput label="Contraseña" />
            <CustomButton text="Acceder" className="w-100 mt-4" />
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

Login.propTypes = {};

export default Login;
