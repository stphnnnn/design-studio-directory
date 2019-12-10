import React from "react";

import { Layout } from "../components/Layout";
import Header from "../components/Header";
import Heading from "../components/Heading";
import SEO from "../components/SEO";

function ErrorPage({ statusCode }) {
  return (
    <Layout
      header={
        <Header>
          <Heading level={2} size={1.9} lineHeight={1.5} weight={300}>
            {statusCode
              ? `A ${statusCode} error occurred`
              : "An error occurred"}
          </Heading>
        </Header>
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
