import React from 'react';
import styled from 'styled-components';
import { VscClose } from 'react-icons/vsc';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // useNavigate 선언
  const navigate = useNavigate();

  // react-hook-form 타입정의
  interface FormProps {
    email: string;
    password: string;
    passwordCheck: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({ mode: 'onChange' });

  // 폼 버튼 클릭시 작동하는 함수
  const onSubmit = async () => {};

  // password 정규식
  const passwordRegEx =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

  // 접속 환경 모바일 여부 확인
  let isMobile = false;
  const filter = 'win16|win32|win64|mac';
  if (navigator.platform) {
    isMobile = filter.indexOf(navigator.platform.toLowerCase()) < 0;
  }

  // 사파리 확인
  const agent = window.navigator.userAgent.toLowerCase();

  return (
    <Wrap>
      <Header>
        <div className="title">
          <div>
            쩜다 . <span>JJeomda .</span>
          </div>
          <VscClose
            onClick={() => {
              if (isMobile) {
                if (agent.indexOf('safari') > -1) {
                  window.self.close();
                  return;
                } else {
                  window.close();
                }
                // 갤럭시 카카오톡 인앱 브라우저 닫기
                window.location.href = 'kakaotalk://inappbrowser/close';
                // 아이폰 카카오톡 인앱 브라우저 닫기
                window.location.href = 'kakaoweb://closeBrowser';
              } else {
                window.close();
              }
            }}
          />
        </div>
        <div className="title-desc">
          <div>대학생, 직장인 블라인드 인연 매칭 서비스</div>
          <div>조건 없이 누구나 따뜻한 인연을 만들어 보세요</div>
        </div>
      </Header>
      <PostForm onSubmit={handleSubmit(onSubmit)}>
        <Line>
          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            type="text"
            autoComplete="off"
            placeholder="이메일을 입력해주세요"
            isInvalid={!!errors.email}
            {...register('email', {
              required: '이메일을 입력해주세요',
            })}
          />
          {errors.email && <div className="err">{errors.email.message}</div>}
        </Line>
        <Line className="pw-line">
          <label htmlFor="password">비밀번호</label>
          <Input
            id="password"
            type="password"
            autoComplete="off"
            placeholder="영문/숫자/특수문자 포함 8~16자"
            isInvalid={!!errors.password}
            {...register('password', {
              required:
                '영문,숫자,특수문자(!@#$%^&*)를 1개 이상 조합하여 입력해주세요',
              pattern: {
                value: passwordRegEx,
                message: '비밀번호 형식에 맞지 않습니다.',
              },
            })}
          />
          {errors.password && (
            <div className="err">{errors.password.message}</div>
          )}
        </Line>
        <Button>
          <button
            className="signUp-email"
            onClick={() => {
              navigate('/info_first');
            }}
          >
            로그인
          </button>
          <button className="signUp-kakao">
            <img src="./images/ic_kko.svg" alt="카카오 로그인 버튼" />
            <span>카카오로 1초만에 시작하기</span>
          </button>
        </Button>
      </PostForm>
      <hr />
      <div className="signUp-redirection">
        아직 회원이 아니신가요?{' '}
        <span
          onClick={() => {
            navigate('/');
          }}
        >
          회원가입하기
        </span>
      </div>
      <Footer>
        <div>
          <ul>
            <li>쩜다</li>
            <li>블라인드 매칭 서비스</li>
            <li>Beta Version 1.0.1</li>
          </ul>
        </div>
        <div className="copyright">
          <div>Copyright © JJamda Inc. All Rights Reserved.</div>
        </div>
      </Footer>
    </Wrap>
  );
};

export default Login;

const Wrap = styled.div`
  hr {
    margin: 2rem 0;
  }
  .signUp-redirection {
    span {
      font-size: 1.5rem;
      text-decoration: underline;
      cursor: pointer;
      color: purple;
    }
  }
`;
const Header = styled.div`
  .title {
    font-size: 3.2rem;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 2.4rem;
      font-weight: 500;
    }
    svg {
      font-size: 2.4rem;
      cursor: pointer;
    }
  }
  .title-desc {
    line-height: 1.3;
  }
`;
const PostForm = styled.form`
  margin-top: 2rem;
  .pw-line {
    margin-top: 2rem;
  }
`;
const Line = styled.div`
  display: flex;
  flex-direction: column;
  .err {
    color: red;
    font-size: 1.2rem;
    margin-top: 0.5rem;
  }
  label {
    margin-bottom: 1rem;
  }
`;
const Input = styled.input`
  border: 1px solid #e1e1e1;
  width: 100%;
  border-radius: 3px;
  height: 5rem;
  padding: 1rem;
  font-size: 1.4rem;
  outline: ${(props: { isInvalid: boolean }) => props.isInvalid && 'none'};
  border: ${(props: { isInvalid: boolean }) =>
    props.isInvalid && '1px solid red'};
  border-color: ${(props: { isInvalid: boolean }) =>
    props.isInvalid && '#fa5963'};
  &:focus {
    border: 2px solid rgb(0, 123, 255);
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    outline: none;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;
const Button = styled.div`
  margin-top: 2rem;
  button {
    width: 100%;
    height: 5rem;
    font-size: 1.5rem;
  }
  .signUp-email {
    background-color: #000;
  }
  .signUp-kakao {
    margin-top: 1rem;
    width: 100%;
    height: 5rem;
    background-color: #ffe500;
    color: #000;
    cursor: pointer;
    &:hover {
      filter: brightness(90%);
    }
    img {
      margin-right: 1rem;
    }
  }
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.3rem;
  margin: 2rem 0;
  color: gray;
  .copyright {
    margin-top: 0.3rem;
  }
  ul {
    list-style: none;
    display: flex;
    li {
      &::after {
        content: '｜';
        margin: 0.2rem;
      }
      &:last-child::after {
        content: '';
        margin: 0rem;
      }
    }
  }
`;
