import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Check,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  RefreshCw,
  Users,
  Utensils,
  MessageSquare,
  AlertCircle,
  HelpCircle,
  Wine,
  Sun,
  Heart,
  MapPin,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/customSupabaseClient';

const Admin = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedGuest, setSelectedGuest] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all guests
      const { data: guestsData, error: guestsError } = await supabase
        .from('guests')
        .select('*')
        .order('name', { ascending: true });

      if (guestsError) throw guestsError;

      // Fetch all RSVPs
      const { data: rsvpsData, error: rsvpsError } = await supabase
        .from('rsvps')
        .select('*');

      if (rsvpsError) throw rsvpsError;

      // Map RSVPs by lowercased trimmed guest_name
      const rsvpsMap = new Map();
      (rsvpsData || []).forEach(r => {
        if (r.guest_name) {
          rsvpsMap.set(r.guest_name.trim().toLowerCase(), r);
        }
      });

      // Build unified guest list
      const combined = (guestsData || []).map(g => {
        const nameKey = (g.name || '').trim().toLowerCase();
        const rsvp = rsvpsMap.get(nameKey);
        const hasRsvp = !!rsvp;

        const isAttendingTour = Boolean(rsvp?.attending_tour);
        const isAttendingShabbat = Boolean(rsvp?.attending_shabbat);
        const isAttendingPool = Boolean(rsvp?.attending_pool_party);
        const isAttendingWedding = Boolean(rsvp?.attending_wedding);

        let status = 'no_response';
        if (hasRsvp) {
          if (isAttendingTour || isAttendingShabbat || isAttendingPool || isAttendingWedding) {
            status = 'attending';
          } else {
            status = 'declined';
          }
        }

        return {
          id: g.id || nameKey,
          name: g.name,
          groupId: g.group_id || 'Individual',
          hasRsvp,
          status,
          attendingTour: isAttendingTour,
          attendingShabbat: isAttendingShabbat,
          attendingPool: isAttendingPool,
          attendingWedding: isAttendingWedding,
          dietaryRestrictions: rsvp?.dietary_restrictions || '',
          additionalNotes: rsvp?.additional_notes || '',
          rsvpId: rsvp?.id || null,
          updatedAt: rsvp?.updated_at || rsvp?.created_at || null
        };
      });

      // Check if any RSVP is not in the guests list (e.g. plus-one not in guests table)
      const existingGuestNames = new Set((guestsData || []).map(g => (g.name || '').trim().toLowerCase()));
      (rsvpsData || []).forEach(r => {
        const rsvpNameKey = (r.guest_name || '').trim().toLowerCase();
        if (rsvpNameKey && !existingGuestNames.has(rsvpNameKey)) {
          const isAttendingTour = Boolean(r.attending_tour);
          const isAttendingShabbat = Boolean(r.attending_shabbat);
          const isAttendingPool = Boolean(r.attending_pool_party);
          const isAttendingWedding = Boolean(r.attending_wedding);

          let status = 'declined';
          if (isAttendingTour || isAttendingShabbat || isAttendingPool || isAttendingWedding) {
            status = 'attending';
          }

          combined.push({
            id: r.id || rsvpNameKey,
            name: r.guest_name,
            groupId: 'External RSVP',
            hasRsvp: true,
            status,
            attendingTour: isAttendingTour,
            attendingShabbat: isAttendingShabbat,
            attendingPool: isAttendingPool,
            attendingWedding: isAttendingWedding,
            dietaryRestrictions: r.dietary_restrictions || '',
            additionalNotes: r.additional_notes || '',
            rsvpId: r.id,
            updatedAt: r.updated_at || r.created_at || null
          });
        }
      });

      setGuests(combined);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setError(err.message || 'Failed to load guest and RSVP data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Compute metrics
  const stats = useMemo(() => {
    const total = guests.length;
    const rsvped = guests.filter(g => g.hasRsvp).length;
    const pending = total - rsvped;
    const attendingAny = guests.filter(g => g.status === 'attending').length;
    const declinedAll = guests.filter(g => g.status === 'declined').length;
    const wedding = guests.filter(g => g.hasRsvp && g.attendingWedding).length;
    const shabbat = guests.filter(g => g.hasRsvp && g.attendingShabbat).length;
    const pool = guests.filter(g => g.hasRsvp && g.attendingPool).length;
    const tour = guests.filter(g => g.hasRsvp && g.attendingTour).length;
    const withDietary = guests.filter(g => g.dietaryRestrictions && g.dietaryRestrictions.trim() !== '').length;
    const withNotes = guests.filter(g => g.additionalNotes && g.additionalNotes.trim() !== '').length;

    return {
      total,
      rsvped,
      pending,
      attendingAny,
      declinedAll,
      wedding,
      shabbat,
      pool,
      tour,
      withDietary,
      withNotes
    };
  }, [guests]);

  // Filtering
  const filteredGuests = useMemo(() => {
    return guests.filter(g => {
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = g.name.toLowerCase().includes(term);
        const matchesGroup = g.groupId.toLowerCase().includes(term);
        const matchesDiet = g.dietaryRestrictions.toLowerCase().includes(term);
        const matchesNotes = g.additionalNotes.toLowerCase().includes(term);
        if (!matchesName && !matchesGroup && !matchesDiet && !matchesNotes) {
          return false;
        }
      }

      // Filter category
      switch (activeFilter) {
        case 'rsvped':
          return g.hasRsvp;
        case 'no_response':
          return !g.hasRsvp;
        case 'wedding':
          return g.hasRsvp && g.attendingWedding;
        case 'shabbat':
          return g.hasRsvp && g.attendingShabbat;
        case 'pool':
          return g.hasRsvp && g.attendingPool;
        case 'tour':
          return g.hasRsvp && g.attendingTour;
        case 'declined':
          return g.status === 'declined';
        case 'dietary':
          return g.dietaryRestrictions && g.dietaryRestrictions.trim() !== '';
        case 'notes':
          return g.additionalNotes && g.additionalNotes.trim() !== '';
        default:
          return true;
      }
    });
  }, [guests, searchTerm, activeFilter]);

  // Sorting
  const sortedGuests = useMemo(() => {
    const list = [...filteredGuests];
    const { key, direction } = sortConfig;

    list.sort((a, b) => {
      let aVal = a[key];
      let bVal = b[key];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal || '').toLowerCase();
      }

      // Special handling for booleans / status
      if (typeof aVal === 'boolean') {
        aVal = aVal ? 1 : 0;
        bVal = bVal ? 1 : 0;
      }

      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  }, [filteredGuests, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 opacity-60 ml-1 inline" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-black ml-1 inline" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-black ml-1 inline" />
    );
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      'Guest Name',
      'Group / Party',
      'RSVP Status',
      'Wedding (Sun)',
      'Shabbat (Fri)',
      'Pool Party (Sat)',
      'City Tour (Fri)',
      'Dietary Restrictions',
      'Additional Notes'
    ];

    const rows = sortedGuests.map(g => [
      `"${g.name.replace(/"/g, '""')}"`,
      `"${g.groupId.replace(/"/g, '""')}"`,
      g.hasRsvp ? (g.status === 'attending' ? 'Attending' : 'Declined All') : 'No Response',
      !g.hasRsvp ? 'No Response' : (g.attendingWedding ? 'Attending' : 'No'),
      !g.hasRsvp ? 'No Response' : (g.attendingShabbat ? 'Attending' : 'No'),
      !g.hasRsvp ? 'No Response' : (g.attendingPool ? 'Attending' : 'No'),
      !g.hasRsvp ? 'No Response' : (g.attendingTour ? 'Attending' : 'No'),
      `"${(g.dietaryRestrictions || '').replace(/"/g, '""')}"`,
      `"${(g.additionalNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `wedding_rsvps_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-purple-100 py-10 px-4 md:px-8 relative overflow-x-hidden font-sans">
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
          backgroundSize: '28px 28px'
        }} 
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-block bg-white border-4 border-black px-6 py-2 shadow-[6px_6px_0_0_#000] transform -rotate-1 mb-2">
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                RSVP Master Dashboard
              </h1>
            </div>
            <p className="font-mono text-sm md:text-base font-bold text-gray-700">
              Live guest response tracking & event headcount
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={fetchData}
              disabled={loading}
              className="bg-white hover:bg-yellow-200 text-black font-mono font-bold uppercase border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={exportToCSV}
              disabled={guests.length === 0}
              className="bg-yellow-300 hover:bg-yellow-400 text-black font-mono font-bold uppercase border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="bg-red-200 border-4 border-black p-4 shadow-[6px_6px_0_0_#000] flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-700 shrink-0" />
            <div>
              <p className="font-bold text-red-900 font-mono">Error loading RSVP data</p>
              <p className="text-sm font-mono text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Total Guests */}
          <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0_0_#000]">
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-xs font-mono font-bold uppercase text-black">Total Guests</span>
              <Users className="w-4 h-4 text-black" />
            </div>
            <div className="text-3xl font-black text-black">{stats.total}</div>
            <div className="text-xs font-mono text-gray-600 mt-1">Invited on list</div>
          </div>

          {/* RSVP'ed */}
          <div className="bg-green-100 border-3 border-black p-4 shadow-[4px_4px_0_0_#000]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-bold uppercase text-black">RSVP'ed</span>
              <Check className="w-4 h-4 text-green-700 font-bold" />
            </div>
            <div className="text-3xl font-black text-green-900">{stats.rsvped}</div>
            <div className="text-xs font-mono text-green-800 font-bold mt-1">
              {stats.total > 0 ? Math.round((stats.rsvped / stats.total) * 100) : 0}% response rate
            </div>
          </div>

          {/* Not RSVP'ed */}
          <div className="bg-yellow-100 border-3 border-black p-4 shadow-[4px_4px_0_0_#000]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-bold uppercase text-black">No Response</span>
              <HelpCircle className="w-4 h-4 text-yellow-800" />
            </div>
            <div className="text-3xl font-black text-yellow-900">{stats.pending}</div>
            <div className="text-xs font-mono text-yellow-800 font-bold mt-1">
              {stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0}% pending
            </div>
          </div>

          {/* Attending Wedding */}
          <div className="bg-purple-200 border-3 border-black p-4 shadow-[4px_4px_0_0_#000]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-bold uppercase text-black">Wedding</span>
              <Heart className="w-4 h-4 text-purple-800" />
            </div>
            <div className="text-3xl font-black text-purple-900">{stats.wedding}</div>
            <div className="text-xs font-mono text-purple-800 font-bold mt-1">Attending Sun</div>
          </div>

          {/* Attending Shabbat */}
          <div className="bg-blue-100 border-3 border-black p-4 shadow-[4px_4px_0_0_#000]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-bold uppercase text-black">Shabbat</span>
              <Wine className="w-4 h-4 text-blue-800" />
            </div>
            <div className="text-3xl font-black text-blue-900">{stats.shabbat}</div>
            <div className="text-xs font-mono text-blue-800 font-bold mt-1">Attending Fri</div>
          </div>

          {/* Attending Pool Party */}
          <div className="bg-cyan-100 border-3 border-black p-4 shadow-[4px_4px_0_0_#000]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-bold uppercase text-black">Pool Party</span>
              <Sun className="w-4 h-4 text-cyan-800" />
            </div>
            <div className="text-3xl font-black text-cyan-900">{stats.pool}</div>
            <div className="text-xs font-mono text-cyan-800 font-bold mt-1">Attending Sat</div>
          </div>
        </div>

        {/* Secondary Stats Strip */}
        <div className="flex flex-wrap items-center gap-3 bg-white border-3 border-black p-3 shadow-[4px_4px_0_0_#000] text-xs font-mono font-bold">
          <span className="uppercase text-gray-600">Quick Stats:</span>
          <span className="bg-pink-100 border border-black px-2 py-1">
            Old City Tour: <strong className="text-black">{stats.tour}</strong>
          </span>
          <span className="bg-red-100 border border-black px-2 py-1 text-red-900">
            Declined All: <strong className="text-red-900">{stats.declinedAll}</strong>
          </span>
          <span className="bg-amber-100 border border-black px-2 py-1">
            Dietary Requests: <strong className="text-black">{stats.withDietary}</strong>
          </span>
          <span className="bg-indigo-100 border border-black px-2 py-1">
            Notes / Messages: <strong className="text-black">{stats.withNotes}</strong>
          </span>
        </div>

        {/* Controls: Search & Filter Tabs */}
        <div className="bg-white border-4 border-black p-4 md:p-6 shadow-[8px_8px_0_0_#000] space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by name, party group, dietary restriction, or note..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-2 border-black rounded-none shadow-[2px_2px_0_0_#000] font-mono text-sm w-full"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold bg-gray-200 hover:bg-gray-300 px-1.5 py-0.5 border border-black"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Match Counter */}
            <div className="text-xs font-mono font-bold text-gray-600 shrink-0">
              Showing <span className="text-black text-sm">{sortedGuests.length}</span> of {guests.length} guests
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t-2 border-dashed border-gray-200">
            <span className="text-xs font-mono font-bold uppercase text-gray-500 mr-1">Filter:</span>
            {[
              { id: 'all', label: `All (${guests.length})` },
              { id: 'rsvped', label: `RSVP'ed (${stats.rsvped})` },
              { id: 'no_response', label: `No Response (${stats.pending})` },
              { id: 'wedding', label: `Wedding (${stats.wedding})` },
              { id: 'shabbat', label: `Shabbat (${stats.shabbat})` },
              { id: 'pool', label: `Pool Party (${stats.pool})` },
              { id: 'tour', label: `Tour (${stats.tour})` },
              { id: 'declined', label: `Declined All (${stats.declinedAll})` },
              { id: 'dietary', label: `Dietary (${stats.withDietary})` },
              { id: 'notes', label: `Notes (${stats.withNotes})` },
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-1 text-xs font-mono font-bold border-2 border-black transition-all ${
                  activeFilter === filter.id
                    ? 'bg-black text-white shadow-[2px_2px_0_0_#000] -translate-y-0.5'
                    : 'bg-white hover:bg-gray-100 text-black'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Master Table */}
        <div className="bg-white border-4 border-black shadow-[10px_10px_0_0_#000] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm font-mono">
              <thead>
                <tr className="bg-yellow-300 border-b-4 border-black text-black select-none">
                  <th
                    onClick={() => requestSort('name')}
                    className="p-3 md:p-4 font-black uppercase tracking-wider cursor-pointer hover:bg-yellow-400 transition-colors whitespace-nowrap"
                  >
                    Guest Name {getSortIcon('name')}
                  </th>
                  <th
                    onClick={() => requestSort('groupId')}
                    className="p-3 md:p-4 font-black uppercase tracking-wider cursor-pointer hover:bg-yellow-400 transition-colors whitespace-nowrap"
                  >
                    Party / Group {getSortIcon('groupId')}
                  </th>
                  <th
                    onClick={() => requestSort('status')}
                    className="p-3 md:p-4 font-black uppercase tracking-wider cursor-pointer hover:bg-yellow-400 transition-colors whitespace-nowrap text-center"
                  >
                    Status {getSortIcon('status')}
                  </th>
                  <th
                    onClick={() => requestSort('attendingWedding')}
                    className="p-3 md:p-4 font-black uppercase tracking-wider cursor-pointer hover:bg-yellow-400 transition-colors whitespace-nowrap text-center"
                  >
                    Wedding {getSortIcon('attendingWedding')}
                  </th>
                  <th
                    onClick={() => requestSort('attendingShabbat')}
                    className="p-3 md:p-4 font-black uppercase tracking-wider cursor-pointer hover:bg-yellow-400 transition-colors whitespace-nowrap text-center"
                  >
                    Shabbat {getSortIcon('attendingShabbat')}
                  </th>
                  <th
                    onClick={() => requestSort('attendingPool')}
                    className="p-3 md:p-4 font-black uppercase tracking-wider cursor-pointer hover:bg-yellow-400 transition-colors whitespace-nowrap text-center"
                  >
                    Pool Party {getSortIcon('attendingPool')}
                  </th>
                  <th
                    onClick={() => requestSort('attendingTour')}
                    className="p-3 md:p-4 font-black uppercase tracking-wider cursor-pointer hover:bg-yellow-400 transition-colors whitespace-nowrap text-center"
                  >
                    Tour {getSortIcon('attendingTour')}
                  </th>
                  <th className="p-3 md:p-4 font-black uppercase tracking-wider whitespace-nowrap text-center">
                    Dietary
                  </th>
                  <th className="p-3 md:p-4 font-black uppercase tracking-wider whitespace-nowrap text-center">
                    Notes
                  </th>
                  <th className="p-3 md:p-4 font-black uppercase tracking-wider whitespace-nowrap text-center">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black">
                {loading ? (
                  <tr>
                    <td colSpan="10" className="p-12 text-center text-gray-600 font-bold font-mono">
                      <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-black" />
                      Loading guest list and RSVP records...
                    </td>
                  </tr>
                ) : sortedGuests.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="p-12 text-center text-gray-500 font-mono">
                      No guests match your search or filter criteria.
                    </td>
                  </tr>
                ) : (
                  sortedGuests.map((guest, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <tr
                        key={guest.id}
                        className={`hover:bg-purple-50 transition-colors ${
                          !guest.hasRsvp ? 'bg-gray-50/70 text-gray-600' : isEven ? 'bg-white' : 'bg-yellow-50/30'
                        }`}
                      >
                        {/* Guest Name */}
                        <td className="p-3 md:p-4 font-bold text-black whitespace-nowrap">
                          {guest.name}
                        </td>

                        {/* Group / Party */}
                        <td className="p-3 md:p-4 text-xs font-mono text-gray-600 whitespace-nowrap">
                          <span className="bg-gray-100 border border-black px-2 py-0.5">
                            {guest.groupId}
                          </span>
                        </td>

                        {/* Overall Status */}
                        <td className="p-3 md:p-4 text-center whitespace-nowrap">
                          {!guest.hasRsvp ? (
                            <span className="inline-flex items-center gap-1 bg-yellow-200 text-yellow-900 border border-black px-2.5 py-1 text-xs font-bold uppercase shadow-[2px_2px_0_0_#000]">
                              <HelpCircle className="w-3.5 h-3.5" />
                              No RSVP
                            </span>
                          ) : guest.status === 'attending' ? (
                            <span className="inline-flex items-center gap-1 bg-green-300 text-green-950 border border-black px-2.5 py-1 text-xs font-bold uppercase shadow-[2px_2px_0_0_#000]">
                              <Check className="w-3.5 h-3.5" />
                              Attending
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-red-200 text-red-950 border border-black px-2.5 py-1 text-xs font-bold uppercase shadow-[2px_2px_0_0_#000]">
                              <X className="w-3.5 h-3.5" />
                              Declined All
                            </span>
                          )}
                        </td>

                        {/* Wedding */}
                        <td className="p-3 md:p-4 text-center whitespace-nowrap">
                          <EventBadge hasRsvp={guest.hasRsvp} isAttending={guest.attendingWedding} />
                        </td>

                        {/* Shabbat */}
                        <td className="p-3 md:p-4 text-center whitespace-nowrap">
                          <EventBadge hasRsvp={guest.hasRsvp} isAttending={guest.attendingShabbat} />
                        </td>

                        {/* Pool Party */}
                        <td className="p-3 md:p-4 text-center whitespace-nowrap">
                          <EventBadge hasRsvp={guest.hasRsvp} isAttending={guest.attendingPool} />
                        </td>

                        {/* City Tour */}
                        <td className="p-3 md:p-4 text-center whitespace-nowrap">
                          <EventBadge hasRsvp={guest.hasRsvp} isAttending={guest.attendingTour} />
                        </td>

                        {/* Dietary Restrictions */}
                        <td className="p-3 md:p-4 text-center whitespace-nowrap">
                          {guest.dietaryRestrictions ? (
                            <button
                              onClick={() => setSelectedGuest(guest)}
                              title={guest.dietaryRestrictions}
                              className="inline-flex items-center gap-1 bg-amber-200 hover:bg-amber-300 text-black border border-black px-2 py-0.5 text-xs font-bold"
                            >
                              <Utensils className="w-3 h-3" />
                              Yes
                            </button>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>

                        {/* Notes */}
                        <td className="p-3 md:p-4 text-center whitespace-nowrap">
                          {guest.additionalNotes ? (
                            <button
                              onClick={() => setSelectedGuest(guest)}
                              title={guest.additionalNotes}
                              className="inline-flex items-center gap-1 bg-blue-200 hover:bg-blue-300 text-black border border-black px-2 py-0.5 text-xs font-bold"
                            >
                              <MessageSquare className="w-3 h-3" />
                              Note
                            </button>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>

                        {/* Details Modal Trigger */}
                        <td className="p-3 md:p-4 text-center whitespace-nowrap">
                          <button
                            onClick={() => setSelectedGuest(guest)}
                            className="bg-white hover:bg-purple-200 text-black border border-black p-1 shadow-[2px_2px_0_0_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                            title="View full guest details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer / Tip */}
        <div className="text-center font-mono text-xs text-gray-600 pb-8">
          This admin page is not linked anywhere on the website. Keep this URL bookmarked for quick access.
        </div>
      </div>

      {/* Guest Details Modal */}
      <AnimatePresence>
        {selectedGuest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white border-4 border-black p-6 md:p-8 max-w-lg w-full shadow-[12px_12px_0_0_#000] relative font-mono space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedGuest(null)}
                className="absolute top-4 right-4 bg-yellow-300 hover:bg-yellow-400 border-2 border-black p-1 text-black shadow-[2px_2px_0_0_#000]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b-4 border-black pb-4">
                <span className="text-xs uppercase font-bold text-gray-500">Guest Dossier</span>
                <h3 className="text-2xl md:text-3xl font-black uppercase text-black mt-1">
                  {selectedGuest.name}
                </h3>
                <p className="text-xs font-bold text-purple-700 mt-1">
                  Party / Group: {selectedGuest.groupId}
                </p>
              </div>

              {/* Status */}
              <div>
                <span className="text-xs font-bold uppercase text-gray-500 block mb-1">
                  Overall RSVP Status
                </span>
                {!selectedGuest.hasRsvp ? (
                  <span className="inline-block bg-yellow-200 border-2 border-black px-3 py-1 font-bold text-sm shadow-[2px_2px_0_0_#000]">
                    ⚠️ Has NOT submitted an RSVP yet
                  </span>
                ) : selectedGuest.status === 'attending' ? (
                  <span className="inline-block bg-green-300 border-2 border-black px-3 py-1 font-bold text-sm shadow-[2px_2px_0_0_#000]">
                    ✅ Attending Event(s)
                  </span>
                ) : (
                  <span className="inline-block bg-red-200 border-2 border-black px-3 py-1 font-bold text-sm shadow-[2px_2px_0_0_#000]">
                    ❌ Declined All Events
                  </span>
                )}
              </div>

              {/* Event Breakdown */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-gray-500 block">
                  Event Breakdown
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="border-2 border-black p-2 bg-gray-50">
                    <div className="font-bold">Old City Tour (Fri)</div>
                    <div className="mt-1">
                      <EventBadge hasRsvp={selectedGuest.hasRsvp} isAttending={selectedGuest.attendingTour} />
                    </div>
                  </div>
                  <div className="border-2 border-black p-2 bg-gray-50">
                    <div className="font-bold">Shabbat (Fri)</div>
                    <div className="mt-1">
                      <EventBadge hasRsvp={selectedGuest.hasRsvp} isAttending={selectedGuest.attendingShabbat} />
                    </div>
                  </div>
                  <div className="border-2 border-black p-2 bg-gray-50">
                    <div className="font-bold">Pool Party (Sat)</div>
                    <div className="mt-1">
                      <EventBadge hasRsvp={selectedGuest.hasRsvp} isAttending={selectedGuest.attendingPool} />
                    </div>
                  </div>
                  <div className="border-2 border-black p-2 bg-gray-50">
                    <div className="font-bold">The Wedding (Sun)</div>
                    <div className="mt-1">
                      <EventBadge hasRsvp={selectedGuest.hasRsvp} isAttending={selectedGuest.attendingWedding} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dietary Restrictions */}
              <div>
                <span className="text-xs font-bold uppercase text-gray-500 block mb-1">
                  Dietary Restrictions / Allergies
                </span>
                <div className="border-2 border-black p-3 bg-yellow-50 text-sm">
                  {selectedGuest.dietaryRestrictions || (
                    <span className="text-gray-400 italic">None reported</span>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <span className="text-xs font-bold uppercase text-gray-500 block mb-1">
                  Additional Notes / Messages
                </span>
                <div className="border-2 border-black p-3 bg-purple-50 text-sm">
                  {selectedGuest.additionalNotes || (
                    <span className="text-gray-400 italic">No notes provided</span>
                  )}
                </div>
              </div>

              <Button
                onClick={() => setSelectedGuest(null)}
                className="w-full bg-black text-white hover:bg-gray-800 font-bold border-2 border-black uppercase text-sm mt-4"
              >
                Close
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mini badge helper for table cells
const EventBadge = ({ hasRsvp, isAttending }) => {
  if (!hasRsvp) {
    return (
      <span className="inline-block text-gray-400 text-xs font-mono font-medium" title="No RSVP received yet">
        —
      </span>
    );
  }

  if (isAttending) {
    return (
      <span
        className="inline-flex items-center justify-center w-6 h-6 bg-green-400 text-black border border-black shadow-[1px_1px_0_0_#000]"
        title="Attending"
      >
        <Check className="w-4 h-4 stroke-[3]" />
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 bg-red-200 text-red-900 border border-black shadow-[1px_1px_0_0_#000]"
      title="Not Attending"
    >
      <X className="w-4 h-4 stroke-[3]" />
    </span>
  );
};

export default Admin;

