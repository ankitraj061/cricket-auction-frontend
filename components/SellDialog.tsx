'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Gavel, IndianRupee, Users, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ Local type definitions matching Auction component
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
  role: 'BATSMAN' | 'BOWLER' | 'ALLROUNDER' | 'WICKETKEEPER';
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

interface SellDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teams: Team[];
  currentPlayer: Player | null;
  onSell: (teamId: string, soldPrice: number) => void;
  defaultPrice: number;
}

const SellDialog = ({ open, onOpenChange, teams, currentPlayer, onSell, defaultPrice }: SellDialogProps) => {
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');

  const handleConfirm = () => {
    if (!selectedTeamId || !currentPlayer) {
      toast.error('Please select a team');
      return;
    }

    const selectedTeam = teams.find(t => t.teamId.toString() === selectedTeamId);
    
    if (!selectedTeam) {
      toast.error('Selected team not found');
      return;
    }

    if (selectedTeam.remainingPurse < defaultPrice) {
      toast.error(`${selectedTeam.name} does not have enough purse remaining`);
      return;
    }

    onSell(selectedTeamId, defaultPrice);
    
    // Close dialog and reset
    onOpenChange(false);
    setSelectedTeamId('');
  };

  // ✅ Reset when dialog closes
  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedTeamId('');
    }
  }, [open]);

  const selectedTeam = teams.find(t => t.teamId.toString() === selectedTeamId);
  const hasEnoughPurse = selectedTeam ? selectedTeam.remainingPurse >= defaultPrice : true;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-amber-500/30 text-white overflow-hidden shadow-2xl">
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3) 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }}
          />
        </div>

        <div className="relative z-10">
          <DialogHeader className="space-y-4 pb-6 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="p-3 bg-linear-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg"
              >
                <Gavel className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <DialogTitle className="text-2xl font-black bg-clip-text text-transparent bg-linear-to-r from-amber-300 via-yellow-200 to-amber-400">
                  Complete the Sale
                </DialogTitle>
                <DialogDescription className="text-gray-400 mt-1">
                  Finalize the auction for{' '}
                  <span className="font-bold text-emerald-400">{currentPlayer?.name}</span>
                </DialogDescription>
              </div>
            </div>

            {/* Player Info Card */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500/30 to-blue-500/30 rounded-xl blur"></div>
              <div className="relative bg-linear-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <Sparkles className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Base Price</p>
                      <p className="text-xl font-black text-emerald-400 flex items-center gap-1">
                        <IndianRupee className="h-4 w-4" />
                        {currentPlayer?.basePrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Role</p>
                    <p className="text-lg font-bold text-white">{currentPlayer?.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ✅ Final Bid Price Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-linear-to-r from-amber-500/40 to-orange-500/40 rounded-xl blur"></div>
              <div className="relative bg-linear-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 rounded-xl p-5">
                <div className="text-center">
                  <p className="text-sm text-gray-300 mb-2 font-medium">Final Bid Amount</p>
                  <div className="flex items-center justify-center gap-2">
                    <IndianRupee className="h-8 w-8 text-amber-400" />
                    <span className="text-5xl font-black bg-linear-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                      {defaultPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </DialogHeader>

          <div className="space-y-6 py-6">
            {/* Team Selection */}
            <div className="space-y-3">
              <Label htmlFor="team" className="text-base font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 text-cyan-400" />
                Select Winning Team
              </Label>
              <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
                <SelectTrigger
                  id="team"
                  className="h-14 bg-gray-800/60 border-2 border-gray-700 hover:border-cyan-500/50 transition-all text-base focus:ring-2 focus:ring-cyan-500/30"
                >
                  <SelectValue placeholder="Choose the team that won the bid..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {teams.map(team => (
                    <SelectItem
                      key={team.teamId}
                      value={team.teamId.toString()}
                      className="text-base py-3 cursor-pointer hover:bg-cyan-500/10 focus:bg-cyan-500/10"
                    >
                      <div className="flex items-center justify-between w-full gap-4">
                        <span className="font-semibold text-white">{team.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">{team.totalPlayers} players</span>
                          <span className="text-amber-400 text-sm font-bold">
                            ₹{team.remainingPurse.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Selected Team Info */}
              <AnimatePresence>
                {selectedTeam && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`${hasEnoughPurse ? 'bg-blue-500/10 border-blue-500/30' : 'bg-red-500/10 border-red-500/30'} border rounded-lg p-4 space-y-2`}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">Team:</span>
                        <span className="font-bold text-white">{selectedTeam.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">Current Players:</span>
                        <span className="font-bold text-cyan-400">{selectedTeam.totalPlayers}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm pt-2 border-t border-blue-500/20">
                        <span className="text-gray-300">Purse Remaining:</span>
                        <span className={`font-bold flex items-center gap-1 ${hasEnoughPurse ? 'text-amber-400' : 'text-red-400'}`}>
                          <IndianRupee className="h-3.5 w-3.5" />
                          {selectedTeam.remainingPurse.toLocaleString()}
                        </span>
                      </div>
                      
                      {/* ✅ Purse validation message */}
                      {!hasEnoughPurse && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2 text-red-400 text-sm bg-red-500/20 border border-red-500/30 rounded-lg p-2 mt-2"
                        >
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          <span className="font-medium">
                            Insufficient funds! Team needs ₹{(defaultPrice - selectedTeam.remainingPurse).toLocaleString()} more
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <DialogFooter className="gap-3 pt-6 border-t border-gray-700/50">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 border-2 border-gray-600 bg-gray-800 text-white font-semibold transition-all"
            >
              Cancel
            </Button>
            
            <motion.div 
              className="flex-1"
              whileHover={{ scale: !selectedTeamId || !hasEnoughPurse ? 1 : 1.02 }}
              whileTap={{ scale: !selectedTeamId || !hasEnoughPurse ? 1 : 0.98 }}
            >
              <div className="relative group">
                {selectedTeamId && hasEnoughPurse && (
                  <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-green-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                )}
                <Button
                  type="button"
                  onClick={handleConfirm}
                  disabled={!selectedTeamId || !hasEnoughPurse}
                  className="relative w-full h-12 bg-linear-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-500 hover:via-green-500 hover:to-emerald-600 text-white font-black text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg disabled:shadow-none transition-all"
                >
                  <Gavel className="h-5 w-5 mr-2" />
                  Confirm Sale
                </Button>
              </div>
            </motion.div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SellDialog;
