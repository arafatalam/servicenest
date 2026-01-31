import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import authRoutes from "./routes/auth.routes.js";
import discoveryRoutes from "./routes/discovery.routes.js";



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/api/auth", authRoutes);
app.use("/api/discovery", discoveryRoutes);

export default app;