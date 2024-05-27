import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import { Button, Container, Loader } from "../components"; // Assuming Loader component exists
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true); // State variable for loading state
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            setLoading(true); // Set loading state to true when fetching post
            appwriteService.getpost(slug).then((post) => {
                setLoading(false); // Set loading state to false when post is fetched
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        setLoading(true); // Set loading state to true when deleting post
        appwriteService.deletePost(post.$id).then((status) => {
            setLoading(false); // Set loading state to false when post is deleted
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/all-posts");
            }
        });
    };

    return loading ? (
        <Loader /> // Display loader while loading post
    ) : post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border dark:border-black rounded-xl p-2">
                    <Link to='/all-posts'>
                        <Button bgcolor="bg-gray-700" className="text-white absolute m-5 opacity-65">
                            See All
                        </Button>
                    </Link>

                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgcolor="bg-green-500" className="mr-3" >
                                    Edit
                                </Button>
                            </Link>
                            <Button bgcolor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
