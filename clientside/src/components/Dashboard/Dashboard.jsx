import React from "react";
import { Button } from "@/components/ui/button";
import { ShieldHalf } from "lucide-react";

const Dashboard = () => {
  const bgofcards =
    "from-[#1d1c1c] to-[#2e2d2d] bg-gradient-to-t rounded border border-[#444343] shadow-[#2e2d2d]";
  return (
    <div className=" w-[100vw] h-[100vh]  overflow-x-hidden pl-[4vw]">
      <div className=" w-full h-full justify-evenly  flex flex-col pr-[2vw] pl-[1vw]">
        <div className=" h-[08%] ">
          <h1 className="pl-[.7rem]  h-full flex items-center text-[4vh] font-semibold">
            Dashboard
          </h1>
        </div>
        <div className=" h-[15%]  p-[.3rem] flex gap-[1vw]">
          {/* single card */}
          <div className={` w-[20%]  rounded h-full ${bgofcards} flex `}>
            <div className=" w-[25%] flex items-center justify-center  ">
              <ShieldHalf />
            </div>
            <div className=" flex-1 pl-[.7vw] flex flex-col justify-center">
              <h1 className="text-[1rem]   flex items-end justify-start  font-medium opacity-80">
                Total Fraud{" "}
              </h1>
              <h1 className="text-[1.85rem] flex items-start leading-tight font-medium">
                100
              </h1>
            </div>
          </div>
          <div className={` w-[20%]  rounded h-full ${bgofcards} flex `}>
            <div className=" w-[25%] flex items-center justify-center  ">
              <ShieldHalf />
            </div>
            <div className=" flex-1 pl-[.7vw] flex flex-col justify-center">
              <h1 className="text-[1rem]   flex items-end justify-start  font-medium opacity-80">
                Balance At Risk{" "}
              </h1>
              <h1 className="text-[1.85rem] flex items-start leading-tight font-medium">
                100 ₹
              </h1>
            </div>
          </div>
          <div className={` w-[20%]  rounded h-full ${bgofcards} flex `}>
            <div className=" w-[25%] flex items-center justify-center  ">
              <ShieldHalf />
            </div>
            <div className=" flex-1 pl-[.7vw] flex flex-col justify-center">
              <h1 className="text-[1rem]   flex items-end justify-start  font-medium opacity-80">
                Balance At Risk{" "}
              </h1>
              <h1 className="text-[1.85rem] flex items-start leading-tight font-medium">
                100 ₹
              </h1>
            </div>
          </div>
        </div>
        <div className=" h-[28%]  flex p-[.3rem] gap-[1vw]">
          <div className={` flex-[1] bg-red-700 h-full ${bgofcards}`}></div>
          <div className={` flex-[1.2] bg-red-700 h-full ${bgofcards}`}></div>
          <div className={` flex-[1.35] bg-red-700 h-full ${bgofcards}`}></div>
        </div>
        <div className=" h-[39%]  flex p-[.3rem] gap-[1vw]">
          <div className={` flex-1 bg-red-700 h-full ${bgofcards}`}></div>
          <div className={` flex-1 bg-red-700 h-full ${bgofcards}`}></div>
          <div className={`flex-[.7] bg-red-700 h-full ${bgofcards}`}></div>
        </div>
      </div>
    </div>
  );
};
// bg-[#2e2d2d]
export default Dashboard;
