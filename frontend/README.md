# MoneyLoyal Frontend

A React-based frontend application for the MoneyLoyal loyalty and rewards platform.

## Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── home/           # Landing page components
│   │   │   ├── common/     # Reusable components
│   │   │   ├── layout/     # Layout components
│   │   │   └── sections/   # Home page sections
│   │   └── ui/            # Core UI components
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       └── scroll-area.tsx
│   ├── contexts/         # React contexts
│   │   └── auth-contexts.tsx
│   ├── pages/
│   │   ├── auth/         # Authentication pages
│   │   ├── dashboard/    # Dashboard pages
│   │   │   └── offers/   # Offers management
│   │   └── Home.tsx     # Landing page
│   ├── utils/           # Utility functions
│   ├── App.tsx         # Main application component
│   └── main.tsx       # Application entry point
```

## Tech Stack

- **React 18** with TypeScript
- **React Router v7** for routing
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **React Toastify** for notifications
- **Vite** as build tool

## Core Features

1. **Authentication System**
   - JWT-based authentication
   - Protected routes
   - User session management

2. **Dashboard**
   - Offers management
   - User profile
   - Responsive layout with mobile support

3. **UI Components**
   - Accessible dialog system
   - Card components
   - Custom input fields
   - Scrollable areas

## API Integration

### Authentication Endpoints

1. **Login** (`POST /auth/login`)
   ```typescript
   interface LoginRequest {
     email: string;
     password: string;
   }
   
   interface LoginResponse {
     success: boolean;
     token: string;
     user: {
       id: string;
       name: string;
       email: string;
     }
   }
   ```

2. **Signup** (`POST /auth/signup`)
   ```typescript
   interface SignupRequest {
     name: string;
     email: string;
     phone: string;
     password: string;
   }
   ```

### Offers Endpoints

1. **Get Offers** (`GET /api/offers`)
   ```typescript
   interface Offer {
    id: string;
    title: string;
    description: string;
    points: number;
    discountPercentage: number;
    expiresAt: Date;
    image: string;
    redemptionCode: string;
  }
   ```

2. **Create Offer** (`POST /api/offers`)
   ```typescript
   interface CreateOfferRequest {
     title: string;
     description: string;
     points: number;
     discountPercentage: number;
     expiresAt: Date;
     image: string;
     redemptionCode: string;
   }
   ```

## Notes for Backend Developers

1. **API Response Format**
   ```typescript
   interface ApiResponse<T> {
     success: boolean;
     message: string;
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

2. **Authentication Requirements**
   - All protected routes expect JWT token in Authorization header
   - Token format: `Bearer <token>`
   - Token expiration handling required
   - Refresh token mechanism recommended

3. **Error Handling**
   - Use consistent error codes
   - Provide field-level validation errors
   - Include user-friendly error messages

4. **Data Validation**
   - Validate email format
   - Password requirements:
     - Minimum 8 characters
     - At least one uppercase letter
     - At least one number
     - At least one special character

5. **Rate Limiting**
   - Implement rate limiting for auth endpoints
   - Suggested: 5 attempts per minute for login

## Environment Setup

1. Create `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_APP_ENV=development
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```


## Future Implementations

- [ ] Profile Page



