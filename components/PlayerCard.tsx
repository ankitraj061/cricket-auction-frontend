'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axiosClient from '@/app/client/axiosClient';
import { Player, Team } from '@/app/types/type';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IndianRupee, Phone, Trophy } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard = ({ player }: PlayerCardProps) => {
  const [teams, setTeams] = useState<Team[] | null>(null);
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


  const getPlayerIcon = () => {
  const role = player.role.toLowerCase();
  const iconClass = "h-6 w-6";

  if (role.includes('batsman') || role === 'batsmen') {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor">
        <path d="M12 3v14M12 3l-3 5M12 3l3 5" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="19" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (role.includes('bowler')) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor">
        <path d="M2 12h20M6 8l6 8 4-10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (role.includes('allrounder')) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (role.includes('keeper') || role.includes('wicket')) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor">
        <path d="M12 3v3m0 12v3M4 12h3m10 0h3M7 7l5 5 5-5M7 17l5-5 5 5" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Default: cricket ball
  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
      <circle cx="12" cy="12" r="9" opacity="0.8" />
      <path
        d="M12 3a9 9 0 0 0-7 14.2 9.5 9.5 0 0 0 14 0A9 9 0 0 0 12 3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

  const getTeamById = (id: number) => teams?.find((team) => team.id === id) ?? null;

  if (loading) {
    return (
      <Card className="bg-gray-800/60 border border-gray-700 rounded-xl h-[220px] animate-pulse" />
    );
  }

  const team = player.teamId ? getTeamById(player.teamId) : null;
  const isSold = player.isSold && player.soldPrice != null;
  const teamName = team ? `Team ${team.captainName}` : 'Unsold';

  // Role-based styling
  const roleConfig = {
    batsman: { label: 'Batsman', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    bowler: { label: 'Bowler', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    allrounder: { label: 'All-Rounder', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    wicketkeeper: { label: 'WK', color: 'bg-violet-500/20 text-violet-400 border-violet-500/30' },
    default: { label: player.role, color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
  };

  const roleKey = player.role.toLowerCase() as keyof typeof roleConfig;
  const role = roleConfig[roleKey] || roleConfig.default;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl flex flex-col h-full">
      <div className="p-4 pb-3">
        <div className="flex items-start gap-3">
          {/* Player Image */}
          <div className="relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border border-gray-600/50">
           {player.playerImageUrl ? (
  <div className="relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border border-gray-600/50">
    <Image
      src={player.playerImageUrl}
      alt={player.name}
      fill
      className="object-cover"
      sizes="56px"
    />
  </div>
) : (
  <div
    className={`flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center border border-gray-700/50 ${
      role.color.replace('text-', 'text-').replace('bg-', 'bg-').split(' ')[0] // Reuse role bg for avatar
    }`}
  >
    {getPlayerIcon()}
  </div>
)}
          </div>

          {/* Player Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-sm md:text-base line-clamp-1">
              {player.name}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
              <Phone className="h-3 w-3 flex-shrink-0" />
              <span className="line-clamp-1">{player.mobile || '—'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 mt-auto space-y-3">
        {/* Role & Price Row */}
        <div className="flex justify-between items-start">
          <Badge
            className={`text-xs font-medium border ${role.color} backdrop-blur-sm`}
          >
            {role.label}
          </Badge>

          <div className="text-right">
            {isSold ? (
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <IndianRupee className="h-3.5 w-3.5" />
                  <span className="text-sm">{player.soldPrice!.toLocaleString()}</span>
                </div>
                <span className="text-xs text-green-400 flex items-center gap-1 mt-0.5">
                  <Trophy className="h-3 w-3" />
                  Sold
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-gray-400">
                <IndianRupee className="h-3.5 w-3.5" />
                <span className="text-sm">{player.basePrice.toLocaleString()}</span>
                <Badge variant="outline" className="ml-2 h-5 px-1.5 text-[10px] border-amber-500/30 text-amber-400">
                  Available
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Team Info (if sold) */}
        {isSold && team && (
          <div className="pt-2 border-t border-gray-700/40">
            <p className="text-xs text-gray-500">Team</p>
            <p className="text-sm font-semibold text-emerald-300 line-clamp-1">{teamName}</p>
          </div>
        )}

        {/* Description & Stats */}
        {player.description && (
          <p className="text-xs text-gray-400 line-clamp-2">{player.description}</p>
        )}
        {player.stats && (
          <p className="text-xs italic text-gray-500">{player.stats}</p>
        )}
      </div>
    </Card>
  );
};

export default PlayerCard;