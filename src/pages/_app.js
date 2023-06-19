import "bootstrap/dist/css/bootstrap.min.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import "@/styles/globals.css";
import moment from "moment";
import "moment/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-vertical-timeline-component/style.min.css";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import ErrorBoundary from "@/components/ErrorBoundary";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ChartProvider } from "@/contexts/chart-context";
import AuthProvider, { AuthContext } from "@/contexts/auth-context";
import { useContext } from "react";

export default function App({ Component, pageProps }) {
  const listContext = useContext(AuthContext);
  React.useEffect(() => {
    moment.locale("es-mx");
  }, []);

  React.useEffect(() => {
    const handleStorageChange = (event) => {
      console.log("prro", {
        val: event.storageArea === sessionStorage && event.key === "isAuth",
        value: event.newValue,
      //   event,
      });
      if (
        event.storageArea === sessionStorage &&
        event.key === "isAuth" &&
        !event.newValue
      ) {
        listContext.setIsAuth(false);
      }
    };
    if (typeof window !== "undefined")
      window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const windowDimensions = useWindowDimensions();

  return (
    <ErrorBoundary>
      <AuthProvider>
        <ChartProvider>
          <Component {...pageProps} windowDimensions={windowDimensions} />
          <ToastContainer position="bottom-right" />
        </ChartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
