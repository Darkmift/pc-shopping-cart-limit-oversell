import { Request, Response, NextFunction } from 'express';

// Define a generic interface for controller methods with return type T
export interface ControllerMethod<T = void> {
  // Version without next, for methods that handle their own errors
  (req: Request, res: Response): T;

  // Version with next, useful for error handling by passing errors to middleware
  (req: Request, res: Response, next?: NextFunction): T;
}
