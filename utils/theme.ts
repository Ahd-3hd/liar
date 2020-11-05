export interface Space {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface FontSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}
export interface FontWeights {
  thin: string;
  normal: string;
  medium: string;
  bold: string;
}
export interface Colors {
  black: string;
  red: string;
  blue: string;
  white: string;
  grey: string;
  text: string;
}

export interface BreakPoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export const fontSizes: FontSizes = {
  xs: "10px",
  sm: "12px",
  md: "16px",
  lg: "24px",
  xl: "32px",
};

export const fontWeights: FontWeights = {
  thin: "400",
  normal: "500",
  medium: "600",
  bold: "700",
};

export const breakpoints: BreakPoints = {
  sm: "600px",
  md: "900px",
  lg: "1200px",
  xl: "1800px",
};

export const spaces: Space = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "32px",
  xl: "48px",
};

export const colors = {
  black: "#231F20",
  red: "#FF83CB",
  blue: "#8CCFFA",
  white: "#ffffff",
  grey: "#EEEEEE",
  darkblue: "#1F44A4",
  text: "#333555",
};

export interface Theme {
  colors: Colors;
  fontSizes: FontSizes;
  breakpoints: BreakPoints;
  spaces: Space;
  fontWeights: FontWeights;
}

const theme: Theme = {
  colors,
  fontSizes,
  breakpoints,
  spaces,
  fontWeights,
};

export default theme;
