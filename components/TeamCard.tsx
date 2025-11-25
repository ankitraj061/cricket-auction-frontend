'use client';

import { Card } from '@/components/ui/card';
import { Users, IndianRupee, Trophy, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Team } from '@/app/types/type';
import { motion } from 'framer-motion';

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  // Calculate percentage of purse remaining (assuming initial purse, adjust as needed)
  const initialPurse = 50000; // Adjust based on your auction rules
  const pursePercentage = (team.currentPurse / initialPurse) * 100;
  
  // Dynamic color based on purse remaining
  const getPurseColor = () => {
    if (pursePercentage > 60) return 'from-emerald-500 to-teal-500';
    if (pursePercentage > 30) return 'from-amber-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }} 
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="group h-full"
    >
      <Link href={`/teams/${team.id}`} className="block h-full">
        {/* Outer Glow Container */}
        <div className="relative h-full">
          {/* Animated Glow Border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-75 blur-sm transition-all duration-500"></div>
          
          {/* Main Card */}
          <Card className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-2xl border-2 border-gray-700/40 rounded-2xl h-full overflow-hidden shadow-xl group-hover:border-cyan-500/50 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] transition-all duration-500">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-[0.03]"></div>
            
            {/* Top Gradient Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-60"></div>
            
            {/* Content Container */}
            <div className="relative p-6 flex flex-col h-full">
              {/* Team Header Section */}
              <div className="flex items-start gap-4 mb-6">
                {/* Captain Avatar with Animated Ring */}
                <div className="relative flex-shrink-0">
                  {/* Rotating Glow Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 rounded-full opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-500"
                  ></motion.div>
                  
                  {team.captainImage ? (
                    <img
                      src={team.captainImage}
                      alt={team.captainName}
                      className="relative w-16 h-16 rounded-full border-3 border-gray-700/50 object-cover shadow-lg"
                    />
                  ) : (
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm flex items-center justify-center border-3 border-emerald-500/30 shadow-lg">
                      <span className="text-emerald-400 font-black text-xl">
                        {team.captainName.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Captain Badge */}
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-amber-500 to-orange-500 p-1.5 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.6)]">
                    <Trophy className="h-3 w-3 text-gray-900" />
                  </div>
                </div>

                {/* Team Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-xl bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent line-clamp-1 mb-1">
                    Team {team.captainName}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" />
                    <span className="text-xs text-gray-400 font-medium">Team Captain</span>
                  </div>
                </div>

                {/* Arrow Indicator */}
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <ChevronRight className="h-6 w-6 text-cyan-400" />
                </motion.div>
              </div>

              {/* Stats Section with Glass Cards */}
              <div className="space-y-3 mt-auto">
                {/* Purse Card */}
                <motion.div 
                  className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 backdrop-blur-xl border border-amber-500/30 rounded-xl p-4 group-hover:border-amber-500/50 transition-all duration-300 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500/20 rounded-lg">
                        <IndianRupee className="h-5 w-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium mb-0.5">Current Purse</p>
                        <p className="text-lg font-black text-amber-300">
                          ₹{team.currentPurse.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    {/* Purse Status Indicator */}
                    <div className={`px-3 py-1 bg-gradient-to-r ${getPurseColor()} rounded-full text-xs font-bold text-white shadow-lg`}>
                      {pursePercentage.toFixed(0)}%
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3 h-1.5 bg-gray-800/60 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pursePercentage}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full bg-gradient-to-r ${getPurseColor()} shadow-[0_0_8px_currentColor]`}
                    ></motion.div>
                  </div>
                </motion.div>

                {/* Players Card */}
                <motion.div 
                  className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-xl border border-emerald-500/30 rounded-xl p-4 group-hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/20 rounded-lg">
                        <Users className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium mb-0.5">Squad Size</p>
                        <p className="text-lg font-black text-emerald-300">
                          {team.players?.length || 0} Players
                        </p>
                      </div>
                    </div>

                    {/* Player Count Badge */}
                    {/* <div className="relative">
                      <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-md animate-pulse"></div>
                      <div className="relative bg-gradient-to-br from-emerald-500/30 to-teal-500/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-emerald-500/40">
                        <span className="text-xs font-bold text-emerald-300">
                          {team.players?.length || 0}/11
                        </span>
                      </div>
                    </div> */}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom Accent - Hidden, revealed on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Card>
        </div>
      </Link>
    </motion.div>
  );
};

export default TeamCard;
