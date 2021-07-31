import {Response} from "express"

export enum statusCode {
    success = 200,
}

export abstract class ApiResponseUtil {
    protected message: string;
    protected code: string;
    protected status: number;
    constructor(message: string, code: string, status: number) {
        this.message = message;
        this.code = code;
        this.status = status;
    }
    private static sanitize<T extends ApiResponseUtil>(response: T): T {
        const clone: T = {} as T;
        Object.assign(clone, response);
        // delete {some_field};
        for (const i in clone) if (typeof clone[i] === "undefined") delete clone[i];
        return clone;
    }
    public send(res: Response): Response {
        return this.prepare(res, this);
    }
    protected prepare<T extends ApiResponseUtil>(
        res: Response,
        response: T
    ): Response {
        return res.status(this.status).json(ApiResponseUtil.sanitize(response));
    }
}

export class SuccessResponse<T> extends ApiResponseUtil {
    constructor(message: string, private data: T, code = "100") {
        super(message, code, statusCode.success);
    }

    send(res: Response): Response {
        return super.prepare<SuccessResponse<T>>(res, this);
    }
} 
