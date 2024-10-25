import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/ButtonWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputBox } from "../components/input";
import { SubHead } from "../components/SubHeading";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-slate-300 h-screen flex justify-center items-center">
        <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
          <Heading label={"Signup"}></Heading>
          <SubHead label={"Create your account"}></SubHead>
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder={"Aman"}
            label={"First Name"}
          ></InputBox>
          <InputBox
            onChange={(e) => {
              setlastName(e.target.value);
            }}
            placeholder={"Kuman"}
            label={"Last Name"}
          ></InputBox>
          <InputBox
            onChange={(e) => {
              setusername(e.target.value);
            }}
            placeholder={"johndoe1"}
            label={"Username"}
          />
          <InputBox
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            placeholder={"123456"}
            label={"Password"}
          />
          <Button onClick={async () => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        firstName: firstName,
                        lastName: lastName,
                        username: username,
                        password: password
                    });
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
                }} 
                label={"Sign Up"}/>
        </div>
        <BottomWarning label={"already have an account?"} buttonText = {"signin"} to ={"/signin/"} ></BottomWarning>
      </div>
    </>
  );
};
