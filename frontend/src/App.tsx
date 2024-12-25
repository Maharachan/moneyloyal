import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/index';
import { AuthProvider } from './contexts/auth-contexts';

function App() {
  return (

      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
  );
}

export default App;