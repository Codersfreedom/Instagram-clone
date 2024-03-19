import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchUser = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const getUser = async (username) => {
    
    setIsLoading(true);
    setUser(null);
    try {
      const q = query(collection(firestore,"users"),where("username","==",username));
      const userSnapShot = await getDocs(q);
      if (userSnapShot.empty) return showToast("Error", "User not found", "error");
        

      userSnapShot.forEach((user) => {
        setUser(user.data());
      });
    } catch (error) {
      showToast("Error", error.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  return {user,setUser,isLoading,getUser}
};

export default useSearchUser;
