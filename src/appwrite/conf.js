import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    Client =  new Client();
    databases;
    bucket;

    constructor(){
        this.Client
            .setEndpoint(config.appwriteurl)
            .setProject(config.appwriteprojectid);
        
        this.databases = new Databases(this.Client);
        this.bucket= new Storage(this.Client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwritedatabaseid, config.appwritecollectionid, slug, {title, content, featuredImage, status, userId}
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
            config.appwritebucketid,fileId)
        } catch (error) {
            
            console.log( "Appwrite service :: deleteFile :: error",error);
            return false;   
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(config.appwritebucketid, fileId)
    }



}


const service = new Service()
export default service