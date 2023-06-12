import React from "react";
import PropTypes from "prop-types";
import Text from "../Text";
import { Col, Row, Table } from "reactstrap";
import EmployeeTags from "../Charts/EmployeeTags";
import ChartContext from "@/contexts/chart-context";
import fetcher from "@/services/fetcher";
import EmployeeReport from "../FormsToExport/EmployeeReport";
import { toDataUrl } from "@/services/common";

const EmployeeStatusSheet = ({ data }) => {
  const { graphsRes } = React.useContext(ChartContext);
  const [profileImg, setProfileImg] = React.useState();
  const ref = React.useRef(null);

  const radialId = EmployeeTags.graphId + data.id;

  React.useEffect(() => {
    if (ref.current) {
      setProfileImg(toDataUrl(fetcher.defaults.baseURL + data.photo));
    }
    fetcher({ url: "/stadistics/info-cap-col/" + data.id }).then(({ data }) =>
      console.log("prro", data)
    );
  }, [ref.current]);

  const renderField = (label, fieldName) => (
    <Text TagName="p">
      <Text bold>{label}</Text>: <Text>{data[fieldName] || fieldName}</Text>
    </Text>
  );
  return (
    <div>
      {profileImg && <EmployeeReport data={{ ...data, profileImg }} />}
      <Text TagName="h6" className="Form-title" text={`Datos Generales`} />
      <Row>
        <Col sm="12" md="3">
          <img
            src={fetcher.defaults.baseURL + data.photo}
            alt={data.name}
            className="mx-auto"
            ref={ref}
            style={{
              width: "200px",
              height: "200px",
              border: "1px gray solid",
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Col>
        <Col md="4">
          {renderField("Nombre", "name")}
          {renderField("Apellido", "lastName")}
          {renderField("Cedula", "identification")}
          {renderField("Fecha de admision", "admissionDate")}
        </Col>
        <Col md="5">
          {renderField("Id de referencia", "refNumber")}
          {renderField("Cargo", data.position.name)}
        </Col>
      </Row>
      <Text
        TagName="h6"
        className="Form-title"
        text={`Formacion Profesional en la Empresa`}
      />
      <Row>
        <Col sm="12" md="6">
          <EmployeeTags id={data.id} />
        </Col>
        <Col sm={12} md="6">
          <Text size="sm">
            <Table>
              <thead>
                <tr>
                  <th>Tema</th>
                  <th className="text-center">Valor</th>
                </tr>
              </thead>
              <tbody style={{ maxHeight: "500px" }}>
                {Array.isArray(graphsRes[radialId]?.labels) &&
                  graphsRes[radialId].labels.map((item, key) => (
                    <tr key={key}>
                      <td>{item}</td>
                      <td className="text-center">
                        {graphsRes[radialId].points[key]}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Text>
        </Col>
        <Col md="12">
          <Text size="sm">
            El gráfico radial representa los temas en los que un trabajador ha
            sido capacitado, evaluando la cantidad de veces que ha recibido
            capacitación en cada uno de ellos. Cada sección del gráfico
            representa un tema específico, y el tamaño de la sección refleja la
            frecuencia de capacitación en ese tema. Al observar el gráfico,
            podemos identificar claramente los temas en los que el trabajador ha
            recibido más capacitación. Las secciones más grandes indican
            aquellos temas en los que ha habido una mayor inversión en términos
            de tiempo y recursos de capacitación. Estos temas suelen ser
            aquellos considerados prioritarios para el desarrollo y crecimiento
            del trabajador en su rol actual. Además, el gráfico permite
            visualizar de manera rápida y efectiva los temas en los que el
            trabajador ha recibido una menor cantidad de capacitación. Estas
            secciones más pequeñas pueden indicar áreas en las que se puede
            enfocar futuras oportunidades de capacitación, con el objetivo de
            fortalecer y ampliar aún más las habilidades y conocimientos del
            trabajador.
          </Text>
        </Col>
      </Row>
    </div>
  );
};

EmployeeStatusSheet.propTypes = {
  data: PropTypes.object,
};

export default EmployeeStatusSheet;
