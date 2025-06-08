import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { MoodTracker } from './pages/MoodTracker';
import { Journal } from './pages/Journal';
import { Mindfulness } from './pages/Mindfulness';
import { ContentLibrary } from './pages/ContentLibrary';
import { Community } from './pages/Community';
import { TherapistBooking } from './pages/TherapistBooking';
import { AdminDashboard } from './pages/AdminDashboard';
import { Auth } from './pages/Auth';
import { Profile } from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mood-tracker" element={<MoodTracker />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/mindfulness" element={<Mindfulness />} />
            <Route path="/content" element={<ContentLibrary />} />
            <Route path="/community" element={<Community />} />
            <Route path="/therapist" element={<TherapistBooking />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;