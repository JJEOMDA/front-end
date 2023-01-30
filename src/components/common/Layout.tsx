import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout = () => {
  return (
    <React.Fragment>
      <Wrap>
        <Main>
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
  /* border: 1px solid #000; */
  font-size: 1.4rem;
  width: 380px;
  min-height: 660px;
  padding: 3rem;
`;
