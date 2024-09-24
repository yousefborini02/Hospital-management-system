import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/slices/authSlice";
import { loginDoctor } from "../store/slices/doctorAuthSlice";
import { User, Stethoscope, Mail, Lock, LogIn } from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const UserLogin = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  loading,
  error,
}) => (
  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
    <div className="rounded-md shadow-sm -space-y-px">
      <div>
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#307BC4] focus:border-[#307BC4] focus:z-10 sm:text-sm pl-10"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#307BC4] focus:border-[#307BC4] focus:z-10 sm:text-sm pl-10"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
    </div>
    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

    <div>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#307BC4] hover:bg-[#2563a1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#307BC4] transition-colors duration-200"
        disabled={loading}
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <LogIn className="h-5 w-5 text-[#1d4e7e] group-hover:text-[#1a4368]" />
        </span>
        {loading ? "Logging in..." : "Sign in"}
      </button>
    </div>
    <div className="text-sm text-center">
      <Link
        to="/register"
        className="font-medium text-[#307BC4] hover:text-[#2563a1]"
      >
        Don't have an account? Register here
      </Link>
    </div>
  </form>
);

const DoctorLogin = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  loading,
  error,
}) => (
  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
    <div className="rounded-md shadow-sm -space-y-px">
      <div>
        <label htmlFor="doctor-email" className="sr-only">
          Email address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="doctor-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#307BC4] focus:border-[#307BC4] focus:z-10 sm:text-sm pl-10"
            placeholder="Doctor's Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="doctor-password" className="sr-only">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="doctor-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#307BC4] focus:border-[#307BC4] focus:z-10 sm:text-sm pl-10"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
    </div>
    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    <div>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#307BC4] hover:bg-[#2563a1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#307BC4] transition-colors duration-200"
        disabled={loading}
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <LogIn className="h-5 w-5 text-[#1d4e7e] group-hover:text-[#1a4368]" />
        </span>
        {loading ? "Logging in..." : "Sign in as Doctor"}
      </button>
    </div>
  </form>
);

const LoginComponent = () => {
  const [activeTab, setActiveTab] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields!",
      });
      return;
    }

    try {
      if (activeTab === "user") {
        await dispatch(login({ email, password }));
        navigate("/");
      } else {
        await dispatch(loginDoctor({ email, password }));
        navigate("/doctor-profile");
      }
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "You have successfully logged in.",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please check your credentials and try again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <div className="flex justify-center space-x-4">
          <button
            className={`flex items-center px-4 py-2 space-x-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === "user"
                ? "bg-[#307BC4] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } rounded-full`}
            onClick={() => setActiveTab("user")}
          >
            <User size={18} />
            <span>User</span>
          </button>
          <button
            className={`flex items-center px-4 py-2 space-x-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === "doctor"
                ? "bg-[#307BC4] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } rounded-full`}
            onClick={() => setActiveTab("doctor")}
          >
            <Stethoscope size={18} />
            <span>Doctor</span>
          </button>
        </div>

        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          {activeTab === "user" ? "User Login" : "Doctor Login"}
        </h2>

        {activeTab === "user" ? (
          <UserLogin
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        ) : (
          <DoctorLogin
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default LoginComponent;
