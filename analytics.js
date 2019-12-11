import React from "react";
import ReactGA from "react-ga";

const initGA = () => {
  ReactGA.initialize("UA-50377391-1");
};

const logPageView = () => {
  if (typeof window !== undefined) {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
};

export const useLogPageView = () => {
  React.useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);
};
