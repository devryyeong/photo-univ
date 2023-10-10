import React from 'react'

const Register = () => {
  return (
    <section className="flex flex-col justify-center mt-20 max-w-[400px] m-auto">
      <div className="p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-center">회원가입</h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              className="text-sm font-semibold text-gray-800"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 bg-white border rounded-md"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white duration-200 bg-black rounded-md hover:bg-gray-700"
            >
              회원가입
            </button>
          </div>
          <p className="mt-8 font-light text-xs text-center text-gray-700">이미 계정이 있나요?{" "}
            <a href="/login" className="font-medium hover:underline">로그인</a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register