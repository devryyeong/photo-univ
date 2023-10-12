import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/thunkFunctions";

interface LoginInputProps {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInputProps>({ mode: "onChange" });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<LoginInputProps> = ({
    email,
    password,
  }: LoginInputProps) => {
    const body = {
      email,
      password,
    };

    dispatch(loginUser(body))
    reset();
  };

  const userEmail = {
    required: "이메일을 입력해 주세요.",
  };

  const userPassword = {
    required: "비밀번호를 입력해 주세요.",
    minLength: {
      value: 4,
      message: "비밀번호는 4자 이상입니다.",
    },
  };

  return (
    <section className="flex flex-col justify-center mt-20 max-w-[400px] m-auto">
      <div className="p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-center">로그인</h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label
              className="text-sm font-semibold text-gray-800"
              htmlFor="name"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
              {...register("email", userEmail)}
            />
            {errors?.email && (
              <div>
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              </div>
            )}
          </div>
          <div className="mb-2">
            <label
              className="text-sm font-semibold text-gray-800"
              htmlFor="email"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
              {...register("password", userPassword)}
            />
            {errors?.password && (
              <div>
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white duration-200 bg-black rounded-md hover:bg-gray-700"
            >
              로그인
            </button>
          </div>
          <p className="mt-8 font-light text-xs text-center text-gray-700">
            아직 회원이 아니신가요?{" "}
            <a href="/login" className="font-medium hover:underline">
              회원가입
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login