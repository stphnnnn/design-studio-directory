import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { withTheme } from "emotion-theming";

import { Constraint } from "../Constraint";
import { Heading } from "../Heading";

const Header = ({ title, intro, theme }) => (
  <header
    style={{
      textAlign: "center",
      backgroundColor: theme.colors.darkBlue,
      color: theme.colors.light,
      position: "relative"
    }}
  >
    <div
      style={{
        fontSize: "11rem",
        color: theme.colors.lightBlue,
        fontWeight: 700,
        textAlign: "left",
        lineHeight: 0.9,
        position: "absolute",
        top: "-5rem",
        left: "50%",
        whiteSpace: "nowrap",
        transform: "translateX(-50%)",
        opacity: 0.25,
        userSelect: "none"
      }}
    >
      Design Studio
      <br /> Directory
    </div>
    <Constraint
      style={{
        position: "relative",
        zIndex: 1
      }}
    >
      <div
        style={{
          paddingTop: `4rem`
        }}
      >
        <Link href="/">
          <a
            style={{
              textDecoration: "none"
            }}
          >
            <Heading level={1} size={1.3} weight={600}>
              {title}
            </Heading>
          </a>
        </Link>
      </div>
      <div
        style={{
          height: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {intro && (
          <Heading level={2} size={1.9} lineHeight={1.5} weight={300}>
            {intro}
          </Heading>
        )}
      </div>
    </Constraint>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  intro: PropTypes.string
};

export default withTheme(Header);
