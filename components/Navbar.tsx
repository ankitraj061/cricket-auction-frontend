'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import { LogOut, User, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="relative z-20 border-b border-gray-700/30 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Responsive */}
          <Link href="/" className="flex items-center gap-3 lg:gap-4 shrink-0">
            <Image
              src="https://ik.imagekit.io/s0kb1s3cx3/PWIOI/yello-Photoroom.png?updatedAt=1764439890622"
              alt="Auction Logo"
              width={60}
              height={40}
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[80px] lg:h-12 object-contain flex-shrink-0"
              priority
            />
            <span className="text-xl sm:text-2xl lg:text-[2rem] font-bold text-white tracking-tight hidden sm:block">
              Premier League
            </span>
          </Link>

          {/* Desktop: Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    className="w-12 h-12 p-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:from-blue-600 hover:to-cyan-600"
                    aria-label="Open user menu"
                  >
                    <User className="h-5 w-5 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-gray-900 border-gray-700/50 text-white"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">
                        {user?.name || user.role}
                      </p>
                      <p className="text-xs leading-none text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700/50" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="text-red-400 focus:bg-red-900/20 focus:text-red-400 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/admin/login">
                <Button
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] px-6 py-2 text-sm font-semibold"
                >
                  Admin Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-2 p-2 -mr-1 rounded-full hover:bg-white/10 hover:shadow-lg w-10 h-10"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-96 opacity-100 visible'
              : 'max-h-0 opacity-0 invisible'
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 bg-black/60 backdrop-blur-md border-t border-gray-700/50">
            {isAuthenticated && user ? (
              <div className="px-3 py-4 border-b border-gray-700/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">
                      {user?.name || user.role}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-400 hover:bg-red-900/20 hover:text-red-300 px-4 py-2 text-left font-medium"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link
                href="/auth/admin/login"
                className="block px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 rounded-lg mx-2 mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
