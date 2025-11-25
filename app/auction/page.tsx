'use client';

import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

import axiosClient from '@/app/client/axiosClient';
import AuctionCard from '@/components/AuctionCard';
import SellDialog from '@/components/SellDialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { IndianRupee, Users, Home, CheckCircle, Search, Gavel, TrendingUp, Zap, Trophy } from 'lucide-react';

// ✅ Local type definitions matching your API responses
interface Team {
  teamId: number;
  name: string;
  totalPlayers: number;
  remainingPurse: number;
}

interface Player {
  id: number;
  name: string;
  mobile: string | null;
  role: 'BATSMAN' | 'BOWLER' | 'ALLROUNDER';
  basePrice: number;
  soldPrice: number | null;
  description: string | null;
  stats: string | null;
  playerImageUrl: string | null;
  teamId: number | null;
  isSold: boolean;
  isUnsold: boolean;
  createdAt: string;
  updatedAt: string;
}

const INITIAL_PURSE = 100000;

const Auction = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSellDialogOpen, setIsSellDialogOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Player[]>([]);
  const [searching, setSearching] = useState(false);

  const animationFrameRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);
  
  // ✅ Change to HTMLAudioElement for HTML audio element
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const startConfetti = () => {
    const colors = ['#FFD700', '#FFA500', '#32CD32', '#22C55E', '#10B981'];
    const duration = 5000;
    const endTime = Date.now() + duration;
    
    endTimeRef.current = endTime;

    const frame = () => {
      if (Date.now() >= endTime) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        return;
      }

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
        zIndex: 10000,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
        zIndex: 10000,
      });

      animationFrameRef.current = requestAnimationFrame(frame);
    };

    frame();
  };

  // ✅ Play sold music
  const playSoldMusic = () => {
    if (audioRef.current) {
      console.log('🎵 Attempting to play audio...');
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.7;
      
      audioRef.current.play()
        .then(() => {
          console.log('✅ Audio playing successfully!');
        })
        .catch(error => {
          console.error('❌ Error playing audio:', error);
        });
    } else {
      console.error('❌ Audio ref is null');
    }
  };

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
      startConfetti();
      playSoldMusic();
      
      await axiosClient.put('/api/auction/players/sell', {
        playerId: currentPlayer.id,
        teamId: parseInt(teamId, 10),
        soldPrice,
      });
       
      const teamName = teams.find((t) => t.teamId === parseInt(teamId))?.name || 'Unknown';
      toast.success(`🎉 ${currentPlayer.name} sold to ${teamName}!`);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-green-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="text-center relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="relative inline-block"
          >
            <div className="w-24 h-24 rounded-full border-4 border-amber-500/30"></div>
            <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-emerald-400"></div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Gavel className="h-12 w-12 text-amber-400 mx-auto mb-4 animate-bounce" />
            <p className="text-gray-300 text-xl font-semibold">Initializing Live Auction...</p>
            <p className="text-gray-500 text-sm mt-2">Preparing the arena</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!currentPlayer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-green-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="max-w-lg w-full relative z-10"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-amber-500 to-green-500 rounded-3xl blur-xl opacity-50"></div>
            
            <Card className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border-2 border-emerald-500/30 text-center p-12 rounded-3xl shadow-2xl">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ rotate: { duration: 3, repeat: Infinity, ease: 'linear' }, scale: { duration: 2, repeat: Infinity } }}
                className="inline-block mb-6"
              >
                <div className="p-6 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full border-4 border-emerald-500/40">
                  <Trophy className="h-20 w-20 text-emerald-400" />
                </div>
              </motion.div>

              <h2 className="text-4xl font-black text-white mb-3 bg-gradient-to-r from-emerald-300 via-white to-amber-300 bg-clip-text text-transparent">
                Auction Complete!
              </h2>
              <p className="text-gray-400 mb-8 text-lg">All players have been successfully auctioned.</p>
              
              <Link href="/">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                    <Button size="lg" className="relative w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-6 text-lg">
                      <Home className="h-5 w-5 mr-2" />
                      Back to Home
                    </Button>
                  </div>
                </motion.div>
              </Link>
            </Card>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-green-900 text-white relative overflow-hidden">
      {/* ✅ AUDIO ELEMENT - MUST BE IN JSX */}
      <audio ref={audioRef} preload="auto">
        <source src="/iplmusic.mp3" type="audio/mpeg" />
      </audio>

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 py-8 md:py-10 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 bg-red-500/10 rounded-full border border-red-500/20 animate-pulse">
              <Zap className="h-3.5 w-3.5 text-red-400" />
              <span className="text-red-400 text-xs font-bold tracking-wide uppercase">
                🔴 Live Now
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-amber-300 via-white to-emerald-200 bg-clip-text text-transparent">
              Live Auction Arena
            </h1>
            <p className="text-gray-400 mt-2 text-sm md:text-base flex items-center gap-2">
              <Gavel className="h-4 w-4 text-amber-400" />
              Bid in real-time • Build your ultimate XI
            </p>
          </div>
          
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                <Button className="relative bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white border-0 shadow-lg px-6 py-6 text-base font-bold">
                  <Home className="h-5 w-5 mr-2" />
                  Exit Auction
                </Button>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Team Status Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="relative mb-6">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-2 border-gray-700/50 rounded-2xl p-4">
                <h2 className="text-xl font-black text-white flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
                    <Users className="h-5 w-5 text-cyan-400" />
                  </div>
                  Team Status
                  <span className="ml-auto px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-bold">
                    {teams.length} Teams
                  </span>
                </h2>
              </div>
            </div>

            <div className="space-y-3 max-h-[650px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-700/50 scrollbar-track-transparent">
              {teams.map((team, index) => (
                <motion.div
                  key={team.teamId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    
                    <Card className="relative bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-xl border border-gray-700/50 group-hover:border-emerald-500/40 rounded-xl p-5 transition-all duration-300 shadow-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg">
                          <Trophy className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-black text-white text-base line-clamp-1">{team.name}</div>
                          <div className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                            <TrendingUp className="h-3 w-3" />
                            {team.totalPlayers} Players
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-gray-400 font-medium">Remaining Purse</span>
                            <span className="text-amber-400 font-bold flex items-center gap-0.5">
                              <IndianRupee className="h-3 w-3" />
                              {team.remainingPurse.toLocaleString()}
                            </span>
                          </div>
                          <div className="relative w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ 
                                width: `${((INITIAL_PURSE - team.remainingPurse) / INITIAL_PURSE) * 100}%` 
                              }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-full shadow-lg"
                            />
                          </div>
                          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                            <span>₹0</span>
                            <span>₹{INITIAL_PURSE.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
                          <div className="text-center">
                            <p className="text-xs text-gray-400">Players</p>
                            <p className="text-lg font-black text-emerald-400">{team.totalPlayers}</p>
                          </div>
                          <div className="h-8 w-px bg-gray-700/50"></div>
                          <div className="text-center">
                            <p className="text-xs text-gray-400">Spent</p>
                            <p className="text-lg font-black text-red-400">
                              {((INITIAL_PURSE - team.remainingPurse) / 1000).toFixed(0)}K
                            </p>
                          </div>
                          <div className="h-8 w-px bg-gray-700/50"></div>
                          <div className="text-center">
                            <p className="text-xs text-gray-400">Budget%</p>
                            <p className="text-lg font-black text-blue-400">
                              {((team.remainingPurse / INITIAL_PURSE) * 100).toFixed(0)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Auction Arena */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-lg opacity-50"></div>
              
              <div className="relative flex gap-3 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-2 border-gray-700/50 rounded-2xl p-4">
                <div className="relative flex-grow group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-amber-400 transition-colors duration-300" />
                  <Input
                    placeholder="Search players by name or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-12 pr-4 py-6 bg-gray-900/60 border border-gray-600/50 focus:border-amber-500/50 text-white placeholder:text-gray-500 rounded-xl text-base focus:ring-2 focus:ring-amber-500/30 transition-all duration-300"
                  />
                </div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleSearch}
                    disabled={searching || !searchTerm.trim()}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-8 py-6 text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {searching ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Search className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      'Search'
                    )}
                  </Button>
                </motion.div>
              </div>

              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-30 mt-2 w-full max-h-80 overflow-y-auto bg-gray-800/95 backdrop-blur-xl border-2 border-gray-700/50 rounded-2xl shadow-2xl"
                  >
                    {searchResults.map((player, index) => (
                      <motion.div
                        key={player.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => selectPlayer(player)}
                        className="p-4 cursor-pointer hover:bg-emerald-500/20 border-b border-gray-700/50 last:border-b-0 flex justify-between items-center group transition-all duration-200"
                      >
                        <div>
                          <span className="font-semibold text-white group-hover:text-emerald-300 transition-colors">{player.name}</span>
                          <p className="text-xs text-gray-400 mt-0.5">{player.role}</p>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400 font-bold">
                          <IndianRupee className="h-4 w-4" />
                          <span>{player.basePrice.toLocaleString()}</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auction Spotlight */}
            <motion.div
              animate={{ scale: [1, 1.01, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/30 via-emerald-500/30 to-amber-500/30 rounded-3xl blur-xl opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border-2 border-gray-700/50 rounded-3xl p-2 shadow-2xl">
                <AuctionCard player={currentPlayer} />
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                  <Button
                    onClick={() => setIsSellDialogOpen(true)}
                    size="lg"
                    className="relative w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-lg font-black py-7 shadow-xl border-0"
                  >
                    <CheckCircle className="h-6 w-6 mr-2" />
                    Sell Player
                  </Button>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                  <Button
                    onClick={handleUnsold}
                    size="lg"
                    className="relative w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-lg font-black py-7 shadow-xl border-0"
                  >
                    ❌ Mark Unsold
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

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
