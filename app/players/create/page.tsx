'use client';

import React, { useState } from 'react';
import axiosClient from '@/app/client/axiosClient';

import { toast } from 'sonner';

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
      toast('Error: Name, role and base price are required');
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
      toast('Player created successfully!');
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
  
    return (
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create Player</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">Name *</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
              placeholder="Player name" />
          </div>
          <div>
            <label htmlFor="role" className="block font-semibold mb-1">Role *</label>
            <select
              id="role"
              value={role}
              onChange={e => setRole(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            >
              {roles.map(r => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="basePrice" className="block font-semibold mb-1">Base Price *</label>
            <select
              id="basePrice"
              value={basePrice}
              onChange={e => setBasePrice(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select base price</option>
              {basePriceOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  ₹{opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="mobile" className="block font-semibold mb-1">Mobile</label>
            <input
              id="mobile"
              type="text"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              placeholder="Optional mobile number"
              className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label htmlFor="description" className="block font-semibold mb-1">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Player description"
              rows={3} />
          </div>
          <div>
            <label htmlFor="stats" className="block font-semibold mb-1">Stats</label>
            <textarea
              id="stats"
              value={stats}
              onChange={e => setStats(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Player stats"
              rows={3} />
          </div>
          <div>
            <label htmlFor="playerImageUrl" className="block font-semibold mb-1">Player Image URL</label>
            <input
              id="playerImageUrl"
              type="url"
              value={playerImageUrl}
              onChange={e => setPlayerImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border rounded" />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark disabled:opacity-60"
          >
            {submitting ? 'Creating...' : 'Create Player'}
          </button>
        </form>
      </div>
    );
};

export default CreatePlayer;
