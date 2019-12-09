/** @jsx jsx */

import React from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";

import Constraint from "./Constraint";
import { TwitterLogo } from "./icons";

const PlainAnchor = styled.a`
  text-decoration: none;
  text-decoration-skip-ink: auto;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    ${props => props.theme.getFocusStyle(props.theme.colors.darkBlue)};
  }
`;

const Anchor = styled.a`
  text-decoration-skip-ink: auto;

  &:focus {
    ${props => props.theme.getFocusStyle(props.theme.colors.darkBlue)};
  }
`;

const Footer = () => {
  const theme = useTheme();
  return (
    <footer
      style={{
        backgroundColor: theme.colors.yellow
      }}
    >
      <Constraint>
        <div
          style={{
            padding: "6rem 0",
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
            <Anchor href="http://jamingalea.com/">Jamin Galea</Anchor>
          </span>
          <span>
            Built by{" "}
            <Anchor href="https://steveburtenshaw.com/">
              Steve Burtenshaw
            </Anchor>
          </span>
          <span>
            <PlainAnchor
              href="https://twitter.com/DesignStudioDir"
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              <TwitterLogo
                css={css`
                  height: 0.75em;
                  margin-right: 0.25em;
                `}
              />{" "}
              @DesignStudioDir
            </PlainAnchor>
          </span>
        </div>
      </Constraint>
    </footer>
  );
};

export default Footer;
