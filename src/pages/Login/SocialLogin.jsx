import { FaGoogle, FaGithub  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import useAuth from "../../Hook/useAuth";


const SocialLogin = () => {
    const {googleLogin} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || '/';
    const handleSocialLogin = socialProvider => {
        socialProvider()
        .then(result => {
            if(result.user){
                navigate(from);
            }
        })
        .catch(error =>{
            console.error(error);
        })
    }

    return (
        <div>
            <hr />
            <h3 className="font-bold text-2xl my-4 ml-3">Login With</h3>
            <div className="flex gap-4 justify-around items-center mb-3">
                <button onClick={()=>handleSocialLogin(googleLogin)} 
                className="btn bg-blue-400"><FaGoogle></FaGoogle>Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;