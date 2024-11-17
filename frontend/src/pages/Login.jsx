import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign-Up");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <form>
      <div className="mt-20 flex flex-col gap-3 m-auto items-start text-gray-600 p-8 w-max min-w-[340px] sm:min-w-96 border rounded-xl text-zink-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign-Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign-Up" ? "Create Account" : "Login"} to book an
          appointment
        </p>

        <div className={`w-full ${state === "Sign-Up"?"":"hidden"}`}>
          <p>Name</p>
          <input
            className="border border-gray-600 rounded w-full p-2 mt-1"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="w-full ">
          <p>Email</p>
          <input
            className="border border-gray-600 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full ">
          <p>Password</p>
          <input
            className="border border-gray-600 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button className="bg-primary text-white w-full py-2 mt-4 rounded-md text-base">
          {state === "Sign-Up" ? "Create Account" : "Login"}
        </button>

        {
          state === "Sign-Up"
          ?<p>Already have an account? <span onClick={()=>setState("login")} className="text-primary underline cursor-pointer">Login Here</span></p>
          :<p>Create a new Account <span onClick={()=>setState("Sign-Up")} className="text-primary underline cursor-pointer">Click Here</span> </p>
        }
      </div>
    </form>
  );
};

export default Login;
// 3-29
