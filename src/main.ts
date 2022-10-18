import express, { Express } from "express";
import { AppRouter } from "./router";
import { config } from "dotenv";

config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", AppRouter);

app.listen(port, () => {
  console.log(`Listen on port http://localhost:${port}`);
});
