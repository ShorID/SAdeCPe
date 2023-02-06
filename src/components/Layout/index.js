import React from "react";
import PropTypes from "prop-types";
import styles from "@/styles/Layout.module.css";
import Head from "next/head";
import CustomNavbar from "../CustomNavbar";
import { Container } from "reactstrap";
import CustomNav from "../CustomNav";
import Footer from "../Footer";

const Layout = (props) => {
  const { title = "Seguimiento de Capacitaciones", noContainer } = props;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CustomNavbar />
      <CustomNav />
      <main className={styles.main}>
        {noContainer ? (
          props.children
        ) : (
          <Container className="lg">{props.children}</Container>
        )}
      </main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  noContainer: PropTypes.bool,
};

export default Layout;
