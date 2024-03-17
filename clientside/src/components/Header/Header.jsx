import React from "react";
import logo from "./Cypher_logo.png";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../Login/Login";
import Logout from "../Login/Logout";
import { motion } from "framer-motion";
const Header = () => {
  const { user, isAuthenticated } = useAuth0();
  // console.log(isAuthenticated);
  return (
    <motion.div
      className="bg-[#000000] flex justify-between items-center font-Karla  text-white mt-6 left-[20%] h-[6vh] w-[60vw] rounded-md px-10 overflow-hidden  shadow-[#120411] absolute z-30"
      initial={{ y: -250 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.3,
        delay: 0.4,
        ease: "easeInOut",
      }}
    >
      <div>
        <NavLink to="/">
          <img src={logo} alt="" className="h-[8vh]" />
        </NavLink>
      </div>
      <div className="">
        <ul className="flex justify-center items-center gap-5 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              ` ${
                isActive
                  ? "bg-[#6d006d] hover:bg-[#940194]"
                  : "bg-transparent hover:bg-[#450a45]"
              }
              p-2 rounded transition ease-in-out`
            }
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            to="/getapi"
            className={({ isActive }) =>
              ` ${
                isActive
                  ? "bg-[#6d006d] hover:bg-[#940194]"
                  : "bg-transparent hover:bg-[#450a45]"
              }
              p-2 rounded transition ease-in-out `
            }
          >
            <li>API Key</li>
          </NavLink>
          <NavLink
            to="/transaction"
            className={({ isActive }) =>
              ` ${
                isActive
                  ? "bg-[#6d006d] hover:bg-[#940194]"
                  : "bg-transparent hover:bg-[#450a45]"
              }
              p-2 rounded transition ease-in-out`
            }
          >
            <li>Payment</li>
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              ` ${
                isActive
                  ? "bg-[#6d006d] hover:bg-[#940194]"
                  : "bg-transparent hover:bg-[#450a45]"
              }
              p-2 rounded transition ease-in-out`
            }
          >
            <li>Dashboard</li>
          </NavLink>
          <NavLink
            to="/aboutus"
            className={({ isActive }) =>
              ` ${
                isActive
                  ? "bg-[#6d006d] hover:bg-[#940194]"
                  : "bg-transparent hover:bg-[#450a45]"
              }
              p-2 rounded transition ease-in-out `
            }
          >
            <li>About</li>
          </NavLink>
        </ul>
      </div>
      <div className="flex gap-[1vw]">
        {isAuthenticated ? (
          <img
            src={user.picture}
            alt={user.name}
            className="h-10 w-10 rounded"
          />
        ) : null}
        <div className=" h-10 px-[.5vw]  flex items-center justify-center">
          {isAuthenticated ? <Logout /> : <Login />}
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
