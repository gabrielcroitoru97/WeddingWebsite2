import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;
  const closeMenu = () => setMobileMenuOpen(false);

  // Strict order and labeling as requested
  const navLinks = [
    { path: '/details', label: 'Wedding Details' },
    { path: '/rsvp', label: 'RSVP' },
    { path: '/travel', label: 'Travel Suggestions' },
    { path: '/hinge', label: 'Hinge Profiles' },
    { path: '/faq', label: 'FAQ' },
    { path: '/single-guests', label: 'Single Guests' },
  ];

  const moreLinks = [
    { label: 'Athletic Accomplishments', path: '/more/athletic' },
    { label: 'Gabriel Playing Trumpet', path: '/more/trumpet' },
    { label: 'Sasha', path: '/more/sasha' },
    { label: 'History of Cartagena', path: '/more/cartagena' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-yellow-300 border-b-4 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)]">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-3xl font-black tracking-tighter hover:scale-105 transition-transform text-black drop-shadow-[2px_2px_0_rgba(255,255,255,1)] flex-shrink-0 mr-4" style={{ fontFamily: 'Righteous' }}>
             G & S
          </Link>

          {/* Desktop Navigation 
              Using xl:flex to prevent wrapping of long navigation items like "Schedule of Events" 
          */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-3 py-1 border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all text-black font-bold uppercase text-sm tracking-wide whitespace-nowrap",
                  isActive(link.path) && "bg-white border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] text-pink-600"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn(
                  "px-3 py-1 h-auto rounded-none border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all text-black font-bold uppercase text-sm tracking-wide flex items-center gap-1",
                  location.pathname.startsWith('/more') && "bg-white border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] text-pink-600"
                )}>
                  More <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 border-4 border-black rounded-none shadow-[6px_6px_0_0_rgba(0,0,0,1)] bg-white p-0 mt-2">
                {moreLinks.map((link) => (
                  <DropdownMenuItem
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className="cursor-pointer rounded-none focus:bg-cyan-300 focus:text-black px-4 py-3 font-bold border-b-2 border-gray-100 last:border-0 hover:bg-cyan-200"
                  >
                    {link.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button - Visible below xl breakpoint */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 bg-white border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all z-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden absolute top-full left-0 right-0 border-b-4 border-black bg-white shadow-xl overflow-hidden"
            >
              <div className="p-4 space-y-2 bg-cyan-100 max-h-[80vh] overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={cn(
                      "block w-full text-left px-4 py-3 border-2 border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition-transform font-bold uppercase mb-2",
                      isActive(link.path) && "bg-pink-200"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="pt-4 pb-2 font-black text-xl underline decoration-wavy decoration-pink-500 px-2">
                  EXTRAS
                </div>
                
                {moreLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={cn(
                      "block w-full text-left px-4 py-3 border-2 border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 transition-transform font-bold uppercase mb-2",
                      isActive(link.path) && "bg-pink-200"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;