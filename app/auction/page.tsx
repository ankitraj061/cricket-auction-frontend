'use client';

import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti'; // ✅ Confetti

import axiosClient from '@/app/client/axiosClient';
import AuctionCard from '@/components/AuctionCard';
import SellDialog from '@/components/SellDialog';
import { Player, Team } from '@/app/types/type';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { IndianRupee, Users, Home, CheckCircle, Search } from 'lucide-react';

const Auction = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSellDialogOpen, setIsSellDialogOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Player[]>([]);
  const [searching, setSearching] = useState(false);

  // ✅ Confetti refs
  const animationFrameRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);

  // ✅ Cleanup confetti on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // ✅ Confetti animation (same as PremiumPage, cricket-themed colors)
 // ✅ Confetti animation - runs for 5 seconds
const startConfetti = () => {
  const colors = ['#FFD700', '#FFA500', '#32CD32', '#22C55E', '#10B981']; // Gold + Green
  const duration = 5000; // 5 seconds in milliseconds
  const endTime = Date.now() + duration;
  
  endTimeRef.current = endTime; // Set the end time

  const frame = () => {
    // Stop if we've exceeded the duration
    if (Date.now() >= endTime) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    // Left cannon
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors,
      zIndex: 10000,
    });

    // Right cannon
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors,
      zIndex: 10000,
    });

    // Continue animation
    animationFrameRef.current = requestAnimationFrame(frame);
  };

  frame();
};


  // Initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsRes, playerRes] = await Promise.all([
          axiosClient.get<Team[]>('/api/auction/summary'),
          axiosClient.get<Player>('/api/auction/next-player'),
        ]);
        setTeams(teamsRes.data);
        setCurrentPlayer(playerRes.data);
      } catch (error) {
        toast.error('Failed to load auction data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const reloadCurrentPlayer = async () => {
    try {
      const res = await axiosClient.get<Player>('/api/auction/next-player');
      setCurrentPlayer(res.data);
    } catch {
      setCurrentPlayer(null);
    }
  };

  const reloadTeams = async () => {
    try {
      const res = await axiosClient.get<Team[]>('/api/auction/summary');
      setTeams(res.data);
    } catch {
      setTeams([]);
    }
  };

  const handleUnsold = async () => {
    if (!currentPlayer) return;
    try {
      await axiosClient.put(`/api/auction/players/${currentPlayer.id}/unsold`);
      toast.success(`${currentPlayer.name} marked as unsold`);
      await reloadCurrentPlayer();
      await reloadTeams();
    } catch (error: any) {
      const message = error?.response?.data?.error || 'Failed to mark unsold';
      toast.error(message);
    }
  };

  const handleSell = async (teamId: string, soldPrice: number) => {
    if (!currentPlayer) return;
    try {
      await axiosClient.put('/api/auction/players/sell', {
        playerId: currentPlayer.id,
        teamId: parseInt(teamId, 10),
        soldPrice,
      });
      const teamName = teams.find((t) => t.teamId === parseInt(teamId))?.name || 'Unknown';
      toast.success(`🎉 ${currentPlayer.name} sold to ${teamName}!`);

      // ✅ TRIGGER CONFETTI ON SALE!
      startConfetti();

      await reloadCurrentPlayer();
      await reloadTeams();
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Failed to sell player');
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    try {
      const res = await axiosClient.get<Player[]>('/api/auction/search', {
        params: { q: searchTerm },
      });
      setSearchResults(res.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Search failed');
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const selectPlayer = (player: Player) => {
    setCurrentPlayer(player);
    setSearchResults([]);
    setSearchTerm('');
  };

  // === Loading State ===
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-green-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-amber-500/30 animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-emerald-400 animate-spin animation-delay-300"></div>
          </div>
          <p className="mt-6 text-gray-300 text-lg">Initializing auction...</p>
        </div>
      </div>
    );
  }

  // === Auction Complete ===
  if (!currentPlayer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-emerald-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full"
        >
          <Card className="bg-gray-800/70 backdrop-blur-sm border border-emerald-500/30 text-center p-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <CheckCircle className="h-20 w-20 text-emerald-400 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Auction Complete!</h2>
            <p className="text-gray-400 mb-6">All players have been auctioned.</p>
            <Link href="/">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-green-900 text-white relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-3 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 2px, transparent 2px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 py-6 md:py-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-white to-emerald-200"
            >
              Live Auction Arena
            </motion.h1>
            <p className="text-gray-400 mt-1">Bid in real-time. Build your ultimate XI.</p>
          </div>
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Team Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-4"
          >
            <h2 className="text-xl font-bold text-gray-200 mb-3 flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-400" />
              Team Status
            </h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {teams.map((team) => (
                <Card
                  key={team.teamId}
                  className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-emerald-500/40 transition-all"
                >
                  <div className="font-bold text-white text-lg mb-2">{team.name}</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Purse</span>
                        <span>₹{team.remainingPurse.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full"
                          style={{
                            width: `${((team.initialPurse - team.remainingPurse) / team.initialPurse) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Players</span>
                      <span className="text-emerald-400 font-medium">{team.totalPlayers}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Right: Search + Auction + Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Search */}
            <div className="relative">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input
                    placeholder="Search players by name or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 pr-4 py-5 bg-gray-800/60 border-gray-700/50 text-white placeholder:text-gray-500 rounded-xl text-base focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={searching || !searchTerm.trim()}
                  className="bg-amber-600 hover:bg-amber-500 text-white px-6"
                >
                  {searching ? '...' : 'Go'}
                </Button>
              </div>

              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute z-20 mt-2 w-full max-h-60 overflow-y-auto bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl"
                  >
                    {searchResults.map((player) => (
                      <div
                        key={player.id}
                        onClick={() => selectPlayer(player)}
                        className="p-3 cursor-pointer hover:bg-emerald-500/10 border-b border-gray-700 last:border-b-0 flex justify-between"
                      >
                        <span>{player.name}</span>
                        <span className="text-amber-400">₹{player.basePrice.toLocaleString()}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auction Spotlight */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 to-emerald-500/30 rounded-2xl blur opacity-75 animate-pulse"></div>
              <div className="relative bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-1">
                <AuctionCard player={currentPlayer} />
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={() => setIsSellDialogOpen(true)}
                size="lg"
                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-lg font-bold py-6"
              >
                ✅ Sell Player
              </Button>
              <Button
                onClick={handleUnsold}
                size="lg"
                variant="destructive"
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-lg font-bold py-6"
              >
                ❌ Mark Unsold
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sell Dialog */}
      <SellDialog
        open={isSellDialogOpen}
        onOpenChange={setIsSellDialogOpen}
        teams={teams}
        currentPlayer={currentPlayer}
        onSell={handleSell}
      />
    </div>
  );
};

export default Auction;