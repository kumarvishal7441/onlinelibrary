import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoLibrarySharp } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io';
import { FiPlusCircle } from 'react-icons/fi';
import { FaBookOpen } from 'react-icons/fa';

function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: IoMdHome },
    { path: '/browse', label: 'Browse Books', icon: FaBookOpen },
    { path: '/addbook', label: 'Add Book', icon: FiPlusCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-indigo-600 rounded-lg group-hover:bg-indigo-700 transition-colors">
              <IoLibrarySharp className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">
              Online Library
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-indigo-600'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}

                  {isActive && (
                    <div className="absolute -bottom-[22px] left-0 right-0 h-0.5 bg-indigo-600"></div>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="md:hidden flex items-center gap-4">
            {/* Mobile menu placeholder */}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;