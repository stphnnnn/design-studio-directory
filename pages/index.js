/** @jsx jsx */
import React from "react";
import Router from "next/router";
import absoluteUrl from "next-absolute-url";
import fetch from "isomorphic-unfetch";
import { jsx } from "@emotion/core";

import Heading from "../components/Heading";
import { Layout } from "../components/Layout";
import RecentlyAdded from "../components/RecentlyAdded";
import Select from "../components/Select";

import SEO from "../components/SEO";
import Header from "../components/Header";

const IndexPage = ({ studios, locations }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [activeField, setActiveField] = React.useState(0);

  const countryOptions = Object.keys(locations).sort();
  const cityOptions = selectedCountry
    ? [...locations[selectedCountry]].sort()
    : [];

  const handleCityChange = selectedItem => {
    setIsLoading(true);
    Router.push(
      `/results?country=${selectedCountry}&city=${selectedItem}`,
      `/results/${selectedCountry}/${selectedItem}`
    );
  };

  React.useEffect(() => {
    if (selectedCountry) {
      setActiveField(1);
    }
  }, [selectedCountry]);

  return (
    <Layout
      header={
        <Header>
          <Heading level={2} size={1.9} lineHeight={1.5} weight={300}>
            An extensive list of design studios from around the world created to
            support designers in their search for their next opportunity.
          </Heading>
        </Header>
      }
      showLoadingSpinner={isLoading}
    >
      <div
        css={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          position: "absolute",
          transform: "translateY(-50%)",
          zIndex: 1
        }}
      >
        <SEO title="Home" />
        <Select
          label="Pick a country"
          onChange={selectedItem => setSelectedCountry(selectedItem)}
          options={countryOptions}
          isCompact={activeField !== 0}
          disabled={isLoading}
          onOpen={() => setActiveField(0)}
          onClose={() => selectedCountry && setActiveField(1)}
        />
        <Select
          label="Pick a city"
          options={cityOptions}
          onChange={handleCityChange}
          isCompact={activeField !== 1}
          disabled={isLoading || !Boolean(selectedCountry)}
          onOpen={() => setActiveField(1)}
        />
      </div>
      <RecentlyAdded studios={studios} />
    </Layout>
  );
};

IndexPage.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);

  const res = await fetch(`${origin}/api`);
  const { studios, locations } = await res.json();

  return { studios, locations };
};

export default IndexPage;
