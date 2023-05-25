import React, { useState } from "react";
import PropTypes from "prop-types";
import Layout from "@/components/Layout";
import { Col, Form, Row } from "reactstrap";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import fetcher from "@/services/fetcher";
import { useRouter } from "next/router";

const Login = (props) => {
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const handleChange = ({ target: { value, name } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    fetcher({
      url: "/auth/login",
      data: formData,
      method: "post",
    }).then(({ data }) => {
      if (data.access_token) {
        fetcher.defaults.headers[
          "Authorization"
        ] = `Bearer ${data.access_token}`;
        if (typeof window !== "undefined")
          sessionStorage.setItem("access_token", data.access_token);
        router.push("/admin");
      }
    });
  };

  return (
    <Layout>
      <Row>
        <Col md="5" className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <div className="Login">
              <div className="Login-title">Iniciar Sesion</div>
              <CustomInput
                label="Usuario"
                name="username"
                onChange={handleChange}
              />
              <CustomInput
                label="Contraseña"
                name="password"
                onChange={handleChange}
                type="password"
              />
              <CustomButton
                text="Acceder"
                className="w-100 mt-4"
                type="submit"
              />
            </div>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

Login.propTypes = {};

export default Login;
