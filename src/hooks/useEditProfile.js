import  { useState } from 'react'
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { firestore, storage } from '../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import useProfileStore from '../store/UserProfileStore';


const useEditProfile = () => {
    const [isLoading,setIsLoading] = useState(false);
    const {user,setUser} = useAuthStore();
    const {setUserProfile} = useProfileStore();
    const showToast = useShowToast();

    const EditProfile = async (inputs,selectedImg)=>{
        if(isLoading || !user) return
        setIsLoading(true);

        const storageRef = ref(storage,`profilePic/${user.uid}`)
        const userDocRef = doc(firestore,'users',user.uid)
        let URL = "";
        try {
            if(selectedImg){
                await uploadString(storageRef,selectedImg,"data_url");
                URL = await getDownloadURL(ref(storage,`profilePic/${user.uid}`))
            }

            const updatedUser ={
                ...user,
                fullname: inputs.fullname|| user.fullname,
                username:inputs.username || user.username,
                bio:inputs.bio || user.bio,
                profilePicURL: URL || user.profilePicURL,

            }

            await updateDoc(userDocRef,updatedUser);
            localStorage.setItem("user",JSON.stringify(updatedUser));
            setUser(updatedUser);
            setUserProfile(updatedUser);
            showToast("Success","Profile Updated Successfully",'success');

            

        } catch (error) {
            showToast("Error",error.message,'error');
        }finally{
            setIsLoading(false)
        }
    }
    return {isLoading, EditProfile}
}

export default useEditProfile
