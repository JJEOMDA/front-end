import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Info = () => {
  // useNavigate 선언
  const navigate = useNavigate();

  interface FormProps {
    name: string;
    age: string;
    sex: string;
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormProps>({ mode: "onChange" });

  // 폼 버튼 클릭시 작동하는 함수
  const onSubmit = async () => {};

  // input 창 순서대로 나타나는 애니메이션
  const nameRef = watch("name");
  const ageRef = watch("age");
  return (
    <Wrap>
      <PostForm onSubmit={handleSubmit(onSubmit)}>
        <Line>
          <label htmlFor="name">이름</label>
          <Input
            id="name"
            type="text"
            autoComplete="off"
            placeholder="이름을 입력해주세요"
            isInvalid={!!errors.name}
            {...register("name", {
              required: "이름을 입력해주세요",
            })}
          />
          {errors.name && <div className="err">{errors.name.message}</div>}
        </Line>
        <Line>
          <label htmlFor="age">나이</label>
          <Input
            id="age"
            type="text"
            autoComplete="off"
            placeholder="나이를 입력해주세요"
            isInvalid={!!errors.age}
            {...register("age", {
              required: "나이를 입력해주세요",
            })}
          />
          {errors.age && <div className="err">{errors.age.message}</div>}
        </Line>
      </PostForm>
    </Wrap>
  );
};

export default Info;

const Wrap = styled.div``;

const PostForm = styled.form`
  margin-top: 2rem;
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
  animation: modal-show 0.5s;
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
  outline: ${(props: { isInvalid: boolean }) => props.isInvalid && "none"};
  border: ${(props: { isInvalid: boolean }) => props.isInvalid && "1px solid red"};
  border-color: ${(props: { isInvalid: boolean }) => props.isInvalid && "#fa5963"};
  &:focus {
    border: 2px solid rgb(0, 123, 255);
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    outline: none;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;
