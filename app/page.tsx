'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Users, UserSearch, Gavel } from 'lucide-react';

const HomePage = () => {
  const menuItems = [
    {
      title: 'Players',
      description: 'Browse & filter players by role, price, and stats.',
      icon: UserSearch,
      link: '/players',
      color: 'text-emerald-600',
      bgIcon: 'bg-emerald-50',
      border: 'border-emerald-500/30',
      hover: 'hover:border-emerald-500 hover:shadow-emerald-500/10',
    },
    {
      title: 'Teams',
      description: 'View team rosters, remaining purse, and strategy.',
      icon: Users,
      link: '/teams',
      color: 'text-blue-600',
      bgIcon: 'bg-blue-50',
      border: 'border-blue-500/30',
      hover: 'hover:border-blue-500 hover:shadow-blue-500/10',
    },
    {
      title: 'Auction',
      description: 'Launch live bidding. Control the auction in real time.',
      icon: Gavel,
      link: '/auction',
      color: 'text-amber-600',
      bgIcon: 'bg-amber-50',
      border: 'border-amber-500/30',
      hover: 'hover:border-amber-500 hover:shadow-amber-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-emerald-950 text-white">
      {/* Optional: subtle pitch texture via CSS if desired */}
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-block px-4 py-1 mb-4 bg-amber-500/10 rounded-full border border-amber-500/20">
            <span className="text-amber-400 text-sm font-medium tracking-wide">
              LIVE AUCTION SYSTEM
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-white to-emerald-200">
              Cricket Auction Hub
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Draft your dream XI. Manage budgets. Outbid rivals. Own the season.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <Link href={item.link} className="block h-full">
                  <Card className={`h-full bg-gray-800/60 backdrop-blur-sm border ${item.border} ${item.hover} transition-all duration-300 overflow-hidden rounded-xl shadow-lg`}>
                    <div className="p-6 flex flex-col h-full">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl ${item.bgIcon} flex items-center justify-center mb-5 ${item.color} shadow-sm`}>
                        <Icon className="h-7 w-7" />
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                        {item.description}
                      </p>

                      {/* CTA hint */}
                      <div className="mt-4 pt-3 border-t border-gray-700/50">
                        <span className="text-xs text-gray-500 flex items-center">
                          Go to {item.title.toLowerCase()} →
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative bottom accent */}
        <div className="mt-24 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Cricket Auction Platform • Official Draft System
        </div>
      </div>
    </div>
  );
};

export default HomePage;