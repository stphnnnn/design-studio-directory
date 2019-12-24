/** @jsx jsx */

import React from "react";
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";

import Heading from "./Heading";
import Constraint from "./Constraint";
import StudiosGrid from "./StudiosGrid";
import VerticalSpace from "./VerticalSpace";
import useBreakpoint from "./useBreakpoint";

const MAX_STUDIOS_COUNT = 18;

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

const RecentlyAdded = ({ studios }) => {
  const breakpoint = useBreakpoint();

  const sortedStudios = [...studios].slice(0, MAX_STUDIOS_COUNT);

  return (
    <Container>
      <Constraint css={constraint}>
        <Heading level={2} size={breakpoint.gte("md") ? 1.3 : 1}>
          Recently added studios
        </Heading>
        <VerticalSpace size="2rem" />
        <StudiosGrid studios={sortedStudios} />
        <VerticalSpace size="2rem" />
      </Constraint>
    </Container>
  );
};
export default RecentlyAdded;
