import React from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import DefaultList from "@/components/DefaultList";
import { useRouter } from "next/router";
import ReportPDF from "@/components/PDFTest";
import { PDFDownloadLink } from "@react-pdf/renderer";

const TrainingPage = (props) => {
  const router = useRouter();
  const handleRedirect = () => router.push("/admin/capacitaciones/create");

  return (
    <AdminLayout>
      {/* <ReportPDF />
      <PDFDownloadLink document={<ReportPDF />} fileName="reporte.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Generando PDF..." : "Descargar PDF"
        }
      </PDFDownloadLink> */}
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
