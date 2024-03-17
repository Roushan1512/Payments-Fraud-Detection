import React from "react";
import img1 from "./abtus2.png";
import roushan from "./roushan.jpg";
import avirup from "./avirup1.jpg";
import sahil from "./sahil1.jpg";
import avijit from "./avijit.jpg";
import { motion } from "framer-motion";

const Aboutus = () => {
  return (
    <>
      <div className=" h-[200vh] w-full">
        <motion.div
          className="h-[100vh] w-[100vw] flex items-center justify-center flex-col overflow-y-auto gap-10 "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0,
            ease: "easeInOut",
            type: "tween",
          }}
        >
          <div className="bg-[#2d0c2d] h-[60vh] w-[70vw] mt-[5%] rounded-3xl relative flex items-left justify-center gap-[10%] flex-col py-[1vh] px-[3vw] overflow-hidden text-center border border-[#ffffff62]">
            <img
              src={img1}
              alt=""
              className=" bottom-0 right-0 absolute w-[38vw] opacity-40"
            />
            <h1 className=" text-[3vw] font-semibold font-Karla ]">About Us</h1>
            <p className="w-[40%] font-Karla text-justify text-[100%]">
              At Cypher, we understand the critical role trust plays in the
              financial landscape. In today's increasingly digital world, where
              online transactions are commonplace, the risk of currency fraud
              has unfortunately grown alongside it. This is where we come in. We
              are a team of passionate security experts dedicated to developing
              cutting-edge solutions for currency fraud detection. We believe
              everyone deserves to conduct financial transactions with
              confidence, and our mission is to empower businesses and
              individuals with the tools they need to stay protected. <br />
              <br />
              Whether you're a business owner looking to protect your bottom
              line or an individual seeking a secure way to manage your
              finances, Cypher is here to partner with you. Contact us today to
              learn more about our solutions and how we can help you achieve
              financial peace of mind.
            </p>
          </div>
        </motion.div>
        <motion.div
          className=" h-[100vh] w-[100vw] overflow-hidden font-Karla"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: "easeInOut",
            type: "tween",
          }}
        >
          <h1 className="text-5xl text-purple-500 mb-10 mx-[10%]">Our Team:</h1>
          <div className="flex h-[90%] flex-row gap-32 justify-center items-center">
            {/* team */}
            <div className=" flex gap-[1vw] h-full  justify-items-center w-[30%]">
              <div className=" flex-1 flex flex-col justify-evenly">
                <div className="w-full h-[40%] rounded-2xl  ">
                  <img
                    src={sahil}
                    alt=""
                    className="rounded-2xl h-[100%] object-cover w-full"
                  />
                </div>
                <div className="w-auto bg-red-600 h-[40%] rounded-2xl ">
                  <img
                    src={avirup}
                    alt=""
                    className="rounded-2xl h-[100%] object-cover w-full"
                  />
                </div>
                <div className=" w-full h-[15%]"></div>
              </div>
              <div
                className=" flex-1 gap-[1vw] h-full flex flex-col
               justify-items-center w-[30%]"
              >
                <div className=" w-full h-[10%]"></div>
                <div className="w-auto bg-red-600 h-[40%] rounded-2xl ">
                  <img
                    src={roushan}
                    alt=""
                    className="rounded-2xl h-[100%] object-cover w-full"
                  />
                </div>

                <div className="w-auto bg-red-600 h-[40%] rounded-2xl ">
                  <img
                    src={avijit}
                    alt=""
                    className="rounded-2xl h-[100%] object-cover w-full"
                  />
                </div>
              </div>
            </div>

            {/* det */}
            <div className="w-[30%] flex flex-col gap-20">
              <div>
                <h1 className=" text-3xl text-purple-500">Our Mission:</h1>
                We are dedicated to empowering individuals and businesses with
                the tools they need to safeguard their hard-earned money. We
                achieve this by developing cutting-edge solutions that:
              </div>
              <div>
                <h1 className=" text-3xl text-purple-500">Our Services:</h1>
                We offer a comprehensive suite of services designed to combat
                currency fraud, we continuously monitor your financial
                activities, scrutinizing transactions for anomalies and
                suspicious behavior
              </div>
              <div>
                <h1 className=" text-3xl text-purple-500">
                  The Benefits of Choosing Us:
                </h1>
                Our robust solutions offer peace of mind by significantly
                reducing the risk of falling victim to currency fraud.We empower
                you to build a multi-layered defense against evolving fraud
                tactics, safeguarding your financial well-being.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Aboutus;
