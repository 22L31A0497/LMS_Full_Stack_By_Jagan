import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from "./controllers/webhooks.js";

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(cors());

// 👉 Clerk webhook (must come BEFORE express.json())
app.post("/api/webhook", express.raw({ type: "application/json" }), clerkWebhooks);

// 👉 Now enable body parser for rest of the routes
app.use(express.json());

// Optional: other routes below this line
app.get("/", (req, res) => res.send("Welcome to the server!"));

// Start the server
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
