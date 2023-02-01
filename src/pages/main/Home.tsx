import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RiErrorWarningFill } from 'react-icons/ri';
import { TfiBackLeft } from 'react-icons/tfi';
import { AiOutlineRight } from 'react-icons/ai';

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
            <div>문의하기</div>
            <AiOutlineRight />
          </li>
        </ul>
      </Content>
      <hr />
    </Wrap>
  );
};

export default Home;

const Wrap = styled.div``;
const Profile = styled.div`
  width: 100%;
  height: 15rem;
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
    margin: 1rem 0 1rem 0;
    display: flex;
    justify-content: center;
  }
`;
const StyledSlider = styled(Slider)`
  width: 95%;
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
