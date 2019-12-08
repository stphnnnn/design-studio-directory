/** @jsx jsx */
import React from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useTheme } from "emotion-theming";

import { Constraint } from "../../../components/Constraint";
import { Header } from "../../../components/Header";
import { Heading } from "../../../components/Heading";
import SEO from "../../../components/SEO";
import { Layout } from "../../../components/Layout";
import { StudiosGrid } from "../../../components/StudiosGrid";
import VerticalSpace from "../../../components/VerticalSpace";
import { getStudios } from "../../../dataHelpers";

const constraint = css`
  padding: 5rem 0;
  text-align: center;
`;

const Container = styled.div`
  background-color: ${props => props.theme.colors.lightYellow};
`;

const defaultButtonStyles = `
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  padding: 0 2rem;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.66rem;
  cursor: pointer;
`;

const ButtonAnchor = React.forwardRef(({ type = "primary", ...props }, ref) => {
  const theme = useTheme();

  const getButtonStyles = () => {
    if (type === "primary") {
      return `
        color: ${theme.colors.yellow};
        border: 1px solid ${theme.colors.yellow};
    
        &:hover {
          color: ${theme.colors.darkBlue};
          background-color: ${theme.colors.yellow};
        }
      `;
    }
    if (type === "secondary") {
      return `
        color: ${theme.colors.darkBlue};
        border: 1px solid ${theme.colors.darkBlue};

        &:hover {
          color: ${theme.colors.yellow};
          background-color: ${theme.colors.darkBlue};
        }
      `;
    }
  };

  return (
    <a
      ref={ref}
      css={css`
        ${defaultButtonStyles}
        ${getButtonStyles()}
      `}
      {...props}
    />
  );
});

const ResultsPage = ({ studios, city, country }) => {
  const hasResults = city && country && studios.length > 0;

  return (
    <Layout
      header={
        <Header isCompact>
          {hasResults ? (
            <div>
              <Heading level={3} size={1.9} lineHeight={1.5} weight={300}>
                Here’s a list of studios in
              </Heading>
              <Heading level={2} size={1.9} lineHeight={1.5} weight={600}>
                {city}, {country}
              </Heading>
            </div>
          ) : (
            <Heading level={2} size={1.9} lineHeight={1.5} weight={300}>
              No studios found
            </Heading>
          )}
          <VerticalSpace size="2rem" />
          <Link href="/">
            <ButtonAnchor>Search Again</ButtonAnchor>
          </Link>
          <VerticalSpace size="2rem" />
        </Header>
      }
    >
      <SEO title="Results" />
      <Container>
        {hasResults && (
          <Constraint css={constraint}>
            <StudiosGrid
              studios={studios}
              css={css`
                margin-top: -7rem;
              `}
            />
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
