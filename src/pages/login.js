import React, { useState } from "react";
import PropTypes from "prop-types";
import Layout from "@/components/Layout";
import { Col, Form, Row, Spinner } from "reactstrap";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import fetcher from "@/services/fetcher";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context";
import sessionStorageManagment from "@/services/sessionstorageManagment";
import { toast } from "react-toastify";

const Login = (props) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleChange = ({ target: { value, name } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    toast.promise(
      fetcher({
        url: "/auth/login",
        data: formData,
        method: "post",
      })
        .then(({ data }) => {
          setLoading(false);
          if (data.access_token) {
            fetcher.defaults.headers[
              "Authorization"
            ] = `Bearer ${data.access_token}`;
            login(true);
            sessionStorageManagment.write("access_token", data.access_token);
          }
        })
        .catch(() => setLoading(false)),
        {
          pending: "Iniciando sesion...",
          success: "Bienvenido!",
          error: "Ocurrio un error!",
        }
    );
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
              <CustomButton className="w-100 mt-4" type="submit">
                Acceder{" "}
                {loading && (
                  <Spinner color="primary" size="sm" className="mx-1" />
                )}
              </CustomButton>
            </div>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

Login.propTypes = {};

export default Login;
