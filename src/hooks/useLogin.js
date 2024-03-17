
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../firebase/firebase'
import useShowToast from './useShowToast';
import { doc, getDoc } from 'firebase/firestore';
import useAuthStore from '../store/authStore';

const useLogin = () => {

    const [signInWithEmailAndPassword, ,loading,error] = useSignInWithEmailAndPassword(auth);
    const showToast = useShowToast();
    const {login:login_store} = useAuthStore();

    const login = async (inputs) =>{

        if(!inputs.email || !inputs.password){
            showToast("Error","Please fill all the fields",'error');
            return
        }

        try {
            const userCred = await signInWithEmailAndPassword(inputs.email,inputs.password);

            if(userCred){
                const docRef = doc(firestore,"users",userCred.user.uid);
                const docSnap = await getDoc(docRef);
                localStorage.setItem("user", JSON.stringify(docSnap.data()));
                login_store(docSnap.data());
                showToast("Success","Login successfull","success");
            }
        } catch (error) {
            showToast("Error",error.message,'error')
        }
    }


  return {login,loading,error}
}

export default useLogin
