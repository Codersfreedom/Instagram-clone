import { useState } from "react";
import useShowToast from "./useShowToast";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../store/usePostStore";
import useProfileStore from "../store/UserProfileStore";


const useDeletePost = () => {
    const {user} = useAuthStore();
    const{deletePost:deletePostFromUserStore} = usePostStore();
    const{deletePost:deletePostFromUserProfile} = useProfileStore();

    const [isLoading,setIsLoading] = useState(false);
    const showToast = useShowToast();

    const deletePost = async (postId)=>{
    
        if(!window.confirm("Are you sure to delete this post")) return ;
        if(isLoading) return
        setIsLoading(true);
        try {
            const imageRef = ref(storage,`posts/${postId}`);
            await deleteObject(imageRef);

            const userRef = doc(firestore,"users",user.uid);
            await deleteDoc(doc(firestore,"posts",postId));

            await updateDoc(userRef,{
                posts:arrayRemove(postId)
            })
            
            deletePostFromUserStore(postId);
            deletePostFromUserProfile(postId);
            showToast("Success","Post deleted successfully",'success');


        } catch (error) {
            showToast("Error",error.message,'error');
        }finally{
            setIsLoading(false)
        }
    }
    return {isLoading,deletePost};
}

export default useDeletePost
