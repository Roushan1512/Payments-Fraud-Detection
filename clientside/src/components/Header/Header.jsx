import React from "react";
import logo from "./Cypher_logo.png";
const Header = () => {
  return (
    <div className="bg-[#000000] flex justify-between items-center  text-white mt-6 left-[20%] 2xl:h-[3.5rem] h-24 w-[60vw] rounded-3xl px-10 overflow-hidden  shadow-[#120411] absolute z-30">
      <div>
        <img src={logo} alt="" className="w-[5.5rem]" />
      </div>
      <div className="">
        <ul className="flex justify-center items-center gap-5 ">
          <li>HOME</li>
          <li>DASHBOARD</li>
          <li>ABOUT</li>
        </ul>
      </div>
      <div>LOGIN</div>
    </div>
  );
};

export default Header;
