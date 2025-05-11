import React, { useState } from "react";
import ButtonComponent from "../button/Index";
import { InputComponent } from "../input/Input";
import { EyeOff, Eye, AlertCircle } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Username atau password salah");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col justify-center">
      <div className="mb-3">
        <InputComponent
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-[26rem] rounded-md p-3 bg-white border"
          placeholder="Masukkan username anda"
          required
        />
      </div>

      <div className="relative mb-4">
        <InputComponent
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[26rem] rounded-md p-3 pr-12 bg-white border"
          placeholder="**********************"
          required
        />
        <div
          className="absolute right-6 top-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </div>
      </div>

      <ButtonComponent
        label="Masuk"
        type="submit"
        className="w-[26rem] bg-red-500 text-white hover:bg-red-700 p-3 mt-5"
      />
      {error && (
        <div className="text-red-500 text-sm mt-1 flex items-center">
          <AlertCircle size={16} className="mr-1" />
          {error}
        </div>
      )}
    </form>
  );
};

export default LoginForm;
