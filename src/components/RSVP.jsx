import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Check } from 'lucide-react';
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
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    attending: null,
    numberOfGuests: 1,
    dietaryRestrictions: '',
    additionalNotes: ''
  });
  const [loading, setLoading] = useState(false);
  const handleSearch = () => {
    if (searchName.trim()) {
      setFormData({
        ...formData,
        guestName: searchName
      });
      setShowForm(true);
    } else {
      toast({
        variant: "destructive",
        title: "Please enter your name",
        description: "We need your name to find your invitation"
      });
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.attending === null) {
      toast({
        variant: "destructive",
        title: "Please select an option",
        description: "Let us know if you'll be attending"
      });
      return;
    }
    setLoading(true);
    try {
      const {
        error
      } = await supabase.from('rsvps').insert([{
        guest_name: formData.guestName,
        email: formData.email,
        attending: formData.attending,
        number_of_guests: formData.numberOfGuests,
        dietary_restrictions: formData.dietaryRestrictions,
        additional_notes: formData.additionalNotes
      }]);
      if (error) throw error;
      toast({
        title: "RSVP Submitted! 🎉",
        description: formData.attending ? "We can't wait to celebrate with you!" : "Thank you for letting us know. You'll be missed!"
      });

      // Reset form
      setShowForm(false);
      setSearchName('');
      setFormData({
        guestName: '',
        email: '',
        attending: null,
        numberOfGuests: 1,
        dietaryRestrictions: '',
        additionalNotes: ''
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error submitting RSVP",
        description: error.message || "Please try again later"
      });
    } finally {
      setLoading(false);
    }
  };
  return <section id="rsvp" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            RSVP
          </h2>
          <p className="text-gray-600 text-lg">Please let us know if you can join us. 
If you can't then please delete our numbers and consider our friendship over.</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {!showForm ? <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-center mb-6">
                <Search className="w-12 h-12 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Find Your Invitation
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Enter your name as it appears on your invitation
              </p>
              <div className="flex gap-3">
                <Input type="text" placeholder="Enter your full name" value={searchName} onChange={e => setSearchName(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch()} className="flex-1" />
                <Button onClick={handleSearch} className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                  Search
                </Button>
              </div>
            </motion.div> : <motion.form initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} onSubmit={handleSubmit} className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Complete Your RSVP
              </h3>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="guestName">Guest Name</Label>
                  <Input id="guestName" value={formData.guestName} onChange={e => setFormData({
                ...formData,
                guestName: e.target.value
              })} required />
                </div>

                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input id="email" type="email" value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} />
                </div>

                <div>
                  <Label className="mb-3 block">Will you be attending?</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button type="button" variant={formData.attending === true ? "default" : "outline"} onClick={() => setFormData({
                  ...formData,
                  attending: true
                })} className={formData.attending === true ? "bg-green-500 hover:bg-green-600" : ""}>
                      <Check className="mr-2 h-4 w-4" />
                      Yes, I'll be there!
                    </Button>
                    <Button type="button" variant={formData.attending === false ? "default" : "outline"} onClick={() => setFormData({
                  ...formData,
                  attending: false
                })} className={formData.attending === false ? "bg-gray-500 hover:bg-gray-600" : ""}>
                      Sorry, can't make it
                    </Button>
                  </div>
                </div>

                {formData.attending === true && <>
                    <div>
                      <Label htmlFor="numberOfGuests">
                        <Users className="inline mr-2 h-4 w-4" />
                        Number of Guests
                      </Label>
                      <Input id="numberOfGuests" type="number" min="1" max="10" value={formData.numberOfGuests} onChange={e => setFormData({
                  ...formData,
                  numberOfGuests: parseInt(e.target.value)
                })} />
                    </div>

                    <div>
                      <Label htmlFor="dietaryRestrictions">
                        Dietary Restrictions or Allergies
                      </Label>
                      <Textarea id="dietaryRestrictions" placeholder="Please let us know about any dietary requirements..." value={formData.dietaryRestrictions} onChange={e => setFormData({
                  ...formData,
                  dietaryRestrictions: e.target.value
                })} rows={3} />
                    </div>
                  </>}

                <div>
                  <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                  <Textarea id="additionalNotes" placeholder="Any special requests or messages for us..." value={formData.additionalNotes} onChange={e => setFormData({
                ...formData,
                additionalNotes: e.target.value
              })} rows={3} />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
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