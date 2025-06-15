import config from "../config/config";
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";

export class Service{
    Client =  new Client();
    databases;
    bucket;
    account;

    constructor(){
        this.Client
            .setEndpoint(config.appwriteurl)
            .setProject(config.appwriteprojectid);
        
        this.databases = new Databases(this.Client);
        this.bucket= new Storage(this.Client)
        this.account = new Account(this.Client);
    }

    async createPost({title, slug, content, featuredImage, status, userId, authorName, authorAvatar, authorEmail}){
        try {
            return await this.databases.createDocument(
                config.appwritedatabaseid, config.appwritecollectionid, slug, {title, content, featuredImage, status, userId, authorName, authorAvatar, authorEmail}
            )
        } catch (err) {
            console.log( "Appwrite service :: createPost :: error",err);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
           return await this.databases.updateDocument(config.appwritedatabaseid, config.appwritecollectionid, slug, {title, content, featuredImage, status})

        } catch (error) {
            console.log( "Appwrite service :: updatePost :: error",error);        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(config.appwritedatabaseid, config.appwritecollectionid, slug)
            return true    
        } catch (error) {
            console.log( "Appwrite service :: deletePost :: error",error);
            return false;
        }
    }

    async getpost(slug){
        try {
           return await this.databases.getDocument(config.appwritedatabaseid, config.appwritecollectionid, slug)
        } catch (error) {
            console.log( "Appwrite service :: getPost :: error",error);
            return false; 
        }
    }

    async getPosts(queries = [Query.equal("status" , "active")]){
        try {
            return await this.databases.listDocuments(config.appwritedatabaseid, config.appwritecollectionid, queries)
        } catch (error) {
            console.log( "Appwrite service :: getPosts :: error",error);
            return false; 
            
        }
    }

    async searchPosts(searchTerm) {
        try {
            if (!searchTerm.trim()) {
                return [];
            }

            // Get all active posts
            const results = await this.databases.listDocuments(
                config.appwritedatabaseid,
                config.appwritecollectionid,
                [
                    Query.equal('status', 'active'),
                    Query.limit(100),
                    Query.orderDesc('$createdAt')
                ]
            );

            if (!results.documents) {
                return [];
            }

            const searchTermLower = searchTerm.toLowerCase();

            // Filter posts that match the search term in either title or content
            const matchingPosts = results.documents.filter(post => {
                const titleMatch = post.title.toLowerCase().includes(searchTermLower);
                const contentMatch = post.content.toLowerCase().includes(searchTermLower);
                return titleMatch || contentMatch;
            });

            // Sort results: title matches first, then content matches
            return matchingPosts.sort((a, b) => {
                const aTitleMatch = a.title.toLowerCase().includes(searchTermLower);
                const bTitleMatch = b.title.toLowerCase().includes(searchTermLower);
                
                if (aTitleMatch && !bTitleMatch) return -1;
                if (!aTitleMatch && bTitleMatch) return 1;
                
                return new Date(b.$createdAt) - new Date(a.$createdAt);
            });
        } catch (error) {
            console.error("Appwrite service :: searchPosts :: error", error);
            throw error;
        }
    }

    async searchUsers(searchTerm) {
        try {
            if (!searchTerm.trim()) {
                return [];
            }

            // Get all users from posts to find unique authors
            const results = await this.databases.listDocuments(
                config.appwritedatabaseid,
                config.appwritecollectionid,
                [
                    Query.equal('status', 'active'),
                    Query.limit(100)
                ]
            );

            if (!results.documents) {
                return [];
            }

            const searchTermLower = searchTerm.toLowerCase();

            // Create a map of unique users
            const uniqueUsers = new Map();
            results.documents.forEach(post => {
                if (!uniqueUsers.has(post.userId)) {
                    uniqueUsers.set(post.userId, {
                        id: post.userId,
                        name: post.authorName,
                        email: post.authorEmail,
                        avatar: post.authorAvatar,
                        postCount: 1
                    });
                } else {
                    const user = uniqueUsers.get(post.userId);
                    user.postCount++;
                }
            });

            // Filter users that match the search term
            const matchingUsers = Array.from(uniqueUsers.values()).filter(user => 
                user.name.toLowerCase().includes(searchTermLower) ||
                user.email.toLowerCase().includes(searchTermLower)
            );

            // Sort by name match first, then by post count
            return matchingUsers.sort((a, b) => {
                const aNameMatch = a.name.toLowerCase().includes(searchTermLower);
                const bNameMatch = b.name.toLowerCase().includes(searchTermLower);
                
                if (aNameMatch && !bNameMatch) return -1;
                if (!aNameMatch && bNameMatch) return 1;
                
                return b.postCount - a.postCount;
            });
        } catch (error) {
            console.error("Appwrite service :: searchUsers :: error", error);
            throw error;
        }
    }

    //file related service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(config.appwritebucketid, ID.unique(), file)
            
        } catch (error) {
            console.log( "Appwrite service :: uploadFile :: error",error);
            return false;      
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
            config.appwritebucketid , fileId)
            return true;
        } catch (error) {
            
            console.log( "Appwrite service :: deleteFile :: error",error);
            return false;   
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFileView(config.appwritebucketid, fileId)
    }

}


const service = new Service()
export default service