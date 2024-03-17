import { useEffect, useState } from "react";
import useShowToast from "./useShowToast"
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useProfileStore from "../store/UserProfileStore";


const useGetUserProfile = (username) => {
    const showToast = useShowToast();
    const [isLoading, setIsLoading] = useState(true);
    const {userProfile,setUserProfile} =  useProfileStore()

    useEffect(()=>{
        const getUserProfile = async () =>{
            setIsLoading(true);
            try {
                const q = query(collection(firestore,"users"),where("username","==",username));
                const querySnapshot = await getDocs(q);
                if(querySnapshot.empty){
                    setUserProfile(null);
                    return
                }
                let userDoc;
                querySnapshot.forEach((doc)=>{
                    userDoc = doc.data();
                })

                setUserProfile(userDoc);
                
            } catch (error) {
                showToast("Error",error.message,"error");
            }finally{
                setIsLoading(false);
            }
        }
        getUserProfile();
    },[username,setUserProfile,showToast])

    return {isLoading,userProfile}
}

export default useGetUserProfile
