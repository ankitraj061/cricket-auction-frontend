'use client';

import { Card } from '@/components/ui/card';
import { Users, IndianRupee } from 'lucide-react';
import Link from 'next/link';
import { Team } from '@/app/types/type';
import { motion } from 'framer-motion';

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300 }}>
      <Link href={`/teams/${team.id}`} className="block h-full">
        <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl h-full overflow-hidden hover:border-emerald-500/40 transition-all">
          <div className="p-5 flex flex-col h-full">
            {/* Team Header */}
            <div className="flex items-center gap-3 mb-4">
              {team.captainImage ? (
                <img
                  src={team.captainImage}
                  alt={team.captainName}
                  className="w-12 h-12 rounded-full border-2 border-emerald-500/30 object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border-2 border-emerald-500/20">
                  <span className="text-emerald-400 font-bold text-sm">
                    {team.captainName.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="font-bold text-lg line-clamp-1">Team {team.captainName}</h3>
            </div>

            {/* Stats */}
            <div className="space-y-3 mt-auto pt-3 border-t border-gray-700/40">
              <div className="flex items-center gap-2 text-sm">
                <IndianRupee className="h-4 w-4 text-amber-400" />
                <span className="text-gray-300">Purse:</span>
                <span className="font-semibold text-amber-300">
                  ₹{team.currentPurse.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">Players:</span>
                <span className="font-semibold text-emerald-300">
                  {team.players?.length || 0}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default TeamCard;