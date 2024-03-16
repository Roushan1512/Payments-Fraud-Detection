import React from "react";
import img1 from "./design.png";

const Homepage = () => {
  return (
    <div
      className="flex justify-center items-center h-[90vh] w-[90vw] gap-32 mx-auto rounded-b-3xl relative"
      id="front_page"
    >
      <img
        src={img1}
        alt=""
        className="absolute bottom-0 left-0 rounded-bl-3xl"
      />
      <div className="h-[50%] w-[30rem] bg-[#8a8a8a33] p-8 rounded-3xl shadow-2xl shadow-[#120411] flex flex-col gap-10 backdrop-blur-xl justify-center border-2 border-[#888888] font-bo">
        <div className="flex gap-3 items-center justify-center ">
          <label htmlFor="select">Type:</label>
          <select className=" rounded-lg bg-transparent border-2 border-[#ffffff] p-3 outline-none  h-12">
            <option value="type 1" className=" bg-[#341730f9]">
              type 1
            </option>
            <option value="type 2" className=" bg-[#341730f9]">
              type 2
            </option>
            <option value="type 3" className=" bg-[#341730f9]">
              type 3
            </option>
            <option value="type 4" className=" bg-[#341730f9]">
              type 4
            </option>
            <option value="type 5" className=" bg-[#341730f9]">
              type 5
            </option>
          </select>
          <label htmlFor="text">Amount:</label>
          <input
            type="text"
            className=" rounded-lg bg-transparent border-2 border-[#ffffff] px-2 outline-none h-12"
          />
        </div>
        <div className="flex gap-3 flex-col">
          <label htmlFor="">Old Balance:</label>
          <input
            type="text"
            className=" rounded-lg bg-transparent border-2 border-[#ffffff] px-2 w-[70%] outline-none h-12"
          />
        </div>
        <div className="flex gap-3 flex-col">
          <label htmlFor="">New Balance:</label>
          <input
            type="text"
            className=" rounded-lg bg-transparent border-2 border-[#ffffff] px-2 w-[70%] outline-none h-12"
          />
        </div>
        <button className=" bg-transparent border-4 border-[#eb68da] w-2/4 mx-auto p-2 rounded-3xl text-lg">
          Submit
        </button>
      </div>
      <div className=" font-sans  text-[4rem] leading-relaxed">
        <span className="px-4 border-4 border-[#77777753] rounded-full text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
          Secure
        </span>{" "}
        finance demands a <br />
        watchful eye and a keen mind.
      </div>
    </div>
  );
};

export default Homepage;
