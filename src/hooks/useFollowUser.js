import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useProfileStore from "../store/UserProfileStore";
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import useShowToast from "./useShowToast";

const useFollowUser = (userId) => {
  const showToast = useShowToast();
  const [isFollowing, setIsFollowing] = useState(false);
  const { user, setUser } = useAuthStore();
  const { userProfile, setUserProfile } = useProfileStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowUser = async () => {
    setIsLoading(true);
    try {
      const currentUserRef = doc(firestore, "users", user.uid);
      const userToFollowRef = doc(firestore, "users", userId);
      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      await updateDoc(userToFollowRef, {
        followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });

      if (isFollowing) {
        // unfollow
        setUser({
          ...user,
          following: user.following.filter((uid) => uid !== userId),
        });
        
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter((uid) => uid !== user.uid),
          });
        
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            following: user.following.filter((uid) => uid !== userId),
          })
        );
        setIsFollowing(false);
        showToast("Success", "User is Unfollowed", "success");
      } else {
        // follow
        setUser({
          ...user,
          following: [...user.following, userId],
        });
        
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, user.uid],
          });
        

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            following: [...user.following, userId],
          })
        );

        setIsFollowing(true);
        showToast("Success", "User is followed", "success");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      const isFollowing = user.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [user, userId, showToast]);

  return { isLoading, isFollowing, handleFollowUser };
};

export default useFollowUser;
