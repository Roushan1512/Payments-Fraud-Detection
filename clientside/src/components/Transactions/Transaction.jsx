import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format, set } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@nextui-org/react";
import { CircleX, Eye, EyeOffIcon, ShieldCheck } from "lucide-react";
import axios from "axios";

const Transaction = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [Apikey, setApikey] = useState("");
  const [type, setType] = useState(1);
  const [amount, setAmount] = useState("");
  const [oldBalance, setoldBalance] = useState("");
  const [newBalance, setnewBalance] = useState("");
  const [username, setUsername] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [loading, setloading] = useState(false);
  const [loadingtext, setloadingtext] = useState(false);
  const [fraudDetected, setfraudDetected] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const predictReq = (e) => {
    e.preventDefault();
    setloading(true);
    setloadingtext(true);

    const data = {
      type: type,
      amount: amount,
      oldBal: oldBalance,
      newBal: newBalance,
      api_key: Apikey,
      companyname: companyName,
      username: username,
      time: time.toTimeString(),
      date: date.toDateString(),
    };
    console.log(data);

    axios
      .post(`${import.meta.env.VITE_URL}/predict/apiKey`, data)
      .then((res) => {
        setloadingtext(false);
        console.log(res.data);
        if (res.data.prediction === "Fraud") {
          setfraudDetected(true);
          setTimeout(() => {
            setfraudDetected(false);
          }, 6000);
        } else {
          setPaymentSuccess(true);
          setTimeout(() => {
            setPaymentSuccess(false);
          }, 6000);
        }
        setAmount("");
        setoldBalance("");
        setnewBalance("");
        setType(1);
        setApikey("");
        setUsername("");
        setCompanyName("");
        setTime(new Date());
        setDate(new Date());
      })
      .catch((err) => {
        setloadingtext(false);
        console.log(err.response.data.detail);
      })
      .finally(() => {
        setTimeout(() => {
          setloading(false);
        }, 4000);
      });
  };

  return (
    <>
      <div className=" h-[100vh] w-[100vw]  pl-[4vw] flex ">
        <motion.form
          className=" flex-[2]  flex items-center gap-[1vw] justify-center relative "
          onSubmit={predictReq}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut", type: "tween" }}
        >
          <motion.div
            className=" absolute z-[150] px-[2vw] py-[1.5vh] bg-white rounded text-black font-semibold border-2 border-[#0000003a] "
            initial={{ opacity: 0 }}
            animate={{
              opacity: loadingtext ? 1 : 0,
              zIndex: loadingtext ? 150 : -5,
            }}
          >
            Processing...
          </motion.div>
          <motion.div
            className=" absolute z-[150] px-[2vw] py-[1.5vh] bg-white rounded flex items-center text-black font-semibold border-2 border-[#0000003a] "
            initial={{ opacity: 0 }}
            animate={{
              opacity: fraudDetected ? 1 : 0,
              zIndex: fraudDetected ? 151 : -5,
            }}
          >
            <div></div>
            <div className=" flex flex-col items-center">
              {" "}
              <span className=" flex gap-[3%] whitespace-nowrap text-red-700">
                <CircleX />
                Transaction Failed :(
              </span>
              <span>Due to fraud related issue</span>
            </div>
          </motion.div>
          <motion.div
            className=" absolute z-[150] px-[2vw] py-[1.5vh] bg-white rounded flex items-center text-black font-semibold border-2 border-[#0000003a] "
            initial={{ opacity: 0 }}
            animate={{
              opacity: paymentSuccess ? 1 : 0,
              zIndex: paymentSuccess ? 151 : -5,
            }}
          >
            <div></div>
            <div className=" flex flex-col items-center">
              {" "}
              <span className=" flex gap-[3%] whitespace-nowrap text-green-700  font-Karla text-[3vh]">
                <ShieldCheck size={30} />
                Transaction Successful
              </span>
            </div>
          </motion.div>
          <div className="  w-[45%] rounded-md p-[1vw] border-2 border-[#ffffff36] from-[#00000021] to-[#0a080ab6] bg-gradient-to-b h-[70%] overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-[#242323a4] z-10 flex items-center justify-center backdrop-blur-[.8px]"
              initial={{ opacity: 0 }}
              animate={{
                opacity: loading ? 1 : 0,
                zIndex: loading ? 100 : -5,
              }}
              transition={{ duration: 0.5, ease: "easeInOut", type: "tween" }}
              layout
            ></motion.div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Choose Type</AccordionTrigger>
                <AccordionContent>
                  <div className=" h-[20%] w-full  gap-[5%] flex items-center px-[3%] py-[3%] ">
                    <label htmlFor="select" className=" w-1/2">
                      Transaction Type
                    </label>
                    <select
                      className="w-1/2 h-full  rounded-md bg-transparent border-2 border-[#a4a4a4] p-3 outline-none  "
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    >
                      <option value="1" className=" bg-[#341730f9]">
                        Payment
                      </option>
                      <option value="2" className=" bg-[#341730f9]">
                        Transfer
                      </option>
                      <option value="3" className=" bg-[#341730f9]">
                        Cash Out
                      </option>
                      <option value="4" className=" bg-[#341730f9]">
                        Debit Card
                      </option>
                      <option value="5" className=" bg-[#341730f9]">
                        Cash In
                      </option>
                    </select>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Apikey</AccordionTrigger>
                <AccordionContent>
                  <Input
                    // label="Password"
                    variant="bordered"
                    placeholder="Enter your password"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <Eye className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className=" w-full "
                    value={Apikey}
                    onChange={(e) => {
                      setApikey(e.target.value);
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Username</AccordionTrigger>
                <AccordionContent>
                  <div className=" h-[20%] w-full  gap-[5%] flex  px-[3%] py-[.5%] flex-col ">
                    <input
                      type="text"
                      className=" w-full h-full  rounded-md bg-transparent border-2 border-[#a4a4a4] p-3 outline-none  "
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Company Name</AccordionTrigger>
                <AccordionContent>
                  <div className=" h-[20%] w-full  gap-[5%] flex  px-[3%] py-[.5%] flex-col ">
                    <input
                      type="text"
                      className=" w-full h-full  rounded-md bg-transparent border-2 border-[#a4a4a4] p-3 outline-none  "
                      placeholder="Enter the company name"
                      value={companyName}
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                      }}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Date</AccordionTrigger>
                <AccordionContent>
                  {/* <Popover> */}
                  {/* <PopoverTrigger asChild> */}
                  <div
                    // disabled={true}
                    // variant={"outline"}
                    className="w-[240px] flex px-3 py-2 justify-start disabled:opacity-100 text-left font-normal border-2 rounded-lg cursor-not-allowed"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </div>
                  {/* </PopoverTrigger> */}
                  {/* <PopoverContent className="w-auto p-0" align="start"> */}
                  {/* <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  /> */}
                  {/* </PopoverContent> */}
                  {/* </Popover> */}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="  w-[35%] rounded-md px-[2vw] py-[2.5vh] border-2 border-[#ffffff3b] from-[#00000021] to-[#0a080ab6] bg-gradient-to-b h-[70%] flex flex-col font-Karla relative ">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-[#242323a4] z-10 flex items-center justify-center backdrop-blur-[.8px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: loading ? 1 : 0, zIndex: loading ? 100 : -5 }}
              transition={{ duration: 0.5, ease: "easeInOut", type: "tween" }}
            ></motion.div>
            <div className=" h-[25%] w-full flex flex-col px-[3%] py-[3%] gap-[5%]  justify-evenly ">
              <label htmlFor="text " className=" text-[2.5vh] pl-[.2vw]">
                Amount
              </label>
              <input
                type="Number"
                className="
          rounded-md bg-transparent border-2 border-[#a4a4a4] px-2 outline-none py-[1vh]   w-full"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                required
                placeholder="Enter the amount"
              />
            </div>
            <div className=" h-[25%] w-full flex flex-col px-[3%] py-[3%] gap-[5%]  justify-evenly">
              <label htmlFor="text" className=" text-[2.5vh] pl-[.2vw]">
                Old Balance
              </label>
              <input
                type="Number"
                className="
          rounded-md bg-transparent border-2 border-[#a4a4a4] px-2 outline-none py-[1vh]   w-full"
                value={oldBalance}
                onChange={(e) => {
                  setoldBalance(e.target.value);
                }}
                required
                placeholder="Enter the old balance"
              />
            </div>
            <div className=" h-[25%] w-full flex flex-col px-[3%] py-[3%] gap-[5%]  justify-evenly">
              <label htmlFor="text" className=" text-[2.5vh] pl-[.2vw]">
                New Balance
              </label>
              <input
                type="Number"
                className="
          rounded-md bg-transparent border-2 border-[#a4a4a4] px-2 outline-none py-[1vh]   w-full"
                value={newBalance}
                onChange={(e) => {
                  setnewBalance(e.target.value);
                }}
                placeholder="Enter the new balance"
                required
              />
            </div>
            <div className="h-[25%] w-full flex items-center  py-[1%]">
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
        <div className=" flex-1  flex items-center justify-center">
          <div className="  w-[70%] h-[70%]"></div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
