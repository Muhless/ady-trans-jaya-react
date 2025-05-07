import axios from "axios";
import React, { useState } from "react";
import ButtonComponent from "../button/Index";
import { InputComponent } from "../input/Input";
import { EyeOff, Eye } from "lucide-react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      const { token } = res.data;
      localStorage.setItem("token", token);
      window.location.href = "/homepage";
    } catch {
      setError("Login gagal. Coba lagi.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col justify-center">
      <InputComponent
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-[26rem] rounded-md p-3 bg-white border mb-3"
        placeholder="Masukkan username anda"
      />

      <div className="relative">
        <InputComponent
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[26rem] rounded-md p-3 pr-12 bg-white border"
          placeholder="**********************"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 right-8 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <ButtonComponent
        label="Masuk"
        type="submit"
        className="w-[26rem] bg-blue-700 text-white hover:bg-blue-800 p-3 mt-5"
      />

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default LoginForm;
