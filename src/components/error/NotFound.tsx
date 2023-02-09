import React from 'react';
import styled from 'styled-components';
import PuffLoader from 'react-spinners/PuffLoader';

const NotFound = () => {
  return (
    <Wrap>
      <PuffLoader color="#00c7ae" />
      <div className="desc">
        <div>요청하신 페이지를 찾을 수 없습니다</div>
        <div>주소를 다시 한 번 확인해 주세요</div>
      </div>
    </Wrap>
  );
};

export default NotFound;
const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .desc {
    margin-top: 1rem;
    line-height: 1.2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
