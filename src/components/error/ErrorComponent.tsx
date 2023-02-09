import React from 'react';
import styled from 'styled-components';
import PuffLoader from 'react-spinners/PuffLoader';
import { deleteCookie } from '../../shared/cookie';

const ErrorComponent = () => {
  // useNavigate 선언

  return (
    <Wrap>
      <Main>
        <PuffLoader color="#00c7ae" />
        <div className="desc">
          <div>서버와의 통신이 원활하지 않습니다</div>
          <div>잠시 후 다시 시도해 주세요</div>
        </div>
        <button
          onClick={() => {
            deleteCookie('Authorization');
          }}
        >
          레거시 캐시 삭제하기
        </button>
      </Main>
    </Wrap>
  );
};

export default ErrorComponent;
const Wrap = styled.div`
  font-size: 1.4rem;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Main = styled.div`
  border: 1px solid #e1e1e1;
  // Mobile(479px 보다 작은 화면에서는 border: none;)
  @media (max-width: ${(props) => props.theme.breakpoints.Mobile}) {
    border: none;
  }
  font-size: 1.4rem;
  width: 380px;
  min-height: 660px;
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .desc {
    margin: 1rem 0;
    line-height: 1.2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  button {
    font-size: 1.5rem;
    background-color: #00c7ae;
  }
`;
