'use client';

import React, { useEffect, useState } from 'react';
import { useParams} from 'next/navigation';
import PlayerCard from '@/components/PlayerCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, IndianRupee, Users } from 'lucide-react';
import Link from 'next/link';
import axiosClient from '@/app/client/axiosClient';
import { motion } from 'framer-motion';
import { Team, Player } from '@/app/types/type';




const TeamDetail = () => {
  const params = useParams();
  const id = params.id;

  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTeam = async () => {
      try {
        const response = await axiosClient.get<Team>(`/api/auction/teams/${id}`);
        setTeam(response.data);
      } catch (err) {
        const error = err as { response?: { status: number } };
        setError(error.response?.status === 404 ? 'Team not found' : 'Failed to load team');
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 to-emerald-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading team details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 to-emerald-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="inline-block p-4 bg-red-500/10 rounded-full mb-4">
            <Users className="h-8 w-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{error}</h2>
          <p className="text-gray-400 mb-6">The team you&apos;re looking for doesn’t exist.</p>
          <Link href="/teams">
            <Button className="bg-emerald-600 hover:bg-emerald-500">Back to Teams</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-emerald-950 text-white">
      <div className="container mx-auto px-4 py-6">
        <Link href="/teams">
  <Button
    variant="outline"
    size="sm"
    className="mb-6 gap-2 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
  >
    <ArrowLeft className="h-4 w-4" />
    Back to Teams
  </Button>
</Link>


        {/* Team Header Card */}
        <Card className="mb-8 bg-gray-800/60 backdrop-blur-sm border border-emerald-500/30 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {team?.captainImage ? (
                <img
                  src={team.captainImage}
                  alt={team.captainName}
                  className="w-24 h-24 rounded-full border-4 border-amber-400/30 object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-amber-500/10 border-4 border-amber-400/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-amber-400">
                    {team?.captainName.charAt(0)}
                  </span>
                </div>
              )}
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-amber-300 to-emerald-200">
                  {team?.name}
                </h1>
                <p className="text-lg text-gray-300 mt-1">Captain: {team?.captainName}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <div className="p-3 bg-amber-500/20 rounded-lg">
                  <IndianRupee className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Remaining Purse</p>
                  <p className="text-2xl font-bold text-amber-300">₹{team?.currentPurse.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <Users className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Players</p>
                  <p className="text-2xl font-bold text-emerald-300">{team?.players?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Squad Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Team Squad</h2>
          <p className="text-gray-400">Players in this team</p>
        </div>

        {team?.players?.length === 0 ? (
          <Card className="bg-gray-800/50 border border-gray-700/40 p-12 text-center">
            <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No players in this team yet</p>
            <p className="text-gray-500 mt-2">Players will appear after the auction begins.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {team?.players?.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamDetail;