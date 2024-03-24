import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";


const useLikePost = (post) => {
    const {user} = useAuthStore();
    const [isLoading,setIsLoading] = useState(false);
    const [likes,setLikes] = useState(post?.likes.length);
    const[isLiked,setIsLiked] = useState(post?.likes.includes(user?.uid))
    const showToast = useShowToast();



        const likePost = async ()=>{
            if(isLoading) return
            if(!user) return showToast("Error","You must login to like the post!","error");
            setIsLoading(true);
            try {
                    const postRef = doc(firestore,"posts",post?.id);
                    await updateDoc(postRef,{
                        likes:isLiked ? arrayRemove(user.uid) :arrayUnion(user.uid)
                    })
                    setIsLiked(!isLiked)
                    isLiked ? setLikes(likes-1) : setLikes(likes+1);

            } catch (error) {
                showToast("Error",error.message,"error");

            }finally{
                setIsLoading(false)
            }
        }
        return {isLoading,likes, isLiked ,likePost};
}

export default useLikePost
