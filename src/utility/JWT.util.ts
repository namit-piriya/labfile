import {secretKey} from "../configs/envConfig";
import jwt from "jsonwebtoken";

class JWT {
    private readonly secretKey;

    constructor() {
        this.secretKey = secretKey;
    }

    async signToken(data: { email: string; name: string; dept: string }) {
        return new Promise((resolve, reject) => {
            jwt.sign(
                data,
                this.secretKey,
                {
                    expiresIn: "1h",
                },
                (err, token) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(token);
                }
            );
        });
    }
}

export const jwtHelp = new JWT()
