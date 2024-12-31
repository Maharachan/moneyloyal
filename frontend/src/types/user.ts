export type UserRole = 'ADMIN' | 'CASHIER' | 'USER';

export interface User {
  name: string;
  email: string;
  role: UserRole;
  // ... other user properties
} 
