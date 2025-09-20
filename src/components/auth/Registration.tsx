import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser, type User } from "../../service/api";

export const Register: React.FC<{ onSuccess?: () => void }> = ({
  onSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation<
    User,
    Error,
    { email: string; password: string }
  >({
    mutationFn: (data) => registerUser(data),
    onSuccess: () => {
      alert("Registered successfully! Please login.");
      onSuccess?.();
    },
    onError: () => {
      alert("Registration failed.");
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
        Register
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        required
      />

      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Register
      </button>
    </form>
  );
};
