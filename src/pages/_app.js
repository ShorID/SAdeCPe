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
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-vertical-timeline-component/style.min.css';
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import useWindowDimensions from "@/hooks/useWindowDimensions";

export default function App({ Component, pageProps }) {
  React.useEffect(() => {
    moment.locale("es-mx");
  }, []);

  const windowDimensions = useWindowDimensions();

  return <Component {...pageProps} windowDimensions={windowDimensions} />;
}
