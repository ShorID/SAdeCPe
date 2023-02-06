import Layout from "@/components/Layout";
import CustomCarousel from "@/components/CustomCarousel";
import TitleBlock from "@/components/TitleBlock";
import { Col, Container, Row } from "reactstrap";
import trainingData from "@/utils/training-data.json";
import organizationData from "@/utils/organization-data.json";
import TrainingCard from "@/components/TrainingCard";
import TextSection from "@/components/TextSection";
import OrganizationCard from "@/components/OrganizationCard";

export default function Home() {
  return (
    <Layout noContainer>
      <CustomCarousel />
      <Container className="my-4 p-0">
        <TitleBlock
          title="Capacitaciones Activas"
          button="Ver mas"
          buttonLink="/capacitaciones"
        />
        <Row>
          {Array.isArray(trainingData) &&
            trainingData.map((item, index) => (
              <Col md="3" className="mb-3" key={index}>
                <TrainingCard {...item} />
              </Col>
            ))}
        </Row>
      </Container>
      <TextSection title="Porque es importante la Capacitacion?">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium
        tristique mi ac luctus. Duis porta nisi a tortor rhoncus efficitur.
        Nulla eget velit tortor. Nulla ut lorem vitae ante tincidunt tempus a
        non neque. Vivamus tempus gravida velit sed porta. Nullam efficitur quam
        nec nunc mollis, in venenatis magna dictum. Vestibulum ut diam eleifend,
        consequat odio sit amet, interdum eros. Morbi vel urna nunc. Fusce leo
        purus, molestie at sem in, finibus euismod augue. Etiam lacus velit,
        consectetur et viverra nec, convallis sed leo. Pellentesque a nisl quis
        eros dignissim molestie a sit amet nibh. Ut vitae lectus justo. Sed ut
        molestie sapien. Nullam suscipit interdum massa, vel iaculis diam
        accumsan vitae. Sed erat nibh, mattis viverra justo quis, consectetur
        molestie sapien. Sed eu pretium dolor, et placerat mauris.
      </TextSection>
      <Container className="my-4 p-0">
        <TitleBlock title="Organizaciones" />
        <Row>
          {Array.isArray(organizationData) &&
            organizationData.map((item, index) => (
              <Col md="3" className="mb-3" key={index}>
                <OrganizationCard {...item} />
              </Col>
            ))}
        </Row>
      </Container>
    </Layout>
  );
}
