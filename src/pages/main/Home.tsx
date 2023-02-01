import React from 'react';
import styled from 'styled-components';

const Home = () => {
  return (
    <Wrap>
      <Profile></Profile>
    </Wrap>
  );
};

export default Home;

const Wrap = styled.div``;
const Profile = styled.div`
  width: 100%;
  height: 15rem;
  background-color: red;
`;
