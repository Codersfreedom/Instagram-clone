import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const useSignupWithGoogle = () => {
  const [signInWithGoogle,,, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const { login } = useAuthStore();

  const singInWithGoogle = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }
      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0],
          fullname: newUser.user.displayName,
          bio: "",
          profilePicURL: newUser.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user", JSON.stringify(userDoc));
        login(userDoc);
        showToast("Success", "Signup Successfully", "success");
      } else {
        const userDoc = userSnap.data();
        localStorage.setItem("user", JSON.stringify(userDoc));
        login(userDoc);
        showToast('Success',"Login Successfully",'success');
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return { singInWithGoogle};
};

export default useSignupWithGoogle;
