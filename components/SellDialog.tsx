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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Team, Player } from '@/app/types/type';
import { Gavel, TrendingUp, IndianRupee, Users, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SellDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teams: Team[];
  currentPlayer: Player | null;
  onSell: (teamId: string, soldPrice: number) => void;
}

const SellDialog = ({ open, onOpenChange, teams, currentPlayer, onSell }: SellDialogProps) => {
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  const [soldPrice, setSoldPrice] = useState<string>('');

  const handleConfirm = () => {
    if (!selectedTeamId || !soldPrice || !currentPlayer) {
      toast.error('Please select a team and enter sold price');
      return;
    }

    const price = parseInt(soldPrice, 10);
    if (isNaN(price) || price < currentPlayer.basePrice) {
      toast.error(`Sold price must be at least ₹${currentPlayer.basePrice.toLocaleString()}`);
      return;
    }

    const selectedTeam = teams.find(t => t.teamId?.toString() === selectedTeamId);
    
    if (!selectedTeam) {
      toast.error('Selected team not found');
      return;
    }

    if ((selectedTeam.remainingPurse ?? 0) < price) {
      toast.error('Team does not have enough purse');
      return;
    }

    onSell(selectedTeamId, price);
    toast.success(`${currentPlayer.name} sold to Team ${selectedTeam.name} for ₹${price.toLocaleString()}`);

    onOpenChange(false);
    setSelectedTeamId('');
    setSoldPrice('');
  };

  useEffect(() => {
    if (!open) {
      setSelectedTeamId('');
      setSoldPrice('');
    }
  }, [open]);

  const selectedTeam = teams.find(t => t.teamId?.toString() === selectedTeamId);
  const priceValue = parseInt(soldPrice, 10);
  const isValidPrice = !isNaN(priceValue) && priceValue >= (currentPlayer?.basePrice || 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-amber-500/30 text-white overflow-hidden">
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
                transition={{ duration: 2, repeat: Infinity }}
                className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl"
              >
                <Gavel className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                  Complete the Sale
                </DialogTitle>
                <DialogDescription className="text-gray-400 mt-1">
                  Finalize the auction for {' '}
                  <span className="font-bold text-amber-400">{currentPlayer?.name}</span>
                </DialogDescription>
              </div>
            </div>

            {/* Player Info Card */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <Sparkles className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Base Price</p>
                    <p className="text-xl font-bold text-emerald-400">
                      ₹{currentPlayer?.basePrice.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Role</p>
                  <p className="text-lg font-semibold text-white">{currentPlayer?.role}</p>
                </div>
              </div>
            </motion.div>
          </DialogHeader>

          <div className="space-y-6 py-6">
            {/* Team Selection */}
            <div className="space-y-3">
              <Label htmlFor="team" className="text-base font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 text-emerald-400" />
                Select Winning Team
              </Label>
              <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
                <SelectTrigger
                  id="team"
                  className="h-14 bg-gray-800/50 border-gray-700 hover:border-emerald-500/50 transition-all text-base"
                >
                  <SelectValue placeholder="Choose the team that won the bid..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {teams
                    .filter(team => team.teamId)
                    .map(team => (
                      <SelectItem
                        key={team.teamId}
                        value={team.teamId.toString()}
                        className="text-base py-3 cursor-pointer hover:bg-emerald-500/10"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-semibold">{team.name}</span>
                          <span className="text-amber-400 text-sm ml-4">
                            ₹{(team.remainingPurse ?? 0).toLocaleString()} remaining
                          </span>
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
                    className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Team Purse Remaining:</span>
                      <span className="font-bold text-blue-400">
                        ₹{(selectedTeam.remainingPurse ?? 0).toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price Input */}
            <div className="space-y-3">
              <Label htmlFor="price" className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-amber-400" />
                Final Bid Amount
              </Label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <IndianRupee className="h-5 w-5 text-amber-400" />
                </div>
                <Input
                  id="price"
                  type="number"
                  placeholder={`Minimum: ${currentPlayer?.basePrice.toLocaleString()}`}
                  value={soldPrice}
                  onChange={e => setSoldPrice(e.target.value)}
                  className="h-14 pl-12 pr-4 bg-gray-800/50 border-gray-700 focus:border-amber-500 text-lg font-semibold text-white placeholder:text-gray-500"
                  min={currentPlayer?.basePrice}
                />
              </div>

              {/* Price Validation Feedback */}
              <AnimatePresence>
                {soldPrice && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    {isValidPrice ? (
                      <div className="flex items-center gap-2 text-emerald-400 text-sm">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        Valid bid amount
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                        Must be at least ₹{currentPlayer?.basePrice.toLocaleString()}
                      </div>
                    )}
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
              className="flex-1 h-12 border-gray-600 hover:bg-gray-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={!selectedTeamId || !isValidPrice}
              className="flex-1 h-12 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-500 hover:via-green-500 hover:to-emerald-600 text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
            >
              <Gavel className="h-5 w-5 mr-2" />
              Confirm Sale
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SellDialog;
