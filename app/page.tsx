'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Users, UserSearch, Gavel, UserPlus, UsersRound, Plus } from 'lucide-react';

const HomePage = () => {
  const menuItems = [
    {
      title: 'Players',
      description: 'Browse & filter players by role, price, and stats.',
      icon: UserSearch,
      link: '/players',
      color: 'text-emerald-400',
      bgGradient: 'from-emerald-500/20 to-teal-500/20',
      borderGradient: 'from-emerald-500 via-teal-500 to-emerald-500',
      glowColor: 'rgba(16, 185, 129, 0.4)',
    },
    {
      title: 'Teams',
      description: 'View team rosters, remaining purse, and strategy.',
      icon: Users,
      link: '/teams',
      color: 'text-blue-400',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      borderGradient: 'from-blue-500 via-cyan-500 to-blue-500',
      glowColor: 'rgba(59, 130, 246, 0.4)',
    },
    {
      title: 'Auction',
      description: 'Launch live bidding. Control the auction in real time.',
      icon: Gavel,
      link: '/auction',
      color: 'text-amber-400',
      bgGradient: 'from-amber-500/20 to-orange-500/20',
      borderGradient: 'from-amber-500 via-orange-500 to-amber-500',
      glowColor: 'rgba(245, 158, 11, 0.4)',
    },
  ];

  const quickActions = [
    {
      label: 'Add Player',
      icon: UserPlus,
      link: '/players/create',
      gradient: 'from-emerald-500 to-teal-500',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]',
    },
    {
      label: 'Add Team',
      icon: UsersRound,
      link: '/team/create',
      gradient: 'from-cyan-500 to-blue-500',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-emerald-950 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-10 pointer-events-none"></div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-block px-4 py-1 mb-4 bg-amber-500/10 rounded-full border border-amber-500/20">
            <span className="text-amber-400 text-sm font-medium tracking-wide">
              LIVE AUCTION SYSTEM
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-white to-emerald-200">
              Cricket Auction Hub
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Draft your dream XI. Manage budgets. Outbid rivals. Own the season.
          </p>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-8"
          >
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={action.link}>
                    <div className="relative group">
                      <div className={`absolute -inset-1 bg-gradient-to-r ${action.gradient} rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300`}></div>
                      <div className={`relative bg-gradient-to-r ${action.gradient} text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${action.hoverGlow} border border-white/10`}>
                        <Icon className="h-5 w-5" />
                        <span>{action.label}</span>
                        <Plus className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Enhanced Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="h-full group"
              >
                <Link href={item.link} className="block h-full">
                  {/* Animated Gradient Border Container */}
                  <div className="relative h-full">
                    {/* Rotating Gradient Border (pseudo-element simulation) */}
                    <div 
                      className={`absolute -inset-[2px] bg-gradient-to-r ${item.borderGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-spin blur-sm`}
                      style={{
                        background: `conic-gradient(from 0deg, transparent 0%, ${item.glowColor} 50%, transparent 100%)`,
                      }}
                    />
                    
                    {/* Outer Glow */}
                    <div 
                      className="absolute -inset-4 opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-2xl rounded-2xl"
                      style={{
                        background: `radial-gradient(circle, ${item.glowColor} 0%, transparent 70%)`,
                      }}
                    />

                    {/* Glassmorphic Card */}
                    <Card className={`relative h-full bg-gradient-to-br ${item.bgGradient} backdrop-blur-xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 overflow-hidden rounded-2xl shadow-2xl`}>
                      {/* Shimmer Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                      
                      {/* Radial Glow on Hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at 50% 0%, ${item.glowColor}, transparent 60%)`,
                        }}
                      />

                      <div className="relative p-8 flex flex-col h-full z-10">
                        {/* Enhanced Icon with Glow */}
                        <div className="relative mb-6">
                          {/* Icon Glow */}
                          <div 
                            className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 scale-150"
                            style={{ background: item.glowColor }}
                          />
                          
                          <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${item.bgGradient} backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 ${item.color}`}>
                            <Icon className="h-8 w-8 group-hover:scale-110 transition-transform duration-500" />
                          </div>
                        </div>

                        {/* Title with Gradient on Hover */}
                        <h3 className="text-2xl font-black mb-4 text-white group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500"
                            style={{
                              backgroundImage: `linear-gradient(to right, ${item.glowColor}, white)`,
                            }}>
                          {item.title}
                        </h3>
                        
                        <p className="text-gray-300 text-sm leading-relaxed flex-grow group-hover:text-white transition-colors duration-500">
                          {item.description}
                        </p>

                        {/* Enhanced CTA */}
                        <div className="mt-6 pt-4 border-t border-white/10 group-hover:border-white/30 transition-colors duration-500">
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-semibold ${item.color} group-hover:translate-x-1 transition-transform duration-300`}>
                              Explore {item.title}
                            </span>
                            <svg 
                              className={`h-5 w-5 ${item.color} group-hover:translate-x-2 transition-transform duration-300`}
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>

                        {/* Particle Effect Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                          <div className={`absolute top-4 right-4 w-2 h-2 ${item.color} rounded-full animate-ping`} style={{ animationDuration: '2s' }} />
                          <div className={`absolute top-12 right-8 w-1 h-1 ${item.color} rounded-full animate-ping`} style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                          <div className={`absolute top-8 right-12 w-1.5 h-1.5 ${item.color} rounded-full animate-ping`} style={{ animationDuration: '2.5s', animationDelay: '1s' }} />
                        </div>
                      </div>
                    </Card>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 + index * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href={action.link}>
                  <div className="relative group">
                    {/* Tooltip */}
                    <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap border border-gray-700 shadow-xl">
                        {action.label}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                          <div className="border-8 border-transparent border-l-gray-900"></div>
                        </div>
                      </div>
                    </div>

                    {/* FAB Glow */}
                    <div className={`absolute -inset-2 bg-gradient-to-r ${action.gradient} rounded-full blur-lg opacity-50 group-hover:opacity-100 transition duration-300 animate-pulse`}></div>
                    
                    {/* FAB Button */}
                    <div className={`relative w-14 h-14 bg-gradient-to-r ${action.gradient} rounded-full flex items-center justify-center shadow-2xl ${action.hoverGlow} transition-all duration-300 border-2 border-white/20`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-24 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Cricket Auction Platform • Official Draft System
        </div>
      </div>

      {/* Custom Animation Keyframes */}
      <style jsx>{`
        @keyframes border-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-border-spin {
          animation: border-spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
