import React from 'react';
import styled, { css } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RiErrorWarningFill } from 'react-icons/ri';
import { TfiBackLeft } from 'react-icons/tfi';
import { AiOutlineRight } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import apis from '../../shared/apis';

const Home = () => {
  // useNavigate 선언
  const navigate = useNavigate();

  // url에 id값 받아오기
  const view = useParams();

  // 캐러셀 세팅
  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 4500,
    infinite: true,
  };

  // sweet-alert 모달창
  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  // 매칭 상태 버튼 클릭시 진행상황 모달창
  const matchingStatus = () => {
    if (getUseInfoQuery?.data.matchingStatus === -1) {
      Toast.fire({
        icon: 'warning',
        title:
          '<span style="font-size: 14px">대기중입니다! 매칭이 시작되면 알려드릴게요!',
        width: 340,
      });
    } else if (getUseInfoQuery?.data.matchingStatus === 0) {
      Toast.fire({
        icon: 'info',
        title:
          '<span style="font-size: 14px">매칭이 진행중이에요! 조금만 기다려주세요!',
        width: 340,
      });
    } else {
      Toast.fire({
        icon: 'success',
        title:
          '<span style="font-size: 14px">매칭이 완료되었습니다! 결과를 확인하세요!',
        width: 340,
      });
    }
  };

  // 쩜다 실시간 매칭 현황 탭
  const developing = () => {
    Toast.fire({
      icon: 'warning',
      title:
        '<span style="font-size: 14px">준비 중인 기능입니다! 다음 업데이트에서 만나요!',
      width: 360,
    });
  };

  // 유저 정보 호출 api
  const getUserInfo = async () => {
    try {
      const res = await apis.getUserInfo(view.userId);
      return res;
    } catch (err) {
      console.log('유저 정보를 불러오는데 실패했습니다.');
    }
  };

  // 유저 정보 호출 쿼리
  const { data: getUseInfoQuery } = useQuery(['loadUserInfo'], getUserInfo, {
    refetchOnWindowFocus: false,
    onSuccess: () => {},
    onError: () => {
      console.log('유저 정보를 불러오는데 실패했습니다.');
    },
  });

  return (
    <Wrap>
      <Profile>
        <div className="title-name">
          <div>
            <span>안녕하세요, </span>
            {getUseInfoQuery?.data.name}
          </div>
          <TfiBackLeft
            onClick={() => {
              navigate('/');
            }}
          />
        </div>
        <div className="title-banner">
          <StyledSlider {...settings}>
            <img src="/images/banner_bg_1.png" alt="쩜다 배너" />
            <img src="/images/banner_bg_2.png" alt="쩜다 배너" />
          </StyledSlider>
        </div>
      </Profile>
      <Notice>
        <RiErrorWarningFill />
        <div>익일 00시 정각마다 진행상황이 업데이트 됩니다.</div>
      </Notice>
      <Content>
        <ul>
          <li
            onClick={() => {
              navigate('/matching');
            }}
          >
            <div className="matching">
              블라인드 매칭 <span>HOT</span>
            </div>
            <AiOutlineRight />
          </li>
          <li
            onClick={() => {
              developing();
            }}
          >
            <div>쩜다 실시간 매칭 현황</div>
            <AiOutlineRight />
          </li>
          <li
            onClick={() => {
              window.open('https://forms.gle/NmiLSJEue8iF6RzA9');
            }}
          >
            <div>문의하기</div>
            <AiOutlineRight />
          </li>
        </ul>
      </Content>
      <hr />
      <MatchingCard matchingStatus={getUseInfoQuery?.data.matchingStatus}>
        <div className="matching-card-title">나의 매칭 현황</div>
        <div className="card-box">
          <div
            className="card first"
            onClick={() => {
              matchingStatus();
            }}
          >
            <div className="card-title">매칭대기</div>
            {/* <div className="num">0</div> */}
          </div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>

          <div
            className="card second"
            onClick={() => {
              matchingStatus();
            }}
          >
            <div className="card-title">매칭중</div>
            {/* <div className="num">0</div> */}
          </div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div
            className="card third"
            onClick={() => {
              matchingStatus();
            }}
          >
            <div className="card-title">매칭완료</div>
            {/* <div className="num">0</div> */}
          </div>
        </div>
      </MatchingCard>
      <Footer>
        <div className="version">version 1.0.1 (Beta)</div>
      </Footer>
    </Wrap>
  );
};

export default Home;

const Wrap = styled.div``;
const Profile = styled.div`
  width: 100%;
  height: 18rem;
  .title-name {
    font-size: 2.3rem;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    span {
      font-weight: 500;
      color: gray;
    }
    svg {
      cursor: pointer;
    }
  }
  .title-banner {
    margin: 2rem 0 2rem 0;
  }
`;
const StyledSlider = styled(Slider)`
  width: 100%;
  .slick-dots {
    position: absolute;
    bottom: 10px;
  }
`;
const Notice = styled.div`
  font-size: 1.4rem;
  width: 100%;
  height: 3rem;
  background-color: #f2f2f2;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.5rem;
  }
`;
const Content = styled.div`
  margin: 3rem 0 3rem 0;
  ul {
    list-style: none;
    font-size: 1.7rem;
    li {
      .matching {
        display: flex;
        align-items: center;
        span {
          font-size: 1.3rem;
          color: red;
          background-color: #fdeeee;
          padding: 2px;
          margin-left: 10px;
        }
      }
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      &:hover {
        cursor: pointer;
        background-color: rgba(0, 123, 255, 0.1);
        color: #35a3dc;
      }
    }
  }
`;
const MatchingCard = styled.div`
  margin: 2rem 0 2rem 0;
  .matching-card-title {
    margin-bottom: 2rem;
    background-color: #000;
    color: #fff;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.2rem;
    border-radius: 5px;
  }
  .card-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .card {
      width: 60px;
      height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
      .num {
        font-size: 2.3rem;
      }
      transition: all 0.2s ease-in-out;
      &:hover {
        filter: brightness(90%);
      }
    }
    .card.first {
      background-color: #e1e1e1;
      color: gray;
      ${(props: { matchingStatus: number }) =>
        props.matchingStatus === -1 &&
        css`
          background: linear-gradient(
              287.96deg,
              rgba(0, 0, 0, 0.16) 15.1%,
              rgba(0, 0, 0, 0) 83.32%
            ),
            #e2445c;
          color: #fff;
        `};
    }
    .card.second {
      background-color: #e1e1e1;
      color: gray;
      ${(props: { matchingStatus: number }) =>
        props.matchingStatus === 0 &&
        css`
          background: linear-gradient(
              287.96deg,
              rgba(0, 0, 0, 0.16) 15.1%,
              rgba(0, 0, 0, 0) 83.32%
            ),
            #02c3bd;
          color: #fff;
        `};
    }
    .card.third {
      background-color: #e1e1e1;
      color: gray;
      ${(props: { matchingStatus: number }) =>
        props.matchingStatus === 1 &&
        css`
          background: linear-gradient(
              287.96deg,
              rgba(0, 0, 0, 0.16) 15.1%,
              rgba(0, 0, 0, 0) 83.32%
            ),
            #fdab3d;
          color: #fff;
        `};
    }
    .circle {
      width: 6px;
      height: 6px;
      background-color: #e1e1e1;
      border-radius: 3px;
    }
  }
`;
const Footer = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .version {
    font-size: 1.3rem;
    color: gray;
    background-color: #f2f2f2;
    padding: 6px;
    border-radius: 5px;
  }
`;
