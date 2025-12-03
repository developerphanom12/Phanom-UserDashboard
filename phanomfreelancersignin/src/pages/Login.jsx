import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { API_BASE } from "../utils/api";

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_BASE + '/api/login', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email, password })
      });
      const json = await res.json();
      if(!res.ok){ toast.error(json?.message || 'Login failed'); return; }
      
      // Store user data in sessionStorage (consistent with signup flow)
      sessionStorage.setItem('userToken', json.token);
      sessionStorage.setItem('userName', json.user?.name || '');
      sessionStorage.setItem('userEmail', json.user?.email || '');
      sessionStorage.setItem('userId', json.user?.id || '');
      
      // Also store in localStorage for apiFetch helper
      localStorage.setItem('token', json.token);
      
      // check test status
      const me = await fetch(API_BASE + '/api/freelancer/me', {
        headers: { 'Authorization': `Bearer ${json.token}` }
      });
      const meJson = await me.json();
      const testGiven = meJson.profile?.test_given;
      if(testGiven) navigate('/coming-soon');
      else navigate('/welcome');
    } catch(e){
      toast.error('Login error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <Toaster />
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input 
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
              placeholder="Enter your email"
              type="email"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition duration-200"
          >
            Login
          </button>
      </form>
        <p className="text-center text-gray-500 text-sm mt-4">
          Don't have an account? <a href="/signup" className="text-purple-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
