export declare class UserController {
    static login(req: any, res: any): Promise<any>;
    static register(req: any, res: any): Promise<any>;
    static createTokenAndSetCookie(req: any, res: any, payload: any): void;
}
