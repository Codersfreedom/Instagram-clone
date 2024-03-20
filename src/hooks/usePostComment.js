import { useState } from "react"
import useAuthStore from "../store/authStore"
import useShowToast from "./useShowToast";
import {updateDoc} from "firebase/firestore"
import { arrayUnion, doc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/usePostStore";

const usePostComment = () => {
    const {user} = useAuthStore()
    const {addComment} = usePostStore();
    const[isLoading,setIsLoading] = useState(false);
    const showToast = useShowToast();

    const handlePostComment = async(postId,comment)=>{
        if(isLoading) return;
        if(!user) return showToast("Error","You must login to post a comment",'error');
        if(!comment) return showToast("Error","You must enter something to post a comment","error");
        
        setIsLoading(true);

        const newComment = {
            comment,
            createdAt:Date.now(),
            createdBy:user.uid,
            postId,
        }
        try {
            await updateDoc(doc(firestore,"posts",postId),{
                comments:arrayUnion(newComment)
            })
            addComment(postId,comment)
            showToast("Success","Comment posted successfully","success");
        } catch (error) {
            showToast("Error",error.message,"error");
        }finally{
            setIsLoading(false);
        }
    }
    return {handlePostComment,isLoading};
}

export default usePostComment
