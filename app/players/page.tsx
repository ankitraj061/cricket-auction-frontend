'use client';

import { useState, useEffect, useMemo } from 'react';
import PlayerCard from '@/components/PlayerCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Home, Filter, X, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import axiosClient from '../client/axiosClient';
import { Player, Team } from '@/app/types/type';
import { motion, AnimatePresence } from 'framer-motion';

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'sold' | 'unsold'>('all');
  const [priceFilter, setPriceFilter] = useState<number | 'all'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'BATSMAN' | 'BOWLER' | 'ALLROUNDER'>('all');

  // Fetch all players and teams once
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [playersResponse, teamsResponse] = await Promise.all([
          axiosClient.get<Player[]>('/api/auction/players'),
          axiosClient.get<Team[]>('/api/auction/teams')
        ]);
        setPlayers(playersResponse.data);
        setTeams(teamsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setPlayers([]);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Apply client-side filtering
  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            player.role.toLowerCase().includes(searchQuery.toLowerCase());

      const isSold = player.isSold && player.soldPrice != null;
      let matchesStatus = true;
      if (statusFilter === 'sold') matchesStatus = isSold;
      if (statusFilter === 'unsold') matchesStatus = !isSold;

      let matchesPrice = true;
      if (priceFilter !== 'all') {
        matchesPrice = player.basePrice === priceFilter;
      }

      let matchesRole = true;
      if (roleFilter !== 'all') {
        matchesRole = player.role === roleFilter;
      }

      return matchesSearch && matchesStatus && matchesPrice && matchesRole;
    });
  }, [players, searchQuery, statusFilter, priceFilter, roleFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriceFilter('all');
    setRoleFilter('all');
  };

  const hasActiveFilters = statusFilter !== 'all' || priceFilter !== 'all' || roleFilter !== 'all' || searchQuery;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-950 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-10 pointer-events-none"></div>

      <div className="relative container mx-auto px-4 py-8 md:py-12">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-semibold tracking-wide uppercase">
                Player Database
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-gray-100 to-emerald-200 bg-clip-text text-transparent">
              All Players
            </h1>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Browse, search, and filter {players.length} players for the auction
            </p>
          </div>
          
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                <Button
                  className="relative bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white border-0 shadow-lg px-6 py-6 text-base font-bold"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Back to Home
                </Button>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Enhanced Search & Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          {/* Glassmorphic Container */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-50"></div>
            
            <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-2 border-gray-700/50 rounded-3xl p-6 shadow-2xl">
              {/* Search Bar */}
              <div className="relative mb-6 group">
                {/* Search Icon */}
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300 z-10">
                  <Search className="h-5 w-5" />
                </div>

                {/* Input Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition duration-300"></div>

                <Input
                  type="text"
                  placeholder="Search by player name or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="relative pl-14 pr-12 py-7 bg-gray-900/60 border-2 border-gray-600/50 focus:border-cyan-500/50 placeholder:text-gray-500 text-white rounded-2xl text-base font-medium focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300 shadow-inner"
                />

                {/* Clear Search */}
                {searchQuery && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-full transition-colors duration-200 z-10"
                  >
                    <X className="h-4 w-4 text-gray-300" />
                  </motion.button>
                )}
              </div>

              {/* Filter Section */}
              <div className="space-y-4">
                {/* Filter Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Filter className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-semibold">Filters</span>
                    {hasActiveFilters && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-bold"
                      >
                        Active
                      </motion.span>
                    )}
                  </div>

                  {hasActiveFilters && (
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearFilters}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-xs font-semibold transition-colors duration-200"
                    >
                      <X className="h-3 w-3" />
                      Clear All
                    </motion.button>
                  )}
                </div>

                {/* Status Filter Chips */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {(['all', 'sold', 'unsold'] as const).map((filter) => (
                      <motion.button
                        key={filter}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStatusFilter(filter)}
                        className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                          statusFilter === filter
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/50'
                        }`}
                      >
                        {statusFilter === filter && (
                          <motion.div
                            layoutId="statusFilter"
                            className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10 capitalize">{filter}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Price Filter Chips */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Base Price</label>
                  <div className="flex flex-wrap gap-2">
                    {(['all', 2000, 3000, 5000] as const).map((price) => (
                      <motion.button
                        key={price}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPriceFilter(price)}
                        className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                          priceFilter === price
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/50'
                        }`}
                      >
                        {priceFilter === price && (
                          <motion.div
                            layoutId="priceFilter"
                            className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">
                          {price === 'all' ? 'All Prices' : `₹${(price / 1000).toFixed(0)}K`}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Role Filter Chips */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Player Role</label>
                  <div className="flex flex-wrap gap-2">
                    {(['all', 'BATSMAN', 'BOWLER', 'ALLROUNDER'] as const).map((role) => (
                      <motion.button
                        key={role}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRoleFilter(role)}
                        className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                          roleFilter === role
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/50'
                        }`}
                      >
                        {roleFilter === role && (
                          <motion.div
                            layoutId="roleFilter"
                            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">
                          {role === 'all' ? 'All Roles' : role}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results Counter */}
              <div className="mt-5 pt-5 border-t border-gray-700/50 flex items-center gap-2 text-gray-400">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span className="text-sm">
                  Showing <span className="font-bold text-emerald-400">{filteredPlayers.length}</span> of <span className="font-bold text-white">{players.length}</span> players
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative overflow-hidden bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl h-[280px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent animate-shimmer" />
                </motion.div>
              ))}
            </motion.div>
          ) : filteredPlayers.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <PlayerCard player={player} teams={teams} />
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
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl"></div>
              
              <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border-2 border-gray-700/50 rounded-3xl p-16 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="inline-flex items-center justify-center p-6 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full mb-6 border border-amber-500/30"
                >
                  <Search className="h-12 w-12 text-amber-400" />
                </motion.div>
                
                <h3 className="text-2xl font-black text-white mb-3">No Players Found</h3>
                <p className="text-gray-400 max-w-md mx-auto mb-6 leading-relaxed">
                  We couldn&apos;t find any players matching your current filters. Try adjusting your search criteria.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg">
                    <X className="h-5 w-5" />
                    Clear All Filters
                  </div>
                </motion.button>
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

export default Players;