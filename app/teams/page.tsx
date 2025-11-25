'use client';

import React, { useEffect, useState } from 'react';
import TeamCard from '@/components/TeamCard';
import { Button } from '@/components/ui/button';
import { Home, Users } from 'lucide-react';
import Link from 'next/link';
import axiosClient from '../client/axiosClient';
import { Team } from '@/app/types/type';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-emerald-950 text-white">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">All Teams</h1>
            <p className="text-gray-400 mt-1">View team details, purse, and squad information</p>
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

        {/* Teams Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-800/50 border border-gray-700/40 rounded-xl h-48 animate-pulse"
              />
            ))}
          </div>
        ) : teams.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />  
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block p-4 bg-amber-500/10 rounded-full mb-4">
              <Users className="h-8 w-8 text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-200">No teams found</h3>
            <p className="text-gray-500 mt-2">Teams will appear once created in the system.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
