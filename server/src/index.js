import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

dotenv.config();
import "./config.js";
import Auth from "./routes/auth_routes.js";
import passNote from "./routes/pass_note_routes.js";

const app = express();

const server = http.createServer(app);

//middelwares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
    defaultErrorHandler: false,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.static("public"));

//All APi's Endponits
app.use(
  "/api/v1",
  Auth,
  passNote
);

app.use("*", (req, res) => {
  return res.status(404).json({
    message: "Backend is runing..",
  });
});


//Port
const port = process.env.PORT || 3333;
const nodeServer = server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
