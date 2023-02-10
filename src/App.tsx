import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

// 토큰 payload에 담겨오는 정보를 바탕으로 로그인 라우팅 처리
import jwtDecode from 'jwt-decode';
import { getCookie } from './shared/cookie';

function App() {
  // 토큰 타입정의
  interface TokenProps {
    exp: number;
    iat: number;
    roles: string[];
    sub: string;
  }

  const accessToken = getCookie('Authorization');
  let authority: TokenProps;
  let isAuth: boolean | undefined;

  if (accessToken) {
    authority = jwtDecode(accessToken);
    isAuth = authority.roles[0] === 'ROLE_USER';
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Layout /> }>
              <Route path="/" element={isAuth ? <Navigate to="/info" /> : <SignUp /> } />
              <Route path="/login" element={isAuth ? <Navigate to="/info" /> : <Login /> } />
              <Route path="/user/kakao/callback" element={isAuth ? <Navigate to="/info" /> : <Kakao />} />
              <Route path="/info" element={<Info />} />
              <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" />} />
              <Route path="/matching" element={<Matching />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
