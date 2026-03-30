import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
const RSVP = () => {
  const {
    toast
  } = useToast();
  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = async () => {
    if (searchName.trim()) {
      setLoading(true);
      setSearchResults([]);
      try {
        const { data: matchedGuests, error } = await supabase
          .from('guests')
          .select('*')
          .ilike('name', `%${searchName}%`);

        if (error) throw error;

        if (matchedGuests && matchedGuests.length > 0) {
          const groupIds = [...new Set(matchedGuests.map(g => g.group_id).filter(id => id))];
          let allGuests = [...matchedGuests];
          
          if (groupIds.length > 0) {
            const { data: groupMembers, error: groupError } = await supabase
              .from('guests')
              .select('*')
              .in('group_id', groupIds);
              
            if (groupError) throw groupError;
            
            const guestMap = new Map();
            allGuests.forEach(g => guestMap.set(g.id || g.name, g));
            if (groupMembers) {
              groupMembers.forEach(g => guestMap.set(g.id || g.name, g));
            }
            allGuests = Array.from(guestMap.values());
          }

          const groupedResults = [];
          const processedGroupIds = new Set();
          
          allGuests.forEach(g => {
            if (g.group_id) {
              if (!processedGroupIds.has(g.group_id)) {
                groupedResults.push(allGuests.filter(ag => ag.group_id === g.group_id));
                processedGroupIds.add(g.group_id);
              }
            } else {
              groupedResults.push([g]);
            }
          });

          setSearchResults(groupedResults);
        } else {
          toast({
            variant: "destructive",
            title: "Guest not found",
            description: "We couldn't find your name in the guest list. Please try a different spelling."
          });
        }
      } catch (error) {
        console.error('Search error:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to search guest list. Please try again."
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Please enter your name",
        description: "We need your name to find your invitation"
      });
    }
  };

  const handleSelectGroup = async (groupGuests) => {
    setLoading(true);
    try {

      // Fetch RSVPs for all guests in the group
      const guestNames = groupGuests.map(g => g.name);
      const { data: existingRsvpsData, error: rsvpError } = await supabase
        .from('rsvps')
        .select('*')
        .in('guest_name', guestNames);

      if (rsvpError) throw rsvpError;

      if (existingRsvpsData && existingRsvpsData.length > 0) {
        toast({
          title: "Existing RSVPs Found",
          description: "You can update the responses for your group below."
        });
      }

      // Initialize form state for all guests in the group
      const initialRsvps = groupGuests.map(g => {
        const existingRsvp = existingRsvpsData?.find(r => r.guest_name === g.name);
        return {
          id: existingRsvp?.id || null,
          guestName: g.name,
          attendingTour: existingRsvp?.attending_tour || false,
          attendingShabbat: existingRsvp?.attending_shabbat || false,
          attendingPoolParty: existingRsvp?.attending_pool_party || false,
          attendingWedding: existingRsvp?.attending_wedding || false,
          dietaryRestrictions: existingRsvp?.dietary_restrictions || '',
          additionalNotes: existingRsvp?.additional_notes || ''
        };
      });

      setRsvps(initialRsvps);
      setShowForm(true);
      setSearchResults([]);
    } catch (error) {
      console.error('Check RSVP error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to verify RSVP status. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const updateRsvp = (index, field, value) => {
    const newRsvps = [...rsvps];
    newRsvps[index] = { ...newRsvps[index], [field]: value };
    setRsvps(newRsvps);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      for (const formData of rsvps) {
        const rsvpData = {
          guest_name: formData.guestName,
          attending_tour: formData.attendingTour,
          attending_shabbat: formData.attendingShabbat,
          attending_pool_party: formData.attendingPoolParty,
          attending_wedding: formData.attendingWedding,
          dietary_restrictions: formData.dietaryRestrictions,
          additional_notes: formData.additionalNotes
        };

        let error;
        if (formData.id) {
          const { data, error: updateError } = await supabase
            .from('rsvps')
            .update(rsvpData)
            .eq('id', formData.id)
            .select();
          error = updateError;

          if (!error && (!data || data.length === 0)) {
            throw new Error(`Update failed for ${formData.guestName}. Please check your Supabase dashboard and ensure the 'rsvps' table has an RLS policy that allows UPDATE operations.`);
          }
        } else {
          const { error: insertError } = await supabase
            .from('rsvps')
            .insert([rsvpData]);
          error = insertError;
        }

        if (error) throw error;
      }

      const anyAttending = rsvps.some(r => r.attendingWedding);
      const anyUpdated = rsvps.some(r => r.id);

      toast({
        title: anyUpdated ? "RSVPs Updated! 🎉" : "RSVPs Submitted! 🎉",
        description: anyAttending ? "We can't wait to celebrate with you!" : "Thank you for letting us know."
      });

      // Reset form
      setShowForm(false);
      setSearchName('');
      setRsvps([]);
    } catch (error) {
      if (error.code === '23505') {
        toast({
          variant: "destructive",
          title: "Already Submitted",
          description: "An RSVP has already been submitted for one of these guests."
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error submitting RSVP",
          description: error.message || "Please try again later"
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return <section id="rsvp" className="py-24 bg-purple-200 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
             backgroundSize: '30px 30px'
           }} 
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-16">
          <div className="inline-block bg-white border-4 border-black px-8 py-4 shadow-[8px_8px_0_0_#000] transform -rotate-1 mb-6">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              RSVP
            </h2>
          </div>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {!showForm ? <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} className="bg-white border-4 border-black p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-purple-400 p-4 border-2 border-black rounded-full shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                  <Search className="w-8 h-8 text-black" />
                </div>
              </div>
              <h3 className="text-2xl font-black uppercase text-black mb-4 text-center">
                Find Your Invitation
              </h3>
              <p className="text-black font-mono text-center mb-6">
                Enter your name as it appears on your invitation
              </p>
              <div className="flex gap-3">
                <Input type="text" placeholder="Enter your full name" value={searchName} onChange={e => setSearchName(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch()} disabled={loading} className="flex-1 border-2 border-black rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] focus:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all font-mono" />
                <Button onClick={handleSearch} disabled={loading} className="bg-purple-500 text-black font-bold border-2 border-black rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all uppercase">
                  {loading ? '...' : 'Search'}
                </Button>
              </div>
              
              {searchResults.length > 0 && (
                <div className="mt-6 space-y-2 animate-in fade-in slide-in-from-top-4">
                  <p className="font-mono font-bold text-center mb-2">Select your party:</p>
                  {searchResults.map((group) => (
                    <button
                      key={group[0].group_id || group[0].id || group[0].name}
                      onClick={() => handleSelectGroup(group)}
                      disabled={loading}
                      className="w-full p-3 text-left bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-purple-100 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all font-mono font-bold uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex flex-col gap-1">
                        {group.map((g, idx) => (
                          <span key={g.id || idx}>{g.name}</span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div> : <motion.form initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} onSubmit={handleSubmit} className="bg-white border-4 border-black p-4 md:p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-black uppercase text-black mb-6 text-center">
                Complete Your RSVP
              </h3>

              {rsvps.some(r => r.id) && (
                <div className="bg-yellow-300 border-2 border-black p-4 mb-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] transform -rotate-1">
                  <p className="font-bold font-mono text-black text-center text-sm md:text-base">
                    Note: You have already submitted an RSVP for this group. You can update your responses below.
                  </p>
                </div>
              )}

              <div className="space-y-12">
                {rsvps.map((rsvp, index) => (
                  <div key={rsvp.guestName} className="border-4 border-black p-4 md:p-6 bg-gray-50 relative">
                    <div className="absolute -top-4 -left-4 bg-purple-400 border-2 border-black px-4 py-1 shadow-[4px_4px_0_0_rgba(0,0,0,1)] transform -rotate-2">
                      <h4 className="font-black uppercase text-lg">{rsvp.guestName}</h4>
                    </div>

                    <div className="mt-6 space-y-6">
                      <div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-3 gap-2">
                          <Label className="block font-bold font-mono text-black uppercase">Which events will {rsvp.guestName.split(' ')[0]} be attending?</Label>
                          <button 
                            type="button"
                            onClick={() => {
                              const isAttendingAll = rsvp.attendingTour && rsvp.attendingShabbat && rsvp.attendingPoolParty && rsvp.attendingWedding;
                              const newValue = !isAttendingAll;
                              const newRsvps = [...rsvps];
                              newRsvps[index] = {
                                ...newRsvps[index],
                                attendingTour: newValue,
                                attendingShabbat: newValue,
                                attendingPoolParty: newValue,
                                attendingWedding: newValue
                              };
                              setRsvps(newRsvps);
                            }}
                            className="text-xs font-bold font-mono uppercase bg-black text-white px-3 py-1 hover:bg-purple-500 hover:text-black border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                          >
                            {rsvp.attendingTour && rsvp.attendingShabbat && rsvp.attendingPoolParty && rsvp.attendingWedding ? 'Deselect All' : 'Select All'}
                          </button>
                        </div>
                        <div className="space-y-3">
                          {[
                            { id: 'attendingTour', label: 'Old City Tour', date: 'Friday, Jan 15 @ Morning' },
                            { id: 'attendingShabbat', label: 'Shabbat', date: 'Friday, Jan 15 @ 6:30 PM' },
                            { id: 'attendingPoolParty', label: 'Pool Party', date: 'Saturday, Jan 16 @ 1:00 PM' },
                            { id: 'attendingWedding', label: 'The Wedding', date: 'Sunday, Jan 17 @ 5:30 PM' },
                          ].map((event) => (
                            <div 
                              key={event.id}
                              className={`flex items-center space-x-3 p-3 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all cursor-pointer ${rsvp[event.id] ? 'bg-purple-100' : 'bg-white'}`}
                              onClick={() => updateRsvp(index, event.id, !rsvp[event.id])}
                            >
                              <div className={`w-6 h-6 border-2 border-black flex items-center justify-center transition-colors ${rsvp[event.id] ? 'bg-black' : 'bg-white'}`}>
                                {rsvp[event.id] && <Check className="text-white w-4 h-4" />}
                              </div>
                              <div>
                                <p className="font-bold font-mono uppercase text-sm md:text-base">{event.label}</p>
                                <p className="font-mono text-xs md:text-sm text-gray-600">{event.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {(rsvp.attendingTour || rsvp.attendingShabbat || rsvp.attendingPoolParty || rsvp.attendingWedding) && (
                        <div className="animate-in fade-in slide-in-from-top-4 space-y-6">
                          <div>
                            <Label className="font-bold font-mono text-black uppercase">
                              Dietary Restrictions or Allergies
                            </Label>
                            <Textarea placeholder={`Any dietary requirements for ${rsvp.guestName.split(' ')[0]}...`} value={rsvp.dietaryRestrictions} onChange={e => updateRsvp(index, 'dietaryRestrictions', e.target.value)} rows={2} className="border-2 border-black rounded-none font-mono bg-white mt-1" />
                          </div>
                        </div>
                      )}

                      <div>
                        <Label className="font-bold font-mono text-black uppercase">Additional Notes (Optional)</Label>
                        <Textarea placeholder="Any special requests or messages..." value={rsvp.additionalNotes} onChange={e => updateRsvp(index, 'additionalNotes', e.target.value)} rows={2} className="border-2 border-black rounded-none font-mono bg-white mt-1" />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="flex-1 border-2 border-black rounded-none font-bold font-mono uppercase hover:bg-gray-100">
                    Back
                  </Button>
                  <Button type="submit" disabled={loading} className="flex-1 bg-purple-500 text-black border-2 border-black rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all font-bold font-mono uppercase">
                    {loading ? 'Submitting...' : (rsvps.some(r => r.id) ? 'Update RSVPs' : 'Submit RSVPs')}
                  </Button>
                </div>
              </div>
            </motion.form>}
        </div>
      </div>
    </section>;
};
export default RSVP;