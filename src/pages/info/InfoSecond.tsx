import React, { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { IViewInput } from './InfoType';

const InfoSecond = (props: {
  setTabIndex: Dispatch<SetStateAction<number>>;
  setUserInfo: Dispatch<SetStateAction<object>>;
}) => {
  // react-hook-form 타입정의
  interface FormProps {
    alcohol: string;
    tobacco: string;
    tall: string;
    height: string;
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
    props.setTabIndex((prev) => prev + 1);
    props.setUserInfo((prev) => {
      let newUserInfo: any = { ...prev };
      newUserInfo['alcohol'] = data.alcohol;
      newUserInfo['tobacco'] = data.tobacco;
      newUserInfo['tall'] = data.tall;
      newUserInfo['height'] = data.height;
      return newUserInfo;
    });
  };

  return (
    <PostForm onSubmit={handleSubmit(onSubmit)} viewInput={viewInput}>
      <Line>
        <label htmlFor="alcohol">주량</label>
        <Input
          id="alcohol"
          type="text"
          autoComplete="off"
          placeholder="주량을 입력해주세요 (1병, 2병)"
          isInvalid={!!errors.alcohol}
          {...register('alcohol', {
            required: '주량을 입력해주세요',
          })}
          // 첫번째 input에 값이 들어오면 두번째 input field 활성화
          onChange={() => {
            setViewInput({ ...viewInput, second: 'flex' });
          }}
        />
        {errors.alcohol && <div className="err">{errors.alcohol.message}</div>}
      </Line>
      <Line className="tobacco">
        <label htmlFor="tobacco">흡연유무</label>
        <Input
          id="tobacco"
          type="text"
          autoComplete="off"
          placeholder="흡연유무를 입력해주세요 (흡연자, 비흡연자)"
          isInvalid={!!errors.tobacco}
          {...register('tobacco', {
            required: '흡연유무를 입력해주세요',
          })}
          // 두번째 input에 값이 들어오면 세번째 input field 활성화
          onChange={() => {
            setViewInput({ ...viewInput, third: 'flex' });
          }}
        />
        {errors.tobacco && <div className="err">{errors.tobacco.message}</div>}
      </Line>
      <Line className="tall">
        <label htmlFor="tall">키</label>
        <Input
          id="tall"
          type="text"
          autoComplete="off"
          placeholder="키를 입력해주세요 (179)"
          isInvalid={!!errors.tall}
          {...register('tall', {
            required: '키를 입력해주세요',
          })}
          // 세번째 input에 값이 들어오면 네번째 input field 활성화
          onChange={() => {
            setViewInput({ ...viewInput, fourth: 'flex' });
          }}
        />
        {errors.tall && <div className="err">{errors.tall.message}</div>}
      </Line>
      <Line className="height">
        <label htmlFor="height">몸무게</label>
        <Input
          id="height"
          type="text"
          autoComplete="off"
          placeholder="몸무게를 입력해주세요 (70)"
          isInvalid={!!errors.height}
          {...register('height', {
            required: '몸무게를 입력해주세요',
          })}
          // 네번째 input에 값이 들어오면 버튼 활성화
          onChange={() => {
            setViewInput({ ...viewInput, btn: 'block' });
          }}
        />
        {errors.height && <div className="err">{errors.height.message}</div>}
      </Line>
      <button>다음 (2/3)</button>
    </PostForm>
  );
};

export default InfoSecond;

const PostForm = styled.form`
  margin-top: 2rem;
  min-height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .tobacco {
    display: ${(props: { viewInput: IViewInput }) => props.viewInput.second};
  }
  .tall {
    display: ${(props: { viewInput: IViewInput }) => props.viewInput.third};
  }
  .height {
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
