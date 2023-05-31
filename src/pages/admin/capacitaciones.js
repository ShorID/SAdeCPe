import React from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";
import { useRouter } from "next/router";
import ReportPDF from "@/components/PDFTest";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "reactstrap";
import { VerticalBarExample } from "@/components/VerticalBarExample";

const TrainingPage = (props) => {
  const router = useRouter();
  const handleRedirect = () => router.push("/admin/capacitaciones/create");

  return (
    <AdminLayout>
      <VerticalBarExample />
      {/* {typeof window !== "undefined" && (
        <PDFDownloadLink
          document={<ReportPDF download={show} />}
          fileName="reporte.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Generando PDF..." : "Descargar PDF"
          }
        </PDFDownloadLink>
      )} */}
      <DefaultList
        title="Capacitaciones"
        listId="training"
        endpoint="/capacitation"
        onCreate={handleRedirect}
        filters="stateType"
      />
    </AdminLayout>
  );
};

TrainingPage.propTypes = {};

export default TrainingPage;
