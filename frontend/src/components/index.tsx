import { useState } from 'react';
import { Menu } from 'lucide-react';
import Button from './home/common/Button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './ui/Sheet';
import Sidebar from './sidebar';
import MobileNav from './mobile-nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
        <div className="container flex h-14 items-center text-2xl font-bold px-4">
            Money<span className="text-green-300">Loyal</span>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}