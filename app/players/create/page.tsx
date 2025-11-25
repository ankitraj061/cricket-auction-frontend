'use client';

import React, { useState } from 'react';
import axiosClient from '@/app/client/axiosClient';
import { toast } from 'sonner';
import { UserPlus, Trophy, IndianRupee, Phone, FileText, BarChart3, ImageIcon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const roles = [
  { label: 'Batsman', value: 'BATSMAN' },
  { label: 'Bowler', value: 'BOWLER' },
  { label: 'Allrounder', value: 'ALLROUNDER' },
];

const CreatePlayer = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('BATSMAN');
  const [basePrice, setBasePrice] = useState('');
  const [mobile, setMobile] = useState('');
  const [description, setDescription] = useState('');
  const [stats, setStats] = useState('');
  const [playerImageUrl, setPlayerImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const basePriceOptions = [
    { label: '2000', value: 2000 },
    { label: '3000', value: 3000 },
    { label: '5000', value: 5000 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !basePrice) {
      toast.error('Name, role and base price are required');
      return;
    }
    setSubmitting(true);
    try {
      await axiosClient.post('/api/auction/players', {
        name,
        role,
        basePrice: Number(basePrice),
        mobile,
        description,
        stats,
        playerImageUrl,
      });
      toast.success('Player created successfully!');
      setName('');
      setRole('BATSMAN');
      setBasePrice('');
      setMobile('');
      setDescription('');
      setStats('');
      setPlayerImageUrl('');
    } catch (err) {
      toast.error('Failed to create player');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-gray-800/50 backdrop-blur-xl border border-gray-600/40 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 hover:border-gray-500/60";
  const labelClasses = "block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-20 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        {/* Holographic Border */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-20"></div>

        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-2xl border-2 border-gray-600/30 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-cyan-600/30 via-purple-600/30 to-pink-600/30 backdrop-blur-md p-6 border-b border-cyan-500/30">
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-[shimmer_3s_ease-in-out_infinite]"></div>
            
            <div className="relative flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <UserPlus className="h-8 w-8 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Create New Player
                </h2>
                <p className="text-gray-400 text-sm mt-1">Add a player to the auction pool</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="name" className={labelClasses}>
                <Trophy className="h-4 w-4 text-cyan-400" />
                Player Name *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className={inputClasses}
                placeholder="Enter player's full name"
              />
            </motion.div>

            {/* Role and Base Price - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Role Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="role" className={labelClasses}>
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  Role *
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  required
                  className={inputClasses}
                >
                  {roles.map(r => (
                    <option key={r.value} value={r.value} className="bg-gray-800">
                      {r.label}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Base Price Field */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="basePrice" className={labelClasses}>
                  <IndianRupee className="h-4 w-4 text-amber-400" />
                  Base Price *
                </label>
                <select
                  id="basePrice"
                  value={basePrice}
                  onChange={e => setBasePrice(e.target.value)}
                  required
                  className={inputClasses}
                >
                  <option value="" className="bg-gray-800">Select base price</option>
                  {basePriceOptions.map(opt => (
                    <option key={opt.value} value={opt.value} className="bg-gray-800">
                      ₹{opt.label}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Mobile Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="mobile" className={labelClasses}>
                <Phone className="h-4 w-4 text-emerald-400" />
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                placeholder="Optional mobile number"
                className={inputClasses}
              />
            </motion.div>

            {/* Image URL Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="playerImageUrl" className={labelClasses}>
                <ImageIcon className="h-4 w-4 text-blue-400" />
                Player Image URL
              </label>
              <input
                id="playerImageUrl"
                type="url"
                value={playerImageUrl}
                onChange={e => setPlayerImageUrl(e.target.value)}
                placeholder="https://example.com/player-image.jpg"
                className={inputClasses}
              />
            </motion.div>

            {/* Description Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="description" className={labelClasses}>
                <FileText className="h-4 w-4 text-violet-400" />
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className={`${inputClasses} resize-none`}
                placeholder="Brief description about the player"
                rows={3}
              />
            </motion.div>

            {/* Stats Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="stats" className={labelClasses}>
                <BarChart3 className="h-4 w-4 text-pink-400" />
                Performance Stats
              </label>
              <textarea
                id="stats"
                value={stats}
                onChange={e => setStats(e.target.value)}
                className={`${inputClasses} resize-none`}
                placeholder="Player statistics and achievements"
                rows={3}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="relative w-full group"
            >
              {/* Button Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
              
              <div className={`relative bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 ${
                submitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]'
              }`}>
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating Player...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5" />
                    <span>Create Player</span>
                  </>
                )}
              </div>
            </motion.button>
          </form>

          {/* Bottom Accent Bar */}
          <div className="h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreatePlayer;
