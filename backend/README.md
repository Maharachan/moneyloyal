# MoneyLoyal Backend

A Node.js/Express backend service for the MoneyLoyal loyalty and rewards platform.

## Tech Stack

- **Node.js** with TypeScript
- **Express.js** for API server
- **Prisma** as ORM
- **MySQL** for database
- **JWT** for authentication
- **Zod** for validation
- **Bcrypt** for password hashing
- **CORS** for cross-origin resource sharing

## Project Structure

```
backend/
├── prisma/
│   ├── migrations/        # Database migrations
│   └── schema.prisma     # Prisma schema
├── src/
│   ├── controllers/      # Request handlers
│   │   ├── auth.ts      # Authentication controllers
│   │   └── offers.ts    # Offers management
│   ├── exceptions/       # Custom error classes
│   ├── middlewares/      # Express middlewares
│   │   ├── admin.ts     # Admin authorization
│   │   ├── auth.ts      # JWT authentication
│   │   ├── cashier.ts   # Cashier authorization
│   │   └── error.ts     # Error handling
│   ├── routes/          # API routes
│   ├── schema/          # Validation schemas
│   ├── error-handler.ts # Global error handling
│   ├── index.ts         # Application entry point
│   └── secrets.ts       # Environment configuration
└── nodemon.json         # Nodemon configuration
```

## Database Schema

### Users Table
```prisma
model User {
  id          Int      @id @default(autoincrement())
  name        String
  email       String   @unique
  phonenumber String
  password    String
  role        Role     @default(USER)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("users")
}

enum Role {
  ADMIN
  CASHIER
  USER
}
```

### Offers Table
```prisma
model Offer {
  id                 Int      @id @default(autoincrement())
  name               String
  description        String   @db.Text
  points             Int
  discountPercentage Int
  expiresAt          DateTime
  image              String
  redemptionCode     String
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  @@map("offers")
}
```

## API Endpoints

### Authentication Routes

1. **Signup** `POST /api/auth/signup`
```typescript
interface SignupRequest {
  name: string;
  phonenumber: string;  // Format: +[country code][number]
  email: string;
  password: string;
}

interface SignupResponse {
  message: string;
  success: boolean;
}
```

2. **Login** `POST /api/auth/login`
```typescript
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}
```

3. **Me** `GET /api/auth/me`
```typescript
// Returns current authenticated user details
// Requires Authentication token
interface MeResponse {
  id: number;
  name: string;
  email: string;
  role: Role;
}
```

### Offers Routes

1. **Create Offer** `POST /api/offers`
```typescript
// Requires ADMIN role
interface CreateOfferRequest {
  name: string;
  description: string;
  points: number;
  discountPercentage: number;
  expiresAt: Date;
  image: string;
  redemptionCode: string;
}
```

2. **List Offers** `GET /api/offers`
```typescript
// Query parameters
interface ListOffersQuery {
  skip?: number;  // Default: 0
  take?: number;  // Default: 5
}

interface ListOffersResponse {
  count: number;
  data: Offer[];
}
```

3. **Get Offer** `GET /api/offers/:id`
4. **Update Offer** `PUT /api/offers/:id` (Requires ADMIN role)
5. **Delete Offer** `DELETE /api/offers/:id` (Requires ADMIN role)

## Error Handling

The API uses a standardized error response format:

```typescript
interface ErrorResponse {
  message: string;
  errorCode: number;
  statusCode: number;
  errors?: any;
}
```

### Error Codes
- `1001`: User not found
- `1002`: User already exists
- `1003`: Incorrect password
- `1004`: Unprocessable entity
- `1005`: Internal server error
- `1006`: Unauthorized
- `1007`: Offer not found

## Role-Based Access Control

The system implements three roles with different access levels:

1. **ADMIN**
   - Full system access
   - Can manage offers (CRUD operations)
   - Access to all user management features

2. **CASHIER**
   - Limited administrative access
   - Can view and process offers
   - Access to customer service features

3. **USER**
   - Basic platform access
   - Can view offers
   - Can manage own profile

## Security Measures

1. **Authentication & Authorization**
   - JWT-based authentication
   - Role-based middleware checks
   - Token verification on protected routes

2. **Password Security**
   - Bcrypt hashing with salt
   - Secure password storage
   - No password exposure in responses

3. **API Security**
   - CORS configuration for frontend access
   - Input validation using Zod
   - Sanitized error responses
   - Request validation middleware

4. **Database Security**
   - Prisma ORM for query safety
   - Environment-based configuration
   - Proper data types and constraints

## Environment Setup

1. Create `.env` file based on `.env.example`:
```env
DATABASE_URL="mysql://root:admin@localhost:3306/moneyloyal?schema=public"
PORT=3000
JWT_SECRET=your_jwt_secret
```

2. Install dependencies:
```bash
npm install
```

3. Run database migrations:
```bash
npx prisma migrate dev
```

4. Start development server:
```bash
npm start
```

## API Response Format

```typescript
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: number;
    message: string;
    details?: any;
  };
}
```

## Development Guidelines

1. **Code Organization**
   - Follow modular architecture
   - Use TypeScript for type safety
   - Implement proper error handling
   - Document API endpoints

2. **Database Operations**
   - Use Prisma Client for queries
   - Run migrations for schema changes
   - Maintain data integrity

3. **Authentication Flow**
   - Validate JWT tokens
   - Check role permissions
   - Implement proper middleware chain

4. **Error Management**
   - Use custom exception classes
   - Implement proper error codes
   - Validate all incoming requests


