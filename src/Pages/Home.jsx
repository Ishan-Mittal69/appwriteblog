import React, {useDebugValue, useEffect, useState} from 'react';
import appwriteService from "../appwrite/conf";
import { Button, Container, PostCard } from "../components";
import { Link } from 'react-router-dom';


function Home() {
    const [posts, setPosts] = useState([])    
    useEffect(()=>{appwriteService.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })}, [])
    


    
    if (posts.length === 0) {
        return (
            <div className="w-ful flex justify-center items-center">
                <Container>
                    <div className="flex h-screen  pt-60 flex-wrap justify-center">
                        <div className=" w-full">
                            <h1 className="font-bold hover:text-blue-500 text-center text-6xl">
                             Welcome to <span style={{ color: 'lightseagreen' }}>ProsePond!</span>
                            </h1>
                            <p className=" text-3xl text-center text-gray-500">-Where prose finds its tranquil home.</p>
                            <div className="w-full text-center mt-14">
                                <Link to='/login'>
                                    <Button>
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

}

export default Home;
