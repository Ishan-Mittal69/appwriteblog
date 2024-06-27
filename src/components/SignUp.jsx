import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from "../store/authSlice";
import { Button, Input, Logo, Loader } from "./index";
import { useDispatch } from 'react-redux';
import authService  from '../appwrite/auth';
import { useForm } from 'react-hook-form';

import validator from 'validator';

const matchPattern = (value) => {
    const regexPattern = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:\\[\x01-\x09\x0b\x0c\x0e-\x7f]|\\x[\x01-\x09\x0b\x0c\x0e-\x7f])+")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}|\[(?:(?:[01]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\.){3}(?:[01]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\])$/;
    return regexPattern.test(value) && validator.isEmail(value) || "Email address must be a valid address";
};

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit} = useForm();
    const [error , setError] = useState("");
    const [loading, setLoading] = useState(false); // State variable for loading state

    const SignUpUser = async(data) => {
        setError("");
        setLoading(true);
        try {
            // Create account
            const user = await authService.creatAccount(data);
            if (user) {
                // Send verification email
                await authService.sendVerificationEmail();
                
                // Inform user about verification email
                alert("Account created successfully. Please check your email for verification link.");
                
                setLoading(false);
                navigate("/login");
            }
        } catch (error) {
            console.error("Signup error:", error);
            setError(error.message || "An error occurred during signup");
        } finally {
            setLoading(false);
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
                                    matchPattern: matchPattern,
                                }   
                            })}
                        />
                        <Input
                            label="Password :"
                            placeholder="Enter your password"
                            type="password"
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
