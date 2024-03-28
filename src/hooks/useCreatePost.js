import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import useProfileStore from "../store/UserProfileStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import usePostStore from "../store/usePostStore";
import { useLocation } from "react-router-dom";


const useCreatePost = () => {
  const showToast = useShowToast();
  const [isLoading, setIsloading] = useState(false);

  const pathname = useLocation();

  const{user} = useAuthStore();
  const {userProfile} = useProfileStore();
  const { createPost } = usePostStore();
  const { addPost } = useProfileStore();

  const handleCreatePost = async (selectedImg, caption) => {
    if(isLoading) return;
    if (!selectedImg) throw new Error("Please select an image");
    if(!user) return showToast("Error","Please login to create a post","error");
    setIsloading(true);
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: user.uid,
    };
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = doc(firestore, "users", user.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedImg, "data_url");
      const downlodeURL = await getDownloadURL(imageRef);
      await updateDoc(postDocRef, { imageURL: downlodeURL });

      newPost.imageURL = downlodeURL;

      if( user.uid === userProfile.uid){
       createPost({
        ...newPost,
        id: postDocRef.id,
      }); 
      }
      

      if( pathname !== "/" &&  user.uid === userProfile.uid){
        addPost({
        ...newPost,
        id: postDocRef.id,
      });
      }
      
      showToast("Success", "Post created successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsloading(false);
    }
  };

  return{isLoading, handleCreatePost}
};

export default useCreatePost;
