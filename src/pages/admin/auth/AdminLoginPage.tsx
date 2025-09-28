import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@features/api";
import { EmailIcon, LockIcon } from "@icons";
import { setCredentials } from "@features/slices/auth/auth.slice";
import { IAdminResponse } from "@features/api/authApi/types";
import { Button, FormInput, Typography } from "@components/general";

interface LoginFormProps {
  className?: string;
}

export const SignIn: React.FC<LoginFormProps> = ({ className = "" }) => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { email, password } = formData;
      const result = await login({ email, password }).unwrap();

      dispatch(setCredentials({ admin: result as unknown as IAdminResponse }));

      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const getErrorMessage = () => {
    if (error && "data" in error) {
      return (error.data as { message: string }).message;
    }
    if (error && "message" in error) {
      return error.message;
    }
    return "An unexpected error occurred";
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <Typography variant="h3">Login to Admin Dashboard</Typography>

      <FormInput
        startIcon={<EmailIcon className="h-5 w-5" />}
        label="Email Address"
        name="email"
        type="email"
        required
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
      />

      <FormInput
        startIcon={<LockIcon className="h-5 w-5" />}
        label="Password"
        name="password"
        required
        value={formData.password}
        onChange={handleInputChange}
        className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors"
        placeholder="Enter your password"
      />

      {/* Password Field */}
      {/* <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors"
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
      </div> */}

      {/* Remember Me & Forgot Password */}
      {/* <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-700"
          >
            Remember me
          </label>
        </div>
        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Forgot your password?
          </a>
        </div>
      </div> */}

      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{getErrorMessage()}</div>
        </div>
      )}

      {/* Submit Button */}
      <Button shape="square" type="submit" disabled={isLoading} fullWidth>
        Sign In
      </Button>
      {/* <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </div> */}
    </form>
  );
};
