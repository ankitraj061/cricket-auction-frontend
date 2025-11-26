// auction cards : 
'use client';

import Image from 'next/image';
import { Player } from '@/app/types/type';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IndianRupee, Zap, Trophy, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuctionCardProps {
  player: Player;
}

const AuctionCard = ({ player }: AuctionCardProps) => {
  const roleConfig = {
    batsman: { 
      label: 'Batsman', 
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50',
      glow: 'shadow-emerald-500/50'
    },
    bowler: { 
      label: 'Bowler', 
      color: 'bg-blue-500/20 text-blue-300 border-blue-400/50',
      glow: 'shadow-blue-500/50'
    },
    allrounder: { 
      label: 'All-Rounder', 
      color: 'bg-amber-500/20 text-amber-300 border-amber-400/50',
      glow: 'shadow-amber-500/50'
    },
    wicketkeeper: { 
      label: 'Wicketkeeper', 
      color: 'bg-violet-500/20 text-violet-300 border-violet-400/50',
      glow: 'shadow-violet-500/50'
    },
    default: { 
      label: player.role, 
      color: 'bg-gray-500/20 text-gray-300 border-gray-400/50',
      glow: 'shadow-gray-500/50'
    },
  };

  const roleKey = player.role.toLowerCase() as keyof typeof roleConfig;
  const role = roleConfig[roleKey] || roleConfig.default;

  const getPlayerIcon = () => {
    const r = player.role.toLowerCase();
    const cls = "h-50 w-50 text-gray-400";
    if (r.includes('bat')) return <BatIcon className={cls} />;
    if (r.includes('bowl')) return <BowlIcon className={cls} />;
    if (r.includes('all')) return <AllRoundIcon className={cls} />;
    if (r.includes('keep') || r.includes('wicket')) return <KeeperIcon className={cls} />;
    return <BallIcon className={cls} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-5xl"
    >
      {/* Holographic Border Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
      
      <Card className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-2xl border-2 border-gray-600/30 rounded-3xl overflow-hidden shadow-2xl">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>

        {/* Neon Corner Accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-br-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-tl-full blur-2xl"></div>


        {/* Main Content */}
        <div className="relative p-2 px-10">
          {/* Player Showcase Section */}
          <div className=" items-start gap-8 mb-6 grid md:grid-cols-2 lg:grid-col-2 sm:grid-cols-1">
            {/* Enhanced Avatar with Holographic Ring */}
            <motion.div 
              className="relative flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Rotating Holographic Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full opacity-75 blur-md"
              ></motion.div>
              
              {/* Inner Glow Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-50 blur-sm"></div>

              {player.playerImageUrl ? (
                <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-gray-700/50 shadow-[0_0_40px_rgba(0,255,255,0.3)] bg-gradient-to-br from-gray-800 to-gray-900">
                  <Image
                    src={player.playerImageUrl}
                    alt={player.name}
                    fill
                    className="object-cover"
                    sizes="192px"
                    priority
                  />
                  {/* Image Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent"></div>
                </div>
              ) : (
                <div className="relative w-80 h-80 rounded-full flex items-center justify-center border-4 border-gray-700/50 shadow-[0_0_40px_rgba(0,255,255,0.3)] bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm">
                  {getPlayerIcon()}
                </div>
              )}

              {/* Power Indicator */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border border-white/20"
              >
                <Target className="h-3 w-3 inline mr-1" />
                PREMIUM
              </motion.div>
            </motion.div>

            {/* Player Info - Glass Cards */}
            <div className="flex-1 space-y-2 ml-6">
              {/* Name Card */}
              <motion.div 
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4 shadow-[0_8px_32px_0_rgba(0,255,255,0.1)]"
                whileHover={{ scale: 1.02, borderColor: 'rgba(6,182,212,0.5)' }}
              >
                <p className="text-xs font-semibold text-cyan-400 mb-1 tracking-wider uppercase">Player Name</p>
                <h3 className="text-3xl font-black bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  {player.name}
                </h3>
              </motion.div>

              {/* Base Price Card */}
              <motion.div 
                className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-3 shadow-[0_8px_32px_0_rgba(245,158,11,0.2)]"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-xs font-semibold text-amber-300 mb-2 tracking-wider uppercase">Base Price</p>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-500/20 rounded-xl">
                    <IndianRupee className="h-6 w-6 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                  </div>
                  <p className="text-3xl font-black text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">
                    {player.basePrice.toLocaleString()}
                  </p>
                </div>
              </motion.div>

              {/* Role Card */}
              <motion.div 
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-600/40 rounded-2xl p-3"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-xs font-semibold text-gray-400 mb-3 tracking-wider uppercase">Role</p>
                <Badge
                  variant="outline"
                  className={`text-lg font-bold px-6 py-2 border-2 ${role.color} ${role.glow} shadow-lg`}
                >
                  {role.label}
                </Badge>
              </motion.div>
            </div>
          </div>

          {/* Description Section - Enhanced Glass */}
          {player.description && (
            <motion.div 
              className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-3 mb-3 shadow-[0_8px_32px_0_rgba(59,130,246,0.1)] relative overflow-hidden"
              whileHover={{ borderColor: 'rgba(59,130,246,0.5)' }}
            >
              {/* Inner Glow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              
              <p className="text-xs font-semibold text-blue-300 mb-1 tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse inline-block"></span>
                Player Profile
              </p>

              <p className="text-base text-gray-200 leading-relaxed line-clamp-2 font-light">
                {player.description}
              </p>
            </motion.div>
          )}

          {/* Stats Section - Enhanced Glass */}
          {player.stats && (
            <motion.div 
              className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-3 shadow-[0_8px_32px_0_rgba(16,185,129,0.1)] relative overflow-hidden"
              whileHover={{ borderColor: 'rgba(16,185,129,0.5)' }}
            >
              {/* Inner Glow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
              
              <div className="text-xs font-semibold text-emerald-300 mb-1 tracking-wider uppercase flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                Performance Stats
              </div>
              <p className="text-base text-gray-200 leading-relaxed line-clamp-2 font-light">
                {player.stats}
              </p>
            </motion.div>
          )}
        </div>

        {/* Bottom Accent Bar */}
        {/* <div className="h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div> */}
      </Card>
    </motion.div>
  );
};

// SVG Icons remain the same...
const BatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v14M12 3l-3 5M12 3l3 5" strokeLinecap="round" />
    <circle cx="12" cy="19" r="2" fill="currentColor" />
  </svg>
);

const BowlIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 12h20M6 8l6 8 4-10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AllRoundIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const KeeperIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v3m0 12v3M4 12h3m10 0h3M7 7l5 5 5-5M7 17l5-5 5 5" strokeLinecap="round" />
  </svg>
);

const BallIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" opacity="0.9">
    <circle cx="12" cy="12" r="9" />
    <path
      d="M12 3a9 9 0 0 0-7 14.2 9.5 9.5 0 0 0 14 0A9 9 0 0 0 12 3z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default AuctionCard;
