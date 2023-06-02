import React from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import { PieExample } from "@/components/PieExample";
import Text from "@/components/Text";
import { Col, Row, Table } from "reactstrap";
import { VerticalBarExample } from "@/components/VerticalBarExample";
import ReactDatePicker from "react-datepicker";
import CustomInput from "@/components/CustomInput";
import { useRouter } from "next/router";
import DefaultList from "@/components/DefaultList";
import ComparisonLastAndCurrentYear from "@/components/Charts/ComparisonLastAndCurrentYear";
import ChartContext from "@/contexts/chart-context";
import TrainingByDepartment from "@/components/Charts/TrainingByDepartment";
import MoreQualifiedCharges from "@/components/Charts/MoreQualifiedCharges";
import GeneralReport from "@/components/FormsToExport/GeneralReport";

const Admin = (props) => {
  const { graphsData } = React.useContext(ChartContext);

  const router = useRouter();
  const handleRedirect = () => router.push("/admin/capacitaciones/create");
  console.log("prro admin", graphsData)
  return (
    <AdminLayout>
      <DefaultList
        title="Capacitaciones Activas"
        listId="training"
        endpoint="/capacitation"
        onCreate={handleRedirect}
        filters="stateType"
      />
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
                <td>10</td>
                <td>Si</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>TI</td>
                <td>20</td>
                <td>Si</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Bodegas</td>
                <td>5</td>
                <td>Si</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Contabilidad</td>
                <td>11</td>
                <td>Si</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Agentes</td>
                <td>3</td>
                <td>Si</td>
              </tr>
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
      <GeneralReport />
    </AdminLayout>
  );
};

Admin.propTypes = {};

export default Admin;
