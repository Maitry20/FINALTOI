import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { 
  LayoutDashboard, Utensils, Info, LogOut, Plus, Edit2, Trash2, AlertTriangle,
  Save, X, Image as ImageIcon, Euro, Search, AlignLeft, ChevronRight, Menu, 
  Settings, Phone, MapPin, Mail, Globe, 
  Camera, Share2, MessageSquare, Home, Star, Quote, User as UserIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
    const { 
        menu, setMenu, 
        aboutContent, setAbout, 
        contactInfo, setContact, 
        socialLinks, setSocials,
        homeSettings, setHome,
        reviews, setReviews
    } = useData();
    
    const [activeTab, setActiveTab] = useState('menu'); // menu, home, reviews, story, contact
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    
    // Auth Check
    useEffect(() => {
        if (localStorage.getItem('toi-auth') !== 'true') {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('toi-auth');
        toast.success('Logged out successfully');
        navigate('/login');
    };

    // Menu Management State
    const [editingDish, setEditingDish] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newDish, setNewDish] = useState({
        name: '', description: '', price: '', category: 'Main Course', image: ''
    });

    const [storyText, setStoryText] = useState(aboutContent || '');
    useEffect(() => {
        setStoryText(aboutContent || '');
    }, [aboutContent]);

    // Settings & Home State
    const [tempContact, setTempContact] = useState(contactInfo);
    const [tempSocials, setTempSocials] = useState(socialLinks);
    const [tempHome, setTempHome] = useState(homeSettings);

    useEffect(() => {
        setTempContact(contactInfo);
        setTempSocials(socialLinks);
        setTempHome(homeSettings);
    }, [contactInfo, socialLinks, homeSettings]);

    // Review Management State
    const [isAddingReview, setIsAddingReview] = useState(false);
    const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '', date: new Date().toLocaleDateString() });

    // Custom Confirmation State
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

    // Handlers: Menu
    const handleAddDish = (e) => {
        e.preventDefault();
        const updatedMenu = [...menu, { ...newDish, id: Date.now(), price: parseFloat(newDish.price) }];
        setMenu(updatedMenu);
        setIsAdding(false);
        setNewDish({ name: '', description: '', price: '', category: 'Main Course', image: '' });
        toast.success('Dish added!');
    };

    const handleUpdateDish = (e) => {
        e.preventDefault();
        const updatedMenu = menu.map(d => d.id === editingDish.id ? { ...editingDish, price: parseFloat(editingDish.price) } : d);
        setMenu(updatedMenu);
        setEditingDish(null);
        toast.success('Dish updated!');
    };

    const openDeleteDishConfirm = (dish) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Dish?',
            message: `Are you sure you want to remove "${dish.name}" from your menu? This action cannot be undone.`,
            onConfirm: () => {
                const updatedMenu = menu.filter(d => String(d.id) !== String(dish.id));
                setMenu(updatedMenu);
                toast.success('Dish deleted');
                setConfirmModal({ ...confirmModal, isOpen: false });
            }
        });
    };

    // Handlers: Settings & Home
    const handleSaveStory = () => { setAbout(storyText); toast.success('Our Story saved!'); };
    const handleSaveContact = (e) => { e.preventDefault(); setContact(tempContact); setSocials(tempSocials); toast.success('Contact Info saved!'); };
    const handleSaveHome = (e) => { e.preventDefault(); setHome(tempHome); toast.success('Home Setup saved!'); };

    // Handlers: Reviews
    const handleAddReview = (e) => {
        e.preventDefault();
        setReviews([...reviews, { ...newReview, id: Date.now() }]);
        setIsAddingReview(false);
        setNewReview({ name: '', rating: 5, comment: '', date: new Date().toLocaleDateString() });
        toast.success('Review added!');
    };

    const openDeleteReviewConfirm = (rev) => {
        setConfirmModal({
            isOpen: true,
            title: 'Remove Review?',
            message: `Delete the testimonial from "${rev.name}"?`,
            onConfirm: () => {
                setReviews(reviews.filter(r => r.id !== rev.id));
                toast.success('Review removed');
                setConfirmModal({ ...confirmModal, isOpen: false });
            }
        });
    };

    const tabLabels = {
        'menu': 'Menu Items',
        'home': 'Home Setup',
        'reviews': 'Reviews Management',
        'story': 'Our Story',
        'contact': 'Contact Info'
    };

    return (
        <div className="min-h-screen bg-stone-50 flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 bg-stone-900 text-stone-400 w-72 transition-transform duration-500 z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
               <div className="p-8">
                  <div className="flex items-center gap-3 mb-12">
                     <div className="w-10 h-10 bg-saffron rounded-xl flex items-center justify-center text-white rotate-6"><LayoutDashboard size={20} /></div>
                     <span className="text-xl font-display font-black text-white italic tracking-tight">ADMIN <span className="text-saffron">PANEL</span></span>
                  </div>

                  <nav className="space-y-2">
                     {[
                         { id: 'menu', icon: Utensils, label: tabLabels['menu'] },
                         { id: 'home', icon: Home, label: tabLabels['home'] },
                         { id: 'reviews', icon: Star, label: tabLabels['reviews'] },
                         { id: 'story', icon: Info, label: tabLabels['story'] },
                         { id: 'contact', icon: Settings, label: tabLabels['contact'] },
                     ].map(item => (
                        <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === item.id ? 'bg-saffron text-stone-900' : 'hover:bg-white/5 hover:text-white'}`}>
                           <item.icon size={20} /> {item.label}
                        </button>
                     ))}
                  </nav>

                  <div className="absolute bottom-8 left-8 right-8">
                     <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-red-500/10 hover:text-red-500 font-bold group">
                        <LogOut size={20} className="group-hover:translate-x-1" /> Sign Out
                     </button>
                  </div>
               </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all min-h-screen ${isSidebarOpen ? 'pl-72' : 'pl-0'}`}>
                <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-stone-200 px-10 py-6 flex justify-between items-center z-40">
                    <div className="flex items-center gap-6">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-stone-100 rounded-lg text-stone-500"><Menu size={20} /></button>
                        <h1 className="text-2xl font-black italic text-stone-800 uppercase tracking-tighter">{tabLabels[activeTab]}</h1>
                    </div>
                    <button onClick={() => navigate('/')} className="px-4 py-2 text-sm font-bold text-stone-500 hover:text-saffron">Go to Website</button>
                </header>

                <div className="p-10 max-w-6xl mx-auto">
                    {/* Tab: Menu */}
                    {activeTab === 'menu' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex justify-between items-center mb-10">
                                <div><h2 className="text-3xl font-black italic mb-2 leading-none">Dish Library</h2><p className="text-stone-500 font-medium">Manage your menu offerings.</p></div>
                                <button onClick={() => setIsAdding(true)} className="btn-primary flex items-center gap-2"><Plus size={20} /> New Dish</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {menu.map((dish) => (
                                    <div key={dish.id} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm relative group">
                                        <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 border border-stone-100"><img src={dish.image} className="w-full h-full object-cover" /></div>
                                        <span className="text-xs font-black uppercase tracking-widest text-saffron mb-2 block">{dish.category}</span>
                                        <h3 className="text-xl font-black italic mb-2">{dish.name}</h3>
                                        <p className="text-stone-500 text-sm line-clamp-2 mb-4">{dish.description}</p>
                                        <div className="flex justify-between items-center pt-4 border-t border-stone-50">
                                            <span className="text-lg font-black italic">€{dish.price.toFixed(2)}</span>
                                            <div className="flex gap-2">
                                                <button onClick={() => setEditingDish(dish)} className="p-2 bg-stone-50 rounded-lg text-stone-400 hover:text-saffron transition-colors"><Edit2 size={16} /></button>
                                                <button onClick={() => openDeleteDishConfirm(dish)} className="p-2 bg-stone-50 rounded-lg text-stone-400 hover:text-red-500 transition-colors pointer-events-auto"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Tab: Home Setup */}
                    {activeTab === 'home' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <form onSubmit={handleSaveHome} className="space-y-8">
                                <div className="bg-white p-10 rounded-[2.5rem] border border-stone-200 shadow-soft">
                                    <h3 className="text-xl font-black mb-8 italic flex items-center gap-3"><Home size={24} className="text-saffron" /> Hero Section Content</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="col-span-full">
                                            <label className="label-admin">Hero Badge Text</label>
                                            <input type="text" value={tempHome.heroBadge} onChange={(e) => setTempHome({...tempHome, heroBadge: e.target.value})} className="input-admin" />
                                        </div>
                                        <div>
                                            <label className="label-admin">Main Title (Regular)</label>
                                            <input type="text" value={tempHome.heroTitle1} onChange={(e) => setTempHome({...tempHome, heroTitle1: e.target.value})} className="input-admin" />
                                        </div>
                                        <div>
                                            <label className="label-admin">Main Title (Highlighted)</label>
                                            <input type="text" value={tempHome.heroTitle2} onChange={(e) => setTempHome({...tempHome, heroTitle2: e.target.value})} className="input-admin" />
                                        </div>
                                        <div className="col-span-full">
                                            <label className="label-admin">Hero Subtitle</label>
                                            <textarea rows="3" value={tempHome.heroSubtitle} onChange={(e) => setTempHome({...tempHome, heroSubtitle: e.target.value})} className="input-admin resize-none" />
                                        </div>
                                        <div className="col-span-full">
                                            <label className="label-admin">Hero Image URL (Circle Center)</label>
                                            <div className="flex gap-4">
                                                <input type="url" value={tempHome.heroImage} onChange={(e) => setTempHome({...tempHome, heroImage: e.target.value})} className="input-admin flex-1" />
                                                <div className="w-16 h-16 rounded-xl border border-stone-200 overflow-hidden shrink-0 bg-stone-50">
                                                    <img src={tempHome.heroImage} className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-10 rounded-[2.5rem] border border-stone-200 shadow-soft">
                                    <h3 className="text-xl font-black mb-8 italic flex items-center gap-3"><Star size={24} className="text-saffron" /> Featured Section Headers</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="label-admin">Section Heading</label>
                                            <input type="text" value={tempHome.featuredTitle} onChange={(e) => setTempHome({...tempHome, featuredTitle: e.target.value})} className="input-admin" />
                                        </div>
                                        <div>
                                            <label className="label-admin">Section Subtext</label>
                                            <textarea rows="2" value={tempHome.featuredSubtitle} onChange={(e) => setTempHome({...tempHome, featuredSubtitle: e.target.value})} className="input-admin resize-none" />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn-primary w-full py-5 text-xl font-black italic shadow-lg shadow-saffron/20 leading-none">Save Home Setup</button>
                            </form>
                        </motion.div>
                    )}

                    {/* Tab: Reviews */}
                    {activeTab === 'reviews' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex justify-between items-center mb-10">
                                <div><h2 className="text-3xl font-black italic mb-2 leading-none">Customer Voices</h2><p className="text-stone-500 font-medium">Manage testimonials shown on your homepage.</p></div>
                                <button onClick={() => setIsAddingReview(true)} className="btn-primary flex items-center gap-2"><Plus size={20} /> Add Review</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {reviews.map((rev) => (
                                    <div key={rev.id} className="bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm flex flex-col justify-between">
                                        <div>
                                            <Quote size={40} className="text-saffron/20 mb-4" />
                                            <p className="text-lg text-stone-700 italic leading-relaxed mb-6">"{rev.comment}"</p>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-saffron/10 flex items-center justify-center text-saffron"><UserIcon size={20} /></div>
                                                <div><p className="font-black italic text-stone-900">{rev.name}</p><p className="text-xs font-bold text-stone-400 uppercase tracking-widest">{rev.date}</p></div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => openDeleteReviewConfirm(rev)} className="p-2 text-stone-300 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {reviews.length === 0 && <div className="text-center py-20 bg-stone-100/50 rounded-[3rem] border-2 border-dashed border-stone-200 text-stone-400 font-bold italic">No reviews added yet. Your customers' voices will appear here.</div>}
                        </motion.div>
                    )}

                    {/* Tab: Contact Info */}
                    {activeTab === 'contact' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <form onSubmit={handleSaveContact} className="space-y-8">
                                <div className="bg-white p-10 rounded-[2.5rem] border border-stone-200 shadow-soft">
                                    <h3 className="text-xl font-black mb-6 italic">Primary Contact</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div><label className="label-admin">Phone Number</label><input type="text" value={tempContact.phone} onChange={(e) => setTempContact({...tempContact, phone: e.target.value})} className="input-admin" /></div>
                                        <div><label className="label-admin">WhatsApp ID/Link</label><input type="text" value={tempContact.whatsapp} onChange={(e) => setTempContact({...tempContact, whatsapp: e.target.value})} className="input-admin" /></div>
                                        <div className="col-span-full"><label className="label-admin">Email Address</label><input type="email" value={tempContact.email} onChange={(e) => setTempContact({...tempContact, email: e.target.value})} className="input-admin" /></div>
                                        <div className="col-span-full"><label className="label-admin">Physical Address</label><input type="text" value={tempContact.address} onChange={(e) => setTempContact({...tempContact, address: e.target.value})} className="input-admin" /></div>
                                    </div>
                                </div>
                                <div className="bg-white p-10 rounded-[2.5rem] border border-stone-200 shadow-soft">
                                    <h3 className="text-xl font-black mb-6 italic">Social Channels</h3>
                                    <div className="space-y-6">
                                        <div><label className="label-admin">Instagram URL</label><input type="url" value={tempSocials.instagram} onChange={(e) => setTempSocials({...tempSocials, instagram: e.target.value})} className="input-admin" /></div>
                                        <div><label className="label-admin">Facebook URL</label><input type="url" value={tempSocials.facebook} onChange={(e) => setTempSocials({...tempSocials, facebook: e.target.value})} className="input-admin" /></div>
                                        <div><label className="label-admin">Twitter/X URL</label><input type="url" value={tempSocials.twitter} onChange={(e) => setTempSocials({...tempSocials, twitter: e.target.value})} className="input-admin" /></div>
                                    </div>
                                </div>
                                <button type="submit" className="btn-primary w-full py-5 italic font-black text-xl leading-none">Update Contact Site-wide</button>
                            </form>
                        </motion.div>
                    )}

                    {/* Tab: Our Story */}
                    {activeTab === 'story' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="bg-white p-10 rounded-[2.5rem] shadow-soft border border-stone-200">
                                <label className="label-admin mb-6 block text-xl italic font-black text-stone-800">Our Heritage & Story</label>
                                <textarea rows="15" value={storyText} onChange={(e) => setStoryText(e.target.value)} className="w-full p-8 bg-stone-50 border-2 border-stone-100 rounded-3xl text-lg font-serif leading-relaxed focus:border-saffron focus:bg-white outline-none" />
                                <button onClick={handleSaveStory} className="btn-primary w-full mt-8 py-5 text-xl font-black italic flex items-center justify-center gap-3"><Save size={24} /> Save Story Changes</button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>

            {/* Modals: Confirmation */}
            <AnimatePresence>
                {confirmModal.isOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-stone-900/80 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-sm rounded-[2rem] p-10 text-center shadow-2xl">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6"><AlertTriangle size={40} /></div>
                            <h3 className="text-2xl font-black italic mb-2 uppercase tracking-tighter text-stone-900">{confirmModal.title}</h3>
                            <p className="text-stone-500 mb-8 font-medium leading-relaxed">{confirmModal.message}</p>
                            <div className="flex gap-4">
                                <button onClick={confirmModal.onConfirm} className="flex-1 px-6 py-4 bg-red-500 text-white rounded-2xl font-black italic leading-none hover:bg-red-600 transition-all shadow-lg shadow-red-500/20">Yes, Delete</button>
                                <button onClick={() => setConfirmModal({...confirmModal, isOpen: false})} className="flex-1 px-6 py-4 bg-stone-100 text-stone-900 rounded-2xl font-black italic leading-none hover:bg-stone-200 transition-all">Cancel</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modals: Dish Setup */}
            <AnimatePresence>
                {(isAdding || editingDish) && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-stone-900/60 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-2xl rounded-[3rem] p-10 relative shadow-2xl">
                            <button onClick={() => { setIsAdding(false); setEditingDish(null); }} className="absolute top-8 right-8 p-2 hover:bg-stone-100 rounded-full transition-colors"><X size={24} /></button>
                            <h3 className="text-3xl font-black italic mb-8">{isAdding ? 'Craft New Delight' : 'Perfect Recipe'}</h3>
                            <form onSubmit={isAdding ? handleAddDish : handleUpdateDish} className="space-y-6">
                                <div><label className="label-admin">Name</label><input required type="text" value={isAdding ? newDish.name : editingDish.name} onChange={(e) => isAdding ? setNewDish({...newDish, name: e.target.value}) : setEditingDish({...editingDish, name: e.target.value})} className="input-admin" /></div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div><label className="label-admin">Category</label><select value={isAdding ? newDish.category : editingDish.category} onChange={(e) => isAdding ? setNewDish({...newDish, category: e.target.value}) : setEditingDish({...editingDish, category: e.target.value})} className="input-admin"><option>Starters</option><option>Main Course</option><option>Desserts</option><option>Beverages</option></select></div>
                                    <div><label className="label-admin">Price (€)</label><input required type="number" step="0.01" value={isAdding ? newDish.price : editingDish.price} onChange={(e) => isAdding ? setNewDish({...newDish, price: e.target.value}) : setEditingDish({...editingDish, price: e.target.value})} className="input-admin" /></div>
                                </div>
                                <div><label className="label-admin">Image URL</label><input required type="url" value={isAdding ? newDish.image : editingDish.image} onChange={(e) => isAdding ? setNewDish({...newDish, image: e.target.value}) : setEditingDish({...editingDish, image: e.target.value})} className="input-admin" /></div>
                                <div><label className="label-admin">Description</label><textarea required rows="3" value={isAdding ? newDish.description : editingDish.description} onChange={(e) => isAdding ? setNewDish({...newDish, description: e.target.value}) : setEditingDish({...editingDish, description: e.target.value})} className="input-admin resize-none" /></div>
                                <div className="pt-4 flex gap-4"><button type="submit" className="flex-1 btn-primary py-4 font-black italic leading-none shadow-lg shadow-saffron/20">{isAdding ? 'Create Dish' : 'Update Changes'}</button><button type="button" onClick={() => { setIsAdding(false); setEditingDish(null); }} className="flex-1 py-4 bg-stone-100 rounded-2xl font-bold italic transition-all leading-none hover:bg-stone-200">Cancel</button></div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal: Review Setup */}
            <AnimatePresence>
                {isAddingReview && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-stone-900/60 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-xl rounded-[3rem] p-10 relative">
                            <button onClick={() => setIsAddingReview(false)} className="absolute top-8 right-8 p-2 hover:bg-stone-100 rounded-full transition-colors"><X size={24} /></button>
                            <h3 className="text-3xl font-black italic mb-8">Add Customer Voice</h3>
                            <form onSubmit={handleAddReview} className="space-y-6">
                                <div><label className="label-admin">Customer Name</label><input required type="text" value={newReview.name} onChange={(e) => setNewReview({...newReview, name: e.target.value})} className="input-admin" placeholder="John Doe" /></div>
                                <div><label className="label-admin">Testimonial Comment</label><textarea required rows="4" value={newReview.comment} onChange={(e) => setNewReview({...newReview, comment: e.target.value})} className="input-admin resize-none" placeholder="Experience sharing..." /></div>
                                <div className="pt-4 flex gap-4"><button type="submit" className="flex-1 btn-primary py-4 font-black italic leading-none shadow-lg shadow-saffron/20">Publish Review</button><button type="button" onClick={() => setIsAddingReview(false)} className="flex-1 py-4 bg-stone-100 rounded-2xl font-bold italic transition-all leading-none hover:bg-stone-200">Cancel</button></div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`.label-admin { @apply block text-xs font-bold text-stone-400 uppercase tracking-widest mb-3; } .input-admin { @apply w-full px-6 py-4 bg-stone-50 border-2 border-stone-50 rounded-2xl focus:border-saffron focus:bg-white outline-none transition-all font-medium placeholder:text-stone-200; }`}</style>
        </div>
    );
};

export default AdminDashboard;
