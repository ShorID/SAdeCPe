import "bootstrap/dist/css/bootstrap.min.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import "@/styles/globals.css";
import moment from "moment";
import "moment/locale/es";
import React from "react";

export default function App({ Component, pageProps }) {
  React.useEffect(() => {
    moment.locale("es-mx");
  }, []);
  return <Component {...pageProps} />;
}
