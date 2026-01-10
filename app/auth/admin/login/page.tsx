'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import { toast } from 'sonner';
import { Navbar } from '@/components/Navbar';

export default function CricketLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  
  const router = useRouter();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalLoading(true);

    try {
      await login(email, password);
        toast.success('Login successful!');
      setEmail('');
      setPassword('');
        router.push('/');
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Login failed';
        toast.error(errorMessage);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-green-950 via-slate-900 to-amber-950">
      <Navbar />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cricket Ball Animation - Top Right */}
        <motion.div
          animate={{ rotate: 360, x: [0, 50, 0], y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 right-10 text-7xl opacity-25"
        >
          🏏
        </motion.div>

        {/* Cricket Bat Animation - Bottom Left */}
        <motion.div
          animate={{ rotate: -360, x: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-10 text-8xl opacity-20"
        >
          🏏
        </motion.div>

        {/* Stadium Animation - Center Right */}
        <motion.div
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 text-6xl opacity-15"
        >
          🏟️
        </motion.div>

        {/* Glowing Green Orb (Cricket Pitch) */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-green-500 rounded-full filter blur-3xl opacity-20"
        />
        {/* Glowing Amber Orb (Stadium Lights) */}
        <motion.div
          animate={{ scale: [1.5, 1, 1.5], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl opacity-20"
        />

        {/* Cricket Pitch Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(34,197,94,.1)_25%,rgba(34,197,94,.1)_50%,transparent_50%,transparent_75%,rgba(34,197,94,.1)_75%,rgba(34,197,94,.1))] bg-size-[60px_60px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            {/* Animated Emojis */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <motion.div
                animate={{ rotate: [0, 25, -25, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-6xl drop-shadow-lg"
              >
                🏏
              </motion.div>
              <motion.div
                animate={{ y: [0, -15, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-7xl drop-shadow-lg"
              >
                🏟️
              </motion.div>
              <motion.div
                animate={{ rotate: [0, -25, 25, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-6xl drop-shadow-lg"
              >
                🏏
              </motion.div>
            </div>

           
          </motion.div>


        

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleLogin}
            className="bg-linear-to-br from-slate-800/70 via-slate-800/70 to-green-900/40 backdrop-blur-xl border-2 border-green-400/40 rounded-2xl p-8 shadow-2xl space-y-6"
          >
            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border-2 border-red-500 text-red-200 px-4 py-3 rounded-lg flex items-start gap-3"
              >
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Login Failed</p>
                  <p className="text-sm">{error}</p>
                </div>
              </motion.div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-green-200 font-bold flex items-center gap-2">
                <Mail size={18} className="text-green-400" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@auction.com"
                className="w-full bg-slate-700/60 border-2 border-green-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all duration-300"
                required
                disabled={localLoading || isLoading}
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-green-200 font-bold flex items-center gap-2">
                <Lock size={18} className="text-amber-400" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-slate-700/60 border-2 border-green-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all duration-300 pr-12"
                  required
                  disabled={localLoading || isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-300 transition-colors disabled:opacity-50"
                  disabled={localLoading || isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-green-400 cursor-pointer accent-green-400"
                disabled={localLoading || isLoading}
              />
              <label
                htmlFor="remember"
                className="text-green-200 text-sm font-medium cursor-pointer hover:text-green-100 transition-colors"
              >
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: localLoading || isLoading ? 1 : 1.02 }}
              whileTap={{ scale: localLoading || isLoading ? 1 : 0.98 }}
              type="submit"
              disabled={localLoading || isLoading}
              className="w-full bg-linear-to-r from-green-500 via-emerald-500 to-amber-500 hover:from-green-400 hover:via-emerald-400 hover:to-amber-400 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {localLoading || isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                  ⚡
                </motion.div>
              ) : (
                <>
                  <LogIn size={20} />
                  Enter the Arena
                </>
              )}
            </motion.button>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-green-400/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800 text-gray-400">Cricket Admin Only</span>
              </div>
            </div>

            {/* Support Link */}
            {/* <p className="text-center text-gray-300 text-sm">
              Don't have access?{' '}
              <a href="mailto:support@auction.com" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
                Contact Support
              </a>
            </p> */}
          </motion.form>

          {/* Bottom Cricket Animation */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-center mt-10"
          >
            <p className="text-green-300 text-sm font-semibold mb-3">🏏 May the best bid win! 🏏</p>
            <div className="flex justify-center gap-4 text-4xl">
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                🏏
              </motion.span>
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                🎯
              </motion.span>
              <motion.span animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                🏏
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Cricket Elements - Background */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 right-20 text-9xl opacity-20 pointer-events-none"
      >
        🏏
      </motion.div>
      <motion.div
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-32 left-20 text-10xl opacity-15 pointer-events-none"
      >
        🏟️
      </motion.div>
    </div>
  );
}