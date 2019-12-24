export const BREAKPOINTS = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

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
  mq: Object.entries(BREAKPOINTS).reduce(
    (breakpoints, [bp, value]) => ({
      ...breakpoints,
      [bp]: `@media (min-width: ${value}px)`
    }),
    {}
  ),
  getFocusStyle: color => `box-shadow: 0 0 0 2px ${color}`
};

export default theme;
