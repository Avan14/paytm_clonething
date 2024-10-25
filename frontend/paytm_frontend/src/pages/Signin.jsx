import { Heading } from "../components/Heading";
import { SubHead } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/ButtonWarning";
import { InputBox } from "../components/input";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign In"} />
        <SubHead label={"Enter your credentials to access your account"} />
        <InputBox
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder={"johndoe1"}
          label={"Username"}
        />
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder={"123456"}
          label={"Password"}
        />
        <Button
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:3000/api/v1/user/login",
              {
                username,
                password,
              }
            );
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
          }}
          label={"Sign In"}
        />
        <BottomWarning
          label={"Don't have an account?"}
          buttonText={"Sign up"}
          to={"/signup"}
        />
      </div>
    </div>
  );
};
