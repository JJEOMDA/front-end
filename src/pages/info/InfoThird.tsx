import React, { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IViewInput } from './InfoType';
import Swal from 'sweetalert2';
import apis from '../../shared/apis';
import { deleteCookie } from '../../shared/cookie';

const InfoThird = (props: {
  setTabIndex: Dispatch<SetStateAction<number>>;
  setUserInfo: Dispatch<SetStateAction<object>>;
  userInfo: object;
}) => {
  // useNavigate 선언
  const navigate = useNavigate();

  // react-hook-form 타입정의
  interface FormProps {
    mbti: string;
    job: string;
    hobby: string;
    appearance: string;
  }

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
  const onSubmit = async (data: FormProps) => {
    // 버튼 클릭과 동시에 props.setUserInfo를 반영하고 싶지만,
    // async 하게 처리되는 state 변경 함수 특성상, axios 요청 전에 변경이 안되는 문제를 핸들링 하기위해
    // 이전 컴포넌트와는 다르게 처리.
    let newUserInfo: any = { ...props.userInfo };
    newUserInfo['mbti'] = data.mbti;
    newUserInfo['job'] = data.job;
    newUserInfo['hobby'] = data.hobby;
    newUserInfo['appearance'] = data.appearance;

    try {
      await apis.registerUserInfo(newUserInfo);
      Toast.fire({
        icon: 'success',
        title: '<span style="font-size: 14px">성공적으로 제출되었습니다.',
        width: 340,
      }).then(() => {
        window.location.reload();
      });
    } catch (e: any) {
      alert('정보 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
      deleteCookie('Authorization');
    }
  };

  // sweet-alert 모달창
  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  return (
    <PostForm onSubmit={handleSubmit(onSubmit)} viewInput={viewInput}>
      <Line>
        <label htmlFor="mbti">나의 MBTI</label>
        <Input
          id="mbti"
          type="text"
          autoComplete="off"
          placeholder="MBTI를 입력해주세요 (모름, ISFP)"
          isInvalid={!!errors.mbti}
          {...register('mbti', {
            required: 'MBTI를 입력해주세요',
          })}
          // 첫번째 input에 값이 들어오면 두번째 input field 활성화
          onChange={() => {
            setViewInput({ ...viewInput, second: 'flex' });
          }}
        />
        {errors.mbti && <div className="err">{errors.mbti.message}</div>}
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
          // 두번째 input에 값이 들어오면 세번째 input field 활성화
          onChange={() => {
            setViewInput({ ...viewInput, third: 'flex' });
          }}
        />
        {errors.job && <div className="err">{errors.job.message}</div>}
      </Line>
      <Line className="hobby">
        <label htmlFor="hobby">취미/특기</label>
        <Input
          id="hobby"
          type="text"
          autoComplete="off"
          placeholder="취미를 입력해주세요 (운동, 넷플릭스)"
          isInvalid={!!errors.hobby}
          {...register('hobby', {
            required: '취미를 입력해주세요',
          })}
          // 세번째 input에 값이 들어오면 네번째 input field 활성화
          onChange={() => {
            setViewInput({ ...viewInput, fourth: 'flex' });
          }}
        />
        {errors.hobby && <div className="err">{errors.hobby.message}</div>}
      </Line>
      <Line className="appearance">
        <label htmlFor="appearance">나의 외모를 동물로 비유하자면?</label>
        <Input
          id="appearance"
          type="text"
          autoComplete="off"
          placeholder="고양이상, 강아지상"
          isInvalid={!!errors.appearance}
          {...register('appearance', {
            required: '동물로 비유해서 입력해주세요',
          })}
          // 네번째 input에 값이 들어오면 버튼 활성화
          onChange={() => {
            setViewInput({ ...viewInput, btn: 'block' });
          }}
        />
        {errors.appearance && (
          <div className="err">{errors.appearance.message}</div>
        )}
      </Line>
      <button>제출 (3/3)</button>
    </PostForm>
  );
};

export default InfoThird;

const PostForm = styled.form`
  margin-top: 2rem;
  min-height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .job {
    display: ${(props: { viewInput: IViewInput }) => props.viewInput.second};
  }
  .hobby {
    display: ${(props: { viewInput: IViewInput }) => props.viewInput.third};
  }
  .appearance {
    display: ${(props: { viewInput: IViewInput }) => props.viewInput.fourth};
  }

  button {
    display: ${(props: { viewInput: IViewInput }) => props.viewInput.btn};
    margin-top: 2rem;
    width: 100%;
    height: 5rem;
    font-size: 1.5rem;
    background-color: #000;
    animation: input-show 1s;
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
    font-size: 1.6rem;
    font-weight: 700;
  }
  /* input창이 새로 나올 때마다 애니메이션 효과 주기 */
  animation: input-show 1s;
  @keyframes input-show {
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
