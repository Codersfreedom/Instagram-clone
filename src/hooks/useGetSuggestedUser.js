import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";



const useGetSuggestedUser = () => {
    const [isLoading,setIsLoading] =  useState(false);
    const [suggestedUsers,setSuggestedUsers] = useState([]);
    const{user} = useAuthStore();
    const showToast = useShowToast();

    useEffect(()=>{

        const getSuggestedUser  = async () =>{
            setIsLoading(true);

            try {
                const userRef = collection(firestore,"users");

                const q = query(userRef,where("uid","not-in",[user.uid,...user.following] ),
                orderBy("uid"),
                limit(3)
                )

                const snapShot = await getDocs(q);
                const users =[];

                snapShot.forEach((doc)=>{
                    users.push({...doc.data(),id:doc.id})
                })
                setSuggestedUsers(users)
            } catch (error) {
                showToast("Error",error.message,"error");
            }finally{
                setIsLoading(false);
            }
        }
        if(user) getSuggestedUser();

    },[user,showToast])

    return {isLoading,suggestedUsers};
}

export default useGetSuggestedUser
