import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo, Loader } from "./index";
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // State variable for loading state

    const login = async (data) => {
        setError("");
        setLoading(true); // Set loading state to true when login process starts
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Set loading state to false when login process completes
        }
    };

    const handleOAuthLogin = async (provider) => {
        setError("");
        setLoading(true);
        try {
            await authService.login({ provider });
            // The user will be redirected to the OAuth provider here
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 dark:bg-gray-900 dark:shadow-black dark:shadow-lg dark:text-white`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60 dark:text-gray-700">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input label="Email :" placeholder="Enter your email" type="email" {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }

                        })} />
                        <Input label="password" placeholder="Enter your password" type="password" {...register("password", {
                            required: true
                        })} />
                        {/* Display loader if loading state is true */}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader /> : "Sign in"}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-100 text-gray-500 dark:bg-gray-900">Or continue with</span>
                        </div>
                    </div>
                    <div className="mt-6 ">
                        <Button
                            type="button"
                            className="w-full"
                            onClick={() => handleOAuthLogin('google')}
                            disabled={loading}
                        >
                            <img src='/google-logo.png' alt="Google" className="w-4 h-4 mr-2 inline-block" />
                            Google
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

