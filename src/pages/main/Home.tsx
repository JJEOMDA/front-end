import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RiErrorWarningFill } from 'react-icons/ri';
import { TfiBackLeft } from 'react-icons/tfi';
import { AiOutlineRight } from 'react-icons/ai';
import Swal from 'sweetalert2';

const Home = () => {
  // useNavigate 선언
  const navigate = useNavigate();

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

  const matchingWaiting = () => {
    Toast.fire({
      icon: 'info',
      title:
        '<span style="font-size: 14px">대기중입니다! 매칭이 시작되면 알려드릴게요!',
      width: 340,
    });
  };

  return (
    <Wrap>
      <Profile>
        <div className="title-name">
          <div>
            <span>안녕하세요, </span>김하나
          </div>
          <TfiBackLeft
            onClick={() => {
              navigate('/');
            }}
          />
        </div>
        <div className="title-banner">
          <StyledSlider {...settings}>
            <img src="./images/banner_bg_1.png" alt="쩜다 배너" />
            <img src="./images/banner_bg_2.png" alt="쩜다 배너" />
          </StyledSlider>
        </div>
      </Profile>
      <Notice>
        <RiErrorWarningFill />
        <div>익일 00시 정각마다 진행상황이 업데이트 됩니다.</div>
      </Notice>
      <Content>
        <ul>
          <li>
            <div className="matching">
              블라인드 매칭 <span>HOT</span>
            </div>
            <AiOutlineRight />
          </li>
          <li>
            <div>실시간 매칭 현황</div>
            <AiOutlineRight />
          </li>
          <li>
            <div>문의하기</div>
            <AiOutlineRight />
          </li>
        </ul>
      </Content>
      <hr />
      <MatchingCard>
        <div className="card-box">
          <div
            className="card first"
            onClick={() => {
              matchingWaiting();
            }}
          >
            <div className="card-title">매칭대기</div>
            <div className="num">0</div>
          </div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div
            className="card second"
            onClick={() => {
              matchingWaiting();
            }}
          >
            <div className="card-title">매칭중</div>
            <div className="num">0</div>
          </div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div
            className="card third"
            onClick={() => {
              matchingWaiting();
            }}
          >
            <div className="card-title">매칭완료</div>
            <div className="num">0</div>
          </div>
        </div>
      </MatchingCard>
    </Wrap>
  );
};

export default Home;

const Wrap = styled.div``;
const Profile = styled.div`
  width: 100%;
  height: 17rem;
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
    display: flex;
    justify-content: center;
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
  .card-box {
    display: flex;
    align-items: center;
    justify-content: space-around;
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
      background: linear-gradient(
          287.96deg,
          rgba(0, 0, 0, 0.16) 15.1%,
          rgba(0, 0, 0, 0) 83.32%
        ),
        #e2445c;
    }
    .card.second {
      background: linear-gradient(
          287.96deg,
          rgba(0, 0, 0, 0.16) 15.1%,
          rgba(0, 0, 0, 0) 83.32%
        ),
        #02c3bd;
    }
    .card.third {
      background: linear-gradient(
          287.96deg,
          rgba(0, 0, 0, 0.16) 15.1%,
          rgba(0, 0, 0, 0) 83.32%
        ),
        #fdab3d;
    }
    .circle {
      width: 6px;
      height: 6px;
      background-color: #e1e1e1;
      border-radius: 3px;
    }
  }
`;
