// import {useQuery} from "@tanstack/react-query";
import UserService from "@/app/api/users/route";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useProfile = () => {
    const {data}:any = useSession();
    const [account, setAccount] = useState({});
    useEffect(()=> {
        const getProfile =async () => {
            const {status, user}= await UserService.getById(data.user.id!)
            if (status === 200 && user){setAccount(user)};
        };
        if(data.user.id!){
            getProfile() 
        }
    },[])
    return {profile: account};
}