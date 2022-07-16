export declare class AuthController {
    static login(req: any, res: any): Promise<void>;
    static logout(req: any, res: any): Promise<any>;
    static register(req: any, res: any): Promise<any>;
    static createTokenAndSetCookie(req: any, res: any, payload: any): void;
}
