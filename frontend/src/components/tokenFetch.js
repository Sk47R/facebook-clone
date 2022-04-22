import { useEffect } from "react";

const useTokenAndId = () => {
  let userInfo = localStorage.getItem("userInfo");

  if (userInfo !== null) {
    const { user, token } = JSON.parse(userInfo);
    return { user, token };
  } else {
    return { user: null, token: null };
  }
};
export default useTokenAndId;
