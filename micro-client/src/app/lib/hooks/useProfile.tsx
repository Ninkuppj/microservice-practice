// import {useQuery} from "@tanstack/react-query";
import UserService from "@/app/api/users/route";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useProfile = () => {
    const { status, data }: any = useSession();
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getProfile = async () => {
            if (status === "authenticated" && data?.user?.email) {
                setLoading(true);
                setError(null);
                try {
                    const { status: statusRes, user } = await UserService.getByEmail(data.user.email)
                    if (statusRes === 200 && user) { setAccount(user), setLoading(false) };
                } catch (err: any) {
                    setError(err);
                }
            } else {
                setLoading(false); // Not authenticated, or email missing
            }
        }
        getProfile()
    }, [status, data?.user?.email])

    return { profile: account, loading, error };
}