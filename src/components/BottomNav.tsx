import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/home',
      onClick: () => navigate('/home')
    },
    {
      icon: Plus,
      label: 'Add Plant',
      path: '/add-plant',
      onClick: () => navigate('/add-plant'),
      isPrimary: true
    },
    {
      icon: User,
      label: 'Profile',
      path: '/profile',
      onClick: () => {
        // TODO: Navigate to profile page when implemented
        console.log('Profile clicked - not yet implemented');
      }
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 shadow-large z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.label}
                variant={item.isPrimary ? "default" : "ghost"}
                size="sm"
                onClick={item.onClick}
                className={`
                  flex flex-col items-center gap-1 h-auto py-2 px-3
                  ${item.isPrimary 
                    ? 'bg-gradient-primary hover:bg-primary-hover text-primary-foreground shadow-medium' 
                    : isActive 
                      ? 'text-primary hover:text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  }
                  transition-all duration-300
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;