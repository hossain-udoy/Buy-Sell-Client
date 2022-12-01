import axios from "axios";
import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState("");
  console.log(email);
  useEffect(() => {
    axios
      .get(`https://buy-sell-server-khaki.vercel.app/jwt?email=${email}`)
      .then((res) => {
        console.log(res);
        if (res.data.accessToken) {
          localStorage.setItem("access-token", res.data.accessToken);
          setToken(res.data.accessToken);
        }
      });
  }, [email]);
  return [token];
};

export default useToken;
