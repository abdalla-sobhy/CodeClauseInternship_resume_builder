import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";
import app from "./app.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const res = await connectDB();
    if (res) {
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    }
  } catch (error) {
    console.log("faild to start server", error);
  }
}

startServer();
