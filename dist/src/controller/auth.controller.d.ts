export declare class AuthController {
    static login(req: any, res: any): Promise<void>;
    static logout(req: any, res: any): Promise<any>;
    static register(req: any, res: any): Promise<any>;
    static error(req: any, res: any): Promise<void>;
    static grantAdminOrUser(req: any, res: any): Promise<void>;
    static createTokenAndSetCookie(req: any, res: any, payload: any): void;
}
