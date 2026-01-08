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
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    attendingTour: false,
    attendingShabbat: false,
    attendingPoolParty: false,
    attendingWedding: false,
    dietaryRestrictions: '',
    additionalNotes: ''
  });
  const [loading, setLoading] = useState(false);
  
  const handleSearch = async () => {
    if (searchName.trim()) {
      setLoading(true);
      setSearchResults([]);
      try {
        const { data, error } = await supabase
          .from('guests')
          .select('*')
          .ilike('name', `%${searchName}%`);

        if (error) throw error;

        if (data && data.length > 0) {
          setSearchResults(data);
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

  const handleSelectGuest = async (guest) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select('id')
        .eq('guest_name', guest.name);

      if (error) throw error;

      console.log('Checking existing RSVPs:', data);

      if (data && data.length > 0) {
        toast({
          variant: "destructive",
          title: "Already Submitted",
          description: "An RSVP has already been submitted for this guest."
        });
        return;
      }

      setFormData({
        ...formData,
        guestName: guest.name
      });
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

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        error
      } = await supabase.from('rsvps').insert([{
        guest_name: formData.guestName,
        email: formData.email,
        attending_tour: formData.attendingTour,
        attending_shabbat: formData.attendingShabbat,
        attending_pool_party: formData.attendingPoolParty,
        attending_wedding: formData.attendingWedding,
        dietary_restrictions: formData.dietaryRestrictions,
        additional_notes: formData.additionalNotes
      }]);
      if (error) throw error;
      toast({
        title: "RSVP Submitted! 🎉",
        description: formData.attendingWedding ? "We can't wait to celebrate with you!" : "Thank you for letting us know."
      });

      // Reset form
      setShowForm(false);
      setSearchName('');
      setFormData({
        guestName: '',
        email: '',
        attendingTour: false,
        attendingShabbat: false,
        attendingPoolParty: false,
        attendingWedding: false,
        dietaryRestrictions: '',
        additionalNotes: ''
      });
    } catch (error) {
      if (error.code === '23505') {
        toast({
          variant: "destructive",
          title: "Already Submitted",
          description: "An RSVP has already been submitted for this guest."
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
          <div className="block">
            <p className="text-xl font-bold font-mono bg-white inline-block px-4 py-2 border-2 border-black shadow-[4px_4px_0_0_#000] transform rotate-1">
              Please let us know if you can join us. If you can't then please delete our numbers and consider our friendship over.
            </p>
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
                  <p className="font-mono font-bold text-center mb-2">Select your name:</p>
                  {searchResults.map((guest) => (
                    <button
                      key={guest.id || guest.name}
                      onClick={() => handleSelectGuest(guest)}
                      disabled={loading}
                      className="w-full p-3 text-left bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-purple-100 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all font-mono font-bold uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {guest.name}
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
        }} onSubmit={handleSubmit} className="bg-white border-4 border-black p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-black uppercase text-black mb-6 text-center">
                Complete Your RSVP
              </h3>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="guestName" className="font-bold font-mono text-black uppercase">Guest Name</Label>
                  <Input id="guestName" value={formData.guestName} readOnly className="border-2 border-black rounded-none font-mono bg-gray-100 cursor-not-allowed" />
                </div>

                <div>
                  <Label htmlFor="email" className="font-bold font-mono text-black uppercase">Email (Optional)</Label>
                  <Input id="email" type="email" value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} className="border-2 border-black rounded-none font-mono" />
                </div>

                <div>
                  <Label className="mb-3 block font-bold font-mono text-black uppercase">Which events will you be attending?</Label>
                  <div className="space-y-3">
                    {[
                      { id: 'attendingTour', label: 'Old City Tour', date: 'Friday, Jan 15 @ 9:00 AM' },
                      { id: 'attendingShabbat', label: 'Shabbat Dinner', date: 'Friday, Jan 15 @ 7:00 PM' },
                      { id: 'attendingPoolParty', label: 'Pool Party', date: 'Saturday, Jan 16 @ 1:00 PM' },
                      { id: 'attendingWedding', label: 'The Wedding', date: 'Sunday, Jan 17 @ 6:00 PM' },
                    ].map((event) => (
                      <div 
                        key={event.id}
                        className={`flex items-center space-x-3 p-3 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all cursor-pointer ${formData[event.id] ? 'bg-purple-100' : 'bg-white'}`}
                        onClick={() => setFormData({ ...formData, [event.id]: !formData[event.id] })}
                      >
                        <div className={`w-6 h-6 border-2 border-black flex items-center justify-center transition-colors ${formData[event.id] ? 'bg-black' : 'bg-white'}`}>
                          {formData[event.id] && <Check className="text-white w-4 h-4" />}
                        </div>
                        <div>
                          <p className="font-bold font-mono uppercase text-sm md:text-base">{event.label}</p>
                          <p className="font-mono text-xs md:text-sm text-gray-600">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {(formData.attendingTour || formData.attendingShabbat || formData.attendingPoolParty || formData.attendingWedding) && (
                  <div className="animate-in fade-in slide-in-from-top-4 space-y-6">
                    <div>
                      <Label htmlFor="dietaryRestrictions" className="font-bold font-mono text-black uppercase">
                        Dietary Restrictions or Allergies
                      </Label>
                      <Textarea id="dietaryRestrictions" placeholder="Please let us know about any dietary requirements..." value={formData.dietaryRestrictions} onChange={e => setFormData({
                  ...formData,
                  dietaryRestrictions: e.target.value
                })} rows={3} className="border-2 border-black rounded-none font-mono" />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="additionalNotes" className="font-bold font-mono text-black uppercase">Additional Notes (Optional)</Label>
                  <Textarea id="additionalNotes" placeholder="Any special requests or messages for us..." value={formData.additionalNotes} onChange={e => setFormData({
                ...formData,
                additionalNotes: e.target.value
              })} rows={3} className="border-2 border-black rounded-none font-mono" />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="flex-1 border-2 border-black rounded-none font-bold font-mono uppercase hover:bg-gray-100">
                    Back
                  </Button>
                  <Button type="submit" disabled={loading} className="flex-1 bg-purple-500 text-black border-2 border-black rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all font-bold font-mono uppercase">
                    {loading ? 'Submitting...' : 'Submit RSVP'}
                  </Button>
                </div>
              </div>
            </motion.form>}
        </div>
      </div>
    </section>;
};
export default RSVP;