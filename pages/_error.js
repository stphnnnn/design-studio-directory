import React from "react";

import { Layout } from "../components/Layout";
import { Header } from "../components/Header";
import SEO from "../components/SEO";

function ErrorPage({ statusCode }) {
  return (
    <Layout
      header={
        <Header
          intro={
            statusCode ? `A ${statusCode} error occurred` : "An error occurred"
          }
        />
      }
    >
      <SEO title="Error" />
    </Layout>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
