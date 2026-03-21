import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";

const Cart = () => {
  // Dummy cart items for UI demo
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Earbuds",
      category: "Electronics",
      price: 4999,
      image: "https://fakestoreapi.com/img/71li-ujtl-L._AC_UX679_.jpg",
      quantity: 1
    },
    {
      id: 2,
      name: "Minimalist Cotton Tee",
      category: "Fashion",
      price: 799,
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      quantity: 2
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + change;
        return { ...item, quantity: Math.max(1, newQ) };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% GST approx
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="bg-white min-h-[60vh] flex flex-col items-center justify-center p-8">
        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6 border-4 border-gray-100 shadow-inner">
          <ShoppingBag size={48} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm text-center">Looks like you haven't added anything to your cart yet. Discover something amazing!</p>
        <Link to="/" className="bg-brand-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-brand-primary/30 active:scale-95">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-8">
          Shopping Cart <span className="text-gray-400 font-medium text-lg shrink-0">({cartItems.length} Items)</span>
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 md:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 sm:gap-6 items-center group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left w-full h-full py-1">
                  <div className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1.5">{item.category}</div>
                  <h3 className="font-bold text-slate-800 text-lg sm:text-lg mb-1 line-clamp-2 leading-tight">
                    {item.name}
                  </h3>
                  <div className="font-black text-slate-800 text-xl sm:text-xl mb-auto">₹{item.price.toLocaleString()}</div>
                  
                  <div className="flex items-center justify-between w-full mt-4 sm:mt-0 pt-4 sm:pt-4 border-t border-gray-100 sm:border-t-0">
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 rounded-md flex items-center justify-center text-gray-600 hover:bg-white hover:text-black hover:shadow-sm transition-all focus:outline-none">
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-bold text-sm text-slate-800">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 rounded-md flex items-center justify-center text-gray-600 hover:bg-white hover:text-black hover:shadow-sm transition-all focus:outline-none">
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button onClick={() => removeItem(item.id)} className="flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wider">
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-96 shrink-0">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
              <h2 className="font-black text-slate-800 text-xl tracking-tight mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-gray-600 text-sm font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-800">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 text-sm font-medium">
                  <span>Tax (18%)</span>
                  <span className="font-bold text-slate-800">₹{tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 text-sm font-medium">
                  <span>Shipping</span>
                  <span className="font-bold text-green-600">Free</span>
                </div>
              </div>
              
              <div className="border-t pt-4 border-dashed border-gray-300 mb-8">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-slate-800">Total</span>
                  <span className="text-3xl font-black text-brand-primary">
                    ₹{total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
              
              <button className="w-full bg-slate-800 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-black transition-all shadow-md active:scale-95 text-lg">
                Proceed to Checkout <ArrowRight size={20} />
              </button>
              
              <div className="mt-4 flex justify-center text-gray-400">
                <span className="text-xs text-center">Safe and secure payments. 100% Authentic products.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
