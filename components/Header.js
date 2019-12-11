/** @jsx jsx */

import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { jsx, css } from "@emotion/core";
import { useTheme } from "emotion-theming";
import { motion, useViewportScroll, useTransform } from "framer-motion";

import Constraint from "./Constraint";
import Heading from "./Heading";
import VerticalSpace from "./VerticalSpace";

const LogoAnchor = React.forwardRef((props, ref) => {
  return (
    <Heading level={1} size={1.3} weight={600}>
      <a
        ref={ref}
        href="/"
        css={css`
          text-decoration: none;
        `}
        {...props}
      >
        Design Studio Directory
      </a>
    </Heading>
  );
});

const Header = ({ children, isCompact }) => {
  const theme = useTheme();

  const { scrollY } = useViewportScroll();

  const inRange = [0, 500];

  const translateY = useTransform(scrollY, inRange, [0, 150]);
  const opacity = useTransform(scrollY, inRange, [0.25, 0]);

  return (
    <header
      style={{
        textAlign: "center",
        backgroundColor: theme.colors.darkBlue,
        color: theme.colors.light,
        position: "relative",
        overflowX: "hidden"
      }}
    >
      <motion.div
        style={{
          fontSize: "11rem",
          color: theme.colors.lightBlue,
          fontWeight: 700,
          textAlign: "left",
          lineHeight: 0.9,
          position: "absolute",
          top: `-5rem`,
          left: "50%",
          whiteSpace: "nowrap",
          translateX: "-50%",
          translateY,
          opacity,
          userSelect: "none"
        }}
      >
        Design Studio
        <br /> Directory
      </motion.div>
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
            <LogoAnchor />
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
          css={props => css`
            ${props.mq.md} {
              paddingbottom: "2rem";
            }
          `}
        >
          {children}
          <VerticalSpace size="2rem" />
        </div>
      </Constraint>
    </header>
  );
};

Header.propTypes = {
  intro: PropTypes.string
};

export default Header;
