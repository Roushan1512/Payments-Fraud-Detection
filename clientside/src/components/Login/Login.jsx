import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      onClick={() => loginWithRedirect()}
      className=" bg-green-600  px-[.5vw] py-[.5vh] rounded"
    >
      Log In
    </button>
  );
};

export default Login;
