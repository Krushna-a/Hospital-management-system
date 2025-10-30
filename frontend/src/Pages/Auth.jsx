import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import myImage from "../assets/doc.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login: loginContext } = useAuth(); // Renaming to avoid conflict
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = isLogin 
      ? 'http://localhost:5001/api/auth/login' 
      : 'http://localhost:5001/api/auth/register';

    const payload = isLogin 
      ? { email, password } 
      : { fullName, email, password, role };

    try {
      const response = await axios.post(url, payload);
      const { token, userId, role: userRole } = response.data;

      // Call the login function from context to set the auth state globally
      loginContext({ token, userId, role: userRole });

      toast.success(isLogin ? "Login successful!" : "Registration successful!");
      navigate("/"); // Redirect to a protected route or dashboard

    } catch (err) {
      const errorMessage = err.response?.data?.error || (isLogin ? "Login failed." : "Registration failed.");
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] w-[100%] flex justify-center items-center">
      <div
        className={`flex ${!isLogin ? "flex-row-reverse" : "flex-row"}
             justify-center items-center w-full md:w-4/5
             border rounded-xl shadow-lg`}
      >
        <div className="flex flex-col gap-5 p-2 items-center w-full sm:w-1/2 py-5">
          <h1 className="text-2xl prata-regular">
            {isLogin ? "WELCOME BACK" : "CREATE ACCOUNT"}
          </h1>

          {error && (
            <div className="w-full p-3 bg-red-100 text-red-700 rounded text-center">
              {error}
            </div>
          )}

          <form
            action=""
            className="flex flex-col justify-between gap-5 items-center w-4/5"
            onSubmit={handleSubmit}
          >
            {!isLogin && (
              <>
                <label htmlFor="fullName" className="w-full ">
                  <div>Full Name</div>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter Your full Name"
                    className="w-full rounded p-2 bg-gray-200 outline-none border-b-[3px] border-gray-400"
                    required
                  />
                </label>

                <label htmlFor="role" className="w-full">
                  <div>Role</div>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded p-2 bg-gray-200 outline-none border-b-[3px] border-gray-400"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>
              </>
            )}

            <label htmlFor="email" className="w-full ">
              <div>Email</div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full rounded p-2 bg-gray-200 outline-none border-b-[3px] border-gray-400"
                required
              />
            </label>
            <label htmlFor="password" className="w-full">
              <div>password</div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="w-full rounded p-2 bg-gray-200 outline-none border-b-[3px] border-gray-400"
                required
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white p-2 rounded hover:scale-105 transition ease-in disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : (isLogin ? "Sign In" : "Sign Up")}
            </button>
            <p className="w-full h-[2px] bg-gray-400 rounded"></p>
            <div className="border-2 border-gray-300 rounded hover:scale-105 transition ease-in w-full p-2 text-center flex justify-center gap-2 items-center">
              <FontAwesomeIcon icon={faGoogle} className="text-red-600" />
              <p>{isLogin ? "Sign In with Google" : "Sign Up with Google"}</p>
            </div>
          </form>
          <div
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin
              ? "Don't have account? Register"
              : "Already have Account? Sign In"}
          </div>
        </div>
        <div className="w-1/2 h-[600px] bg-red-200 relative hidden sm:flex justify-center items-center">
          <img
            src="https://img.freepik.com/premium-photo/gradient-powerpoint-background-corporate-presentation_167709-225.jpg?semt=ais_hybrid&w=740"
            alt=""
            className="h-full object-cover hidden sm:block"
          />
          <div className={`${!isLogin ? "scale-x-[-1]" : ""} absolute h-90 w-60 rounded-2xl shadow backdrop-blur-md border`}>
            <img
              src={myImage}
              alt=""
              className="hover:scale-105 transition ease-in-out duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;