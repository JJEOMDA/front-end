import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const MatchingBtn = (props: { setTabIndex: Dispatch<SetStateAction<number>> }) => {
  return (
    <Wrap>
      <div className="desc">비는 조금 흩날렸지만 괜찮았다 ,</div>
      <button
        onClick={() => {
          props.setTabIndex((prev) => prev + 1);
        }}
      >
        너를 만난다는 설렘으로
      </button>
    </Wrap>
  );
};

export default MatchingBtn;
const Wrap = styled.div`
  .desc {
    margin-bottom: 2rem;
    font-size: 2.3rem;
    font-weight: 700;
    // text 서서히 나타나게 하기
    opacity: 0;
    animation: fadeInText 3s 0s ease-out forwards;
    @keyframes fadeInText {
      100% {
        opacity: 1;
      }
    }
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  button {
    background-color: #000;
    font-size: 1.7rem;
    height: 5rem;
    opacity: 0;
    animation: fadeInText 4s 1s ease-out forwards;
  }
`;
