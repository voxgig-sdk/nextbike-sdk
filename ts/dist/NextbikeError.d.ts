import { Context } from './Context';
declare class NextbikeError extends Error {
    isNextbikeError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { NextbikeError };
