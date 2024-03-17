import { create } from "zustand";

const useProfileStore = create((set)=>({
    userProfile:null,
    setUserProfile:(userProfile)=>set({userProfile}),
}))

export default useProfileStore;