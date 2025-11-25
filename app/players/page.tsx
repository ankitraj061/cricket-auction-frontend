'use client';

import { useState, useEffect, useMemo } from 'react';
import PlayerCard from '@/components/PlayerCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Home, Filter } from 'lucide-react';
import Link from 'next/link';
import axiosClient from '../client/axiosClient';
import { Player } from '@/app/types/type';
import { motion, AnimatePresence } from 'framer-motion';

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'sold' | 'unsold'>('all');
  const [priceFilter, setPriceFilter] = useState<number | 'all'>('all');

  // Fetch all players once
  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const { data } = await axiosClient.get<Player[]>('/api/auction/players');
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  // Apply client-side filtering (search + status + price)
  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      // Search
      const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            player.role.toLowerCase().includes(searchQuery.toLowerCase());

      // Status
      const isSold = player.isSold && player.soldPrice != null;
      let matchesStatus = true;
      if (statusFilter === 'sold') matchesStatus = isSold;
      if (statusFilter === 'unsold') matchesStatus = !isSold;

      // Price
      let matchesPrice = true;
      if (priceFilter !== 'all') {
        matchesPrice = player.basePrice === priceFilter;
      }

      return matchesSearch && matchesStatus && matchesPrice;
    });
  }, [players, searchQuery, statusFilter, priceFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriceFilter('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-emerald-950 text-white">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">All Players</h1>
            <p className="text-gray-400 mt-1">Browse, search, and filter players for the auction</p>
          </div>
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
            >
              <Home className="h-4 w-4" />
              Back to Auction
            </Button>
          </Link>
        </div>

        {/* Search + Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <Search className="h-5 w-5" />
            </div>
            <Input
              type="text"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 bg-gray-800/60 border-gray-700/50 placeholder:text-gray-500 text-white rounded-xl text-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-gray-400 flex items-center gap-1 text-sm">
              <Filter className="h-4 w-4" /> Filters:
            </span>

            {/* Status Filter */}
            <div className="flex gap-2">
              {(['all', 'sold', 'unsold'] as const).map((filter) => (
                <Button
                  key={filter}
                  size="sm"
                  variant={statusFilter === filter ? 'default' : 'outline'}
                  className={`text-xs px-3 h-8 ${
                    statusFilter === filter
                      ? 'bg-emerald-600 hover:bg-emerald-500'
                      : 'border-gray-600 text-gray-300 hover:bg-gray-700/50'
                  }`}
                  onClick={() => setStatusFilter(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              ))}
            </div>

            {/* Price Filter */}
            <div className="flex gap-2">
              {(['all', 2000, 3000, 5000] as const).map((price) => (
                <Button
                  key={price}
                  size="sm"
                  variant={priceFilter === price ? 'default' : 'outline'}
                  className={`text-xs px-3 h-8 ${
                    priceFilter === price
                      ? 'bg-amber-600 hover:bg-amber-500'
                      : 'border-gray-600 text-gray-300 hover:bg-gray-700/50'
                  }`}
                  onClick={() => setPriceFilter(price)}
                >
                  {price === 'all' ? 'All Prices' : `₹${(price / 1000).toFixed(0)}K`}
                </Button>
              ))}
            </div>

            {(statusFilter !== 'all' || priceFilter !== 'all' || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-500/5 h-8 px-3"
                onClick={clearFilters}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-800/50 border border-gray-700/40 rounded-xl h-64 animate-pulse"
                />
              ))}
            </motion.div>
          ) : filteredPlayers.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredPlayers.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="inline-block p-4 bg-amber-500/10 rounded-full mb-4">
                <Search className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">No players found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your filters or search terms.
              </p>
              <Button
                variant="ghost"
                className="mt-4 text-amber-400 hover:text-amber-300 hover:bg-amber-500/5"
                onClick={clearFilters}
              >
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Players;