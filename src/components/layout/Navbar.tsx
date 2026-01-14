import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/ai-career-guider', label: 'AI Career Guider' },
  { href: '/programs', label: 'Programs' },
  { href: '/team', label: 'Team' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-spotlight ${scrolled
        ? 'bg-white/80 backdrop-blur-xl shadow-[0_25px_70px_-35px_rgba(15,23,42,0.45)]'
        : 'bg-background/95'
        }`}
    >
      <div className="container-wide mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-28 border-b border-white/30">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/Logo.png"
              alt="TarkAI Logo"
              className="h-24 w-auto transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm tracking-wide transition-colors duration-300 link-underline shine-on-hover ${isActive(link.href)
                  ? 'text-accent'
                  : 'text-foreground/70 hover:text-foreground'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {isAuthenticated ? (
              <div className="flex items-center gap-6">
                <span className="text-sm text-foreground/70">{user?.name}</span>
                <button
                  onClick={logout}
                  className="text-sm text-foreground/70 hover:text-foreground link-underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm text-foreground/70 hover:text-foreground link-underline">
                  Login
                </Link>
                <Link to="/signup" className="glow-ring rounded-full">
                  <Button variant="outline" size="sm" className="rounded-full border-white/70">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground glow-ring rounded-full"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-8 animate-fade-in">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg transition-colors duration-200 ${isActive(link.href)
                    ? 'text-accent'
                    : 'text-foreground/70 hover:text-foreground'
                    }`}
                  style={{ fontFamily: 'Instrument Serif, serif' }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-border flex flex-col gap-4">
                {isAuthenticated ? (
                  <>
                    <span className="text-sm text-foreground/70">{user?.name}</span>
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="text-sm text-foreground/70 hover:text-foreground text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm text-foreground/70">
                      Login
                    </Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
