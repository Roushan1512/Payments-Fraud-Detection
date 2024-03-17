import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { ClipboardList, MessageCircleWarning, X } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setcompanyname } from "@/redux/counter";

// import { motion } from "framer-motion";

const Getapi = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [status, setStatus] = useState(false);
  const [found, setFound] = useState(false);
  const [userData, setUserData] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);
  const dispatch = useDispatch();

  const login = () => {
    const data = {
      companyname: user,
      password: pass,
    };
    axios
      .post(`${import.meta.env.VITE_URL}/api/login`, data)
      // axios
      //   .post(`http://localhost:5000/api/login`, data)

      .then((res) => {
        setUserData(res.data);
        dispatch(setcompanyname(user));
        setLoginStatus(true);
        setFound(true);
        setUser("");
        setPass("");
        setTimeout(() => {
          setLoginStatus(false);
        }, 3000);
      });
  };

  const register = () => {
    if (user === "" || pass === "") return alert("Please fill all the fields");
    const data = {
      companyname: user,
      password: pass,
    };
    axios
      .post(`${import.meta.env.VITE_URL}/APiKey/register`, data)
      // .post(`http://localhost:5000/APiKey/register`, data)
      .then((res) => {
        setUserData(res.data);
        dispatch(setcompanyname(user));
        setFound(true);
        setUser("");
        setPass("");
        setLoginStatus(true);
        setTimeout(() => {
          setLoginStatus(false);
        }, 3000);
      });
  };

  const change = () => {
    setStatus(!status);
    setUser("");
    setPass("");
  };
  const companyName = useSelector((state) => state.companyname);
  useEffect(() => {
    if (companyName.companyname !== "") {
      setUser(companyName.companyname);
      login();
    }
  }, []);

  return (
    <motion.div
      className=" h-[100vh] pl-[4vw] pr-[3vw] flex  items-start justify-center flex-col font-Karla relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.05, ease: "easeInOut" }}
    >
      <motion.div
        className=" bg-white px-[2vw] py-[1vh] absolute rounded z-[200] text-black font-semibold bottom-[5vh]"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: loginStatus ? 1 : 0, y: loginStatus ? 0 : 100 }}
      >
        Logged In SuccessFully
      </motion.div>
      <div className=" text-[4.2vh] font-semibold pl-[.5vw] whitespace-nowrap">
        Get An Api Key for your company
      </div>
      <div className=" pl-[5vh]  rounded bg-[#f3f3f311] py-[2vh] w-full mt-[3vh]">
        <AnimatePresence>
          {status ? (
            // Register
            <motion.div className="flex items-center gap-[5%]" layout>
              <h1 className="text-2xl">Register Now !!</h1>
              <div className=" flex flex-col  flex-1">
                <label htmlFor="user">Company Name</label>
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className=" py-[.4vh] px-[.3vw] bg-[#00000096] rounded-lg"
                />
                <label htmlFor="pass">Password</label>
                <input
                  type="text"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className=" py-[.4vh] px-[.3vw] bg-[#00000096] rounded-lg"
                />
              </div>
              <button
                type="button"
                onClick={register}
                className=" from-[white] border to-[#d466ff] bg-gradient-to-br rounded px-[1.8rem] py-[.7rem] text-black font-bold "
              >
                Register
              </button>
              <div className=" flex-[.5] flex flex-col items-center justify-center">
                <span>Already Have an Api Key? </span>
                <a
                  onClick={change}
                  className="text-underline cursor-pointer text-[#c4c4fd] bg-black px-2 py-[.5] mt-1 rounded"
                >
                  Login Now
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div className="flex items-center gap-[5%]" layout>
              <h1 className="text-2xl">Check Your API Key !!</h1>
              <div className=" flex flex-col  flex-1">
                <label htmlFor="user">Company Name</label>
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className=" py-[.4vh] px-[.3vw] bg-[#00000096] rounded-lg"
                />
                <label htmlFor="pass">Password</label>
                <input
                  type="text"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className=" py-[.4vh] px-[.3vw] bg-[#00000096] rounded-lg"
                />
              </div>
              <button
                type="button"
                onClick={login}
                className=" from-[white] border to-[#d466ff] bg-gradient-to-br rounded px-[1.8rem] py-[.7rem] text-black font-bold "
              >
                Login Now
              </button>
              <div className=" flex-[.5] flex flex-col items-center justify-center">
                <span>Don't Have An Api Key? </span>
                <a
                  onClick={change}
                  className="text-underline cursor-pointer text-[#c4c4fd] bg-black px-2 py-[.5] mt-1 rounded"
                >
                  Register Now
                </a>
              </div>
            </motion.div>
            // Login
          )}
        </AnimatePresence>
      </div>
      <div className=" h-[30%] w-full  bg-[#f3f3f311] mt-[5vh]">
        <div className=" h-[20%] flex border-b pl-5 border-[#94949427] items-center">
          Keys And Ids
        </div>
        <div className=" h-[80%] px-5 py-[.8rem] w-full  flex overflow-hidden">
          <motion.div className=" flex-1  flex flex-col ">
            <div className="  h-[30%] font-Karla leading-none">
              <div className="text-[2.3vh] opacity-65 font-bold">Username</div>
              <div className="text-[3vh] ">
                {userData.companyname ? userData.companyname : ""}
              </div>
            </div>
            <div className="  h-[70%] font-Karla">
              <div className="text-[2.3vh] flex flex-col opacity-65 font-bold">
                Api Key
                {/* <span className="text-[2vh] leading-none font-medium text-[#f1f188]">
                  Api Key is hidden for security reasons
                </span> */}
              </div>
              <div className="text-[3vh] flex items-center ">
                <div className=" mr-auto overflow-hidden break-words line-clamp-3 w-[30vw] text-sm ">
                  <span>
                    {found ? userData.api_key.substr(-6) + " . . ." : ""}{" "}
                  </span>
                </div>
                <span className=" text-[2.5vh] mr-[.5vw] bg-[#00000009]">
                  Copy Api Key
                </span>
                <CopyToClipboard
                  text={userData.api_key}
                  className=" mr-[3vw] bg-[black] cursor-pointer  p-[.2vw] rounded  h-full w-[1.75vw] flex items-center justify-center"
                >
                  <ClipboardList size={14} className="  text-white font-bold" />
                </CopyToClipboard>
              </div>
            </div>
          </motion.div>
          <div className=" flex-[.65] border-l-2 border-l-[#0000004d] flex flex-col  py-[.5vh]">
            <div className=" ml-[2vw] opacity-65">Key Security</div>
            <div className=" ml-[2vw]  text-yellow-300 flex gap-[.5vw]">
              Treat your api key like your password <MessageCircleWarning />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Getapi;
