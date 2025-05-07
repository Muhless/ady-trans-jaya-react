import React from "react";
import LoginForm from "../components/form/LoginForm";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore";

const LoginPages = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="grid grid-cols-3">
      <div className="h-screen w-full col-span-2">
        <div className="w-24 absolute mt-5 ml-5">
          <img src="/assets/images/logo.png" alt="logo-adytransjaya" />
        </div>
        <div className="flex  h-full items-center justify-center">
          <img
            src="/assets/images/29126.jpg"
            alt="truck-image"
            className="h-full object-contain w-10/12"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center col-span-1">
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
