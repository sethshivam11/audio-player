import express from "express";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import router from "./routes.js";

app.use("/api/v1", router);

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "frontend", "dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (_, res) => {
    return res.status(200).json({
      success: true,
      data: null,
      message: "App is running",
    });
  });
}

export default app;
