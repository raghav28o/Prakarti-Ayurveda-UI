import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroLanding from "./pages/HeroLanding";
import DoshaAwareness from './components/DoshaAwareness';
import Assessment from './pages/Assessment'; // Import your component
import questions from './data/questions'; // Import your questions list
import AuthPage from './components/AuthPage';
import ProcessingLoading from './components/ProcessingLoading';
import NotFound from './pages/NotFound';
import ResultPage from './pages/ResultPage';
import Dashboard from './pages/Dashboard';

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
          <Route path="/processing" element={<ProcessingLoading />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Catch-all route for 404 Not Found - must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;