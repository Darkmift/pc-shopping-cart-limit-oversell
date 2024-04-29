// index.d.ts
import { IUserDTO } from './user';

export {};

// Declare a module to augment Express types
declare global {
  namespace Express {
    // Extend Express Request
    export interface Request {
      user?: IUserDTO;
    }

    // // Extend Express Response (if needed)
    // export interface Response {
    //   // You can add custom properties or methods here
    // }

    // // Extend Express NextFunction (if needed)
    // export interface NextFunction {
    //   // You can add custom properties or methods here
    // }
  }
}
