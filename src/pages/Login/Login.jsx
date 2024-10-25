import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../../Hook/useAuth";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";


const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { email, password } = data;
        signInUser(email, password)
            .then(result => {
                console.log(result);
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error);
                toast.error("Invalid email or password!");
            });
    };

    const { signInUser } = useAuth();

    return (
        <div>
            <Helmet>BookNest || Login</Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl text-center font-bold">Login now!</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPassword ? "text" : "password"}
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered"
                                    {...register("password", { required: true })}
                                />
                                <span className="absolute top-[50px] right-3 cursor-pointer" onClick={() =>
                                    setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaRegEye /> : <FaEyeSlash />
                                    }
                                </span>
                                {errors.password && <span className="text-red-500">This field is required</span>}

                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary bg-[#2CCCD3]">Login</button>
                            </div>
                        </form>
                        <SocialLogin />
                    </div>
                    <p className="text-center">New to this Website? Go To  <Link className="text-blue-600 underline" to='/register'>Register Page</Link></p>
                </div>
                <ToastContainer></ToastContainer>
            </div>
        </div>
    );
};

export default Login;