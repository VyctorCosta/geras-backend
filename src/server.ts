import "express-async-errors";
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "@routes/router";
import errorHandler from "@middlewares/errorMiddleware";

//CONFIGS
dotenv.config();
const app = express();
app.use([cors(), json()]);

app.use(router);
app.use(errorHandler);

//SERVER
app.listen(process.env.SERVER_PORT ?? 5000, () =>
  console.log(`Server listening on port ${process.env.SERVER_PORT ?? 5000}`)
);
