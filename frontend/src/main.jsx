import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider, theme } from "antd";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
        }}>
        {/* <Input placeholder="Please Input" />
      <Button type="primary">Submit</Button> */}
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
