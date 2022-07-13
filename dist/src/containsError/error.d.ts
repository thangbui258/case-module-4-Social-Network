declare const wrapperError: (fn: any) => (req: any, res: any, next: any) => Promise<void>;
export default wrapperError;
