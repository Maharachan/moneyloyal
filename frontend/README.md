# MoneyLoyal Frontend

A React-based frontend application for the MoneyLoyal loyalty and rewards platform.

## Project Structure
frontend/
├── src/
│ ├── components/
│ │ └── home/
│ │ ├── common/ # Reusable components (Button, etc.)
│ │ ├── layout/ # Layout components (Header, Footer)
│ │ └── sections/ # Home page sections
│ ├── pages/
│ │ ├── auth/ # Authentication pages
│ │ │ ├── Login.tsx
│ │ │ ├── Signup.tsx
│ │ │ └── Forgot.tsx
│ │ ├── dashboard/ # Dashboard related pages
│ │ └── Home.tsx # Landing page
│ └── utils/ # Utility functions and helpers

## Tech Stack

- **React 18** with TypeScript
- **React Router v7** for routing
- **Tailwind CSS** for styling
- **Vite** as build tool
- **React Toastify** for notifications
- **Lucide React** for icons

## API Integration Points

### Authentication Endpoints

1. **Login** (`POST /auth/login`)
   ```typescript
   interface LoginRequest {
     email: string;
     password: string;
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

3. **Forgot Password** (`POST /auth/forgot-password`)
   ```typescript
   interface ForgotPasswordRequest {
     email: string;
   }
   ```

## Authentication Flow

1. User authentication state is managed through:
   - JWT tokens stored in localStorage
   - Protected routes using `PrivateRoute` component
   - Auto-redirect to login for unauthenticated users

## Key Features

1. **Responsive Design**
   - Mobile-first approach
   - Breakpoints follow Tailwind's default configuration

2. **Theme**
   - Primary color: Purple (#7000FF)
   - Secondary color: Green (green-300)
   - Dark text: gray-800
   - Light text: white

3. **Form Validation**
   - Client-side validation for all forms
   - Error handling with toast notifications
   - Password strength requirements

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
```

## Notes for Backend Developers

1. All API calls expect JSON responses with this structure:
   ```json
   {
     "success": boolean,
     "message": string,
     "data"?: any,
     "error"?: {
       "details": Array<{message: string}>
     }
   }
   ```

2. Authentication tokens should be:
   - Sent in Authorization header
   - Format: `Bearer <token>`

3. Protected routes require valid JWT tokens

4. Error responses should include detailed messages for proper client-side handling

## Future Implementations

- [ ] Dashboard


