import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes/SingleRouter.js";
import "./routes/createCoinRoutes.js";
import "./routes/metaDataRoute.js";
import "./routes/getUser.js";
import "./routes/ImageRouter.js";
import "./routes/transactions.js";
import "./routes/getHoldingPattern.js";
import "./routes/fetchComments.js";
import "./eventListeners/tokenDeployed.js";
import "./routes/getCoinDisplayInfo.js";
import "./routes/tradeEvents.js";

import { startSubgraphPoller } from "./eventListeners/subgraphPoller.js";


const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.use(router);

const port  = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`listening at port ${port}`);
    startSubgraphPoller();
})






