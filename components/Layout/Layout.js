import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Head from "next/head";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";

import Footer from "../Footer";

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

const LoadingOverlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const LoadingSpinner = () => (
  <LoadingOverlay>
    <svg
      width="60"
      height="60"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#fff"
    >
      <g transform="translate(1 1)" strokeWidth="2">
        <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  </LoadingOverlay>
);

const Layout = ({ header, children }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const showLoader = () => setIsLoading(true);
    const hideLoader = () => setIsLoading(false);

    Router.events.on("routeChangeStart", showLoader);
    Router.events.on("routeChangeComplete", hideLoader);
    Router.events.on("routeChangeError", hideLoader);

    return () => {
      Router.events.off("routeChangeStart", showLoader);
      Router.events.off("routeChangeComplete", hideLoader);
      Router.events.off("routeChangeError", hideLoader);
    };
  }, []);

  return (
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
            ${isLoading && "overflow: hidden;"}
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
      {isLoading && <LoadingSpinner />}
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
