'use client';

import React, { useEffect, useState } from 'react';
import TeamCard from '@/components/TeamCard';
import { Button } from '@/components/ui/button';
import { Home, Users, Sparkles, Trophy } from 'lucide-react';
import Link from 'next/link';
import axiosClient from '../client/axiosClient';
import { Team } from '@/app/types/type';
import { motion, AnimatePresence } from 'framer-motion';

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axiosClient.get<Team[]>('/api/auction/teams');
        setTeams(response.data);
      } catch (error) {
        console.error('Failed to fetch teams', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-950 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-10 pointer-events-none"></div>

      <div className="relative container mx-auto px-4 py-8 md:py-12">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 bg-blue-500/10 rounded-full border border-blue-500/20">
              <Trophy className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-blue-400 text-xs font-semibold tracking-wide uppercase">
                Team Management
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
              All Teams
            </h1>
            <p className="text-gray-400 mt-2 text-sm md:text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-cyan-400" />
              View team details, squad composition, and remaining purse
            </p>
          </div>

          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                <Button className="relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-0 shadow-lg px-6 py-6 text-base font-bold">
                  <Home className="h-5 w-5 mr-2" />
                  Back to Home
                </Button>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats Bar */}
        {/* {!loading && teams.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-2 border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30">
                      <Users className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Total Teams</p>
                      <p className="text-2xl font-black text-white">{teams.length}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-500/30">
                      <Sparkles className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Active Squads</p>
                      <p className="text-2xl font-black text-emerald-400">
                        {teams.filter(t => t.players && t.players.length > 0).length}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl border border-amber-500/30">
                      <Trophy className="h-6 w-6 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Teams Ready</p>
                      <p className="text-2xl font-black text-amber-400">
                        {teams.filter(t => t.currentPurse < 100000).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )} */}

        {/* Teams Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="relative overflow-hidden bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl h-64"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent animate-shimmer" />
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-700/50 rounded-xl animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 bg-gray-700/50 rounded animate-pulse w-3/4" />
                        <div className="h-4 bg-gray-700/50 rounded animate-pulse w-1/2" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-700/50 rounded animate-pulse" />
                      <div className="h-3 bg-gray-700/50 rounded animate-pulse w-5/6" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : teams.length > 0 ? (
            <motion.div
              key="teams"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {teams.map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <TeamCard team={team} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 rounded-3xl blur-2xl"></div>

              <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border-2 border-gray-700/50 rounded-3xl p-20 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="inline-flex items-center justify-center p-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full mb-6 border-2 border-blue-500/30 shadow-xl"
                >
                  <Users className="h-16 w-16 text-blue-400" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-black text-white mb-3"
                >
                  No Teams Yet
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed text-lg"
                >
                  Teams will appear here once they are created. Start building your dream squads for the auction!
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link href="/team/create">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <div className="relative group inline-block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                        <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-3 shadow-lg">
                          <Users className="h-5 w-5" />
                          Create Your First Team
                          <Sparkles className="h-5 w-5" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-8 left-8 w-20 h-20 border-4 border-blue-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute bottom-8 right-8 w-16 h-16 border-4 border-cyan-500/20 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Teams;
