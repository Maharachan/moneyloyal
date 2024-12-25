import { useLocation, useNavigate } from 'react-router-dom';
import { Home, User } from 'lucide-react';
import { cn } from '../utils/Utils';
import Button from './home/common/Button';



const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      icon: Home,
      label: 'Home',
      path: '/dashboard',
    },
    {
      icon: User,
      label: 'Profile',
      path: '/dashboard/profile',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background lg:hidden">
      <div className="grid h-16 grid-cols-2">
        {tabs.map((tab) => (
          <Button
            variant="white"
            key={tab.path}
          
            className={cn(
              'h-full rounded-none',
              location.pathname === tab.path &&
                'bg-accent text-accent-foreground'
            )}
            onClick={() => navigate(tab.path)}
          >
            <div className="flex flex-col items-center gap-0.5">
              <tab.icon className="h-5 w-5" />
              <span className="text-xs">{tab.label}</span>
            </div>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;