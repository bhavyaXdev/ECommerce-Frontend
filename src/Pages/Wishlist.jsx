import React from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart, Heart } from "lucide-react";

const Wishlist = () => {
  // Dummy wishlist items
  const wishlistItems = [
    {
      id: 3,
      name: "Smart Watch Series 7",
      category: "Electronics",
      price: 19999,
      image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
      inStock: true
    },
    {
      id: 4,
      name: "Leather Messenger Bag",
      category: "Accessories",
      price: 3499,
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      inStock: false
    }
  ];

  if (wishlistItems.length === 0) {
    return (
      <div className="bg-white min-h-[60vh] flex flex-col items-center justify-center p-8">
        <div className="w-32 h-32 bg-pink-50 rounded-full flex items-center justify-center mb-6 border-4 border-pink-100 shadow-inner">
          <Heart size={48} className="text-pink-300" fill="currentColor" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm text-center">Save items you love and buy them later. Start exploring now!</p>
        <Link to="/" className="bg-brand-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-brand-primary/30 active:scale-95">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            My Wishlist <span className="text-gray-400 font-medium text-lg">({wishlistItems.length})</span>
          </h1>
          <button className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors uppercase tracking-wider">
            Clear All
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
              <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-md active:scale-95">
                  <Trash2 size={18} />
                </button>
                {!item.inStock && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px]">
                    <span className="bg-slate-800 text-white font-bold px-4 py-1.5 rounded-lg text-sm shadow-md">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-4 md:p-5 flex flex-col flex-1">
                <div className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1.5">{item.category}</div>
                <h3 className="font-bold text-slate-800 text-base mb-2 line-clamp-1">{item.name}</h3>
                <div className="font-black text-slate-800 text-xl mb-4">₹{item.price.toLocaleString()}</div>
                
                <button 
                  disabled={!item.inStock}
                  className={`mt-auto w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${item.inStock ? 'bg-slate-800 text-white hover:bg-black active:scale-95 shadow-md' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                  <ShoppingCart size={18} />
                  {item.inStock ? 'Move to Cart' : 'Notify Me'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
