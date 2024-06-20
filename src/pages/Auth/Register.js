import React, { useState } from "react";
import "../../Features/background.css";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/button";
import ParticlesBackground from "../../Components/background/particles";
//import {toast} from "react-toastify"

const Register = (props) => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const auth = getAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(userName, email, password);

    if (!userName || !email || !password) {
      console.error("Please fill in all fields");
      return;
    }
  };

  return (
    <div className="relative bg-color min-h-screen">
      <ParticlesBackground className="absolute inset-0" />
      <div className="absolute top-0 right-0 p-10">
        <Button
          text="Sign In"
          onClick={() => navigate(props.Register ? "/" : "/login")}
        />
      </div>
      <div className="container">
        <div
          className="flex flex-col p-4 text-5xl text-center p-5"
          style={{ color: ["#384007"] }}
        >
          <h1>Register</h1>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="mt-4 text-xl p-3"
                style={{ color: ["#C5D469"] }}
              >
                User Name
              </label>
              <input
                id="username"
                type="text"
                placeholder="James"
                name="username"
                className="p-2 rounded w-full max-w-md text-xl textfield-font"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-2 text-xl"
                style={{ color: ["#C5D469"] }}
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="james@gmail.com"
                name="email"
                className="p-2 text-xl rounded w-full max-w-md textfield-font"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="mb-2 text-xl"
                style={{ color: ["#C5D469"] }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="*********"
                name="password"
                className="p-2 text-xl rounded w-full max-w-md textfield-font"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button
              className="px-5 py-2 bg-[#2A2B27] text-white rounded-full text-xl"
              onClick={() => navigate(props.Register ? "/register" : "/login")}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
