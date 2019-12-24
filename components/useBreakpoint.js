import React from "react";
import styled from "@emotion/styled";
import map from "lodash/map";
import throttle from "lodash/throttle";

// ideally stored in theme configuration
const BREAKPOINTS = {
  xs: "@media screen and (max-width: 575px)",
  sm: "@media screen and (min-width: 576px)",
  md: "@media screen and (min-width: 768px)",
  lg: "@media screen and (min-width: 992px)",
  xl: "@media screen and (min-width: 1200px)"
};

const EVENT_TYPES = ["resize", "orientationchange"];

const BreakpointContext = React.createContext();

const Breakpoints = styled.div`
  &::before {
    display: none;
  }
  ${() =>
    map(
      BREAKPOINTS,
      (query, name) => `
    ${query} {
      &::before {
        content: '${name}';
      }
    }
  `
    )};
`;

const createBreakpoint = value => {
  const getIndex = breakpoint => {
    return Object.keys(BREAKPOINTS).indexOf(breakpoint);
  };

  return {
    value,
    lt: compare => getIndex(value) < getIndex(compare),
    gt: compare => getIndex(value) > getIndex(compare),
    lte: compare => getIndex(value) <= getIndex(compare),
    gte: compare => getIndex(value) >= getIndex(compare)
  };
};

export const BreakpointProvider = ({ children }) => {
  const [breakpoint, setBreakpoint] = React.useState(createBreakpoint(1200));

  const breakpointsRef = React.useRef(null);

  React.useEffect(() => {
    const updateBreakpoint = afterElement => {
      if (afterElement) {
        const value = afterElement
          .getPropertyValue("content")
          .replace(/"/g, "");

        setBreakpoint(createBreakpoint(value));
      }
    };

    const update = throttle(() => {
      updateBreakpoint(
        window.getComputedStyle(breakpointsRef.current, "::before")
      );
    });

    EVENT_TYPES.forEach(eventType =>
      window.addEventListener(eventType, update)
    );

    update();

    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <BreakpointContext.Provider value={breakpoint}>
      <Breakpoints ref={breakpointsRef} />
      {children}
    </BreakpointContext.Provider>
  );
};

const useBreakpoint = () => {
  return React.useContext(BreakpointContext);
};

export default useBreakpoint;
