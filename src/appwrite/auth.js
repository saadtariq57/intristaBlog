import {conf} from '../conf/conf.js'
import { ID, Account, Client } from 'appwrite'

class AuthService{
    client = new Client()
    account

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }

    async createAccount({email, password, fullName, username}) {
        try {
            const user = await this.account.create(ID.unique(), email, password, fullName, username)
            return user;
        } catch (error) {
            console.log("Appwrite service :: createAccount :: error ", error);
            throw error
        }
    }

    async verifyEmail(){
        try { 
            return await this.account.createVerification(`${conf.appUrl}/verification`)
        } catch (error) {
            console.log("Appwrite service :: verifyEmail :: error ", error);
            throw error
        }
    }

    async updateVerification(userId, secret){
        try {
            return await this.account.updateVerification(userId, secret)
        } catch (error) {
            console.log("Appwrite service :: updateVerification :: error ", error);
            throw error
        }
    }

    async updateAccountName(name){
        try {
            return await this.account.updateName(name)
        } catch (error) {
            console.log("Appwrite service :: updateAccountName :: error ", error);
            throw error
        }
    }

    async updatePrefs( profileId ){
        try {
            return await this.account.updatePrefs({profileId})
        } catch (error) {
            console.log("Appwrite service :: updatePrefs :: error ", error);
            throw error
        }
    }
    async getPrefs( profileId ){
        try {
            return await this.account.getPrefs()
        } catch (error) {
            console.log("Appwrite service :: getPrefs :: error ", error);
            throw error
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
            
        } catch (error) {
            console.log("Appwrite service :: login :: error ", error);
            throw error
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions().then( () => console.log('Logged out!!'))
        } catch (error) {
            console.log("Appwrite service :: logout :: error ", error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error ", error);
            throw error
        }
    }

    //Password Recovery
    async createRecovery(email){
        try {
            return await this.account.createRecovery(email, `${conf.appUrl}/new-password`)
        } catch (error) {
            console.log("Appwrite service :: createRecovery :: error ", error);
            throw error
        }
    }
    
    async updateRecovery(userId, secret, newPassword){
        try {
            return await this.account.updateRecovery(userId, secret, newPassword)
        } catch (error) {
            console.log("Appwrite service :: updateRecovery :: error ", error);
            throw error
        }
    }
    
}

export const authService = new AuthService()