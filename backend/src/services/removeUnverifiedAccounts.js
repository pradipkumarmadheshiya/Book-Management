import cron from "node-cron"
import {userModel} from "../models/user.model.js"

export const removeUnverifiedAccounts=()=>{
    cron.schedule("*/5 * * * *", async()=>{
        const thirtyMinutesAgo=new Date(Date.now()-1000*60*30)
        await userModel.deleteMany({
            accountVerified:false,
            createdAt:{$lt:thirtyMinutesAgo}
        })
    })
}