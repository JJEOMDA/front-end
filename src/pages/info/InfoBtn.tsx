import React, { useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const InfoBtn = (props: { setTabIndex: Dispatch<SetStateAction<number>> }) => {
  useEffect(() => {
    // sweet-alert 모달창
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: 'warning',
      title:
        '<span style="font-size: 14px">이런! 아직 소개를 작성하지 않으셨군요!',
      width: 340,
    });
  }, []);

  return (
    <Wrap>
      <div className="desc">당신에 대해 들려주세요.</div>
      <button
        onClick={() => {
          props.setTabIndex((prev) => prev + 1);
        }}
      >
        저는 이런 사람 입니다 ,
      </button>
    </Wrap>
  );
};

export default InfoBtn;
const Wrap = styled.div`
  .desc {
    margin-bottom: 2rem;
    font-size: 2.3rem;
    font-weight: 700;
    // text 서서히 나타나게 하기
    opacity: 0;
    animation: fadeInText 3s 3s ease-out forwards;
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
    animation: fadeInText 4s 4s ease-out forwards;
  }
`;
