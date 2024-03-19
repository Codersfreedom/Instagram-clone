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


const useCreatePost = () => {
  const showToast = useShowToast();
  const [isLoading, setIsloading] = useState(false);

  const{user} = useAuthStore();
  const { createPost } = usePostStore();
  const { addPost } = useProfileStore();

  const handleCreatePost = async (selectedImg, caption) => {
    if(isLoading) return;
    if (!selectedImg) throw new Error("Please select an image");
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

      createPost({
        ...newPost,
        id: postDocRef.id,
      });

      addPost({
        ...newPost,
        id: postDocRef.id,
      });
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
