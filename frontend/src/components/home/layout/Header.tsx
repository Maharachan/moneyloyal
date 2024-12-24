import { Globe, ChevronDown } from 'lucide-react';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="bg-[#7000FF] text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">
            Money<span className="text-green-300">Loyal</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-green-300 transition-colors">Loyalty and Rewards</a>
            <a href="#" className="hover:text-green-300 transition-colors">Merchants</a>
            <a href="#" className="hover:text-green-300 transition-colors">About</a>
            <a href="#" className="hover:text-green-300 transition-colors">Blog</a>
            <Button onClick={() => navigate('/login')} variant="white">User Login</Button>
            <div className="flex items-center space-x-1 cursor-pointer">
              <Globe size={20} />
              <span>EN</span>
              <ChevronDown size={16} />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}