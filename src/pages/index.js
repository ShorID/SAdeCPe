import Layout from "@/components/Layout";
import CustomCarousel from "@/components/CustomCarousel";
import TitleBlock from "@/components/TitleBlock";
import { Col, Container, Row } from "reactstrap";
import TrainingCard from "@/components/TrainingCard";
import TextSection from "@/components/TextSection";
import OrganizationCard from "@/components/OrganizationCard";
import fetcher from "@/services/fetcher";
import { sortbyOptions } from "@/components/SortBy";

function Home({ orgs, trainingList, centers }) {

  return (
    <Layout noContainer>
      <CustomCarousel data={centers || []} />
      <Container className="my-4 p-0">
        <TitleBlock title="Capacitaciones Activas" />
        <Row>
          {Array.isArray(trainingList?.data) &&
            trainingList.data.map((item, index) => (
              <Col md="3" className="mb-3" key={index}>
                <TrainingCard {...item} />
              </Col>
            ))}
        </Row>
      </Container>
      <TextSection title="Porque es importante la Capacitacion?">
        La capacitación es un proceso de formación y desarrollo que busca
        mejorar las habilidades, conocimientos y competencias de los
        trabajadores en un área específica, con el fin de mejorar su desempeño y
        productividad en el trabajo. Este proceso puede ser llevado a cabo por
        la empresa o por entidades especializadas en formación y desarrollo. Es
        importante destacar que la capacitación no solo beneficia al trabajador
        en cuanto a su desarrollo personal y profesional, sino que también
        impacta en la empresa en términos de mejora de la productividad,
        reducción de errores y accidentes, aumento de la satisfacción del
        cliente y en general, mejora en la calidad de los productos y servicios
        ofrecidos.
      </TextSection>
      <Container className="my-4 p-0">
        <TitleBlock title="Organizaciones" />
        <Row>
          {Array.isArray(orgs?.data) &&
            orgs.data.map((item, index) => (
              <Col md="3" className="mb-3" key={index}>
                <OrganizationCard {...item} />
              </Col>
            ))}
        </Row>
      </Container>
    </Layout>
  );
}

Home.getInitialProps = async () => {
  try {
    const { data: orgs } = await fetcher({
      url: "/home/org",
      params: {
        page: 1,
        sortBy: sortbyOptions[0].value,
        limit: 8,
      },
    });

    const { data: trainingList } = await fetcher({
      url: "/home/capacitation",
      params: {
        page: 1,
        sortBy: sortbyOptions[0].value,
        limit: 8,
      },
    });

    const centers = await fetcher({
      url: "/home/center",
      params: {
        page: 1,
        sortBy: sortbyOptions[0].value,
        limit: 8,
      },
    }).then(({ data }) =>
      data.data.map((item) => ({
        src: process.env.NEXT_PUBLIC_API_URL + item.photo,
        altText: item.name,
        caption: item.address,
        key: item.id,
      }))
    );

    return { orgs, trainingList, centers };
  } catch (e) {
    return {};
  }
};

export default Home;
