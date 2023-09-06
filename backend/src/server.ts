import express from "express";
import config from "./config";
import mongoose from "mongoose";
import personRouter from "./routers/persenRouter";
import groupRouter from "./routers/groupRouter";
import cors from "cors";
const PORT = config.PORT;
const dbUrl = config.DB_IP;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use("/group", groupRouter);
app.use("/person", personRouter);
const main = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};
main();
