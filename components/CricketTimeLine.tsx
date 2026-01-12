'use client';
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function CricketTournamentTimeline() {
  const data = [
    {
      title: "11 Jan",
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <span className="text-xl">⏰</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
                Retention Deadline
              </h3>
             
            </div>
          </div>
          
          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            Final day for captains to announce retained players.
          </p>
          
          <div className="border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-red-100/50 p-4 dark:from-red-950/40 dark:to-red-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-red-900 dark:text-red-400">
                  Hard Deadline
                </p>
                <p className="mt-1 text-lg font-bold text-red-700 dark:text-red-300">
                  11:59 PM IST
                </p>
              </div>
              <div className="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-800 dark:bg-red-800 dark:text-red-200">
                URGENT
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "18 Jan",
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <span className="text-xl">📝</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                Player Registration
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Open Auction Pool Enrollment
              </p>
            </div>
          </div>
          
          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            Individual players can register for the auction pool. Submit your complete
            profile though the form provided above.
          </p>

          
          <div className="grid gap-3 rounded-lg bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 p-4 dark:from-blue-950/40 dark:via-cyan-950/20 dark:to-blue-950/40">
            <div className="flex items-center gap-3 rounded-md bg-white/70 p-3 shadow-sm transition-all hover:shadow-md dark:bg-neutral-900/50">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                <span className="text-sm">🏏</span>
              </div>
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                Specify role: Batsman / Bowler / All-rounder 
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-md bg-white/70 p-3 shadow-sm transition-all hover:shadow-md dark:bg-neutral-900/50">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                <span className="text-sm">💰</span>
              </div>
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                Set your base price and experience level
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-md bg-white/70 p-3 shadow-sm transition-all hover:shadow-md dark:bg-neutral-900/50">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white">
                <span className="text-sm">📊</span>
              </div>
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                Upload stats and previous tournament records
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "22 Jan",
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
              <span className="text-xl">🎯</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                Auction Day
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Live Player Bidding Event
              </p>
            </div>
          </div>
          
          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            The most exciting day! Team captains compete in live bidding to build their
            dream squads. Strategy, excitement, and talent come together.
          </p>
          
          <div className="overflow-hidden rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:border-amber-800 dark:from-amber-950/40 dark:via-yellow-950/20 dark:to-amber-950/40">
            <div className="border-b border-amber-200 bg-amber-500 px-4 py-2 dark:border-amber-700 dark:bg-amber-600">
              <p className="text-sm font-bold uppercase tracking-wide text-white">
                💼 Auction Format
              </p>
            </div>
            <div className="space-y-2 p-4">
              <div className="flex items-start gap-2">
                <span className="mt-1 text-amber-600 dark:text-amber-400">▸</span>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  Open bidding for all registered players
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 text-amber-600 dark:text-amber-400">▸</span>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  Highest bidder secures the player
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 text-amber-600 dark:text-amber-400">▸</span>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  Build your championship squad within budget of ₹1 Lacks
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "30 Jan",
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <span className="text-xl">🏆</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
                Tournament Day 1
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Opening Matches
              </p>
            </div>
          </div>
          
          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            The tournament kicks off! Opening matches begin with all teams ready to
            showcase their talent, strategy, and determination on the field.
          </p>
          
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white shadow-lg dark:from-green-600 dark:to-emerald-700">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10"></div>
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/10"></div>
            <div className="relative">
              <p className="text-2xl font-bold">🎉 Opening Day</p>
              <p className="mt-2 text-sm text-green-50">
                Let the battle for glory begin!
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "31 Jan",
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/30">
              <span className="text-xl">🏏</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
                Tournament Day 2
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Group Stage Continues
              </p>
            </div>
          </div>
          
          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            The action intensifies! Day 2 brings more thrilling matches as teams
            battle for supremacy and crucial qualification spots.
          </p>
          
          <div className="space-y-2 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 p-4 dark:from-cyan-950/40 dark:to-blue-950/40">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-white">
                <span className="text-xs">✓</span>
              </div>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Group stage matches in full swing
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-white">
                <span className="text-xs">✓</span>
              </div>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Points table and rankings taking shape
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-white">
                <span className="text-xs">✓</span>
              </div>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Qualification scenarios become clearer
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "1 Feb",
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
              <span className="text-xl">🏅</span>
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
                Tournament Day 3
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Finals & Championship
              </p>
            </div>
          </div>
          
          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            The grand finale! The best teams face off in knockout stages and finals.
            Witness champions being crowned in an unforgettable showdown.
          </p>
          
          <div className="relative overflow-hidden rounded-xl border-2 border-purple-300 bg-gradient-to-br from-purple-100 via-pink-100 to-purple-200 p-6 shadow-xl dark:border-purple-700 dark:from-purple-950/60 dark:via-pink-950/40 dark:to-purple-950/60">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-yellow-300/30 to-pink-300/30"></div>
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gradient-to-br from-purple-300/30 to-blue-300/30"></div>
            <div className="relative space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🏆</span>
                <p className="text-2xl font-black text-purple-900 dark:text-purple-200">
                  Championship Day
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-purple-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                  Semi-Finals
                </span>
                <span className="rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                  Final Match
                </span>
                <span className="rounded-full bg-pink-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                  Trophy Ceremony
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip bg-gray-500">
      <Timeline data={data} />
    </div>
  );
}
