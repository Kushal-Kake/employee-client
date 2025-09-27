import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service/api";

// Define props for Login component
interface LoginProps {
  onSuccess?: React.Dispatch<React.SetStateAction<string | null>>;
}

export const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => loginUser(data),
    onSuccess: (data: { accessToken: string }) => {
      alert("Login successful!");
      localStorage.setItem("token", data.accessToken);  
      onSuccess?.(data.accessToken);
      navigate("/dashboard");
    },
    onError: () => {
      alert("Login failed.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-lg w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Login
      </button>
    </form>
  );
};
