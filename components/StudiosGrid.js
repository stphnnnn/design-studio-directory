/** @jsx jsx */

import React from "react";
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core";

import Studio from "./Studio";

const StudiosContainer = styled.div`
  @media only screen and (min-width: 800px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StudiosGrid = ({ studios, ...props }) => {
  console.log(studios);
  return (
    <StudiosContainer {...props}>
      {studios.map((studio, i) => {
        console.log(studio, i);
        return <Studio key={`${studio.name}-${i}`} {...studio} />;
      })}
    </StudiosContainer>
  );
};

export default StudiosGrid;
