import { useNavigate } from 'react-router-dom';
import {
  Home,
  User,
  LogOut,
  UserCog,
  Store,
} from 'lucide-react';
import { useAuth } from '../contexts/auth-contexts';
import { cn } from '../utils/Utils';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const userMenuItems = [
    { icon: Home, label: 'Home', path: '/dashboard', color: 'text-purple-600' },
    { icon: User, label: 'Profile', path: '/dashboard/profile', color: 'text-purple-600' },
  ];

  const adminMenuItems = [
    { icon: Home, label: 'Home', path: '/dashboard', color: 'text-purple-600' },
    { icon: User, label: 'Profile', path: '/dashboard/profile', color: 'text-purple-600' },
    { icon: Store, label: 'Offer Management', path: '/admin', color: 'text-purple-600' },
    { icon: UserCog, label: 'Role Management', path: '/admin/role-management', color: 'text-purple-600' },
  ];

  const cashierMenuItems = [
    { icon: Home, label: 'Home', path: '/dashboard', color: 'text-purple-600' },
    { icon: User, label: 'Profile', path: '/dashboard/profile', color: 'text-purple-600' },
    { icon: Store, label: 'Offer Management', path: '/admin', color: 'text-purple-600' },
  ];

  // Determine which menu items to show based on user role
  const getMenuItems = () => {
    switch (user?.role) {
      case 'ADMIN':
        return adminMenuItems;
      case 'CASHIER':
        return cashierMenuItems;
      case 'USER':
      default:
        return userMenuItems;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-[240px] flex-col bg-white">
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center gap-2 border-b px-6 text-2xl font-bold">
      Money<span className="text-green-300">Loyal</span>
      </div>

      {/* Navigation Menu - Scrollable Area */}
      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-1 p-4">
          {getMenuItems().map((item: { 
            icon: any; 
            label: string; 
            path: string; 
            color: string 
          }) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-colors hover:bg-purple-50 hover:text-purple-600',
                location.pathname === item.path && 'bg-purple-50 text-purple-600'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* User Profile & Logout - Fixed at Bottom */}
      <div className="mt-auto border-t bg-white">
        <div className="p-4">
          <div className="mb-4 flex items-center gap-3 px-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
              <User className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user?.name || 'User'}</p>
              <p className="truncate text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-colors hover:bg-purple-50 hover:text-purple-600"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;