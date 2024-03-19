import { useEffect, useState } from "react"
import usePostStore from "../store/usePostStore";
import useProfileStore from "../store/UserProfileStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";


const useGetPosts = () => {
  
    const [isLoading,setIsLoading] = useState(false);
    const showToast = useShowToast();
    const{posts,setPosts} = usePostStore();
    const {userProfile} = useProfileStore();
    const{user} = useAuthStore();

    useEffect(()=>{
        const getPosts =async () =>{
            setIsLoading(true);
            try {
                const q = query(collection(firestore,"posts"),where("createdBy","==",user?.uid))
                const querySnapShot = await getDocs(q);
    
                const posts =[];
                querySnapShot.forEach((doc)=>{
                    posts.push({...doc.data(),id:doc.id});
                })
    
                posts.sort((a,b) =>b.createdAt - a.createdAt)
                setPosts(posts);
    
    
                
            } catch (error) {
                    showToast("Error",error.message,"error");
                    setPosts([]);
            }finally{
                setIsLoading(false)
            }
        }

        getPosts();
    },[setPosts,userProfile,showToast])

   
    return {isLoading,posts}
}
export default useGetPosts
