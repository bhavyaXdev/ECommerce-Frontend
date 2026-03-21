import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, MapPin, Package, Heart, LogOut, Settings, Bell, CreditCard } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Saved Addresses", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-8">
          My Account
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-72 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
              <div className="p-6 flex items-center gap-4 bg-linear-to-r from-brand-primary to-blue-600 text-white">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/50 shrink-0 shadow-inner">
                  <User size={32} />
                </div>
                <div>
                  <h2 className="font-bold text-lg leading-tight">John Doe</h2>
                  <p className="text-blue-100 text-sm">john.doe@example.com</p>
                </div>
              </div>
              
              <nav className="p-3">
                <ul className="space-y-1">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <li key={tab.id}>
                        <button
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive ? 'bg-blue-50 text-brand-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                        >
                          <tab.icon size={20} className={isActive ? 'text-brand-primary' : 'text-gray-400'} />
                          {tab.label}
                        </button>
                      </li>
                    );
                  })}
                  <li>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-all mt-4">
                      <LogOut size={20} />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 min-h-[500px]">
              
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center border-b pb-4">
                    <span className="bg-brand-primary w-1 h-5 rounded-full mr-3"></span>
                    Personal Information
                  </h2>
                  
                  <form className="space-y-6 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">First Name</label>
                        <input type="text" defaultValue="John" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent font-medium text-slate-800" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Last Name</label>
                        <input type="text" defaultValue="Doe" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent font-medium text-slate-800" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Email Address</label>
                        <input type="email" defaultValue="john.doe@example.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent font-medium text-slate-800" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Phone Number</label>
                        <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent font-medium text-slate-800" />
                      </div>
                    </div>
                    
                    <button type="button" className="bg-slate-800 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-black transition-all shadow-md active:scale-95">
                      Save Changes
                    </button>
                  </form>
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center border-b pb-4">
                    <span className="bg-brand-primary w-1 h-5 rounded-full mr-3"></span>
                    Order History
                  </h2>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4 border-4 border-gray-100 shadow-inner">
                      <Package size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">No orders found</h3>
                    <p className="text-gray-500 mb-6 max-w-sm">Looks like you haven't placed an order recently.</p>
                    <Link to="/" className="bg-brand-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md active:scale-95">
                      Start Shopping
                    </Link>
                  </div>
                </div>
              )}

              {['wishlist', 'addresses', 'payments', 'notifications', 'settings'].includes(activeTab) && (
                <div>
                  <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center border-b pb-4 capitalize">
                    <span className="bg-brand-primary w-1 h-5 rounded-full mr-3"></span>
                    {activeTab.replace('-', ' ')}
                  </h2>
                  <div className="py-12 text-center text-gray-500 font-medium bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                    This section is under construction. Let's go back to profile or shopping!
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
