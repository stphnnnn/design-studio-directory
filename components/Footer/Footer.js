import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "emotion-theming";

import { Constraint } from "../Constraint";

const PlainAnchor = styled.a`
  text-decoration: none;
  text-decoration-skip-ink: auto;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = ({ theme }) => (
  <footer
    style={{
      backgroundColor: theme.colors.yellow
    }}
  >
    <Constraint>
      <div
        style={{
          height: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <PlainAnchor
          href="https://docs.google.com/forms/d/e/1FAIpQLSepMfctlDO-enGUdrEXObNgiBha63f5Kmkc-70s3ZOQhnbG4w/viewform"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontWeight: 600,
            fontSize: "1.5rem"
          }}
        >
          Suggest a studio
        </PlainAnchor>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          paddingBottom: `4rem`,
          textAlign: "center",
          fontSize: "0.8rem"
        }}
      >
        <span>
          A project by{" "}
          <PlainAnchor href="http://jamingalea.com/">Jamin Galea</PlainAnchor>
        </span>
        <span>
          Built by{" "}
          <PlainAnchor href="https://steveburtenshaw.com/">
            Steve Burtenshaw
          </PlainAnchor>
        </span>
        <span>
          <PlainAnchor href="https://twitter.com/DesignStudioDir">
            @DesignStudioDir
          </PlainAnchor>
        </span>
      </div>
    </Constraint>
  </footer>
);

export default withTheme(Footer);
