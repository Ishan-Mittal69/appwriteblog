import config from "../config/config";
import {Client, Account, ID} from "appwrite";

export class AuthService{
    client =  new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteurl)
            .setProject(config.appwriteprojectid);

        this.account =new Account( this.client );
    }

    async creatAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // Create a session immediately after account creation
                await this.account.createEmailPasswordSession(email, password);
                await this.sendVerificationEmail();
                this.account.deleteSessions();
                return userAccount;
            }
        } catch (error) {
            console.error("Account creation error:", error);
            throw error;
        }
    }

    async sendVerificationEmail() {
        try {
            const result = await this.account.createVerification(config.appwriteredirecturl);
            console.log("Verification email sent:", result);
            return true;
        } catch (error) {
            console.error("Error sending verification email:", error);
            throw error;
        }
    }

    async verification(userId, secret) {
        try {
            await this.account.updateVerification(userId, secret);
            return true;
        } catch (error) {
            console.error("Error verifying email:", error);
            return false;
        }
    }

    async login({ email, password, provider }) {
        try {
            if (provider) {
                // OAuth login
                 // Create this route in your app
                return this.account.createOAuth2Session(provider,"http://localhost:5173/all-posts", "http://localhost:5173/login");
            } else {
                // Email/password login (keep this as is)
                const session = await this.account.createEmailPasswordSession(email, password);
                const user = await this.account.get();
                if (!user.emailVerification) {
                    throw new Error("Email not verified. Please check your email for verification link.");
                }
                return session;
            }
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
           return await this.account.get();
        } catch (error) {
            console.log("appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error",error);
        }
    }

}

const authService = new AuthService() 

export default authService
