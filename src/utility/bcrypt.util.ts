import bcrypt from "bcrypt";
import {hashRounds} from "../configs/envConfig";

export class HashHelper {
    private readonly hashRounds;

    // initialize hash
    constructor() {
        this.hashRounds = hashRounds;
    }

    async hashPassword(password: string) {
        const SALT = await bcrypt.genSalt(hashRounds);
        return bcrypt.hash(password, SALT);
    }

    async verifyPassword(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }
}

export const hashHelper = new HashHelper();
