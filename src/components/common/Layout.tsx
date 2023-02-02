import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Layout = () => {
  // useLocation 선언
  const location = useLocation();
  // url이 /home으로 끝나는, 즉 Home 컴포넌트에서는 padding을 2rem으로 적용
  const pageHomePadding = location.pathname === '/home' ? '2rem' : '3rem';
  return (
    <React.Fragment>
      <Wrap>
        <Main pageHomePadding={pageHomePadding}>
          <Outlet />
        </Main>
      </Wrap>
    </React.Fragment>
  );
};

export default Layout;
const Wrap = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
`;

const Main = styled.main`
  border: 1px solid #e1e1e1;
  // Mobile(479px 보다 작은 화면에서는 border: none;)
  @media (max-width: ${(props) => props.theme.breakpoints.Mobile}) {
    border: none;
  }
  font-size: 1.4rem;
  width: 380px;
  min-height: 660px;
  padding: ${(props: { pageHomePadding: string }) => props.pageHomePadding};
`;
