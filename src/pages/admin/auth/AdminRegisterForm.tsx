import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@api";
import { setCredentials } from "@features/adminSlices/adminAuthSlice";
import { toast } from "react-toastify";
import { ROUTES } from "@routes";

const roles = ["admin", "executive", "marketing", "partner"];
const department = ["admin", "executive", "marketing", "partner"];

export const AdminRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    role: "admin",
  });

  const [registerAdmin, { isLoading }] = useRegisterMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await registerAdmin(formData).unwrap();
      toast.success("Admin registered successfully");
      setFormData({
        name: "",
        email: "",
        password: "",
        department: "",
        role: "admin",
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Register Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full border p-2 rounded"
        />
        {/* <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          required
          className="w-full border p-2 rounded"
        /> */}
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select A Department</option>
          {department.map((dep) => (
            <option key={dep} value={dep}>
              {dep.charAt(0).toUpperCase() + dep.slice(1)}
            </option>
          ))}
        </select>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};
