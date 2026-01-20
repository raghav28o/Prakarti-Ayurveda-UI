import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, User, Sparkles } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../apiConfig';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve the answers passed from the Assessment page via 'state'
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
        const data = await response.json();

        console.log('🔐 Backend response:', data);
        console.log('🔐 User data received:', data.user);
        console.log('🔐 Token received:', data.token);

        // If backend doesn't return user, extract from JWT
        let user = data.user;
        if (!user && data.token) {
          try {
            // Decode JWT manually (it's base64url encoded)
            const parts = data.token.split('.');
            const payload = JSON.parse(atob(parts[1]));

            // Create a minimal user object from JWT
            user = {
              id: payload.sub || payload.email || payload.jti,
              email: payload.sub,
              jti: payload.jti
            };

            console.log('🔑 Extracted user from JWT:', user);
          } catch (err) {
            console.error('Failed to decode JWT:', err);
          }
        }

        // Store the token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(user || {}));
        localStorage.setItem('loginTime', Date.now().toString());

        console.log('💾 Stored in localStorage:', {
          token: localStorage.getItem('token'),
          user: localStorage.getItem('user')
        });

        // Navigate to /processing and carry the quizResponses forward
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


  const handleGoogleLogin = () => {
    // Save the quiz responses to localStorage to survive the redirect
    if (quizResponses.length > 0) {
      localStorage.setItem('quizResponses', JSON.stringify(quizResponses));
    }
    // Redirect to the Google auth endpoint
    window.location.href = ENDPOINTS.GOOGLE_AUTH;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-green-300/20 rounded-full blur-3xl" />

      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl" />
      
      {/* Floating leaves */}
      <div className="absolute top-20 right-32 text-6xl opacity-10 pointer-events-none select-none">🌿</div>
      <div className="absolute bottom-40 left-24 text-7xl opacity-10 pointer-events-none select-none">🍃</div>
      <div className="absolute top-1/3 left-1/4 text-5xl opacity-10 pointer-events-none select-none">🌱</div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-green-200/60 overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 p-8 text-center relative overflow-hidden">
              {/* Decorative pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                  <path d="M50,10 Q80,30 90,60 Q85,80 60,90 Q40,85 30,70 Q35,40 50,10" fill="currentColor"/>
                </svg>
              </div>
              
              {/* Logo */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4"
              >
                <Leaf className="w-8 h-8 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-serif text-white mb-2">
                {isLogin ? "Welcome Back" : "Unlock Your Personalized Plan"}
              </h2>
              <p className="text-white/90 text-sm">
                {isLogin 
                  ? "Continue your path to wellness" 
                  : "Discover your unique Ayurvedic constitution"}
              </p>
            </div>

            {/* Form */}
            <div className="p-8">
              <form className="space-y-5" onSubmit={handleSubmit}>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-wide ml-1">
                      <User className="w-3 h-3" />
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        className="w-full p-4 pl-12 rounded-2xl bg-green-50/50 border-2 border-green-200/50 focus:border-green-500 focus:bg-white outline-none transition-all text-gray-800"
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required={!isLogin}
                      />
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600/50" />
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-wide ml-1">
                    <Mail className="w-3 h-3" />
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      className="w-full p-4 pl-12 rounded-2xl bg-green-50/50 border-2 border-green-200/50 focus:border-green-500 focus:bg-white outline-none transition-all text-gray-800"
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600/50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-wide ml-1">
                    <Lock className="w-3 h-3" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      className="w-full p-4 pl-12 rounded-2xl bg-green-50/50 border-2 border-green-200/50 focus:border-green-500 focus:bg-white outline-none transition-all text-gray-800"
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600/50" />
                  </div>
                </div>
                
                <motion.button 
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 mt-6 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>{isLogin ? "Sign In" : "Unlock Your Plan"}</span>
                      <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Or Separator */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 mt-4 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google" className="w-5 h-5" />
                <span>Login with Google</span>
              </button>

              {/* Toggle Login/Signup */}
              <div className="mt-8 pt-6 border-t-2 border-green-100 text-center">
                <p className="text-sm text-gray-600 mb-3">
                  {isLogin ? "New to Prakarti AyurVeda?" : "Already have an account?"}
                </p>
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors inline-flex items-center gap-2"
                >
                  {isLogin ? "Create an account" : "Sign in here"}
                  <Leaf className="w-4 h-4" />
                </button>
              </div>

              {/* Trust indicators */}
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Private</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>No Spam</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6 text-sm text-gray-600 flex items-center justify-center gap-2"
          >
            <Leaf className="w-4 h-4 text-green-600" />
            <span>Your journey to balance begins here</span>
            <Leaf className="w-4 h-4 text-green-600" />
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;