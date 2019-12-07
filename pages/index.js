/** @jsx jsx */
import React from "react";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import { jsx } from "@emotion/core";

import { Layout } from "../components/Layout";
import { RecentlyAdded } from "../components/RecentlyAdded";
import { Select } from "../components/Select";

import { getStudios, getCountries } from "../dataHelpers";
import SEO from "../components/SEO";
import { Header } from "../components/Header";

const IndexPage = ({ studios, countries }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [activeField, setActiveField] = React.useState(0);

  const countryOptions = Object.keys(countries);
  const cityOptions = selectedCountry ? countries[selectedCountry] : [];

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
        <Header intro="An extensive list of design studios from around the world created to support designers in their search for their next opportunity." />
      }
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

IndexPage.getInitialProps = async () => {
  const apiUrl = "https://api.sheety.co/46c50c36-f98f-4270-812c-f78377b90306";

  const res = await fetch(apiUrl);
  const data = await res.json();

  const studios = getStudios(data);
  const countries = getCountries(studios);

  return { studios, countries };
};

export default IndexPage;
