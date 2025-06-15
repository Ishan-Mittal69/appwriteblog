import React from 'react';
import { Button, Container, Logo } from "../components";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

function Home() {
    const authStatus = useSelector((state)=> state.auth.status);

    // Floating shapes animation variants
    const floatVariants = {
        animate: {
            y: [0, -20, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
            {/* Animated floating shapes */}
            <motion.div
                className="absolute left-10 top-20 w-32 h-32 rounded-full bg-teal-400/30 blur-2xl z-0"
                variants={floatVariants}
                animate="animate"
            />
            <motion.div
                className="absolute right-16 top-36 w-24 h-24 rounded-full bg-blue-400/20 blur-2xl z-0"
                variants={floatVariants}
                animate="animate"
                transition={{ delay: 1 }}
            />
            <motion.div
                className="absolute left-1/2 bottom-10 w-40 h-40 rounded-full bg-purple-400/20 blur-3xl z-0"
                variants={floatVariants}
                animate="animate"
                transition={{ delay: 2 }}
            />
            <Container>
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-12">
                    <Logo width="130px" className="mb-8" />
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: 'spring' }}
                        className="font-extrabold text-center text-5xl md:text-7xl mb-6 tracking-tight text-gray-900 dark:text-white drop-shadow-lg"
                    >
                        Welcome to <span className="text-teal-500">ProsePond!</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        className="text-2xl md:text-3xl text-center text-gray-600 dark:text-gray-300 mb-12"
                    >
                        - Where prose finds its tranquil home.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="w-full text-center"
                    >
                        <Link to='/all-posts'>
                            <Button className="text-lg px-8 py-3 rounded-xl shadow-lg bg-gradient-to-r from-teal-500 to-blue-500 hover:from-blue-500 hover:to-teal-500 transition-all duration-300">
                                Deep dive!
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </Container>
        </div>
    );
}

export default Home;
