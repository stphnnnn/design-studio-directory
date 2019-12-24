import React from "react";
import App from "next/app";
import { ThemeProvider } from "emotion-theming";

import { BreakpointProvider } from "../components/useBreakpoint";

import theme from "../components/theme";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <BreakpointProvider>
          <Component {...pageProps} />
        </BreakpointProvider>
      </ThemeProvider>
    );
  }
}
