import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from "../store/authSlice";
import { Button, Input, Logo, Loader } from "./index";
import { useDispatch } from 'react-redux';
import authService  from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit} = useForm();
    const [error , setError] = useState("");
    const [loading, setLoading] = useState(false); // State variable for loading state

    const SignUpUser = async(data) => {
        console.log(data);
        setError("");
        setLoading(true); // Set loading state to true when signup process starts
        try {
            const session = await authService.creatAccount(data);

            if(session){
               const user = await authService.getCurrentUser();
               if(user){
                    dispatch(login(user));
                    navigate("/");
               }
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Set loading state to false when signup process completes
        }
    };

    return ( 
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10  dark:bg-gray-900 dark:shadow-black dark:shadow-lg dark:text-white`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60 dark:text-gray-700">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                 </p>
                 {error && <p className="text-red-600 mt-8 text-center">{error}</p>}  
                 <form onSubmit={handleSubmit(SignUpUser)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name : "
                            placeholder="Enter your full name"
                            {...register("name" , { required:true })}
                        />
                        <Input
                            label="Email :"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email" , {
                                required:true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }   
                            })}
                        />
                        <Input
                            label="Password :"
                            placeholder="Enter your password"
                            type="new-password"
                            {...register("password" , { required:true })}
                        />
                        {/* Display loader if loading state is true */}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader /> : "Create Account"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
