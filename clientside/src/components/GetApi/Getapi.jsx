import { useState } from "react";
import React from "react";
import axios from "axios";

const Getapi = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [status, setStatus] = useState(false);
  const [found, setFound] = useState(false);
  const [userData, setUserData] = useState({});

  const login = () => {
    const data = {
      username: user,
      password: pass,
    };
    axios.post(`http://127.0.0.1:5000/api/login`, data).then((res) => {
      setUserData(res.data);
    });
  };

  const register = () => {
    const data = {
      username: user,
      password: pass,
    };
    axios
      .post(`${import.meta.env.VITE_URL}/APiKey/register`, data)
      .then((res) => {
        setUserData(res.data);
      });
  };

  return (
    <div className="bg-neutral-800 min-h-screen flex justify-center items-center">
      {status ? (
        // Register
        <div className="bg-black h-auto w-auto px-12 py-16 rounded-lg flex flex-col justify-center items-center gap-6">
          <h1>Register to get your ApiKey</h1>
          <label htmlFor="user">Username</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <label htmlFor="pass">Password</label>
          <input
            type="text"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button
            type="button"
            onClick={register}
            className="bg-slate-800 py-3 px-6 rounded-full"
          >
            Register
          </button>
          <span>
            Have your own Api Key?{" "}
            <a
              onClick={() => setStatus(!status)}
              className="text-underline cursor-pointer text-purple-900"
            >
              Login Now
            </a>
          </span>
        </div>
      ) : (
        // Login
        <div className="bg-black h-auto w-auto px-12 py-16 rounded-lg flex flex-col justify-center items-center gap-6">
          <h1>Login to check your ApiKey</h1>
          <label htmlFor="user">Username</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <label htmlFor="pass">Password</label>
          <input
            type="text"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button
            type="button"
            onClick={login}
            className="bg-slate-800 py-3 px-6 rounded-full"
          >
            Login
          </button>
          <span>
            Didn't make your own Api Key?{" "}
            <a
              onClick={() => setStatus(!status)}
              className="text-underline cursor-pointer text-purple-900"
            >
              Register Now
            </a>
          </span>
        </div>
      )}
    </div>
  );
};

export default Getapi;
