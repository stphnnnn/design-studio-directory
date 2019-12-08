/** @jsx jsx */
import React from "react";
import fetch from "isomorphic-unfetch";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import { Constraint } from "../../../components/Constraint";
import { Header } from "../../../components/Header";
import SEO from "../../../components/SEO";
import { Layout } from "../../../components/Layout";
import { StudiosGrid } from "../../../components/StudiosGrid";
import { getStudios } from "../../../dataHelpers";

const constraint = css`
  display: flex;
  flex-direction: column;
  padding: 5rem 0;
  text-align: center;
`;

const Container = styled.div`
  background-color: ${props => props.theme.colors.lightYellow};
`;

const ResultsPage = ({ studios, city, country }) => {
  const hasResults = city && country && studios.length > 0;

  return (
    <Layout
      header={
        <Header
          intro={hasResults ? `${city}, ${country}` : "No studios found"}
        />
      }
    >
      <SEO title="Results" />
      <Container>
        {hasResults && (
          <Constraint css={constraint}>
            <StudiosGrid studios={studios} />
          </Constraint>
        )}
      </Container>
    </Layout>
  );
};

ResultsPage.getInitialProps = async ({ query }) => {
  const apiUrl = "https://api.sheety.co/46c50c36-f98f-4270-812c-f78377b90306";

  const res = await fetch(apiUrl);
  const data = await res.json();

  const { city, country } = query;

  const isSelectedLocation = location =>
    location.country === country && location.city === city;

  const studios = getStudios(data)
    .filter(studio =>
      // Only show studios in the selected location
      studio.locations.some(location => isSelectedLocation(location))
    )
    .map(studio => {
      // Move selected location to the start of the list
      const locations = studio.locations.sort((a, b) =>
        isSelectedLocation(a) ? -1 : isSelectedLocation(b) ? 1 : 0
      );

      return {
        ...studio,
        locations
      };
    });

  return { studios, city, country };
};

export default ResultsPage;
