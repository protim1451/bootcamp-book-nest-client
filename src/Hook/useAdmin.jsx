
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
                    const res = await axios.get(`http://localhost:3000/user/admin/${user.email}`);
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
