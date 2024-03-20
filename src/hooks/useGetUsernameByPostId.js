import  { useState } from 'react'
import useShowToast from './useShowToast'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useGetUsernameByPostId = () => {
    const showToast = useShowToast();
    const [user,setUser] = useState();

    const getUsernameByPostId = async (Id) => {
       try {
            const q =  query(collection(firestore,"users"),where("uid", "==",Id))
            const querySnapshot = await getDocs(q);

            if(querySnapshot.empty){
                setUser(null)
                return;
            }
            
            querySnapshot.forEach((doc)=>{
                setUser(doc.data());
            })
            
            

       } catch (error) {
        showToast("Error",error.message,"error");
       }
    }
    return {user,getUsernameByPostId}
}

export default useGetUsernameByPostId
