
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Signup} from "./pages/signup";
import {Signin} from "./pages/signin";
import {DashBoard} from "./pages/dashboard";
import {SendMoney} from "./pages/sendmoney";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path="/dashboard" element={<DashBoard></DashBoard>}></Route>
          <Route path="/sendmoney" element={<SendMoney></SendMoney>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
