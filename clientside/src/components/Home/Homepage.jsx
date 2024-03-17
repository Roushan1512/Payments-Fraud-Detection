import React, { useState } from "react";
import img1 from "./design.png";
import { motion } from "framer-motion";
import axios from "axios";
import { Spinner } from "@nextui-org/react";
import { ArrowUp, LoaderCircleIcon } from "lucide-react";

const Homepage = () => {
  const [type, setType] = useState(1);
  const [amount, setAmount] = useState("");
  const [oldBalance, setoldBalance] = useState("");
  const [newBalance, setnewBalance] = useState("");
  const [loading, setloading] = useState(false);
  const [fraudDetected, setfraudDetected] = useState(false);

  const predictDemo = (e) => {
    e.preventDefault();
    const predictData = {
      data: {
        type: parseInt(type),
        amount: parseInt(amount),
        oldbalanceOrg: parseInt(oldBalance),
        newbalanceOrig: parseInt(newBalance),
      },
    };
    console.log(predictData);
    setloading(true);
    axios
      .post(
        `${import.meta.env.VITE_URL}/demo/singleData/predict_noapi`,
        predictData
      )
      .then((res) => {
        setloading(false);
        console.log(res.data.prediction);
        if (res.data.prediction === "Fraud") {
          setfraudDetected(true);
          setTimeout(() => {
            setfraudDetected(false);
          }, 6000);
        }
        setAmount("");
        setoldBalance("");
        setnewBalance("");
        setType(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" h-[100vh]">
      <motion.div
        className="flex justify-center origin-top items-center h-[90vh] w-[90vw] gap-32 mx-auto rounded-b-3xl relative"
        id="front_page"
        initial={{ scaleY: 0.5, y: -500 }}
        animate={{ scaleY: 1, y: 0 }}
        transition={{
          duration: 0.35,
          type: "spring",
          stiffness: 40,
          damping: 10,
          easing: [0.83, 0, 0.17, 1],
        }}
      >
        <img
          src={img1}
          alt=""
          className="absolute bottom-0 left-0 rounded-bl-3xl"
        />
        <div className=" relative">
          <motion.div
            className="flex
           bottom-[-2rem] left-1/2 [transform:translate(-50%,70%)] whitespace-nowrap px-[1vw] py-[.5vh] absolute z-[100] rounded text-black font-medium font-Karla bg-[white] "
            // initial={{ transform: "translate(-50%,70%)" }}
            // animate={{
            //   transform: "translate(-50%,90%)",
            // }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              type: "spring",
              repeat: Infinity,
              loop: Infinity,
              repeatType: "reverse",
              stiffness: 100,
              damping: 10,
            }}
          >
            Try Out The Demo Fraud Detection <ArrowUp size={20} />
          </motion.div>
          <motion.div
            className=" h-full w-full bg-[#00000069] rounded-3xl backdrop-blur-sm z-30 absolute"
            initial={{ opacity: 0, scale: 0, brightness: 0 }}
            animate={{
              opacity: fraudDetected ? 1 : 0,
              scale: fraudDetected ? 1 : 0,
              y: fraudDetected ? 0 : 100,
            }}
          ></motion.div>
          <motion.div
            className="  py-[1vh] px-[1vw]  origin-center flex items-center bg-[#ebbcbc] text-black absolute rounded z-40 top-1/2 left-1/2 [transform:translate(-50%,-50%)]"
            initial={{ opacity: 0, scale: 0, brightness: 0 }}
            animate={{
              opacity: fraudDetected ? 1 : 0,
              transform: fraudDetected
                ? "scale(1) translate(-50%,-30%)"
                : "scale(0) translate(-50%,-50%)",
            }}
          >
            <span className=" text-[3vh] whitespace-nowrap font-semibold">
              Transaction Failed Try Again
            </span>
          </motion.div>
          <motion.div
            className=" absolute flex flex-col text-[2.7vh] font-medium font-Karla items-center justify-center  z-30 top-1/2 left-1/2 [transform:translate(-50%,-50%)] "
            initial={{ opacity: 0, scale: 0, brightness: 0 }}
            animate={{
              opacity: loading ? 1 : 0,
              transform: loading
                ? "scale(1) translate(-50%,-50%)"
                : "scale(0) translate(-50%,-50%)",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              type: "tween",
              delay: 0.1,
              stiffness: 100,
            }}
          >
            <motion.div
              initial={{
                rotate: 0,
              }}
              animate={{
                rotate: 360,
                transition: {
                  duration: 1,
                  ease: "easeInOut",
                  loop: Infinity,
                  repeat: Infinity,
                },
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                loop: Infinity,
              }}
            >
              <LoaderCircleIcon size={30} />
            </motion.div>

            <span>Loading</span>
          </motion.div>
          <motion.form
            className={`h-auto w-[25vw] bg-[#8a8a8a33] px-[2vw] py-[3vh]  rounded-3xl  shadow-2xl shadow-[#120411] flex flex-col gap-[vh] backdrop-blur-xl justify-center border-b-2 border-l-2 border-[#888888] font-Karla 2xl:w-[22vw] `}
            onSubmit={predictDemo}
            animate={{
              pointerEvents: loading ? "none" : "auto",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              type: "spring",
            }}
          >
            <div className=" h-[20%] w-full  gap-[5%] flex items-center px-[3%] py-[3%] ">
              <label htmlFor="select" className=" w-1/2">
                Transaction Type
              </label>
              <select
                className="w-1/2  rounded-md bg-transparent border-2 border-[#a4a4a4] p-3 outline-none  "
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="1" className=" bg-[#341730f9]">
                  Cash Out
                </option>
                <option value="2" className=" bg-[#341730f9]">
                  Payment
                </option>
                <option value="3" className=" bg-[#341730f9]">
                  Cash In
                </option>
                <option value="4" className=" bg-[#341730f9]">
                  Transfer
                </option>
                <option value="5" className=" bg-[#341730f9]">
                  Debit Card
                </option>
              </select>
            </div>
            <div className=" h-[22%] w-full flex flex-col px-[3%] py-[3%] gap-[5%]  justify-evenly ">
              <label htmlFor="text " className=" text-[2.5vh] pl-[.2vw]">
                Amount
              </label>
              <input
                type="Number"
                className="
          rounded-md bg-transparent border-2 border-[#a4a4a4] px-2 outline-none h-[5vh]  w-full"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                required
              />
            </div>
            <div className=" h-[22%] w-full flex flex-col px-[3%] py-[3%] gap-[5%]  justify-evenly">
              <label htmlFor="text" className=" text-[2.5vh] pl-[.2vw]">
                Old Balance
              </label>
              <input
                type="Number"
                className="
          rounded-md bg-transparent border-2 border-[#a4a4a4] px-2 outline-none h-[5vh]  w-full"
                value={oldBalance}
                onChange={(e) => {
                  setoldBalance(e.target.value);
                }}
                required
              />
            </div>
            <div className=" h-[22%] w-full flex flex-col px-[3%] py-[3%] gap-[5%]  justify-evenly">
              <label htmlFor="text" className=" text-[2.5vh] pl-[.2vw]">
                New Balance
              </label>
              <input
                type="Number"
                className="
          rounded-md bg-transparent border-2 border-[#a4a4a4] px-2 outline-none h-[5vh]  w-full"
                value={newBalance}
                onChange={(e) => {
                  setnewBalance(e.target.value);
                }}
                required
              />
              <div className="h-[22%] w-full  mt-[2.5vh] py-[1%]">
                <motion.input
                  type="submit"
                  value="Pay Now"
                  whileHover={{ brightness: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className="w-full py-[.5vh] cursor-pointer text-[3vh] bg-transparent font-Karla rounded bg-gradient-to-r from-[#b96875a4] to-[#620080be]  shadow-lg shadow-[#242424] hover: hover:to-purple-900 "
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </motion.form>
        </div>
        <div className=" font-sans  text-[3vw]  leading-relaxed">
          <span className="px-4 border-4 border-[#77777753] rounded-full text-transparent bg-clip-text  bg-gradient-to-tl from-pink-400 to-purple-600 transition ease-in-out">
            Secure
          </span>{" "}
          finance demands a <br />
          watchful eye and a keen mind.
        </div>
      </motion.div>
    </div>
  );
};

export default Homepage;
