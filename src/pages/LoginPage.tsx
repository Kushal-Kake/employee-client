import React, { useState } from "react";
import { Login } from "../components/auth/Login";
import { Link } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  if (userId) return <div>Redirecting...</div>;

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-100 flex items-center justify-center">
        <div className="text-9xl animate-bounce select-none">🌟</div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <Login onSuccess={setUserId} />

          {/* Bottom link to Register */}
          <p className="mt-4 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
