import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/thunkFunctions";

interface RegisterInputProps {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterInputProps>();

  const dispatch = useDispatch();
  
  const onSubmit: SubmitHandler<RegisterInputProps> = ({ name, email, password }: RegisterInputProps) => {
    const body = {
      name,
      email,
      password,
      image: `https://via.placeholder.com/600x400?text=no+user+image`
    };

    dispatch(registerUser(body))
    // console.log("data:", name, email, password);
    reset();
  };

  const userName = {
    required: "이름은 필수 입력 항목입니다."
  };
  
  const userEmail = {
    required: "이메일은 필수 입력 항목입니다.",
  };

  const userPassword = {
    required: "비밀번호는 필수 입력 항목입니다.",
    minLength: {
      value: 4,
      message: "비밀번호는 4자 이상입니다."
    }
  };
  
  return (
    <section className="flex flex-col justify-center mt-20 max-w-[400px] m-auto">
      <div className="p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-center">회원가입</h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label
              className="text-sm font-semibold text-gray-800"
              htmlFor="email"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
              {...(register("name", userName))}
            />
            {errors?.name && (
              <div>
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              </div>
            )}
          </div>
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
              회원가입
            </button>
          </div>
          <p className="mt-8 font-light text-xs text-center text-gray-700">
            이미 계정이 있나요?{" "}
            <a href="/login" className="font-medium hover:underline">
              로그인
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register