import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes/SingleRouter.js";
import "./routes/createCoinRoutes.js";
import "./routes/metaDataRoute.js";
import "./routes/getUser.js";
import "./routes/ImageRouter.js";
import "./eventListeners/tokenDeployed.js";
import { startSubgraphPoller } from "./eventListeners/subgraphPoller.js";
import { startWsServer } from "./wsLayer/transactions.js";

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(router);

const port  = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`listening at port ${port}`);
    startWsServer();
    startSubgraphPoller();
})






