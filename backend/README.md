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

## Project Structure

```
backend/
├── prisma/
│   ├── migrations/        # Database migrations
│   └── schema.prisma     # Prisma schema
├── src/
│   ├── controllers/      # Request handlers
│   ├── exceptions/       # Custom error classes
│   ├── middlewares/      # Express middlewares
│   ├── routes/          # API routes
│   ├── schema/          # Validation schemas
│   ├── error-handler.ts  # Global error handling
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
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("users")
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
  id: number;
  name: string;
  email: string;
  phonenumber: string;
  createdAt: string;
  updatedAt: string;
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

## Error Handling

The API uses a standardized error response format:

```typescript
interface ErrorResponse {
  message: string;
  errorCode: number;
  errors?: any;
}
```

### Error Codes
- `1001`: User not found
- `1002`: User already exists
- `1003`: Incorrect password
- `1004`: Unprocessable entity
- `1005`: Internal server error

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

## Development Guidelines

1. **Database Operations**
   - Use Prisma Client for all database operations
   - Run migrations for any schema changes
   - Keep schema.prisma up to date

2. **Error Handling**
   - Use custom exception classes
   - Implement proper error codes
   - Validate requests using Zod schemas

3. **Authentication**
   - All passwords must be hashed using bcrypt
   - JWT tokens used for session management
   - Implement proper token validation

4. **API Response Format**
```typescript
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    details: Array<{
      field?: string;
      message: string;
    }>;
  };
}
```

## Security Measures

1. **Password Requirements**
   - Stored as hashed values using bcrypt
   - Never returned in API responses

2. **Input Validation**
   - All requests validated using Zod schemas
   - Phone number format validation
   - Email format validation

3. **Error Handling**
   - Sanitized error messages
   - No sensitive data in responses
   - Proper status codes

## Future Implementations

- [ ] offers API
