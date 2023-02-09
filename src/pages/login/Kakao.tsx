import React, { useEffect } from 'react';
import apis from '../../shared/apis';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../../shared/cookie';
import styled from 'styled-components';
import FadeLoader from 'react-spinners/FadeLoader';

const Kakao = () => {
  // useNavigate 선언
  const navigate = useNavigate();

  // url 쿼리 스트링 가져오기
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    const kakaoAuth = async () => {
      try {
        const res = await apis.kakaoAuth(params.get('code'));
        setAccessToken(res.data.token);
        // reponse 에 status 값 (DB 유저 정보 입력 여부)에 따른 라우팅 처리
        res.data.status === false
          ? navigate(`/info/${res.data.id}`)
          : navigate(`/home/${res.data.id}`);
      } catch (e) {
        alert('로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    };

    kakaoAuth();
    // useEffect의 missing dependency 문제 block 설정 -> 해당 줄에 아래 주석으로 eslint 규칙 비활성화
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <LoadingSpinner>
        <FadeLoader color="#ffe500" />
      </LoadingSpinner>
    </React.Fragment>
  );
};

export default Kakao;

const LoadingSpinner = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
