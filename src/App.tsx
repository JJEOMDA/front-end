import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './shared/styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Theme from './shared/styles/Theme';

// 페이지 import
import SignUp from './pages/login/SignUp';
import Login from './pages/login/Login';
import Kakao from './pages/login/Kakao';
import Layout from './components/common/Layout';
import Info from './pages/info/Info';
import Home from './pages/main/Home';
import Matching from './pages/matching/Matching';
import NotFound from './components/error/NotFound';
import ErrorBoundary from './components/error/ErrorBoundary';

// 토큰 payload에 담겨오는 정보를 바탕으로 로그인 권한 검증
import jwtDecode from 'jwt-decode';
import { getCookie } from './shared/cookie';

function App() {
  const accessToken = getCookie('Authorization');
  return (
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user/kakao/callback" element={<Kakao />} />
              <Route path="/info/:userId" element={<Info />} />
              <Route path="/home/:userId" element={<Home />} />
              <Route path="/matching/:userId" element={<Matching />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
