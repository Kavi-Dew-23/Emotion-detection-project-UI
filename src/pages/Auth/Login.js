import React from "react";
import Particlesbackground from "../../Components/background/ParticlesBackground";
import Button from "../../Components/Button/button";
import "../../Features/background.css";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  
  return (
    <div className="relative bg-color min-h-screen flex items-center justify-center overflow-hidden">
      <Particlesbackground className="absolute inset-0"/>
      <div className="absolute top-0 right-0 p-10 z-10">
        <Button
          text="Register"
          onClick={() => navigate(props.Login ? "/" : "/")}
        />
      </div>
      <div className="container flex items-center justify-center z-10">
        <div className="flex flex-col p-4 text-5xl text-center" style={{color: '#384007'}}>
          <h1>Login</h1>
          <form className="space-y-4 items-center">
            <div className="flex flex-col items-start">
              <label className="mb-2 ml-2 lg:ml-4 mt-5 text-xl" style={{color: '#384007'}}>Email</label>
              <input
                className="p-2 rounded w-full max-w-md text-xl textfield-font"
                type="text"
                placeholder="james@gmail.com"
              />
            </div>
            <div className="flex flex-col mb-3 lg:mb-4 items-start">
              <label className="mb-2 ml-2 lg:ml-4 mt-5 text-xl" style={{color: '#384007'}}>Password</label>
              <input
                className="p-2 rounded w-full max-w-md text-xl textfield-font"
                type="password"
                placeholder="*********"
              />
            </div>
            <button
              className="px-5 py-2 bg-[#2A2B27] text-white rounded-full text-xl"
              onClick={() => navigate(props.Login ? "/login" : "/videoCapture")}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;