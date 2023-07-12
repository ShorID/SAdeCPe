import React from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import Text from "@/components/Text";
import { Col, Row, Table } from "reactstrap";
import ComparisonLastAndCurrentYear from "@/components/Charts/ComparisonLastAndCurrentYear";
import ChartContext from "@/contexts/chart-context";
import TrainingByDepartment from "@/components/Charts/TrainingByDepartment";
import MoreQualifiedCharges from "@/components/Charts/MoreQualifiedCharges";
import GeneralReport from "@/components/FormsToExport/GeneralReport";
import withAuthValidation from "@/hocs/withAuthValidation";
import OrgEffectiveness from "@/components/Charts/OrgEffectiveness";
import fetcher from "@/services/fetcher";

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const Admin = (props) => {
  const { graphsRes } = React.useContext(ChartContext);
  const [data, setData] = React.useState({});

  const getData = async () => {
    const { data: trainingCosts } = await fetcher({
      url: "/stadistics/costs/",
    });
    setData({
      trainingCosts,
    });
  };

  React.useEffect(() => {
    getData();
  }, []);

  const monthToRender = months.map((month) => <td>{month}</td>)

  return (
    <AdminLayout>
      <Row>
        <Col>
          <Text TagName="h5" text={`Informe General de Capacitaciones`} />
        </Col>
        <Col sm="12" md="6">
          <div className="d-flex justify-content-end mb-3">
            <GeneralReport />
          </div>
        </Col>
      </Row>
      <Text
        TagName="h6"
        className="Form-title"
        text={`Total de Capacitaciones realizadas en este año`}
      />
      <Row>
        {/* <Col md="12" className="d-flex">
          <CustomInput label="Desde: ">
            <ReactDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
            />
          </CustomInput>
          <CustomInput label="Hasta: ">
            <ReactDatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
            />
          </CustomInput>
        </Col> */}
        <Col md="12">
          <ComparisonLastAndCurrentYear />
          <Text size="sm">
            El gráfico de barras muestra la cantidad total de capacitaciones
            realizadas en diferentes períodos de tiempo. Cada barra representa
            un período específico, como un mes o un trimestre, y la altura de la
            barra corresponde al número de capacitaciones realizadas durante ese
            período. La barra más alta indica el período con la mayor cantidad
            de capacitaciones, mientras que las barras más cortas indican
            períodos con menos capacitaciones.
          </Text>
        </Col>
      </Row>
      <Text
        TagName="h6"
        className="Form-title"
        text={`Capacitaciones realizadas por cada departamento`}
      />
      <Row>
        <Col md="12" className="mb-3">
          <Text size="sm">
            El gráfico circular muestra la distribución de las capacitaciones
            por departamento en forma de un pastel dividido en secciones. Cada
            sección del pastel representa un departamento y el tamaño de cada
            sección refleja la proporción de capacitaciones que se han llevado a
            cabo en ese departamento en comparación con el total. Los
            departamentos con una mayor proporción de capacitaciones tendrán
            secciones más grandes en el pastel, mientras que aquellos con una
            menor proporción tendrán secciones más pequeñas.
          </Text>
        </Col>
        <Col sm="12" md="4">
          <TrainingByDepartment />
        </Col>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Nombre del departamento</th>
                <th className="text-center"># Sesiones</th>
              </tr>
            </thead>
            <tbody style={{ maxHeight: "500px" }}>
              {Array.isArray(graphsRes["trainingByDepartment"]?.labels) &&
                graphsRes["trainingByDepartment"].labels.map((item, key) => (
                  <tr key={key}>
                    <td>{item}</td>
                    <td className="text-center">
                      {graphsRes["trainingByDepartment"].data[key]}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Text
        TagName="h6"
        className="Form-title"
        text={`Cargos mas capacitados`}
      />
      <Row>
        <Col>
          <Text size="sm">
            La gráfica "Participación en capacitaciones por cargo" muestra la
            distribución de la participación en las capacitaciones según los
            diferentes cargos dentro de la organización. Este gráfico representa
            visualmente la proporción de empleados que participan en las
            capacitaciones en relación con sus cargos. En el eje horizontal del
            gráfico se encuentran los diferentes cargos, como "Gerente",
            "Supervisor", "Ejecutivo", "Asistente", entre otros. En el eje
            vertical se muestra la cantidad de empleados de cada cargo que han
            participado en las capacitaciones.
          </Text>
          <MoreQualifiedCharges />
        </Col>
      </Row>
      <Text
        TagName="h6"
        className="Form-title"
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
      <Row>
        <Col>
          <Text
            TagName="h6"
            className="Form-title"
            text={`Costo de inversiones`}
          />
          <div style={{ overflow: "auto" }}>

            <Table bordered>
              <tbody>
                {Array.isArray(data.trainingCosts) && data.trainingCosts.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <tr style={{ backgroundColor: "#f5bc7f" }}>
                      <th scope="row" colSpan={13}>{item.name}</th>
                    </tr>
                    <tr>
                      <th colSpan={4}>Capacitacion</th>
                      <th colSpan={3}>Costo Unitario</th>
                      <th colSpan={3}>Participantes</th>
                      <th colSpan={3}>Costo Final</th>
                    </tr>
                    {Array.isArray(item.details) && item.details.map((detail) => <React.Fragment>
                      <tr>
                        <td colSpan={4} style={{ borderBottom: "2px solid black" }}>{detail.name}</td>
                        <td colSpan={3} style={{ borderBottom: "2px solid black" }}>{detail.costUnit}</td>
                        <td colSpan={3} style={{ borderBottom: "2px solid black" }}>{detail.capAssis}</td>
                        <td colSpan={3} style={{ borderBottom: "2px solid black" }}>{detail.costFinal}</td>
                      </tr>
                      <tr>
                        <td></td>
                        {monthToRender}
                      </tr>
                      <tr>
                        <td>Costo</td>
                        {months.map((month) => (
                          <td>
                            {/* <div>Perdida: {detail.infoMonths && detail.infoMonths[month]?.lostSessionAmount}</div> */}
                            {detail.infoMonths && detail.infoMonths[month]?.sessionCost}
                          </td>
                        ))}
                      </tr>
                    </React.Fragment>)}
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </AdminLayout>
  );
};

Admin.propTypes = {};

export default withAuthValidation(Admin);
