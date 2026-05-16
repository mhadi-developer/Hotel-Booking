import {type  LoggedInUserData } from './../types/schema/login';
import { create } from "zustand";
import axiosInstance from "../resources/axios.Instance.create";


type AuthStore = {
    loggedInUser: LoggedInUserData | null,
    loading: boolean,
    getLoggedInUser: () => Promise<void>,
    logout: () => void
};

export const useAuthStore = create<AuthStore>((set) => ({
    loggedInUser: null,
    loading: true,
    getLoggedInUser: async () => {
        try {
            const response = await axiosInstance.get("/login/get")
            console.log('*************',response);
            
            set({
                loggedInUser: response?.data?.user,
                loading: false
            })
           
           
        } catch (error) {
            set({
                loggedInUser: null,
                loading:false
            })
            console.log(error);
            
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/logout");
            set({
                loggedInUser: null,
                loading:false
            })
        } catch (error) {
            console.log(error);
        }
    }
}));