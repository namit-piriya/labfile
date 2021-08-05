import * as path from "path";
import {config} from "dotenv";
config({path: path.resolve("./.env")});
import server from "./index";
import {dbURI, port} from "./configs/envConfig";
import {connectDB} from "./database";

import {dbOptions} from "./configs/constants";

connectDB(dbURI, dbOptions).then(() => {
    return server.listen(port, () => {
        console.log(`listening on port ${port}!!`);
    })
})

process.on("unhandledRejection",(err)=>{
    console.log(err,"unhandledRejection");
})
process.on("unhandledException",(err)=>{
    console.log(err,"unhandledException");
})
