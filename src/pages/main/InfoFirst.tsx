import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IViewInput } from './InfoType';

const InfoFirst = () => {
  // useNavigate 선언
  const navigate = useNavigate();

  // react-hook-form 타입정의
  interface FormProps {
    name: string;
    age: string;
    sex: string;
    job: string;
  }

  // input창 애니메이션 핸들링
  // 하단의 스타일드 컴포넌트에서 사용하기위해 타입을 './infoType' 에서 export 해오는 식으로.
  const [viewInput, setViewInput] = useState<IViewInput>({
    second: 'none',
    third: 'none',
    fourth: 'none',
    btn: 'none',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({ mode: 'onChange' });

  // 폼 버튼 클릭시 작동하는 함수
  const onSubmit = async () => {};

  return (
    <Wrap>
      <Header>
        <div className="title">
          <div>나는 누구인가요?</div>
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
      <PostForm onSubmit={handleSubmit(onSubmit)} viewInput={viewInput}>
        <Line>
          <label htmlFor="name">이름</label>
          <Input
            id="name"
            type="text"
            autoComplete="off"
            placeholder="이름을 입력해주세요"
            isInvalid={!!errors.name}
            {...register('name', {
              required: '이름을 입력해주세요',
            })}
            // 첫번째 input에 값이 들어오면 두번째 input field 활성화
            onChange={() => {
              setViewInput({ ...viewInput, second: 'flex' });
            }}
          />
          {errors.name && <div className="err">{errors.name.message}</div>}
        </Line>
        <Line className="age">
          <label htmlFor="age">출생연도</label>
          <Input
            id="age"
            type="text"
            autoComplete="off"
            placeholder="출생연도를 입력해주세요 (1998)"
            isInvalid={!!errors.age}
            {...register('age', {
              required: '출생연도를 입력해주세요',
            })}
            // 두번째 input에 값이 들어오면 세번째 input field 활성화
            onChange={() => {
              setViewInput({ ...viewInput, third: 'flex' });
            }}
          />
          {errors.age && <div className="err">{errors.age.message}</div>}
        </Line>
        <Line className="sex">
          <label htmlFor="sex">성별</label>
          <Input
            id="sex"
            type="text"
            autoComplete="off"
            placeholder="성별을 입력해주세요 (남, 여)"
            isInvalid={!!errors.sex}
            {...register('sex', {
              required: '성별을 입력해주세요',
            })}
            // 세번째 input에 값이 들어오면 네번째 input field 활성화
            onChange={() => {
              setViewInput({ ...viewInput, fourth: 'flex' });
            }}
          />
          {errors.sex && <div className="err">{errors.sex.message}</div>}
        </Line>
        <Line className="job">
          <label htmlFor="job">직업</label>
          <Input
            id="job"
            type="text"
            autoComplete="off"
            placeholder="직업을 입력해주세요 (회사원, 학생 etc.)"
            isInvalid={!!errors.job}
            {...register('job', {
              required: '직업을 입력해주세요',
            })}
            // 네번째 input에 값이 들어오면 버튼 활성화
            onChange={() => {
              setViewInput({ ...viewInput, btn: 'flex' });
            }}
          />
          {errors.job && <div className="err">{errors.job.message}</div>}
        </Line>
        <button>다음</button>
      </PostForm>
    </Wrap>
  );
};

export default InfoFirst;

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
      width: 20%;
      height: 2rem;
      background-color: #673ab7;
    }
    .dot {
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
const PostForm = styled.form`
  margin-top: 2rem;
  min-height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .age {
    display: ${(props: { viewInput: IViewInput }) => props.viewInput.second};
  }
  .sex {
    display: ${(props: { viewInput: IViewInput }) => props.viewInput.third};
  }
  .job {
    display: ${(props: { viewInput: IViewInput }) => props.viewInput.fourth};
  }

  button {
    display: ${(props: { viewInput: IViewInput }) => props.viewInput.btn};
    margin-top: 2rem;
    width: 100%;
    height: 5rem;
    font-size: 1.5rem;
    background-color: #000;
    animation: modal-show 1s;
  }
`;
const Line = styled.div`
  margin-top: 2rem;
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
  /* input창이 새로 나올 때마다 애니메이션 효과 주기 */
  animation: modal-show 1s;
  @keyframes modal-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
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
