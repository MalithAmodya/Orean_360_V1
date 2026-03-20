import express from "express";
import cors from "cors";
import { Pool } from "pg";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
<<<<<<< Updated upstream
=======
import geoRoutes from "./routes/geo.routes";
import assetRoutes from "./routes/asset";
import userRoutes from "./routes/user";
import socialTokenRoutes from "./routes/socialToken.routes";
import mediaAssetRoutes from "./routes/mediaAsset.routes";
import metaGraphRoutes from "./routes/metaGraph.routes";
import pool from "./db/db";

// V1 route imports
import campaignRoutes from "./routes/campaign.routes";
import postRoutes from "./routes/post.routes";
import statusRoutes from "./routes/status.routes";
import taskRoutes from "./routes/task.routes";
import { postController } from "./controllers/post.controller";
import { validate } from "./middleware/validate";
import { z } from "zod";
import { errorHandler } from "./middleware/error-handler";
>>>>>>> Stashed changes

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// App Routes
app.use("/api/auth", authRoutes);
<<<<<<< Updated upstream
=======
app.use("/api/geo", geoRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/users", userRoutes);
app.use("/api/social-tokens", socialTokenRoutes);
app.use("/api/media", mediaAssetRoutes);
app.use("/api/meta", metaGraphRoutes);
>>>>>>> Stashed changes

app.get("/api/health", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    client.release();
    res.json({
      status: "healthy",
      db_time: result.rows[0].now,
      message: "Backend is running and connected to PostgreSQL",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
