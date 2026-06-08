import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Calendar, Plus, Upload, Trash2, CheckCircle2, User, HelpCircle, FileText, Check, AlertTriangle, ShieldCheck, Heart } from 'lucide-react';
import { LostFoundItem } from '../types';
import { initialLostFoundItems } from '../data';

export default function LostFoundSection() {
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'lost' | 'found' | 'reclaimed'>('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Form management
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState<'lost' | 'found'>('lost');
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formLocation, setFormLocation] = useState('Atrium');
  const [formCategory, setFormCategory] = useState('Clothing/Blazer');
  const [formDate, setFormDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [studentName, setStudentName] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [rewardInfo, setRewardInfo] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  
  // Custom states
  const [successMessage, setSuccessMessage] = useState('');
  const [potentialMatches, setPotentialMatches] = useState<Array<{ lost: LostFoundItem; found: LostFoundItem; score: number }>>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize data from localStorage or fallback to defaults
  useEffect(() => {
    const stored = localStorage.getItem('wab_lost_found_items');
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        setItems(initialLostFoundItems);
      }
    } else {
      setItems(initialLostFoundItems);
      localStorage.setItem('wab_lost_found_items', JSON.stringify(initialLostFoundItems));
    }
  }, []);

  const saveItems = (newItems: LostFoundItem[]) => {
    setItems(newItems);
    localStorage.setItem('wab_lost_found_items', JSON.stringify(newItems));
  };

  // Preset Sample Images for Quick Testing
  const presetImages = [
    { name: 'Navy Blazer', url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=400' },
    { name: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400' },
    { name: 'Electronics/Calculator', url: 'https://images.unsplash.com/photo-1627914757106-a5d6118fa031?auto=format&fit=crop&q=80&w=400' },
    { name: 'Water Flask', url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=400' },
    { name: 'Keychain/Lockers', url: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=400' },
    { name: 'Backpack/Bookbag', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400' }
  ];

  // Dynamic Matching Algorithm with scoring
  useEffect(() => {
    const actives = items.filter(item => item.status === 'active');
    const losts = actives.filter(i => i.type === 'lost');
    const founds = actives.filter(i => i.type === 'found');
    const matches: Array<{ lost: LostFoundItem; found: LostFoundItem; score: number }> = [];

    losts.forEach(lost => {
      founds.forEach(found => {
        let score = 0;
        
        // 1. Same category match
        if (lost.category.toLowerCase() === found.category.toLowerCase()) {
          score += 2;
        }

        // 2. Same location match
        if (lost.location.toLowerCase() === found.location.toLowerCase()) {
          score += 2;
        }

        // 3. Text Title substring match
        const lostWords = lost.title.toLowerCase().split(/\s+/).filter(w => w.length > 2);
        const foundWords = found.title.toLowerCase().split(/\s+/).filter(w => w.length > 2);
        
        lostWords.forEach(lw => {
          if (found.title.toLowerCase().includes(lw) || found.description.toLowerCase().includes(lw)) {
            score += 3;
          }
        });

        // If score is high list as potential match
        if (score >= 4) {
          matches.push({ lost, found, score });
        }
      });
    });

    // Sort by highest score first
    setPotentialMatches(matches.sort((a, b) => b.score - a.score));
  }, [items]);

  // Drag & Drop Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Submit Callback
  const handlePostItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !studentName || !contactDetails) return;

    // Build the item representation
    const newItem: LostFoundItem = {
      id: `lf-custom-${Date.now()}`,
      type: formType,
      title: formTitle,
      description: formDesc,
      category: formCategory,
      image: selectedImage || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400',
      date: formDate,
      location: formLocation,
      studentName: studentName,
      contactDetails: contactDetails,
      status: 'active',
      rewardInfo: formType === 'lost' && rewardInfo ? rewardInfo : undefined
    };

    const updated = [newItem, ...items];
    saveItems(updated);

    // Reset Form
    setFormTitle('');
    setFormDesc('');
    setFormLocation('Atrium');
    setFormCategory('Clothing/Blazer');
    setStudentName('');
    setContactDetails('');
    setRewardInfo('');
    setSelectedImage('');
    setIsFormOpen(false);
    
    // Success Ticker
    setSuccessMessage(`★ NEW ITEM POSTED ★ Bulletin posted successfully: ${newItem.title}`);
    setTimeout(() => setSuccessMessage(''), 8000);
  };

  // Reclaim Item (Updates localStorage)
  const handleReclaimItem = (itemId: string) => {
    const updated = items.map(item => {
      if (item.id === itemId) {
        return { ...item, status: 'reclaimed' as const };
      }
      return item;
    });
    saveItems(updated);
  };

  // Delete Item Custom Registry Post
  const handleDeleteItem = (itemId: string) => {
    const filtered = items.filter(i => i.id !== itemId);
    saveItems(filtered);
  };

  // Helper filters
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' 
      ? true 
      : typeFilter === 'reclaimed' 
        ? item.status === 'reclaimed' 
        : item.type === typeFilter && item.status === 'active';

    const matchesLoc = locationFilter === 'all' ? true : item.location === locationFilter;
    const matchesCat = categoryFilter === 'all' ? true : item.category === categoryFilter;

    return matchesSearch && matchesType && matchesLoc && matchesCat;
  });

  return (
    <div id="lost-found-section" className="space-y-8">
      {/* 1. MATCH DETECTION ALERTS (Highly custom for enhancing Student Happiness / Security) */}
      <AnimatePresence>
        {potentialMatches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border-4 border-black bg-p4-yellow text-black p-4 relative overflow-hidden shadow-p4-black"
          >
            {/* Visual warning border design */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-danger-stripes" />
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="bg-black text-p4-yellow p-2 animate-bounce flex items-center justify-center border border-black">
                  <AlertTriangle className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <h4 className="font-bebas text-2xl text-black tracking-wider uppercase font-stroke-black">
                    ★ BULLETIN MATCH DETECTOR: POTENTIAL ACTIVE MATCH IDENTIFIED ★
                  </h4>
                  <p className="text-xs text-black/90 font-sans font-semibold">
                    Our directory database has cross-referenced active lost & found tags. Check matching criteria below.
                  </p>
                </div>
              </div>
              
              <div className="bg-black text-p4-yellow font-bebas px-3 py-1 font-extrabold text-sm rotate-1 tracking-widest clip-badge scale-95 md:scale-100">
                ACTIVE SUGGESTED PAIRS: {potentialMatches.length}
              </div>
            </div>

            {/* Sublist of Matches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {potentialMatches.slice(0, 2).map((match, idx) => (
                <div key={idx} className="bg-zinc-950 p-3 border-2 border-zinc-800 hover:border-p4-yellow transition-colors flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <p className="font-bold text-p4-orange uppercase">
                      LOST: <span className="text-white">{match.lost.title}</span> (by {match.lost.studentName})
                    </p>
                    <p className="font-bold text-emerald-500 uppercase">
                      FOUND: <span className="text-white">{match.found.title}</span> (found at {match.found.location})
                    </p>
                    <p className="text-[10px] font-mono text-zinc-500">
                      Match Location Focus: <span className="text-p4-magenta font-semibold">{match.lost.location}</span>
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="font-mono text-[9px] bg-p4-orange/20 text-p4-orange font-bold px-2 py-0.5 rounded-none border border-p4-orange">
                      {Math.min(95, 60 + match.score * 8)}% MATCH
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success banner */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-p4-yellow text-black p-3 text-center font-bebas text-xl tracking-wider uppercase border-2 border-black transform rotate-[-1deg]"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. DYNAMIC MAIN HEADER GRID & CASE REGISTRATION SWITCH */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-zinc-800 pb-5">
        <div>
          <h2 className="font-bebas text-4xl text-white uppercase tracking-wider flex items-center gap-2">
            ★ WAB High School Bulletins ★
          </h2>
          <p className="text-xs text-zinc-400 font-mono tracking-widest uppercase">
            RECOVER PROPERTY, EXPEDITE SECURITY, CONNECT TEAMMATES
          </p>
        </div>

        <button
          id="post-item-btn"
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="w-full sm:w-auto bg-p4-yellow hover:bg-p4-orange text-black py-3 px-6 font-bebas text-xl tracking-widest uppercase flex items-center justify-center gap-2 border-2 border-black clip-sharp transform rotate-[1deg] hover:rotate-0 transition-all shadow-p4-black font-extrabold cursor-pointer"
        >
          {isFormOpen ? 'Close case panel' : '★ POST NEW ITEM CASE ★'}
          <Plus className={`w-5 h-5 stroke-[3px] transition-transform ${isFormOpen ? 'rotate-45' : ''}`} />
        </button>
      </div>

      {/* 3. CASE SUBMISSION DIALOG FORM PANEL */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-p4-card border-4 border-black shadow-p4-black relative"
          >
            {/* Diagonal Slice decoration */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-p4-yellow/10 transform skew-x-12 pointer-events-none" />

            <form onSubmit={handlePostItem} className="p-6 space-y-6 relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                <h3 className="font-bebas text-3xl text-white uppercase tracking-wide">
                  Submit New School Lost or Found Post
                </h3>

                {/* Case Type Toggle Button */}
                <div className="flex bg-p4-pure p-1 border-2 border-zinc-700">
                  <button
                    type="button"
                    onClick={() => setFormType('lost')}
                    className={`font-bebas text-lg px-4 py-1 tracking-wider uppercase transition-all ${formType === 'lost' ? 'bg-p4-orange text-black font-black' : 'text-zinc-400 hover:text-white'}`}
                  >
                    ★ I LOST SOMETHING
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType('found')}
                    className={`font-bebas text-lg px-4 py-1 tracking-wider uppercase transition-all ${formType === 'found' ? 'bg-p4-yellow text-black font-black' : 'text-zinc-400 hover:text-white'}`}
                  >
                    ☆ I FOUND SOMETHING
                  </button>
                </div>
              </div>

              {/* Form Input fields */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left controls: Descriptive Parameters */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-p4-yellow font-bold mb-1">Item Headline (e.g. Blue WAB Hoodie)</label>
                      <input
                        type="text"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        required
                        placeholder="Be precise & brief"
                        className="w-full bg-zinc-950 border-2 border-zinc-805 focus:border-p4-yellow p-2.5 text-xs text-white uppercase outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Reporting Date</label>
                      <input
                        type="date"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        required
                        className="w-full bg-zinc-950 border-2 border-zinc-805 focus:border-p4-yellow p-2.5 text-xs text-white uppercase outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Primary Campus Zone</label>
                      <select
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        className="w-full bg-zinc-950 border-2 border-zinc-805 focus:border-p4-yellow p-2.5 text-xs text-white uppercase outline-none"
                      >
                        <option value="Atrium">Atrium Portal</option>
                        <option value="Library">Primary Library Wing</option>
                        <option value="Sports Pitch">Outdoor Sports Pitch</option>
                        <option value="Cafeteria">Student Cafeteria</option>
                        <option value="HS Wing">High School Classroom Wing</option>
                        <option value="Drama Theater">Drama Theater Arena</option>
                        <option value="Gym">Secondary Gym Pool</option>
                        <option value="Other">Other Campus Area</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Category Registry Label</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full bg-zinc-950 border-2 border-zinc-805 focus:border-p4-yellow p-2.5 text-xs text-white uppercase outline-none"
                      >
                        <option value="Clothing/Blazer">Official Clothing/Blazer</option>
                        <option value="Electronics">MacBook/Airpods/Electronics</option>
                        <option value="ID/Card">School ID Card</option>
                        <option value="Bottle/Flask">Water Flask/Flask</option>
                        <option value="Keys/Fobs">Keys/Locker Fobs</option>
                        <option value="Bags/Books">Bags & Textbooks</option>
                        <option value="Other">Other Miscellaneous Item</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Full Casework Description (Describe specific marks, serial numbers, labels)</label>
                    <textarea
                      rows={3}
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="e.g. Scans on inner fabric reads size M, features a mascot badge attached to lapel..."
                      className="w-full bg-zinc-950 border-2 border-zinc-805 focus:border-p4-yellow p-2.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-p4-yellow font-bold mb-1">Your Full Name (Student ID)</label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                        placeholder="e.g. Michael Chen"
                        className="w-full bg-zinc-950 border-2 border-zinc-805 focus:border-p4-yellow p-2.5 text-xs text-white uppercase outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-p4-yellow font-bold mb-1">Private Contacts (WeChat ID or Email Address)</label>
                      <input
                        type="text"
                        value={contactDetails}
                        onChange={(e) => setContactDetails(e.target.value)}
                        required
                        placeholder="e.g. WeChat ID or School Email"
                        className="w-full bg-zinc-950 border-2 border-zinc-805 focus:border-p4-yellow p-2.5 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  {formType === 'lost' && (
                    <div>
                      <label className="block text-xs font-mono uppercase text-p4-orange font-bold mb-1">Incentive Reward or Gratitude Note (Optional)</label>
                      <input
                        type="text"
                        value={rewardInfo}
                        onChange={(e) => setRewardInfo(e.target.value)}
                        placeholder="e.g. Free boba study treat at the cafeteria!"
                        className="w-full bg-zinc-950 border-2 border-zinc-805 focus:border-p4-yellow p-2.5 text-xs text-white outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Right controls: PHOTO UPLOAD CASE (Provides Drag & Drop + Preset Fallbacks) */}
                <div className="space-y-4">
                  <div className="border-t lg:border-t-0 pt-4 lg:pt-0">
                    <p className="block text-xs font-mono uppercase text-white font-bold mb-2">Item Visual Proof (Image)</p>
                    
                    {/* Drag and Drop Zone */}
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`h-48 border-2 border-dashed rounded-none transition-all cursor-pointer flex flex-col items-center justify-center p-4 text-center ${dragActive ? 'border-p4-yellow bg-p4-yellow/10' : selectedImage ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-800 hover:border-zinc-650 bg-zinc-955'}`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />

                      {selectedImage ? (
                        <div className="relative w-full h-full flex flex-col justify-between">
                          <img src={selectedImage} alt="Preview" className="w-full h-32 object-contain" referrerPolicy="no-referrer" />
                          <div className="flex justify-between items-center bg-black/90 p-1 text-[9px] font-mono">
                            <span className="text-zinc-400 capitalize">IMAGE PREVIEW READY</span>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setSelectedImage(''); }}
                              className="text-p4-orange hover:underline font-bold"
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 text-zinc-400 group">
                          <Upload className="w-8 h-8 mx-auto text-zinc-500 group-hover:text-p4-yellow group-hover:scale-110 transition-all" />
                          <h4 className="font-bebas text-lg text-white">Drag & drop item photo</h4>
                          <p className="text-[10px] font-mono text-zinc-500">OR CLICK TO BROWSE COMPUTER FILES</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Preset Graphics selector for UX testing */}
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-zinc-500 mb-2">Or select a standard item template:</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {presetImages.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedImage(p.url)}
                          className={`relative h-12 bg-zinc-900 border-2 border-zinc-800 p-0.5 overflow-hidden group hover:border-p4-yellow transition-all ${selectedImage === p.url ? 'border-p4-orange' : ''}`}
                        >
                          <img src={p.url} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                            <span className="text-[7px] font-semibold text-white uppercase text-center truncate">{p.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Action row */}
              <div className="border-t border-zinc-800 pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="font-bebas text-lg tracking-wider text-zinc-400 hover:text-white px-5 py-2 uppercase transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="bg-p4-yellow hover:bg-p4-orange text-black py-3 px-8 font-bebas text-2xl tracking-widest uppercase transition-all border-2 border-black clip-sharp shadow-p4-black font-extrabold cursor-pointer"
                >
                  ★ SUBMIT ITEM BULLETIN ★
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. SEARCH & SEARCH FILTERS BAR (Highly high-contrast stylized styling) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-p4-card p-4 border-2 border-zinc-800 clip-sharp">
        
        {/* Keyword Search Input */}
        <div className="md:col-span-4 relative">
          <input
            id="bulletin-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bulletins (Blazer, key, student name...)"
            className="w-full bg-zinc-950 border-2 border-zinc-800 focus:border-p4-yellow pl-10 pr-4 py-2.5 text-xs text-white uppercase outline-none"
          />
          <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-zinc-500" />
        </div>

        {/* Primary Case Type Filter */}
        <div className="md:col-span-4 flex flex-wrap gap-1.5 justify-center md:justify-start font-sans">
          <button
            id="filter-tag-all"
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-extrabold clip-badge transition-all cursor-pointer ${typeFilter === 'all' ? 'bg-p4-cyan text-black' : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'}`}
          >
            ALL
          </button>
          <button
            id="filter-tag-lost"
            onClick={() => setTypeFilter('lost')}
            className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-extrabold clip-badge transition-all cursor-pointer ${typeFilter === 'lost' ? 'bg-p4-orange text-black font-black' : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'}`}
          >
            ★ LOST
          </button>
          <button
            id="filter-tag-found"
            onClick={() => setTypeFilter('found')}
            className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-extrabold clip-badge transition-all cursor-pointer ${typeFilter === 'found' ? 'bg-p4-yellow text-black font-black' : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'}`}
          >
            ☆ FOUND
          </button>
          <button
            id="filter-tag-reclaimed"
            onClick={() => setTypeFilter('reclaimed')}
            className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-extrabold clip-badge transition-all cursor-pointer ${typeFilter === 'reclaimed' ? 'bg-emerald-600 text-white' : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'}`}
          >
            RECLAIMED
          </button>
        </div>

        {/* Location Dropdown selector */}
        <div className="md:col-span-2">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full bg-zinc-950 border-2 border-zinc-800 focus:border-p4-yellow p-2 py-2 text-[10px] font-mono text-zinc-400 uppercase outline-none"
          >
            <option value="all">ALL CAMPUS LOCATIONS</option>
            <option value="Atrium">ATRIUM</option>
            <option value="Library">LIBRARY</option>
            <option value="Sports Pitch">SPORTS PITCH</option>
            <option value="Cafeteria">CAFETERIA</option>
            <option value="HS Wing">HS WING</option>
            <option value="Drama Theater">THEATER</option>
            <option value="Gym">GYM</option>
            <option value="Other">OTHER</option>
          </select>
        </div>

        {/* Category Dropdown selector */}
        <div className="md:col-span-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-zinc-950 border-2 border-zinc-800 focus:border-p4-yellow p-2 py-2 text-[10px] font-mono text-zinc-400 uppercase outline-none"
          >
            <option value="all">ALL CATEGORIES</option>
            <option value="Clothing/Blazer">CLOTHING/BLAZER</option>
            <option value="Electronics">ELECTRONICS</option>
            <option value="ID/Card">ID CARD</option>
            <option value="Bottle/Flask">WATER VASE</option>
            <option value="Keys/Fobs">KEYS/FOBS</option>
            <option value="Bags/Books">BAGS/BOOKS</option>
            <option value="Other">OTHER</option>
          </select>
        </div>

      </div>

      {/* 5. LIVE BULLETIN CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredItems.map(item => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative bg-p4-card border-2 border-zinc-800 group hover:border-p4-yellow hover:shadow-p4-glow text-p4-light flex flex-col justify-between overflow-hidden transition-all duration-300"
            >
              {/* Image banner */}
              <div className="h-44 bg-zinc-900 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Left Cut-out Ribbon Type badge: LOST vs FOUND Case */}
                <div className={`absolute top-0 left-0 text-black font-bebas px-4 py-1.5 text-lg tracking-widest rotate-[-4deg] -translate-x-1 translate-y-1.5 shadow-md border border-black ${
                  item.type === 'lost' ? 'bg-p4-orange' : 'bg-p4-yellow'
                }`}>
                  {item.type === 'lost' ? '★ LOST AT WAB' : '☆ DETECTED / FOUND'}
                </div>

                {/* Stamp overlay if case is Reclaimed / United */}
                {item.status === 'reclaimed' && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4">
                    <motion.div
                      initial={{ scale: 2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, rotate: -15 }}
                      className="border-4 border-dashed border-emerald-550 text-emerald-400 bg-neutral-950/90 font-bebas text-2xl md:text-3xl px-4 py-2 uppercase tracking-widest text-center"
                    >
                      ★ SECURED & RESTORED ★
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Core Content details */}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-p4-orange" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-bebas text-2xl text-white tracking-wide uppercase line-clamp-1 mb-1">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs uppercase font-mono text-zinc-500 mb-3 tracking-wide bg-neutral-900/60 inline-block px-1.5 border border-zinc-800">
                    TAG: {item.category}
                  </p>

                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Reporter detail information block */}
                <div className="border-t border-zinc-900 pt-3 mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-500 uppercase flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> REPORTER:
                    </span>
                    <span className="text-white max-w-[140px] truncate">{item.studentName}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-500 uppercase">CONTACT INFO:</span>
                    <span className="text-p4-orange font-bold text-[10px] break-all select-all">{item.contactDetails}</span>
                  </div>

                  {item.rewardInfo && (
                    <div className="bg-p4-orange/15 border border-dashed border-p4-orange/30 p-1.5 text-[10px] text-p4-orange font-extrabold uppercase">
                      ★ INCENTIVE: {item.rewardInfo}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons list */}
              <div className="bg-black p-2.5 flex items-center gap-2 border-t border-zinc-900">
                {item.status === 'active' ? (
                  <>
                    <button
                      id={`reclaim-btn-${item.id}`}
                      onClick={() => handleReclaimItem(item.id)}
                      className="flex-grow bg-emerald-700 hover:bg-emerald-600 text-white font-bebas py-2 px-2.5 text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-1 border border-emerald-500 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      RECLAIM / RESOLVED
                    </button>
                    
                    <button
                      id={`delete-btn-${item.id}`}
                      onClick={() => handleDeleteItem(item.id)}
                      className="bg-zinc-90 w-10 text-zinc-400 hover:text-p4-magenta transition-all flex items-center justify-center border border-zinc-800 hover:border-p4-magenta py-1.5 cursor-pointer"
                      title="Remove Post"
                    >
                      <Trash2 className="w-4 h-4 shrink-0" />
                    </button>
                  </>
                ) : (
                  <div className="w-full text-center py-1.5">
                    <span className="text-[10px] font-mono uppercase text-emerald-500 font-extrabold flex items-center justify-center gap-1">
                      <Check className="w-4.5 h-4.5" /> PROPERTY RECLAIMED & RESOLVED
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-zinc-800 p-8">
            <HelpCircle className="w-12 h-12 text-zinc-650 mx-auto mb-3" />
            <h4 className="font-bebas text-2xl text-p4-yellow tracking-wider">★ NO BULLETINS MATCH APPLIED FILTERS ★</h4>
            <p className="text-xs text-zinc-500 font-sans mt-1">Try resetting search or filter parameters to find items.</p>
          </div>
        )}
      </div>
    </div>
  );
}
