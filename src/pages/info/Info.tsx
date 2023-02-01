import React, { useState } from 'react';
import styled from 'styled-components';
import InfoFirst from './InfoFirst';
import InfoSecond from './InfoSecond';
import InfoThird from './InfoThird';

const Info = () => {
  // 탭 인댁스
  const [tabIndex, setTabIndex] = useState<number>(1);

  // 탭 인댁스에 따른 컴포넌트 렌더링
  const tabContent = [
    <InfoFirst setTabIndex={setTabIndex} />,
    <InfoSecond setTabIndex={setTabIndex} />,
    <InfoThird setTabIndex={setTabIndex} />,
  ];

  return (
    <Wrap>
      <Header progressPercentage={tabIndex}>
        <div className="title">
          <div>나를 소개해주세요</div>
        </div>
        <div className="title-desc">
          <div>블라인드 상대에게 전달될 내 정보입니다</div>
          <div>정확한 정보를 입력할수록 매칭 성공확률이 올라갑니다</div>
        </div>
        <div className="progress-bar">
          <div className="value"></div>
          <div className="dot"></div>
        </div>
      </Header>
      {tabContent[tabIndex - 1]}
    </Wrap>
  );
};

export default Info;

const Wrap = styled.div``;
const Header = styled.div`
  .title {
    font-size: 3.2rem;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title-desc {
    line-height: 1.3;
  }
  .progress-bar {
    margin: 2rem 0 -2rem 0;
    background-color: #eee;
    height: 2rem;
    width: 100%;
    display: flex;
    align-items: center;
    .value {
      width: ${(props: { progressPercentage: number }) =>
        props.progressPercentage * 34}%;
      height: 2rem;
      background-color: ${(props: { progressPercentage: number }) =>
        props.progressPercentage === 3 ? '#2ec7a6' : '#673ab7'};
      /* 트랜지션 효과: 모든 프로퍼티의 변화를 1초에 걸쳐 전환 */
      transition: all 1s;
    }
    .dot {
      display: ${(props: { progressPercentage: number }) =>
        props.progressPercentage === 3 ? 'none' : 'block'};
      width: 30px;
      height: 30px;
      background-color: #fff;
      border: 5px solid #673ab7;
      border-radius: 40px;
      margin-left: -20px;
      z-index: 99;
      box-sizing: content-box;
    }
  }
`;
