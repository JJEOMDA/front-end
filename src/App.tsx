import React from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./shared/styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import Theme from "./shared/styles/Theme";

// 페이지 import
import Login from "./pages/login/Login";
import Layout from "./components/common/Layout";

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Login />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
