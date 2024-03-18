import { useState } from "react";
import useShowToast from "./useShowToast";


const usePreviewImg = () => {
    const showToast = useShowToast();
    const [selectedImg,setSelectedImg] = useState(null);

    const maxImageSize = 2* 1024 *1024  // 2mb

    const handleSelectImg =(e)=>{
        const file = e.target.files[0];

        if(file && file.type.startsWith("image/")){
            if(file.size >maxImageSize){
                showToast("Error","File size must be less than 2mb",'error');
                return;
            }

            const reader = new FileReader();
            reader.onloadend =()=>{
                setSelectedImg(reader.result);
            }
            reader.readAsDataURL(file)

        }else{
            showToast("Error","Select an Image file ",'error')
            setSelectedImg(null);
            
        }


    }
    return {selectedImg,setSelectedImg,handleSelectImg};
}

export default usePreviewImg
