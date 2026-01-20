import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroLanding from "./pages/HeroLanding";
import DoshaAwareness from './components/DoshaAwareness';
import Assessment from './pages/Assessment'; // Import your component
import questions from './data/questions'; // Import your questions list
import AuthPage from './components/AuthPage';
import ProcessingLoading from './components/ProcessingLoading';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';
import NotFound from './pages/NotFound';
import ResultPage from './pages/ResultPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <main className="bg-[#f0f4f0] min-h-screen overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HeroLanding />} />
          <Route path="/DoshaAwareness" element={<DoshaAwareness />} />
          {/* MOVE THIS INSIDE ROUTES */}
          <Route path="/assessment" element={<Assessment questions={questions} />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/processing" element={<ProtectedRoute><ProcessingLoading /></ProtectedRoute>} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          <Route path="/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          {/* Catch-all route for 404 Not Found - must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;