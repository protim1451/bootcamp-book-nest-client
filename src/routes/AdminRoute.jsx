import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import useAdmin from "../Hook/useAdmin";



const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    
    if (loading || isAdminLoading) {
        return <span className="text-center loading loading-infinity loading-lg"></span>;
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate state={location.pathname} to="/"/>;

};

export default AdminRoute;