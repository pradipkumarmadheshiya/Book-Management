import cron from "node-cron"
import { borrowModel } from "../models/borrow.model.js"
import { sendEmail } from "../utils/sendEmail.js"

export const notifyUsers=()=>{
    cron.schedule("*/30 * * * *", async()=>{
        try {
            const oneDayAgo=new Date(Date.now()-1000*60*60*24)

            const borrowers=await borrowModel.find({
                dueDate:{$lt:oneDayAgo},
                returnDate:null,
                notified:false
            })

            for(const element of borrowers){
                if(element.user && element.user.email){
                    sendEmail({
                        email:element.user.email, 
                        subject:"Book return Reminder",
                        message:`Hello ${element.user.name},\n\nThis is a gentle reminder that the book you borrowed is due for return today. Please return the book to the library.\n\nThank you`
                    })
                    element.notified=true
                    await element.save()
                    console.log('email sent to', user.email)
                }
            }
        } catch (error) {
            console.error("Some errors occured while notifying users", error)
        }
    })
}