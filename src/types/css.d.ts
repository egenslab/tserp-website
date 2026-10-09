import "react";

// Allow CSS custom properties such as style={{ "--c": "#184332" }}
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
