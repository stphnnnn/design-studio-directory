/** @jsx jsx */
import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useTheme } from "emotion-theming";

import { getData } from "../../../dataHelpers/store";
import Constraint from "../../../components/Constraint";
import Header from "../../../components/Header";
import Heading from "../../../components/Heading";
import SEO from "../../../components/SEO";
import { Layout } from "../../../components/Layout";
import StudiosGrid from "../../../components/StudiosGrid";
import VerticalSpace from "../../../components/VerticalSpace";
import useBreakpoint from "../../../components/useBreakpoint";
import Select from "../../../components/Select";

const constraint = css`
  padding-top: 5rem;
  padding-bottom: 5rem;
  text-align: center;
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.lightYellow};
`;

const defaultButtonStyles = `
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0 2rem;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.66rem;
  cursor: pointer;
  text-decoration: none;
`;

const ButtonAnchor = React.forwardRef(({ type = "primary", ...props }, ref) => {
  const theme = useTheme();

  const getButtonStyles = () => {
    if (type === "primary") {
      return `
        color: ${theme.colors.yellow};
        border: 1px solid ${theme.colors.yellow};
    
        &:hover,
        &:focus {
          box-shadow: none;
          color: ${theme.colors.darkBlue};
          background-color: ${theme.colors.yellow};
        }
      `;
    }
    if (type === "secondary") {
      return `
        color: ${theme.colors.darkBlue};
        border: 1px solid ${theme.colors.darkBlue};

        &:hover,
        &:focus {
          box-shadow: none;
          color: ${theme.colors.yellow};
          background-color: ${theme.colors.darkBlue};
        }
      `;
    }
  };

  return (
    <a
      ref={ref}
      href={"/"}
      css={css`
        ${defaultButtonStyles}
        ${getButtonStyles()}
      `}
      {...props}
    />
  );
});

const ResultsPage = ({ studios, city, country, locations }) => {
  const hasResults = city && country && studios.length > 0;

  const breakpoint = useBreakpoint();
  const theme = useTheme();

  const router = useRouter();

  const cityOptions = country ? [...locations[country]].sort() : [];

  const handleCityChange = (selectedItem) => {
    router.push(
      `/results/[country]/[city]`,
      `/results/${country}/${selectedItem}`
    );
  };

  return (
    <Layout
      header={
        <Header>
          {hasResults ? (
            <div>
              <Heading
                level={3}
                size={breakpoint.gte("md") ? 1.9 : 1.2}
                lineHeight={1.5}
                weight={300}
              >
                Here’s a list of studios in
              </Heading>
              <Heading
                level={2}
                size={breakpoint.gte("md") ? 1.9 : 1.2}
                lineHeight={1.5}
                weight={600}
              >
                {city}, {country}
              </Heading>
            </div>
          ) : (
            <Heading level={2} size={1.9} lineHeight={1.5} weight={300}>
              No studios found
            </Heading>
          )}
          <VerticalSpace size="3rem" />
        </Header>
      }
    >
      <SEO
        title={`Studios in ${city}, ${country}`}
        url={`https://designstudio.directory/${country}/${city}`}
      />
      <div
        css={(props) => css`
          display: flex;
          flex-direction: column;
          width: 100%;
          align-items: center;
          position: absolute;
          transform: translateY(-50%);
          z-index: 1;
        `}
      >
        <div
          css={(props) => css`
            position: absolute;
            transform: translateY(-100%);
            padding-bottom: 1rem;
            z-index: 1;
            color: white;
            font-size: 0.66rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            font-weight: 500;
          `}
        >
          Change city
        </div>
        <Select
          label="Change city"
          options={cityOptions}
          onChange={handleCityChange}
          initialSelectedItem={city}
          isCompact={false}
          css={(props) => css`
            max-width: 90%;
            margin: 0 auto;
            ${props.mq.md} {
              max-width: 100%;
            }
          `}
        />
      </div>
      <Container>
        {hasResults && (
          <Constraint css={constraint}>
            <StudiosGrid studios={studios} />
            <VerticalSpace size="4rem" />
            <Link href="/">
              <ButtonAnchor type="secondary">Search Again</ButtonAnchor>
            </Link>
          </Constraint>
        )}
      </Container>
    </Layout>
  );
};

ResultsPage.getInitialProps = async ({ reduxStore, req, query }) => {
  const { dispatch } = reduxStore;

  await dispatch(getData());

  const { studios } = reduxStore.getState();
  const { city, country } = query;

  const isSelectedLocation = (location) =>
    location.country === country && location.city === city;

  const filteredStudios = studios
    .filter((studio) =>
      // Only show studios in the selected location
      studio.locations.some((location) => isSelectedLocation(location))
    )
    .map((studio) => {
      // Move selected location to the start of the list
      const locations = studio.locations.sort((a, b) =>
        isSelectedLocation(a) ? -1 : isSelectedLocation(b) ? 1 : 0
      );

      return {
        ...studio,
        locations,
      };
    });

  return { studios: filteredStudios, city, country };
};

function mapStateToProps({ locations }) {
  return { locations };
}

export default connect(mapStateToProps)(ResultsPage);
