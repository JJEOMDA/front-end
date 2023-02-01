import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './shared/styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Theme from './shared/styles/Theme';

// 페이지 import
import SignUp from './pages/login/SignUp';
import Login from './pages/login/Login';
import Layout from './components/common/Layout';
import InfoFirst from './pages/main/InfoFirst';

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/info_first" element={<InfoFirst />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
