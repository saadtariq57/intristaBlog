import {conf} from "../conf/conf.js"
import { Client, Databases, Storage, ID, Query } from "appwrite"

class DbService{
    client = new Client()
    databases
    storage

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost(title, description, status, imageId, userId, profileId){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    description,
                    imageId,
                    status,
                    userId,
                    profileId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error ", error);
            throw error
        }
    }

    async updatePost(id, {title, description, imageId, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    title,
                    description,
                    imageId,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error ", error);
            throw error
        }
    }

    async deletePost(id, imageId){
        try {
            const response = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            )

            if(response){
                await this.storage.deleteFile(conf.appwriteBucketId, imageId)
                return true
            }
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error ", error);
            return false
        }
    }

    async getPost(id){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error ", error);
            return false
        }
    }

    async getAllPosts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("status", true)]
            )
        } catch (error) {
            console.log("Appwrite service :: getAllPosts :: error ", error);
            return false
        }
    }
    async getMyPosts(id){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("profileId", id)]
            )
        } catch (error) {
            console.log("Appwrite service :: getMyPosts :: error ", error);
            return false
        }
    }

    //Image handling
    async uploadImage(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadImage :: error ", error);
            return false
        }
    }

    async deleteImage(id){
        try {
            await this.storage.deleteFile(conf.appwriteBucketId, id)
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteImage :: error ", error);
            return false
        }
    }

    previewImage(id){
        try {
            const file =  this.storage.getFilePreview(
                conf.appwriteBucketId,
                id
            )
            return file
        } catch (error) {
            console.log("Appwrite service :: previewImage :: error ", error);
            return false
        }
    }

}

export const dbService = new DbService()