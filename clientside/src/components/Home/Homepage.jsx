import React from "react";

const Homepage = () => {
  return (
    <div className="flex justify-center items-center h-[80vh] w-[100vw] gap-5">
      <div className="h-auto w-auto bg-[#00000043] p-8 rounded-3xl shadow-lg shadow-[#120411] flex flex-col gap-10 backdrop-blur-xl">
        <div className="flex gap-3 items-center justify-center">
          <label htmlFor="select">Type:</label>
          <select className=" rounded-3xl bg-transparent border-4 border-[#4f2349] p-1 outline-none">
            <option value="someOption" className=" bg-[#341730f9]">
              Some option
            </option>
            <option value="otherOption" className=" bg-[#341730f9]">
              Other option
            </option>
          </select>
          <label htmlFor="text">Amount:</label>
          <input
            type="text"
            className=" rounded-3xl bg-transparent border-4 border-[#4f2349] px-2 outline-none"
          />
        </div>
        <div className="flex gap-3 flex-col">
          <label htmlFor="">Old Balance:</label>
          <input
            type="text"
            className=" rounded-3xl bg-transparent border-4 border-[#4f2349] px-2 w-2/3 outline-none"
          />
        </div>
        <div className="flex gap-3 flex-col">
          <label htmlFor="">New Balance:</label>
          <input
            type="text"
            className=" rounded-3xl bg-transparent border-4 border-[#4f2349] px-2 w-2/3 outline-none"
          />
        </div>
        <button className=" bg-transparent border-4 border-[#4f2349] w-2/4 mx-auto p-2 rounded-3xl text-lg">
          Submit
        </button>
      </div>
      <div>adad</div>
    </div>
  );
};

export default Homepage;
