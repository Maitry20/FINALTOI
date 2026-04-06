import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, LogIn, ChevronLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'Janki' && password === 'TOI') {
      localStorage.setItem('toi-auth', 'true');
      toast.success('Welcome back, Janki!');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-[100px] -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indiaGreen/10 rounded-full blur-[100px] -ml-20 -mb-20" />

        <div className="w-full max-w-md relative z-10">
           <motion.button 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             onClick={() => navigate('/')}
             className="flex items-center gap-2 text-stone-500 hover:text-white mb-8 group transition-colors"
           >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back to Website
           </motion.button>

           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl"
           >
              <div className="text-center mb-10">
                 <div className="w-20 h-20 bg-saffron rounded-3xl mx-auto flex items-center justify-center text-white shadow-lg shadow-saffron/20 rotate-6 mb-6">
                    <Lock size={32} />
                 </div>
                 <h1 className="text-3xl font-display font-black text-white italic">Admin Portal</h1>
                 <p className="text-stone-500 mt-2">Manage your kitchen presence</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                 <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">Username</label>
                    <div className="relative group">
                       <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-saffron transition-colors" />
                       <input 
                         required
                         type="text" 
                         value={username}
                         onChange={(e) => setUsername(e.target.value)}
                         className="w-full pl-12 pr-4 py-4 bg-stone-800/50 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-saffron focus:bg-stone-800 transition-all font-medium"
                         placeholder="admin"
                       />
                    </div>
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">Password</label>
                    <div className="relative group">
                       <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-saffron transition-colors" />
                       <input 
                         required
                         type="password" 
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         className="w-full pl-12 pr-4 py-4 bg-stone-800/50 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-saffron focus:bg-stone-800 transition-all font-medium"
                         placeholder="••••••••"
                       />
                    </div>
                 </div>

                 <button 
                  type="submit" 
                  className="w-full btn-primary py-4 text-lg tracking-wide flex items-center justify-center gap-3 overflow-hidden group/btn"
                 >
                    <span className="font-black italic">Authorize</span>
                    <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </form>

              <p className="text-center text-stone-600 mt-10 text-sm">
                 Forgot credentials? Please contact technical support.
              </p>
           </motion.div>
        </div>
    </div>
  );
};

export default Login;
