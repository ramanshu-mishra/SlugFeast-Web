import "dotenv/config";
import express from "express";
import cors from "cors";
import imageRouter from "./routes/ImageRouter.js";
import { router } from "./routes/SingleRouter.js";

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(router);
app.use("/images", imageRouter);

const port  = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`listening at port ${port}`);
})






