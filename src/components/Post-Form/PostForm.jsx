import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Loader, RTE, Select } from "../index";
import appwriteService from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../../config/config";


const genAI = new GoogleGenerativeAI(config.geminiapikey);

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setLoading(true);
        try {
            if (post) {
                // Update existing post logic
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                // Create new post logic
                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const generateBlogContent = async () => {
        const title = getValues("title");
        const image = getValues("image")[0];

        if (!title) {
            alert("Please enter a title before generating the blog content.");
            return;
        }

        setGenerating(true);
        try {
            // Convert image to correct format if it exists
            let imageData = null;
            if (image) {
                const imageBase64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result.split(',')[1]);
                    reader.onerror = reject;
                    reader.readAsDataURL(image);
                });
                imageData = {
                    inlineData: {
                        data: imageBase64,
                        mimeType: image.type
                    }
                };
            }

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

            // Prepare the prompt
            const prompt = `Write a blog post with the theme of image and on the topic: "${title}" in less then 65535 characters. The content should be informative, engaging, and well-structured with no styling i.e bold , italic , etc applied`;

            // Generate content
            let result;
            if (image && imageData) {
                // If there's an image, use multimodal generation
                result = await model.generateContent([prompt, imageData]);
            } else {
                // If there's no image, use text-only generation
                result = await model.generateContent(prompt);
            }

            const response = await result.response;
            const generatedText = String(response.text());
            
            setValue("content", generatedText);
        } catch (error) {
            console.error('Error generating blog content:', error);
            alert("An error occurred while generating the blog content. Please try again.");
        } finally {
            setGenerating(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2 dark:text-white">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { 
                        required: "Title is required", 
                        maxLength: { 
                            value: 35, 
                            message: "Title must not exceed 35 characters" 
                        } 
                    })}/>
                     {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
                
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register('image', { required: !post })}
                />
                <Button 
                    type="button" 
                    onClick={generateBlogContent} 
                    disabled={generating}
                    className="mb-4"
                >
                    {generating ? <Loader /> : 'Generate Blog Content with AI'}
                </Button>
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2 dark:text-white mt-7">
                {post && (
                    <div className="w-full mb-4 dark:text-white">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgcolor={post ? "bg-green-500" : undefined} className="w-full" disabled={loading}>
                    {loading ? <Loader /> : post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
