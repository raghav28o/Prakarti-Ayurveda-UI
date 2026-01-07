import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../apiConfig';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. Retrieve the answers passed from the Assessment page via 'state'
  const quizResponses = location.state?.responses || [];

  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = isLogin ? ENDPOINTS.LOGIN : ENDPOINTS.REGISTER;
    
    // Construct the payload
    const body = isLogin 
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {        
        const data = await response.json(); // Assuming your API returns { token: "...", user: {...} }
    
        // 1. Store the token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // 2. Store the time it was saved to check for expiry later if you want
        localStorage.setItem('loginTime', Date.now().toString());
        
        // If your backend returns a specific JWT token field, save it explicitly:
        // localStorage.setItem('token', data.accessToken);

        /**
         * 3. HANDOFF TO PROCESSING
         * We navigate to /processing and carry the quizResponses forward.
         * The Processing page will then call the /run API using these responses.
         */
        navigate('/processing', { 
          state: { responses: quizResponses } 
        });

      } else {
        const errorMsg = await response.text();
        alert(errorMsg || "Authentication failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f1de] flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-[40px] shadow-xl w-full max-w-md border border-[#84A98C]/20">
        
        {/* Branding/Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-[#2F3E46] mb-2">
            {isLogin ? "Welcome Back" : "Save Your Progress"}
          </h2>
          <p className="text-[#84A98C] italic text-sm">
            {isLogin 
              ? "Login to view your saved Ayurvedic plans." 
              : "Create an account to unlock your custom diet ritual."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#2F3E46]/60 ml-2">FULL NAME</label>
              <input
                type="text"
                placeholder="Raghav Agarwal"
                className="w-full p-4 rounded-2xl bg-[#f0f4f0] border-none focus:ring-2 focus:ring-[#84A98C] outline-none transition-all"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#2F3E46]/60 ml-2">EMAIL</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full p-4 rounded-2xl bg-[#f0f4f0] border-none focus:ring-2 focus:ring-[#84A98C] outline-none transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#2F3E46]/60 ml-2">PASSWORD</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 rounded-2xl bg-[#f0f4f0] border-none focus:ring-2 focus:ring-[#84A98C] outline-none transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 mt-4 bg-[#2F3E46] text-white rounded-full font-bold shadow-lg hover:bg-black transition-all transform active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? "Verifying..." : isLogin ? "Login" : "Reveal My Plan 🌿"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-[#2F3E46]/60 hover:text-[#84A98C] transition-colors font-medium"
          >
            {isLogin ? "New to Prakarti? Create an account" : "Already have an account? Sign in here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;