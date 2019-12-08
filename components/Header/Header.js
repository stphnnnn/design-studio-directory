import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { withTheme } from "emotion-theming";

import { Constraint } from "../Constraint";
import { Heading } from "../Heading";
import VerticalSpace from "../VerticalSpace";

const Header = ({ children, isCompact, theme }) => (
  <header
    style={{
      textAlign: "center",
      backgroundColor: theme.colors.darkBlue,
      color: theme.colors.light,
      position: "relative",
      overflowX: "hidden"
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
              Design Studio Directory
            </Heading>
          </a>
        </Link>
      </div>
      <div
        style={{
          height: isCompact ? 400 : 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          maxWidth: 750,
          margin: "0 auto"
        }}
      >
        {children}
        <VerticalSpace size="2rem" />
      </div>
    </Constraint>
  </header>
);

Header.propTypes = {
  intro: PropTypes.string
};

export default withTheme(Header);
