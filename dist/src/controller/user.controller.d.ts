export declare class UserController {
    static homeUser(req: any, res: any): Promise<void>;
    static homeAdmin(req: any, res: any): Promise<void>;
    static PersonalUser(req: any, res: any): Promise<void>;
    static addStatusInPersonal(req: any, res: any): Promise<void>;
    static addStatusInHome(req: any, res: any): Promise<void>;
    static deleteStatusInPersonal(req: any, res: any): Promise<void>;
    static updateStatusInPersonal(req: any, res: any): Promise<void>;
    static takeNameUser(req: any, res: any, next: any): void;
}
