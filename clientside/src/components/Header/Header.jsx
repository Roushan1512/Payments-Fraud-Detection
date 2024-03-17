import React from "react";
import logo from "./Cypher_logo.png";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../Login/Login";
import Logout from "../Login/Logout";
const Header = () => {
  const { user, isAuthenticated } = useAuth0();
  // console.log(isAuthenticated);
  return (
    <div className="bg-[#000000] flex justify-between items-center  text-white mt-6 left-[20%] h-[6vh] w-[60vw] rounded-3xl px-10 overflow-hidden  shadow-[#120411] absolute z-30">
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
              p-2 rounded-2xl transition ease-in-out`
            }
          >
            <li>HOME</li>
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              ` ${
                isActive
                  ? "bg-[#6d006d] hover:bg-[#940194]"
                  : "bg-transparent hover:bg-[#450a45]"
              }
              p-2 rounded-2xl transition ease-in-out`
            }
          >
            <li>DASHBOARD</li>
          </NavLink>
          <NavLink
            to="/aboutus"
            className={({ isActive }) =>
              ` ${
                isActive
                  ? "bg-[#6d006d] hover:bg-[#940194]"
                  : "bg-transparent hover:bg-[#450a45]"
              }
              p-2 rounded-2xl transition ease-in-out `
            }
          >
            <li>ABOUT</li>
          </NavLink>
          <NavLink
            to="/getapi"
            className={({ isActive }) =>
              ` ${
                isActive
                  ? "bg-[#6d006d] hover:bg-[#940194]"
                  : "bg-transparent hover:bg-[#450a45]"
              }
              p-2 rounded-2xl transition ease-in-out `
            }
          >
            <li>API-KEY</li>
          </NavLink>
        </ul>
      </div>
      <div className="flex flex-row gap-8">
        {isAuthenticated ? <Logout /> : <Login />}
        {isAuthenticated ? (
          <img
            src={user.picture}
            alt={user.name}
            className="h-12 w-12 rounded-full"
          />
        ) : null}
      </div>
    </div>
  );
};

export default Header;
