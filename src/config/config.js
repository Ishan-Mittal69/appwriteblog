const config={
    appwriteurl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteprojectid: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwritedatabaseid: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritecollectionid: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwritebucketid: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinyMCE_apiKey : String(import.meta.env.VITE_API_KEY),
    appwriteredirecturl : String(import.meta.env.VITE_APPWRITE_REDIRECTURL),
    successloginurl : String(import.meta.env.VITE_APPWRITE_SUCCESS_URL),
    failureloginurl : String(import.meta.env.VITE_APPWRITE_FAILURE_URL), 
    geminiapikey: String(import.meta.env.GEMINI_API_KEY)

}
export default config
