"use client";
import './globals.css';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const [token, setToken] = useState(Cookies.get('token'));
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    Cookies.remove('token');
    setToken(null);
    router.push('/login');
  };

  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
        
        {/* Modern Glass Navbar */}
        {!isAuthPage && (
          <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 bg-white/70 backdrop-blur-md border border-white/50 shadow-lg shadow-slate-200/50 rounded-2xl px-6 py-3 flex justify-between items-center transition-all duration-300">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-indigo-500/30 transition-all">
                M
              </div>
              <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
                MiniTasks
              </span>
            </Link>

            <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
              {token ? (
                <button 
                  onClick={logout} 
                  className="hover:text-red-600 transition-colors flex items-center gap-2"
                >
                  Sign Out
                </button>
              ) : (
                <div className="space-x-4">
                  <Link href="/login" className="hover:text-indigo-600 transition-colors">Log In</Link>
                  <Link href="/signup" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-95">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}

        {/* Main Content Container */}
        <main className={`container mx-auto px-4 ${!isAuthPage ? 'pt-28 pb-12' : 'h-screen flex items-center justify-center'}`}>
          {children}
        </main>
      </body>
    </html>
  );
}