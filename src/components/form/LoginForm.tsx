import React, { useState } from "react";
import ButtonComponent from "../button/Index";
import { InputComponent } from "../input/Input";
import { EyeOff, Eye } from "lucide-react";
import { useAuthStore } from "../../stores/AuthStore";
import useNavigationHooks from "../../hooks/useNavigation";

const LoginForm = () => {
  const { login, isLoading, error } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { goToHome } = useNavigationHooks();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      return;
    }
    try {
      const success = await login(username, password);
      if (success) {
        goToHome();
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center">
      <InputComponent
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-[26rem] rounded-md p-3 bg-white border mb-3"
        placeholder="Masukkan username anda"
        required
      />

      <div className="relative mb-4">
        <InputComponent
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[26rem] rounded-md p-3 pr-12 bg-white border"
          placeholder="**********************"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 right-28 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <ButtonComponent
        label={isLoading ? "Memproses..." : "Masuk"}
        type="submit"
        className="w-[26rem] bg-red-500 text-white hover:bg-red-700 p-3 mt-5"
      />

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default LoginForm;
