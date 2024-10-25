import axios from "axios";
import { useEffect, useState } from "react";

export const Balance = () => {
  const [amount, setamount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setamount(res.data.balance));
  }, [amount]);

  return (
    <>
      <div className="flex">
        <div className="font-bold text-lg">Your Balance</div>
        <div className="font-semibold ml-4 text-lg">Rs {amount}</div>
      </div>
    </>
  );
};
