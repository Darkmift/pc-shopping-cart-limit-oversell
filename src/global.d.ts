// global.d.ts

import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
} from 'express';

// Declare a module to augment Express types
declare global {
  namespace Express {
    // Extend Express Request
    export interface Request extends ExpressRequest {
      customData?: any; // Example custom field, change the type as needed
      userId?: string; // Example to hold user ID extracted from JWT token etc.
    }

    // Extend Express Response (if needed)
    export interface Response extends ExpressResponse {
      // You can add custom properties or methods here
    }

    // Extend Express NextFunction (if needed)
    export interface NextFunction extends ExpressNextFunction {
      // You can add custom properties or methods here
    }
  }
}
