import { useState } from "react";
import React from "react";
import axios from "axios";
import { ClipboardList, X } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { setcompanyname } from "@/redux/counter";

const Getapi = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [status, setStatus] = useState(false);
  const [found, setFound] = useState(false);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();

  const login = () => {
    const data = {
      companyname: user,
      password: pass,
    };
    axios.post(`${import.meta.env.VITE_URL}/api/login`, data).then((res) => {
      setUserData(res.data);
      dispatch(setcompanyname(user));
      setFound(true);
      setUser("");
      setPass("");
    });
  };

  const register = () => {
    const data = {
      companyname: user,
      password: pass,
    };
    axios
      .post(`${import.meta.env.VITE_URL}/APiKey/register`, data)
      .then((res) => {
        setUserData(res.data);
        dispatch(setcompanyname(user));
        setFound(true);
        setUser("");
        setPass("");
      });
  };

  const change = () => {
    setStatus(!status);
    setUser("");
    setPass("");
  };

  return (
    <div className="min-h-screen bg-neutral-800 flex justify-center items-center">
      {status ? (
        // Register
        <div className="bg-black h-auto w-auto px-6 py-12 rounded-3xl flex flex-col justify-center items-center gap-6">
          <h1 className="text-3xl">Register to get your ApiKey</h1>
          <label htmlFor="user">Company Name</label>
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
              onClick={change}
              className="text-underline cursor-pointer text-purple-900"
            >
              Login Now
            </a>
          </span>
        </div>
      ) : (
        // Login
        <div className="bg-black h-auto w-auto px-6 py-12 rounded-3xl flex flex-col justify-center items-center gap-6">
          <h1 className="text-3xl">Login to check your ApiKey</h1>
          <label htmlFor="user">Company Name</label>
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
              onClick={change}
              className="text-underline cursor-pointer text-purple-900"
            >
              Register Now
            </a>
          </span>
        </div>
      )}
      <div
        className={`absolute bottom-6 right-0 h-auto w-[30vw] rounded-l-2xl py-4 bg-black flex flex-col justify-center items-center ${
          found ? "block" : "hidden"
        }`}
      >
        <span>Username : {found ? userData.companyname : ""}</span>
        <span>Password : {found ? userData.password : ""}</span>
        <span>
          ApiKey : {found ? userData.api_key.substr(-6) + " . . ." : ""}
        </span>
        <span>Message : {found ? userData.message : ""}</span>
        <button
          type="button"
          onClick={() => setFound(false)}
          className="absolute top-2 left-2 bg-red-500 rounded-full p-1  text-white font-bold cursor-pointer"
        >
          <X size={14} />
        </button>
        <CopyToClipboard text={userData.api_key}>
          <ClipboardList
            size={14}
            className="cursor-pointer absolute top-12 left-2 rounded-full h-6 w-6 text-white font-bold"
          />
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default Getapi;
