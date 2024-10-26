
import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const [isAdmin, setIsAdmin] = useState(null);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        const fetchAdminStatus = async () => {
            if (!loading && user) {
                try {
                    const res = await axios.get(`https://b9a11-server-side-protim1451.vercel.app/user/admin/${user.email}`);
                    setIsAdmin(res.data?.admin);
                } catch (error) {
                    console.error("Error fetching admin status:", error);
                    setIsAdmin(false); // or handle the error as needed
                } finally {
                    setIsAdminLoading(false);
                }
            }
        };

        fetchAdminStatus();
    }, [user, loading]);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
