'use client';

import React from 'react';
import Image from 'next/image';
import { Player, Team } from '@/app/types/type';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IndianRupee, Phone, Trophy, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlayerCardProps {
  player: Player;
  teams?: Team[];
}

const PlayerCard = ({ player, teams }: PlayerCardProps) => {
  const getPlayerIcon = () => {
    const role = player.role.toLowerCase();
    const iconClass = "h-6 w-6";

    if (role.includes('batsman') || role === 'batsmen') {
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor">
          <path d="M12 3v14M12 3l-3 5M12 3l3 5" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="19" r="2" fill="currentColor" />
        </svg>
      );
    }

    if (role.includes('bowler')) {
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor">
          <path d="M2 12h20M6 8l6 8 4-10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }

    if (role.includes('allrounder')) {
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }

    if (role.includes('keeper') || role.includes('wicket')) {
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor">
          <path d="M12 3v3m0 12v3M4 12h3m10 0h3M7 7l5 5 5-5M7 17l5-5 5 5" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
        <circle cx="12" cy="12" r="9" opacity="0.8" />
        <path
          d="M12 3a9 9 0 0 0-7 14.2 9.5 9.5 0 0 0 14 0A9 9 0 0 0 12 3z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  const getTeamById = (id: number) => teams?.find((team) => team.id === id) ?? null;

  const team = player.teamId ? getTeamById(player.teamId) : null;
  const isSold = player.isSold && player.soldPrice != null;
  const teamName = team ? `Team ${team.captainName}` : 'Unsold';

  // Enhanced role-based styling
  const roleConfig = {
    batsman: {
      label: 'Batsman',
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      gradient: 'from-emerald-500/20 to-teal-500/20',
      glowColor: 'rgba(16, 185, 129, 0.3)',
      iconBg: 'bg-emerald-500/30',
    },
    bowler: {
      label: 'Bowler',
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      glowColor: 'rgba(59, 130, 246, 0.3)',
      iconBg: 'bg-blue-500/30',
    },
    allrounder: {
      label: 'All-Rounder',
      color: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      gradient: 'from-amber-500/20 to-orange-500/20',
      glowColor: 'rgba(245, 158, 11, 0.3)',
      iconBg: 'bg-amber-500/30',
    },
    wicketkeeper: {
      label: 'WK',
      color: 'bg-violet-500/20 text-violet-400 border-violet-500/40',
      gradient: 'from-violet-500/20 to-purple-500/20',
      glowColor: 'rgba(139, 92, 246, 0.3)',
      iconBg: 'bg-violet-500/30',
    },
    default: {
      label: player.role,
      color: 'bg-gray-500/20 text-gray-400 border-gray-500/40',
      gradient: 'from-gray-500/20 to-gray-600/20',
      glowColor: 'rgba(107, 114, 128, 0.3)',
      iconBg: 'bg-gray-500/30',
    },
  };

  const roleKey = player.role.toLowerCase() as keyof typeof roleConfig;
  const role = roleConfig[roleKey] || roleConfig.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full group"
    >
      {/* Outer Glow Container */}
      <div className="relative h-full">
        {/* Hover Glow Effect */}
        <div
          className="absolute -inset-2 opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-2xl rounded-2xl"
          style={{ background: `radial-gradient(circle, ${role.glowColor} 0%, transparent 70%)` }}
        />

        {/* Main Card */}
        <Card className={`relative overflow-hidden transition-all duration-500 bg-gradient-to-br ${role.gradient} backdrop-blur-xl border-2 border-gray-700/50 group-hover:border-white/30 rounded-2xl flex flex-col h-full shadow-xl group-hover:shadow-2xl`}>
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          {/* Top Radial Glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 0%, ${role.glowColor}, transparent 60%)` }}
          />

          {/* Sold Badge (Top Right) */}
          {isSold && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="absolute top-3 right-3 z-20"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg blur opacity-60 animate-pulse" />
                <Badge className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-2 py-0.5 text-xs font-bold shadow-lg flex items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  SOLD
                </Badge>
              </div>
            </motion.div>
          )}

          {/* Content */}
          <div className="relative z-10 p-5 flex flex-col h-full">
            {/* Player Header */}
            <div className="flex items-start gap-3 mb-4">
              {/* Player Image/Avatar */}
              {player.playerImageUrl ? (
                <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg group-hover:border-white/40 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Image
                    src={player.playerImageUrl}
                    alt={player.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                  {/* Image Overlay Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ) : (
                <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg group-hover:border-white/40 transition-all duration-300 group-hover:scale-110">
                  <div className={`w-full h-full flex items-center justify-center ${role.iconBg} backdrop-blur-sm`}>
                    <div className="text-white group-hover:scale-110 transition-transform duration-300">
                      {getPlayerIcon()}
                    </div>
                  </div>
                </div>
              )}

              {/* Player Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-white text-base md:text-lg line-clamp-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                  {player.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="line-clamp-1">{player.mobile || 'No contact'}</span>
                </div>
              </div>
            </div>

            {/* Role Badge */}
            <Badge className={`text-xs font-semibold border-2 ${role.color} backdrop-blur-md self-start px-3 py-1 shadow-md group-hover:scale-105 transition-transform duration-300`}>
              <Sparkles className="h-3 w-3 mr-1" />
              {role.label}
            </Badge>

            {/* Description */}
            {player.description && (
              <p className="text-xs text-gray-400 line-clamp-2 mt-3 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {player.description}
              </p>
            )}

            {/* Stats */}
            {player.stats && (
              <div className="mt-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs italic text-gray-400 line-clamp-1">{player.stats}</p>
              </div>
            )}

            {/* Spacer */}
            <div className="flex-grow" />

            {/* Bottom Section */}
            <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
              {/* Price Info */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 font-medium">Price</span>
                {isSold ? (
                  <div className="flex items-center gap-1.5 text-amber-400 font-black text-base">
                    <IndianRupee className="h-4 w-4" />
                    <span>{player.soldPrice!.toLocaleString()}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 text-gray-300 font-bold text-sm">
                      <IndianRupee className="h-3.5 w-3.5" />
                      <span>{player.basePrice.toLocaleString()}</span>
                    </div>
                    <Badge variant="outline" className="h-5 px-2 text-[10px] border-cyan-500/40 text-cyan-400 bg-cyan-500/10 font-semibold">
                      Available
                    </Badge>
                  </div>
                )}
              </div>

              {/* Team Info (if sold) */}
              {isSold && team && (
                <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-green-400" />
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wide">Team</p>
                      <p className="text-sm font-bold text-emerald-300 line-clamp-1">{teamName}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Accent Line */}
          <div className={`h-1 bg-gradient-to-r ${role.gradient.replace('/20', '/60')} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        </Card>
      </div>
    </motion.div>
  );
};

export default PlayerCard;
