import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Transaction = () => {
  const [type, setType] = useState(1);
  const [amount, setAmount] = useState("");
  const [oldBalance, setoldBalance] = useState("");
  const [newBalance, setnewBalance] = useState("");
  const [username, setUsername] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(Date.now());

  return (
    <>
      <div className=" h-[100vh] w-[100vw]  pl-[4vw] flex">
        <form className=" flex-[2]  flex items-center gap-[1vw] justify-center">
          <div className="  w-[45%] rounded-md p-[1vw] border-2 h-[70%] overflow-hidden">
            <Accordion type="multiple" collapsible>
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
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Username</AccordionTrigger>
                <AccordionContent>
                  <div className=" h-[20%] w-full  gap-[5%] flex  px-[3%] py-[.5%] flex-col ">
                    <input
                      type="text"
                      className=" w-full h-full  rounded-md bg-transparent border-2 border-[#a4a4a4] p-3 outline-none  "
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
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Date</AccordionTrigger>
                <AccordionContent>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="  w-[35%] rounded-md px-[2vw] py-[2.5vh] border-2 h-[70%] flex flex-col font-Karla ">
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
        </form>
        <div className=" flex-1  flex items-center justify-center">
          <div className="  w-[70%] h-[70%]"></div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
