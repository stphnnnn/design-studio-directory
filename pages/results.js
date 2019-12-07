/** @jsx jsx */
import React from "react";
import fetch from "isomorphic-unfetch";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import { Constraint } from "../components/Constraint";
import { Heading } from "../components/Heading";
import { Layout } from "../components/Layout";
import { StudiosGrid } from "../components/StudiosGrid";
import { getStudios } from "../dataHelpers";

const constraint = css`
  display: flex;
  flex-direction: column;
  padding-top: 10rem;
  padding-bottom: 6rem;
  text-align: center;
`;

const Container = styled.div`
  background-color: ${props => props.theme.colors.lightYellow};
`;

const ResultsPage = ({ studios, city, country }) => {
  return (
    <Layout>
      <Container>
        <Constraint css={constraint}>
          <Heading level={2} size={1.3}>
            {city}, {country}
          </Heading>
          <StudiosGrid studios={studios} />
        </Constraint>
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
