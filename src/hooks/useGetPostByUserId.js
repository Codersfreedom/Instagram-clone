import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/usePostStore";
import useProfileStore from "../store/UserProfileStore";

const useGetPostByUserId = () => {
    
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(true);
  const{posts,setPosts} = usePostStore();
  const {userProfile} = useProfileStore();

  useEffect(() => {
    const getPostByUserId = async () => {
      setIsLoading(true);
      if (!userProfile) {
        setPosts([]);
        return;
      }

      
      try {
          const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));
        const querySnapshot = await getDocs(q);
        
      

        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        posts.sort((a,b) =>b.createdAt - a.createdAt)
                setPosts(posts);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([])
      }finally{
        setIsLoading(false)
      }
    };
     getPostByUserId();
  }, [showToast, userProfile, setPosts]);

  return { posts, isLoading };
};

export default useGetPostByUserId;
