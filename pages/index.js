/** @jsx jsx */
import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { jsx, css } from "@emotion/core";
import { useTheme } from "emotion-theming";

import Heading from "../components/Heading";
import { Layout } from "../components/Layout";
import RecentlyAdded from "../components/RecentlyAdded";
import Select from "../components/Select";

import SEO from "../components/SEO";
import Header from "../components/Header";
import useBreakpoint from "../components/useBreakpoint";

import { getData } from "../dataHelpers/store";

const sizes = {
  LARGE: 100,
  SMALL: 75
};

const IndexPage = ({ studios, locations }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [activeField, setActiveField] = React.useState(0);

  const breakpoint = useBreakpoint();

  const theme = useTheme();

  const countryOptions = Object.keys(locations).sort();
  const cityOptions = selectedCountry
    ? [...locations[selectedCountry]].sort()
    : [];

  const handleCityChange = selectedItem => {
    setIsLoading(true);
    Router.push(
      `/results/[country]/[city]`,
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
            An extensive list of design studios from around the world.
          </Heading>
        </Header>
      }
    >
      <div
        css={props => css`
          ${props.mq.md} {
            display: flex;
            width: 100%;
            justify-content: center;
            position: absolute;
            transform: translateY(-50%);
            z-index: 1;
          }
        `}
      >
        <SEO title="Home" />
        <div
          style={{
            background: breakpoint.gte("md") ? undefined : theme.colors.darkBlue
          }}
        >
          <Select
            label="Pick a country"
            onChange={selectedItem => setSelectedCountry(selectedItem)}
            options={countryOptions}
            isCompact={activeField !== 0}
            disabled={isLoading}
            onOpen={() => setActiveField(0)}
            onClose={() => selectedCountry && setActiveField(1)}
            css={props => css`
              max-width: 90%;
              margin: 0 auto;
              ${props.mq.md} {
                max-width: 100%;
                top: ${activeField !== 0
                  ? `${(sizes.LARGE - sizes.SMALL) / 2}px`
                  : undefined};
              }
            `}
          />
        </div>
        <div
          style={{
            background: breakpoint.gte("md")
              ? undefined
              : theme.colors.lightYellow
          }}
        >
          <Select
            label="Pick a city"
            options={cityOptions}
            onChange={handleCityChange}
            isCompact={activeField !== 1}
            disabled={isLoading || !Boolean(selectedCountry)}
            onOpen={() => setActiveField(1)}
            css={props => css`
              max-width: 90%;
              margin: 0 auto;
              ${props.mq.md} {
                max-width: 100%;
                top: ${activeField !== 1
                  ? `${(sizes.LARGE - sizes.SMALL) / 2}px`
                  : undefined};
              }
            `}
          />
        </div>
      </div>
      <RecentlyAdded studios={studios} />
    </Layout>
  );
};

IndexPage.getInitialProps = async ({ reduxStore }) => {
  const { dispatch } = reduxStore;
  await dispatch(getData());
  return {};
};

function mapStateToProps({ studios, locations }) {
  return { studios, locations };
}

export default connect(mapStateToProps)(IndexPage);
