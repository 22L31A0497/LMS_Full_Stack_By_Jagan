import { Webhook } from "svix";
import User from "../models/User";

//API controller function to manage clerk user with database

export const clerkWebhooks = async (req, res) => {
   try{
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), req.headers["svix-id"], req.headers["svix-timestamp"], req.headers["svix-signature"]);
    const{data,type}=req.body;
    switch(type){
        case 'user.created':{
            const userData={
                _id: data.id,
                email: data.email_address[0].email_address,
                name: data.first_name + " " + data.last_name,
                 // Ensure you handle passwords securely
                imageUrl: data.image_url,
                
            }
            await User.create(userData);
            res.json({message: "User created successfully"})
            break;
        }
        case 'user.updated':{
            const userData={
                email: data.email_address[0].email_address,
                name: data.first_name + " " + data.last_name,
                imageUrl: data.image_url,
            }
            await User.findByIdAndUpdate(data.id, userData);

            res.json({message: "User updated successfully"})
            break;
        }
        case 'user.deleted':{
            await User.findByIdAndDelete(data.id);
            res.json({message: "User deleted successfully"})
            break;
        }
        default:
            res.status(400).json({message: "Unknown event type"});
            break;  
    } 
   }catch(error){
    res.status(500).json({message: "Internal server error", error: error.message});

   }
}