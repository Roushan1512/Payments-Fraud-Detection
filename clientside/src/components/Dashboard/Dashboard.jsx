import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  CircleAlert,
  LineChartIcon,
  ShieldHalf,
  StickyNote,
  RefreshCw,
  LoaderCircle,
} from "lucide-react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  AreaChart,
  Area,
} from "recharts";
import { Tooltip } from "@nextui-org/react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [transaction, setTransaction] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [fraudData, setFraudData] = useState({});
  const [refreshing, setRefreshing] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = {
      companyname: localStorage.getItem("companyname") || "",
    };
    axios
      .post(`${import.meta.env.VITE_URL}/dashboard/getFrauds`, data)
      .then((res) => {
        setFraudData(res.data);
        console.log(fraudData);
        const fraudData2 = res.data;
        setTransaction([
          fraudData2.top3[1]
            ? {
                name: fraudData2.top3[1].name,
                amount: fraudData2.top3[1].amount,
                fraud: fraudData2.top3[1].isfraud,
              }
            : null,
          fraudData2.top3[2]
            ? {
                name: fraudData2.top3[2].name,
                amount: fraudData2.top3[2].amount,
                fraud: fraudData2.top3[2].isfraud,
              }
            : null,
          fraudData2.top3[3]
            ? {
                name: fraudData2.top3[3].name,
                amount: fraudData2.top3[3].amount,
                fraud: fraudData2.top3[3].isfraud,
              }
            : null,
        ]);
      });
  }, [refresh]);

  const doRefresh = () => {
    setRefreshing("animate-spin");
    setTimeout(() => {
      setRefresh(refresh + 1);
      setRefreshing("");
    }, 1000);
  };

  console.log(localStorage.getItem("companyname"));

  const data3 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
  ];

  const data2 = [
    {
      name: "Page A",
      alltransaction: 590,
      pv: 800,
      noOfFraud: 1400,
    },
    {
      name: "Page B",
      alltransaction: 868,
      pv: 967,
      noOfFraud: 1506,
    },
    {
      name: "Page C",
      alltransaction: 1397,
      pv: 1098,
      noOfFraud: 989,
    },
    {
      name: "Page D",
      alltransaction: 1480,
      pv: 1200,
      noOfFraud: 1228,
    },
    {
      name: "Page E",
      alltransaction: 1520,
      pv: 1108,
      noOfFraud: 1100,
    },
    {
      name: "Page F",
      alltransaction: 1400,
      pv: 680,
      noOfFraud: 1700,
    },
  ];
  const COLORS = ["#57006dc2", "#68217ac2", "#84259cc2", "#9f20bec2"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const data4 = [
    { name: "January", Total: 1200 },
    { name: "February", Total: 2100 },
    { name: "March", Total: 800 },
    { name: "April", Total: 1600 },
    { name: "May", Total: 900 },
    { name: "June", Total: 1700 },
  ];

  // useEffect(() => {
  //   setTransaction([
  //     {
  //       name: fraudData.top3[1].name,
  //       amount: fraudData.top3[1].amount,
  //       fraud: fraudData.top3[1].isfraud,
  //     },
  //     {
  //       name: fraudData.top3[2].name,
  //       amount: fraudData.top3[2].amount,
  //       fraud: fraudData.top3[2].isfraud,
  //     },
  //     {
  //       name: fraudData.top3[3].name,
  //       amount: fraudData.top3[3].amount,
  //       fraud: fraudData.top3[3].isfraud,
  //     },
  //   ]);
  // }, [refresh]);

  const bgofcards =
    "from-[#1d1c1c] to-[#2e2d2d] bg-gradient-to-t rounded border border-[#444343] shadow-[#2e2d2d]";

  const gridVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
  };

  setTimeout(() => {
    setRefresh(refresh + 1);
    setLoading(false);
  }, 5000);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-[100vh]">
          <span className="animate-spin">
            <LoaderCircle size={32} />
          </span>
        </div>
      ) : (
        <div className=" w-[100vw] h-[100vh]  overflow-x-hidden pl-[4vw] font-Karla">
          <motion.div
            className=" w-full h-full justify-evenly  flex flex-col pr-[2vw] pl-[1vw]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
          >
            <div className=" h-[08%] ">
              <h1 className="pl-[.7rem]  h-full flex items-center text-[4vh] font-semibold">
                Dashboard
              </h1>
            </div>
            <div className=" h-[15%]  p-[.3rem] flex gap-[1vw] ">
              {/* single card */}
              <div className={` w-[20%]  rounded h-full ${bgofcards} flex  `}>
                <div className=" w-[25%] flex items-center justify-center  ">
                  <ShieldHalf />
                </div>
                <div className=" flex-1 pl-[.7vw] flex flex-col justify-center">
                  <h1 className="text-[1rem]   flex items-end justify-start  font-medium opacity-80">
                    Total Frauds{" "}
                  </h1>
                  <h1 className="text-[1.85rem] flex items-start leading-tight font-medium">
                    {fraudData ? fraudData.frauds : 0}
                  </h1>
                </div>
              </div>
              <div className={` w-[20%]  rounded h-full ${bgofcards} flex `}>
                <div className=" w-[25%] flex items-center justify-center  ">
                  <LineChartIcon />
                </div>
                <div className=" flex-1 pl-[.7vw] flex flex-col justify-center">
                  <h1 className="text-[1rem]   flex items-end justify-start  font-medium opacity-80">
                    Balance At Risk{" "}
                  </h1>
                  <h1 className="text-[1.85rem] flex items-start leading-tight font-medium">
                    {fraudData ? fraudData.amount : 0} ₹
                  </h1>
                </div>
              </div>
              <div className={` w-[20%]  rounded h-full ${bgofcards} flex `}>
                <div className=" w-[25%] flex items-center justify-center  ">
                  <StickyNote />
                </div>
                <div className=" flex-1 pl-[.7vw] flex flex-col justify-center ">
                  <h1 className="text-[1rem]   flex items-end justify-start  font-medium opacity-80">
                    Pending Action{" "}
                  </h1>
                  <h1 className="text-[1.85rem] flex items-start leading-tight font-medium">
                    {fraudData ? fraudData.flagged : 0}
                  </h1>
                </div>
              </div>
              <RefreshCw
                size={16}
                className={`${refreshing} cursor-pointer`}
                onClick={doRefresh}
              />
            </div>
            <div className=" h-[28%]  flex p-[.3rem] gap-[1vw]">
              <div className={` flex-[1]  h-full ${bgofcards} flex-col`}>
                <div className="border-b border-[#7a7979] h-[18%] px-[1vw] font-medium text-[#cccccc] flex items-center">
                  <span className=" flex items-center gap-[.5vw]">
                    Health Score <CircleAlert size={15} />
                  </span>
                </div>
                <div className=" h-[82%]  flex items-center justify-center relative">
                  <span className=" absolute text-[5vh] mt-4 font-semibold [transform:translate(-0%,30%)] z-30 ">
                    {fraudData
                      ? (
                          (fraudData.nofrauds / fraudData.transactions) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </span>
                  <ResponsiveContainer width="100%" height="90%">
                    <PieChart className="  ">
                      <Pie
                        data={data3}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        style={{
                          position: "absolute",
                          transform: "translate(0%,30%)",
                        }}
                      >
                        {data3.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            // fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className={` flex-[1.2] flex flex-col  h-full ${bgofcards}`}>
                <div className="border-b border-[#7a7979] h-[18%] px-[1vw] font-medium text-[#cccccc] flex items-center">
                  <span className=" flex items-center gap-[.5vw]">
                    Transactions <CircleAlert size={15} />
                  </span>
                </div>
                <div className=" h-[82%] gap-[5%] py-[3.5%] px-[3%] flex flex-col">
                  {transaction.map((trnsc, index) => (
                    <div
                      className=" w-full from-[#1b1b1b] to-[#6d006d7c] bg-gradient-to-bl border-[#6d006d59] flex gap-[5%]  items-center flex-1 px-[5%] rounded-lg font-medium border"
                      key={index}
                    >
                      <span className="text-[#cccccc] w-[20%] whitespace-nowrap overflow-hidden">
                        {trnsc.name}
                      </span>
                      <span className="text-[#cccccc] w-[25%]">
                        {trnsc.amount}₹
                      </span>
                      <span className="text-[#cccccc] w-[50%] bg-[#00000069] rounded-md px-[2%] flex gap-[4%] whitespace-nowrap items-center ">
                        <ExclamationTriangleIcon
                          className={` ${
                            trnsc.fraud == "Fraud Detected"
                              ? " stroke-[red]"
                              : " stroke-[#ffffff56]"
                          } `}
                        />
                        {trnsc.fraud}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={` flex-[1.35]  h-full ${bgofcards}`}>
                <div className="border-b border-[#7a7979] h-[18%] px-[1vw] font-medium text-[#cccccc] flex items-center">
                  <span className=" flex items-center gap-[.5vw]">
                    Fraud Under Review <CircleAlert size={15} />
                  </span>
                </div>
                <div className=" h-[82%] gap-[5%] py-[3.5%] px-[3%] flex flex-col">
                  {transaction.map((trnsc, index) =>
                    trnsc.fraud == "Fraud" ? (
                      <div
                        className=" w-full from-[#1b1b1b] to-[#0000007c] bg-gradient-to-bl border-[#0a0a0a59] flex gap-[5%]  items-center flex-1 px-[5%] rounded font-medium border"
                        key={index}
                      >
                        <span className="text-[#cccccc] ">{trnsc.name}</span>

                        <span className="text-[#cccccc]">{trnsc.amount}₹</span>
                        <span className="text-[#cccccc] flex gap-[5%] whitespace-nowrap items-center ml-auto">
                          <ExclamationTriangleIcon />
                          {trnsc.fraud}
                        </span>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
            <div className=" h-[39%]  flex p-[.3rem] gap-[1vw]">
              <div className={` flex-1  h-full ${bgofcards}`}>
                <div className="border-b border-[#7a7979] h-[18%] px-[1vw] flex font-medium text-[#cccccc] ">
                  <span className=" flex items-center gap-[.5vw]">
                    Transaction Volume and Fraudulent Activity{" "}
                    <CircleAlert size={15} />
                  </span>
                </div>
                <div className=" h-[82%] ">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      width={500}
                      height={400}
                      data={data2}
                      margin={{
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10,
                      }}
                      className=" transform translate-x-[-3%] translate-y-2 bg-[]"
                    >
                      <CartesianGrid stroke="#f5f5f518" />
                      <XAxis dataKey="name" scale="band" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="alltransaction"
                        barSize={20}
                        fill="#eeeeee"
                      />
                      <Line
                        type="monotone"
                        dataKey="alltransaction"
                        stroke="#8e33b3"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className={` flex-[.8]  h-full ${bgofcards}`}>
                <div className="border-b border-[#7a7979] h-[18%] px-[1vw] flex font-medium text-[#cccccc] bg-[] ">
                  <span className=" flex items-center gap-[.5vw]">
                    Types Of Fraud <CircleAlert size={15} />
                  </span>
                </div>
                <div className=" h-[82%] ">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                      <Pie
                        data={fraudData.types}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {fraudData
                          ? fraudData.types.map((i, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))
                          : null}
                      </Pie>
                      <Tooltip />
                      {/* <Legend /> */}
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className={`flex-[.7]  h-full ${bgofcards}`}>
                <div className="border-b border-[#7a7979] h-[18%] px-[1vw] flex font-medium text-[#cccccc] bg-[#]">
                  <span className=" flex items-center gap-[.5vw]">
                    Reviews
                    <CircleAlert size={15} />
                  </span>
                </div>
                <div className="h-[82%] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      width={730}
                      height={250}
                      data={data4}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      style={{
                        position: "absolute",
                        transform: "translate(4%,0%)",
                      }}
                    >
                      <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="#8884d8"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8884d8"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="gray" />
                      <CartesianGrid
                        strokeDasharray="1 1"
                        className="chartGrid  stroke-[#46454580]"
                      />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="Total"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#total)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
// bg-[#2e2d2d]
export default Dashboard;

// 1. Transaction Volume and Fraudulent Activity:

// X-axis: Time (daily, weekly, monthly)
// Y-axis (left): Total number of transactions
// Y-axis (right): Number of flagged fraudulent transactions
// Line Graph: Plot two lines, one for total transactions and another for flagged fraudulent transactions. This highlights trends in overall transaction volume and potential spikes in fraudulent activity.
