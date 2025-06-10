import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Home, MessageCircle, User, PlusSquare } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils'; // For conditional class names

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/feed', label: 'Feed', icon: <Home size={24} /> },
  { path: '/chat', label: 'Chats', icon: <MessageCircle size={24} /> },
  { path: '/create-post', label: 'Post', icon: <PlusSquare size={24} /> },
  { path: '/profile', label: 'Profile', icon: <User size={24} /> },
];

const NavigationMenu: React.FC = () => {
  console.log("Rendering NavigationMenu");
  const location = useLocation();

  // This component can be styled as a bottom tab bar for mobile
  // or a sidebar/topbar for desktop.
  // For this example, it's a responsive bottom tab bar.

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-md hover:bg-muted transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
    // Consider a different layout for md+ screens, e.g., a sidebar or a top header.
    // For now, this is primarily a mobile-first bottom navigation.
    // A desktop navigation menu would likely be part of a more complex Layout component.
  );
};

export default NavigationMenu;