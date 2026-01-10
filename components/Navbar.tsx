'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
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

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="relative z-20 border-b border-gray-700/30 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image
              src="https://ik.imagekit.io/s0kb1s3cx3/PWIOI/yello-Photoroom.png?updatedAt=1764439890622"
              alt="Auction Logo"
              width={80}
              height={50}
              className="object-contain"
            />
            <span className="text-2xl font-bold text-white">Premier League</span>
          </div>
        </Link>

        {/* Auth Section */}
        <div>
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  className="w-10 h-10 p-0 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]"
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
                    <p className="text-sm font-medium leading-none text-white">{user?.name || user.role}</p>
                    <p className="text-xs leading-none text-gray-400 truncate">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700/50" />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="text-red-400 focus:bg-red-900/20 focus:text-red-400"
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
                variant="default"
                className="bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
              >
                Admin Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};