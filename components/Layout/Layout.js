import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";

import { Footer } from "../Footer";
import { Header } from "../Header";

// import "./layout.css"

// import "normalize.css/normalize.css";

import reset from "./reset";

const theme = {
  colors: {
    darkBlue: `#111521`,
    blue: `#1A2233`,
    lightBlue: `#242F47`,
    lightYellow: `#FCF781`,
    yellow: `#FBF201`,
    lightGrey: `#9197A4`,
    light: "#FFFFFF"
  },
  getFocusStyle: color => `box-shadow: 0 0 0 2px ${color}`
};

const Layout = ({ header, children }) => (
  <ThemeProvider theme={theme}>
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Work+Sans:300,600,700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Global
      styles={css`
        ${reset}

        html {
          font-size: 18px;
          line-height: 1.5;
        }

        body {
          font-family: "Work Sans", sans-serif;
        }

        a {
          color: inherit;
        }

        *:focus {
          outline: 0;
          box-shadow: 0 0 0 2px ${theme.colors.yellow};
        }
      `}
    />
    {header}
    <main>{children}</main>
    <Footer />
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
