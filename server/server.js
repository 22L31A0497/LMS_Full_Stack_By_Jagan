import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';


//initialize express
const app = express();
//connect to database
connectDB();    
// Middleware   

app.use(cors());

//Routes
app.get('/', (req, res) => res.send('Welcome to the server!'));
app.post('/clerk',express.json(),clerkWebhooks)
//Port
const PORT = process.env.PORT || 6969;

//start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
 
});