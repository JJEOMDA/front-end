import React, { useEffect } from 'react';
import apis from '../../shared/apis';
import { useNavigate } from 'react-router-dom';

const Kakao = () => {
  // useNavigate 선언
  const navigate = useNavigate();

  // url 쿼리 스트링 가져오기
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    const kakaoAuth = async () => {
      try {
        const res = await apis.kakaoAuth(params.get('code'));
        console.log(res);
        navigate('/');
      } catch (e) {
        alert('로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    };

    kakaoAuth();
  }, []);

  return <React.Fragment>잠시만 기다려주세요.</React.Fragment>;
};

export default Kakao;
