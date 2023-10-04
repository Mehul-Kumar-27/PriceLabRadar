import env from "./utils/validateENV";
import express from "express";
import mongoose from "mongoose";
import { routes } from "./utils/routes";

const app = express();

const port = env.PORT;
const connectionString = env.MONGO_CONNECTION_STRING;
app.use(express.json());
app.get("/", (req, res) => {
  console.log("Hello World");
});

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Mongoose Connected");
    app.listen(port, () => {
      console.log("Server Up and running on port: " + port);
      routes(app);
    });
  })
  .catch((e) => {
    console.log(e);
  });
