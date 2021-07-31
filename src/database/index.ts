import {connect, connection} from "mongoose";
import * as mongoose from "mongoose";

export const connectDB = async (dbURI, options) => {
    await connect(dbURI, options)
    connection.on("error", (err) => {
        console.error("Mongoose default connection error: " + err);
    });

// When the connection is disconnected
    connection.on("disconnected", () => {
        console.log("Mongoose default connection disconnected");
    });

// If the Node process ends, close the Mongoose connection
    process.on("SIGINT", () => {
        mongoose.connection.close(() => {
            console.log(
                "Mongoose default connection disconnected through app termination"
            );
            process.exit(0);
        });
    });
}


