'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Users, UserSearch, Gavel, UserPlus, UsersRound, Plus } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from './contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import RetainedPlayers from '@/components/RetainedPlayers';
import { CricketTournamentTimeline } from '@/components/CricketTimeLine';

const HomePage = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  const menuItems = [
    // ... your exact menuItems array (unchanged)
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
    // ... your exact quickActions array (unchanged)
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
    <>
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* 🎥 VIDEO BACKGROUND - CONTAINER */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/video1.mp4" type="video/mp4" />
          <source src="/videos/auction-bg.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Content Container */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Grid Pattern Overlay - Full page */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="grid grid-cols-12 h-full">
            {Array(12).fill(null).map((_, i) => (
              <div key={i} className="border-l border-white/10"></div>
            ))}
          </div>
        </div>

        {/* ✅ HERO SECTION (Your original code) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-12 px-4"
        >
          <div className="mb-2">
            <Image
              src="https://ik.imagekit.io/s0kb1s3cx3/PWIOI/yello-Photoroom.png?updatedAt=1764439890622"
              alt="Auction Logo"
              width={200}
              height={100}
              className="mx-auto"
            />
          </div>
          <p className="text-6xl mb-5 text-gray-300 mb-2">Premier League</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            LIVE AUCTION SYSTEM
          </h1>
          <p className="text-lg text-gray-400">
            Draft your dream VII. Manage budgets. Outbid rivals. Own the season.
          </p>
        </motion.div>

        {/* ✅ QUICK ACTION BUTTONS (Your original code - KEPT) */}
        {isAuthenticated && !isLoading && (
          <div className="flex gap-4 justify-center mb-12 px-4 flex-wrap">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link href={action.link}>
                    <button className={`bg-gradient-to-r ${action.gradient} text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 ${action.hoverGlow} cursor-pointer transition-all duration-300`}>
                      <Icon size={20} />
                      {action.label}
                    </button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ✅ CARDS GRID (Your original code - KEPT) */}
        {(() => {
          const visibleItems = menuItems.filter(item => {
            if (item.title === 'Players' || item.title === 'Teams') return true;
            if (item.title === 'Auction') return isAuthenticated && !isLoading;
            return true;
          });

          const gridCols = visibleItems.length === 2 
            ? 'grid-cols-1 sm:grid-cols-2' 
            : 'grid-cols-1 md:grid-cols-3';

          return (
            <div className={`grid ${gridCols} gap-8 max-w-6xl mx-auto px-4 mb-12 flex-1 justify-items-center`}>
              {visibleItems.map((item, index) => {
                const Icon = item.icon;
                const originalIndex = menuItems.findIndex(i => i.title === item.title);

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: originalIndex * 0.2, duration: 0.6 }}
                    className="w-full max-w-xs"
                  >
                    <Link href={item.link}>
                      <Card className={`relative h-[300px] overflow-hidden cursor-pointer group bg-gradient-to-br ${item.bgGradient} border-2 border-transparent`}>
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{
                          background: `linear-gradient(45deg, transparent, ${item.glowColor}, transparent)`,
                        }}></div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                          background: `radial-gradient(circle at center, ${item.glowColor} 0%, transparent 70%)`,
                        }}></div>
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 -skew-x-12"></div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                          background: `radial-gradient(circle at 50% 0%, ${item.glowColor} 0%, transparent 60%)`,
                        }}></div>

                        <div className="relative z-10 p-6 h-full flex flex-col">
                          <div className="mb-4 relative">
                            <Icon className={`${item.color} w-12 h-12`} />
                          </div>
                          <h3 className={`text-xl font-bold mb-2 ${item.color}`}>
                            {item.title}
                          </h3>
                          <p className="text-gray-300 text-sm mb-4 flex-grow">
                            {item.description}
                          </p>
                          <motion.button
                            whileHover={{ x: 5 }}
                            className={`${item.color} font-semibold flex items-center gap-2`}
                          >
                            Explore {item.title}
                            <span>→</span>
                          </motion.button>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          );
        })()}

        {/* 🎯 END VIDEO - STATIC SECTIONS BELOW */}
       
      </div>

      {/* Custom Animation Keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
     <div className="relative z-30 bg-gradient-to-b from-black/80 to-gray-900 border-t border-gray-800/50">
          
          {/* Retained Players - NO VIDEO */}
          <RetainedPlayers />
          {/* Cricket Tournament Timeline - NO VIDEO */}
         <CricketTournamentTimeline />

          {/* Footer - NO VIDEO */}
          <footer className="border-t border-gray-500/20 py-8 px-2 text-center bg-black backdrop-blur-md">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Cricket Auction Platform • Made with ❤️ by Ankit
            </p>
          </footer>
        </div>
         
    </>
  );
};

export default HomePage;
