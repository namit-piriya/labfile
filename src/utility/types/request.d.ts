import {Request} from 'express';
import {TokenPayload} from "../../routes/controllers/login.controller";

declare interface PublicRequest extends Request {
    apiKey: string;
}

declare interface ProtectedRequest extends PublicRequest {
    //TODO: debug why need to add body
    body: any;
    user: TokenPayload;
}

