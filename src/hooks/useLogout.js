import { useSignOut } from "react-firebase-hooks/auth"
import useShowToast from "./useShowToast"
import useAuthStore from "../store/authStore";
import { auth } from "../firebase/firebase";


const useLogout = () => {
    
    const [signOut, loading,error] = useSignOut(auth)
    const showToast = useShowToast();
    const {logout:logout_store}  = useAuthStore();


    const logout = async ()=>{
        try {
            await signOut();
            localStorage.removeItem("user");
            logout_store();
            showToast("Success","Logout Successfull",'success');
        } catch (error) {
            showToast("Error",error.message,"error");
        }

    }

    return {logout,loading,error}
}

export default useLogout
