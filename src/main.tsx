// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import { store } from "@features/store";
// import { Provider } from "react-redux";
// import { ThemeProvider } from "@material-tailwind/react";
// import { HelmetProvider } from "react-helmet-async";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <ThemeProvider>
//         <HelmetProvider>
//           <App></App>
//         </HelmetProvider>
//       </ThemeProvider>
//     </Provider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "@features/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-tailwind/react";
import { HelmetProvider } from "react-helmet-async";

// Ensure the root element is not null
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

// Create the root with correct typing
const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
