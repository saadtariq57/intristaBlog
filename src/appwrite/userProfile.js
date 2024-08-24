import { conf } from "../conf/conf";
import { Account, Client, Databases, Storage, ID } from "appwrite";
import avatar from "../assets/avatar.png"

class UserProfileService{
    client = new Client()
    databases
    storage
    account

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
        this.account = new Account(this.client)
    }
    async createUserProfile(email, fullName, userId){
        try {
            
            const username = email.split("@")[0]
            
            //Creating a file using blob
            const response = await fetch(avatar)
            const blob = await response.blob()
            const imageFile = new File([blob], `${username}.png`, { type: blob.type })
            
            const profilePhoto = await this.storage.createFile(conf.appwriteUserImagesBucketId, ID.unique(), imageFile)
            if(profilePhoto){
                this.account.createVerification
                return await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteUsersProfileCollectionId,
                    ID.unique(),
                    {
                        username,
                        fullName,
                        userId,
                        userImageId: profilePhoto.$id
                    }
                )
            }
        } catch (error) {
            console.log("userProfileService :: createUserProfile :: error: ", error);
            return false
        }
    }

    async updateUserProfile(id, {fullName, userImageId}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsersProfileCollectionId,
                id,
                {
                    fullName,
                    userImageId
                }
            )
        } catch (error) {
            console.log("userProfileService :: updateUserProfile :: error: ", error);
            return false
        }
    }

    async getUserProfile(id){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsersProfileCollectionId,
                id
            )
        } catch (error) {
            console.log("userProfileService :: updateUserProfile :: error: ", error);
            return false
        }
    }

    async createProfileImage(image){
        try {
            return await this.storage.createFile(conf.appwriteUserImagesBucketId, ID.unique(), image)
        } catch (error) {
            console.log("userProfileService :: createProfileImage :: error: ", error);
            return false
        }
    }

    async deleteProfileImage(imageId){
        try {
            return await this.storage.deleteFile(conf.appwriteUserImagesBucketId, imageId)
        } catch (error) {
            console.log("userProfileService :: deleteProfileImage :: error: ", error);
            return false
        }
    }

    previewImage(id){
        try {
            const file =  this.storage.getFilePreview(
                conf.appwriteUserImagesBucketId,
                id
            )
            return file
        } catch (error) {
            console.log("Appwrite service :: previewImage :: error ", error);
            return false
        }
    }

}

export const userProfileService = new UserProfileService()