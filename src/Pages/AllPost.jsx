import React, { useState, useEffect } from 'react';
import appwriteService from "../appwrite/conf";
import { Container, PostCard, SkeletonLoader } from "../components/index";

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // State variable for loading state

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
                setLoading(false); // Set loading state to false when data is fetched
            }
        });
    }, []);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {/* Display skeleton loader while loading is true */}
                    {loading ? (
                        Array.from({ length: 8 }).map((_, index) => (
                            <SkeletonLoader key={index} />
                        ))
                    ) : (
                        // Display posts when loading is false
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;

