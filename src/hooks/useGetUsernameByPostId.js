import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import {  doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUsernameByPostId = (Id) => {
  const showToast = useShowToast();
  const [user, setUser] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const getUsernameByPostId = async () => {
      
      setIsloading(true);
      setUser(null);
      try {
        const userRef = await getDoc(doc(firestore, "users", Id));
				if (userRef.exists()) {
					setUser(userRef.data());
        }

      
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsloading(false);
      }
    };
    getUsernameByPostId();
  }, [showToast, setUser, Id]);
  return { user, isLoading,setUser };
};

export default useGetUsernameByPostId;
