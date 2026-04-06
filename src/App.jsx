import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';

// Public Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './admin/Login';
import AdminDashboard from './admin/Dashboard';

function App() {
  return (
    <DataProvider>
      <LanguageProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin Routes */}
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              {/* Fallback */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Layout>
        </Router>
      </LanguageProvider>
    </DataProvider>
  );
}

export default App;
