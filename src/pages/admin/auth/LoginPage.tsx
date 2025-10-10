import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@features/api";
import { EmailIcon, LockIcon } from "@icons";
import { setCredentials } from "@features/slices/auth/auth.slice";
import { IAdmin } from "@features/api/admin/types";
import { Button, FormInput, Typography } from "@components/general";
import { TAdminRole } from "@utils/types";
import { DASHBOARDS_ROUTES_ENUM } from "@utils/constants";

interface LoginFormProps {
  className?: string;
  role: TAdminRole;
  // navigateTo?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  className = "",
  role,
}) => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  console.log("role in LoginForm - ", role);

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
      const result = await login({
        email,
        password,
        role: role,
      }).unwrap();

      dispatch(setCredentials({ admin: result as unknown as IAdmin }));

      window.location.href = DASHBOARDS_ROUTES_ENUM[role];
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
      <Typography variant="h3">
        Login to {role.toUpperCase()} Dashboard
      </Typography>

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

      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{getErrorMessage()}</div>
        </div>
      )}

      <Button shape="square" type="submit" disabled={isLoading} fullWidth>
        Sign In
      </Button>
    </form>
  );
};
