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
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zink-600 text-sm shadow-lg">
        <p>{state === "Sign-Up" ? "Create Account" : "Login"}</p>
        <p>
          Please {state === "Sign-Up" ? "Create Account" : "Login"} to book an
          appointment
        </p>

        <div>
          <p>Name</p>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <p>Email</p>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <p>Password</p>
          <input type="password" onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <button>{state === "Sign-Up" ? "Create Account" : "Login"}</button>
        </div>
      </div>
    </form>
  );
};

export default Login;
