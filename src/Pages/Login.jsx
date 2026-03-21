import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Github, Twitter, Facebook } from "lucide-react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-black text-slate-800 tracking-tight">
            {isLogin ? "Welcome Back!" : "Create an Account"}
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            {isLogin 
              ? "Sign in to access your orders, wishlist and more." 
              : "Join UrbanCart to discover premium lifestyle products."}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <label className="sr-only" htmlFor="name">Full Name</label>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-xl relative block w-full px-11 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent sm:text-sm bg-gray-50/50 transition-all font-medium"
                  placeholder="Full Name"
                />
              </div>
            )}
            
            <div className="relative">
              <label className="sr-only" htmlFor="email-address">Email address</label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-xl relative block w-full px-11 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent sm:text-sm bg-gray-50/50 transition-all font-medium"
                placeholder="Email address"
              />
            </div>
            
            <div className="relative">
              <label className="sr-only" htmlFor="password">Password</label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                className="appearance-none rounded-xl relative block w-full px-11 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent sm:text-sm bg-gray-50/50 transition-all font-medium"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 font-medium cursor-pointer">
                Remember me
              </label>
            </div>

            {isLogin && (
              <div className="text-sm">
                <a href="#" className="font-bold text-brand-primary hover:text-blue-700 transition-colors">
                  Forgot your password?
                </a>
              </div>
            )}
          </div>

          <div>
            <button
              type="button"
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-base font-bold rounded-xl text-white bg-slate-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 shadow-lg active:scale-95 transition-all"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </span>
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </div>
        </form>
        
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[Facebook, Twitter, Github].map((Icon, idx) => (
              <div key={idx}>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3.5 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-brand-primary transition-all active:scale-95"
                >
                  <span className="sr-only">Sign in with Social</span>
                  <Icon size={20} />
                </a>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-brand-primary hover:text-blue-700 transition-colors"
            >
              {isLogin ? "Sign up now" : "Sign in instead"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
