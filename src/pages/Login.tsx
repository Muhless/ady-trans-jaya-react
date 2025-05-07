import React from "react";
import LoginForm from "../components/form/LoginForm";

const LoginPages = () => {
  return (
    <div className="grid grid-cols-3">
      <div className="h-screen w-full col-span-2">
      <div className="w-24 absolute mt-5 ml-5">
          <img src="/public/assets/images/logo.png" alt="logo-adytransjaya" />
        </div>
        <img
          src="/assets/images/29126.jpg"
          alt="truck-image"
          className="h-full object-contain"
        />
      </div>
      <div className="flex flex-col justify-center col-span-1 px-10">
        
        <h1 className="text-4xl font-bold py-2 font-compforta">Login</h1>
        <p className="flex justify-start items-start mb-5">
          Silahkan Login terlebih dahulu untuk melanjutkan
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPages;
