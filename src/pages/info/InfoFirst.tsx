import React, { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { IViewInput } from './InfoType';

const InfoFirst = (props: {
  setTabIndex: Dispatch<SetStateAction<number>>;
  setUserInfo: Dispatch<SetStateAction<object>>;
}) => {
  // react-hook-form 타입정의
  interface FormProps {
    name: string;
    birth: string;
    sex: string;
    residence: string;
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
      newUserInfo['name'] = data.name;
      newUserInfo['birth'] = data.birth;
      newUserInfo['sex'] = selectSexState;
      newUserInfo['residence'] = selectResidenceState;
      return newUserInfo;
    });
  };

  // react-select 핸들링
  const sexOptions = [
    { value: '남', label: '남' },
    { value: '여', label: '여' },
  ];

  const residenceOptions = [
    { value: '서울', label: '서울' },
    { value: '경기', label: '경기' },
    { value: '인천', label: '인천' },
    { value: '부산', label: '부산' },
    { value: '대구', label: '대구' },
    { value: '광주', label: '광주' },
    { value: '대전', label: '대전' },
    { value: '울산', label: '울산' },
    { value: '강원', label: '강원' },
    { value: '경남', label: '경남' },
    { value: '경북', label: '경북' },
    { value: '전남', label: '전남' },
    { value: '전북', label: '전북' },
    { value: '제주', label: '제주' },
    { value: '충남', label: '충남' },
  ];

  const colourStyles = {
    control: (style: any) => ({
      ...style,
      height: '5rem',
      fontSize: '1.5rem',
    }),
  };

  // select로 선택된 값 가져오기
  const [selectSexState, setSelectSexState] = useState<string>();
  const [selectResidenceState, setSelectResidenceState] = useState<string>();

  return (
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
      <Line className="birth">
        <label htmlFor="birth">출생연도</label>
        <Input
          id="birth"
          type="text"
          autoComplete="off"
          placeholder="출생연도를 입력해주세요 (1998)"
          isInvalid={!!errors.birth}
          {...register('birth', {
            required: '출생연도를 입력해주세요',
          })}
          // 두번째 input에 값이 들어오면 세번째 input field 활성화
          onChange={() => {
            setViewInput({ ...viewInput, third: 'flex' });
          }}
        />
        {errors.birth && <div className="err">{errors.birth.message}</div>}
      </Line>
      <Line className="sex">
        <label htmlFor="sex">성별</label>
        {/* Select */}
        <Select
          id="sex"
          options={sexOptions}
          styles={colourStyles}
          onChange={(e: React.ChangeEvent<HTMLSelectElement> | any) => {
            setViewInput({ ...viewInput, fourth: 'flex' });
            setSelectSexState(e.value);
          }}
        />
      </Line>
      <Line className="residence">
        <label htmlFor="residence">사는곳</label>
        {/* Select */}
        <Select
          id="residence"
          options={residenceOptions}
          styles={colourStyles}
          onChange={(e: React.ChangeEvent<HTMLSelectElement> | any) => {
            setViewInput({ ...viewInput, btn: 'block' });
            setSelectResidenceState(e.value);
          }}
        />
      </Line>
      <button>다음 (1/3)</button>
    </PostForm>
  );
};

export default InfoFirst;

const PostForm = styled.form`
  margin-top: 2rem;
  min-height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .birth {
    display: ${(props: { viewInput: IViewInput }) => props.viewInput.second};
  }
  .sex {
    display: ${(props: { viewInput: IViewInput }) => props.viewInput.third};
  }
  .residence {
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
  select {
    height: 5rem;
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
