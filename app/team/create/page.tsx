'use client';

import React, { useState } from 'react';
import axiosClient from '@/app/client/axiosClient';
import { toast } from 'sonner';
import { Users, Trophy, ImageIcon, User } from 'lucide-react';
import { motion } from 'framer-motion';

const CreateTeam = () => {
  const [name, setName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [captainImage, setCaptainImage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !captainName) {
      toast.error('Team name and captain name are required');
      return;
    }
    setSubmitting(true);
    try {
      await axiosClient.post('/api/auction/teams', {
        name,
        captainName,
        captainImage,
      });
      toast.success('Team created successfully!');
      setName('');
      setCaptainName('');
      setCaptainImage('');
    } catch (err) {
      toast.error('Failed to create team');
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
                <Users className="h-8 w-8 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Create New Team
                </h2>
                <p className="text-gray-400 text-sm mt-1">Add a team to the auction</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Team Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="name" className={labelClasses}>
                <Trophy className="h-4 w-4 text-cyan-400" />
                Team Name *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className={inputClasses}
                placeholder="Enter team name"
              />
            </motion.div>

            {/* Captain Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="captainName" className={labelClasses}>
                <User className="h-4 w-4 text-purple-400" />
                Captain Name *
              </label>
              <input
                id="captainName"
                type="text"
                value={captainName}
                onChange={e => setCaptainName(e.target.value)}
                required
                className={inputClasses}
                placeholder="Enter captain's name"
              />
            </motion.div>

            {/* Team Logo Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="captainImage" className={labelClasses}>
                <ImageIcon className="h-4 w-4 text-amber-400" />
                Team Logo
              </label>
              <input
                id="captainImage"
                type="url"
                value={captainImage}
                onChange={e => setCaptainImage(e.target.value)}
                placeholder="https://example.com/team-logo.png"
                className={inputClasses}
              />
              <p className="text-xs text-gray-500 mt-2 ml-1">Optional: Provide a URL to the team logo image</p>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
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
                    <span>Creating Team...</span>
                  </>
                ) : (
                  <>
                    <Users className="h-5 w-5" />
                    <span>Create Team</span>
                  </>
                )}
              </div>
            </motion.button>
          </form>

          {/* Bottom Accent Bar */}
          <div className="h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
      `}</style>
    </div>
  );
};

export default CreateTeam;
