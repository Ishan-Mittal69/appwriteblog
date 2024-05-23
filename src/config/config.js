const config={
    appwriteurl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteprojectid: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwritedatabaseid: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritecollectionid: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwritebucketid: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)

}

export default config