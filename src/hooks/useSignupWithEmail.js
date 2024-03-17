import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth';
import {auth, firestore} from '../firebase/firebase'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';



const useSignupWithEmail = () => {

    const [createUserWithEmailAndPassword,user,loading,error]  = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();
    const {login} = useAuthStore();

    const signup = async (inputs)=>{

        const usersRef = collection(firestore,"users");
        const q = query(usersRef,where("username", "==",inputs.username));
        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty){
            showToast("Error","Username already exists","error");
            return;
        }

        try {
            if(!inputs.email || !inputs.password || !inputs.fullName){
                showToast("Error","Please fill all fields","error");
                return;
            }
            
         
            const newUser = await createUserWithEmailAndPassword(inputs.email,inputs.password);
            if(!newUser && error){
                showToast("Error",error.message,"error");
                return
                
            }
            if(newUser){
                const userDoc = {
                    uid:newUser.user.uid,
                    email:inputs.email,
                    username:inputs.username,
                    fullname:inputs.fullName,
                    bio:"",
                    profilePicURL:"",
                    followers:[],
                    following:[],
                    posts:[],
                    createdAt:Date.now()
                }
                await setDoc(doc(firestore,"users",newUser.user.uid),userDoc);
                localStorage.setItem("user",JSON.stringify(userDoc))
                login(userDoc);
                showToast("Success","Login Successfully",'success');
            }
        } catch (error) {
            showToast("Error",error.message,"error")
        }
    }
    return {loading,error,signup};
}

export default useSignupWithEmail
