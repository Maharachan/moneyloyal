export type UserRole = 'ADMIN' | 'CASHIER' | 'USER';

export interface User {
  id?: number;
  name: string;
  email: string;
  role: UserRole;
  // ... other user properties
} 

export interface UsersResponse {
  data: User[];
}
