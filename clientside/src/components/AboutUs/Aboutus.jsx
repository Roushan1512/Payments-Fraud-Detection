import React from "react";
import img1 from "./abtus2.png";
import roushan from "./roushan.jpg";
import avirup from "./avirup1.jpg";
import sahil from "./sahil1.jpg";
import avijit from "./avijit.jpg";

const Aboutus = () => {
  return (
    <>
      <div className=" h-[200vh] w-full">
        <div className="h-[100vh] w-[100vw] flex items-center justify-center flex-col overflow-y-auto gap-10 bg-red-400">
          <div className="bg-[#2d0c2d] h-[60vh] w-[70vw] mt-[5%] rounded-3xl relative flex items-left justify-center gap-[10%] flex-col py-[1vh] px-[3vw] overflow-hidden text-center">
            <img
              src={img1}
              alt=""
              className=" bottom-0 right-0 absolute w-[38vw] opacity-40"
            />
            <h1 className=" text-[3vw] font-semibold font-Karla ]">About Us</h1>
            <p className="w-[50%] font-Karla text-justify text-[100%]">
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
        </div>
        <div className=" h-[100vh] w-[100vw] overflow-hidden">
          <h1 className="text-5xl text-purple-800 mb-10 mx-[10%]">Our Team:</h1>
          <div className="flex flex-row gap-32 justify-center items-center">
            {/* team */}
            <div className="grid grid-cols-2 grid-rows-6 gap-4 justify-items-center w-[30%]">
              <div className="w-auto bg-red-600 h-[90%] rounded-2xl row-span-3">
                <img
                  src={sahil}
                  alt=""
                  className="rounded-2xl h-[100%] object-cover"
                />
              </div>
              <div className="w-[20vw] bg-transparent h-[10vh] rounded-2xl"></div>

              <div className="w-auto bg-red-600 h-[90%] rounded-2xl row-span-3">
                <img
                  src={roushan}
                  alt=""
                  className="rounded-2xl h-[100%] object-cover"
                />
              </div>
              <div className="w-auto bg-red-600 h-[90%] rounded-2xl row-span-3">
                <img
                  src={avirup}
                  alt=""
                  className="rounded-2xl h-[100%] object-cover"
                />
              </div>
              <div className="w-auto bg-red-600 h-[90%] rounded-2xl row-span-3">
                <img
                  src={avijit}
                  alt=""
                  className="rounded-2xl h-[100%] object-cover"
                />
              </div>
              <div className="w-[20vw] bg-transparent h-[10vh] rounded-2xl"></div>
            </div>

            {/* det */}
            <div className="w-[30%] flex flex-col gap-20">
              <div>
                <h1 className=" text-3xl text-purple-800">Our Mission:</h1>
                We are dedicated to empowering individuals and businesses with
                the tools they need to safeguard their hard-earned money. We
                achieve this by developing cutting-edge solutions that:
              </div>
              <div>
                <h1 className=" text-3xl text-purple-800">Our Services:</h1>
                We offer a comprehensive suite of services designed to combat
                currency fraud, we continuously monitor your financial
                activities, scrutinizing transactions for anomalies and
                suspicious behavior
              </div>
              <div>
                <h1 className=" text-3xl text-purple-800">
                  The Benefits of Choosing Us:
                </h1>
                Our robust solutions offer peace of mind by significantly
                reducing the risk of falling victim to currency fraud.We empower
                you to build a multi-layered defense against evolving fraud
                tactics, safeguarding your financial well-being.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Aboutus;
