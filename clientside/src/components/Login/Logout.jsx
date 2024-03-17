import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";

const Logout = () => {
  const { logout } = useAuth0();
  return (
    <motion.button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      className=" bg-red-500 px-[.5vw] py-[.5vh] rounded"
      whileHover={{ backgroundColor: "#ff0000" }}
      whileTap={{ scale: 0.9 }}
    >
      Log Out
    </motion.button>
  );
};

export default Logout;
