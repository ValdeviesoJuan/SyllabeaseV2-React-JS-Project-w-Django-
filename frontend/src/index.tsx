import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Mantine provider import
import { MantineProvider } from "@mantine/core";

// Extend MantineProviderProps only for missing props (v7 dropped them)
declare module "@mantine/core" {
  interface MantineProviderProps {
    withGlobalStyles?: boolean;
    withNormalizeCSS?: boolean;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      defaultColorScheme="light" // already typed in Mantine, no redeclare needed
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);


// CRA performance report
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
