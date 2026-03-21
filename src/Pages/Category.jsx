import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../Utility/ProductSlice.js";
import { Star, ShoppingCart, Heart, Filter, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Category = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  
  // Use products from Redux
  const allProducts = useSelector((state) => state.products.allProducts);
  const status = useSelector((state) => state.products.status);
  
  // URL matching: if "all" or undefined, show all. Otherwise filter by URL initially
  const isAllCategory = !categoryName || categoryName === 'all';
  const displayCategoryName = isAllCategory ? "All Products" : categoryName.replace(/-/g, ' ');

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Define price ranges
  const priceRanges = [
    { label: "Under ₹5,000", min: 0, max: 5000 },
    { label: "₹5,000 - ₹20,000", min: 5000, max: 20000 },
    { label: "₹20,000 - ₹50,000", min: 20000, max: 50000 },
    { label: "Over ₹50,000", min: 50000, max: 9999999 },
  ];

  // Extract unique categories and brands for the filter sidebar dynamically
  const uniqueCategories = useMemo(() => {
    return [...new Set(allProducts.map(p => p.category))].sort();
  }, [allProducts]);

  // Extract unique brands for the filter sidebar dynamically
  const uniqueBrands = useMemo(() => {
    return [...new Set(allProducts.map(p => p.brand))].sort();
  }, [allProducts]);

  // If coming from a specific category route directly, ensure it filters
  useEffect(() => {
    if (!isAllCategory) {
      // The master list of exact categories corresponding to the Header strings
      const masterCategories = ["Women's Fashion", "Men's Fashion", "Home & Lifestyle", "Electronics", "Health & Beauty", "Baby's & Toys", "Groceries & Pets"];
      
      // We do a soft match since URL might be "womens-fashion" and category "Women's Fashion"
      const matchedCat = masterCategories.find(c => 
        c.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-").replace(/'/g, "") === categoryName
      );
      
      if (matchedCat) {
        // Enforce the filter to precisely this category. If Fakestore has no items for it, it will correctly show 0.
        setSelectedCategories([matchedCat]);
      } else {
        // Fallback for unknown URLs: mock an empty category so it filters precisely to 0 products
        setSelectedCategories([categoryName]);
      }
    } else {
      setSelectedCategories([]);
    }
    // Reset other filters on route change
    setSelectedBrands([]);
    setSelectedPriceRanges([]);
  }, [categoryName, isAllCategory]);

  // The actual filtering engine
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // 1. Category Filter
      const catMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      
      // 2. Brand Filter
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      
      // 3. Price Filter
      let priceMatch = selectedPriceRanges.length === 0;
      if (!priceMatch) {
        priceMatch = selectedPriceRanges.some(rangeLabel => {
          const range = priceRanges.find(r => r.label === rangeLabel);
          return product.price >= range.min && product.price <= range.max;
        });
      }

      return catMatch && brandMatch && priceMatch;
    });
  }, [allProducts, selectedCategories, selectedBrands, selectedPriceRanges]);

  // Handlers for toggling filters
  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const togglePriceRange = (rangeLabel) => {
    setSelectedPriceRanges(prev => 
      prev.includes(rangeLabel) ? prev.filter(r => r !== rangeLabel) : [...prev, rangeLabel]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPriceRanges([]);
  };

  const formatPrice = (price) => {
    return typeof price === 'number' ? `₹${price.toLocaleString()}` : price;
  };

  const renderProductCard = (product) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      key={product.id}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50 group">
        <img
          src={product.image}
          alt={product.name}
          onError={() => dispatch(removeProduct(product.id))}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-4 left-4 flex flex-col gap-2 hidden md:flex">
          {product.isNew && (
            <span className="bg-brand-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
              New
            </span>
          )}
          {product.discount && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
              {product.discount}
            </span>
          )}
        </div>

        <div className="absolute top-5 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 hidden md:flex">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-brand-primary hover:text-white transition-all shadow-md transform translate-y-4 group-hover:translate-y-0 duration-300">
            <Heart size={18} />
          </button>
          <Link to={`/product/${product.id}`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-brand-primary hover:text-white transition-all shadow-md transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
            <ShoppingCart size={18} />
          </Link>
        </div>
      </div>

      <div className="p-4 md:p-5 flex flex-col flex-1">
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1 md:mb-1.5 hidden md:block">
          {product.category}
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-gray-800 font-bold text-[14px] md:text-base lg:text-lg mb-1 line-clamp-2 leading-tight hover:text-brand-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-3 md:mb-4">
          <div className="flex items-center text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-gray-700 text-xs md:text-sm font-bold ml-1">{product.rating}</span>
          </div>
          <span className="text-gray-400 text-[10px] md:text-xs">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-lg md:text-xl lg:text-2xl font-black text-slate-800 leading-none tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] md:text-xs text-gray-400 line-through mt-1 hidden md:block">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <Link to={`/cart`} className="bg-slate-800 text-white p-2.5 md:p-3 lg:p-3 rounded-xl hover:bg-brand-primary active:scale-95 transition-all shadow-md md:flex hidden">
            <ShoppingCart size={20} />
          </Link>
          <button className="bg-slate-800 text-white p-2.5 rounded-xl hover:bg-brand-primary transition-colors shadow-sm md:hidden flex">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-white min-h-screen pb-12">
      {/* Category Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-sm text-gray-500 mb-3 font-medium flex items-center gap-2">
            <Link to="/" className="hover:text-brand-primary transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-800 font-bold capitalize">{displayCategoryName}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight capitalize">
                {displayCategoryName}
              </h1>
              <p className="text-gray-500 mt-2 text-sm md:text-base font-medium">
                Explore our collection of {filteredProducts.length} premium items.
              </p>
            </div>
            {/* Mobile Filter Toggle */}
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex items-center justify-center gap-2 bg-slate-800 text-white px-5 py-3 rounded-xl font-bold shadow-md active:scale-95 transition-all w-full mt-2"
            >
              <SlidersHorizontal size={18} /> Filters & Sorting
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters - Desktop */}
        <div className={`fixed inset-0 z-50 bg-white md:bg-transparent md:static md:block md:w-64 lg:w-72 shrink-0 space-y-8 overflow-y-auto md:overflow-visible p-6 md:p-0 transition-transform duration-300 ${isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
          <div className="flex items-center justify-between md:mb-6 mb-8 border-b md:border-b-0 pb-4 md:pb-0">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-brand-primary" />
              <span className="font-black text-xl text-slate-800">Filters</span>
            </div>
            <button className="md:hidden text-gray-500 hover:text-red-500 p-2" onClick={() => setIsMobileFilterOpen(false)}>
              <X size={24} />
            </button>
          </div>

          {(selectedCategories.length > 0 || selectedBrands.length > 0 || selectedPriceRanges.length > 0) && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-gray-800">Active Filters</span>
                <button onClick={clearAllFilters} className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-wider">Clear All</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {[...selectedCategories, ...selectedBrands, ...selectedPriceRanges].map(item => (
                  <span key={item} className="bg-brand-primary/10 text-brand-primary px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center justify-between">
              Categories <ChevronDown size={18} className="text-gray-400" />
            </h3>
            <ul className="space-y-3">
              {uniqueCategories.map((cat, i) => (
                <li key={i} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleCategory(cat)}>
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedCategories.includes(cat) ? 'bg-brand-primary border-brand-primary' : 'border-gray-300 group-hover:border-brand-primary'}`}>
                    {selectedCategories.includes(cat) && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}
                  </div>
                  <span className={`text-sm font-medium ${selectedCategories.includes(cat) ? 'text-gray-900 font-bold' : 'text-gray-600 group-hover:text-brand-primary'}`}>{cat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center justify-between">
              Price Range <ChevronDown size={18} className="text-gray-400" />
            </h3>
            <ul className="space-y-3">
              {priceRanges.map((range, i) => (
                <li key={i} className="flex items-center gap-3 cursor-pointer group" onClick={() => togglePriceRange(range.label)}>
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedPriceRanges.includes(range.label) ? 'bg-brand-primary border-brand-primary' : 'border-gray-300 group-hover:border-brand-primary'}`}>
                    {selectedPriceRanges.includes(range.label) && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}
                  </div>
                  <span className={`text-sm font-medium ${selectedPriceRanges.includes(range.label) ? 'text-gray-900 font-bold' : 'text-gray-600 group-hover:text-brand-primary'}`}>{range.label}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center justify-between">
              Brands <ChevronDown size={18} className="text-gray-400" />
            </h3>
            <ul className="space-y-3">
              {uniqueBrands.map((brand, i) => (
                <li key={i} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleBrand(brand)}>
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedBrands.includes(brand) ? 'bg-brand-primary border-brand-primary' : 'border-gray-300 group-hover:border-brand-primary'}`}>
                    {selectedBrands.includes(brand) && <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>}
                  </div>
                  <span className={`text-sm font-medium ${selectedBrands.includes(brand) ? 'text-gray-900 font-bold' : 'text-gray-600 group-hover:text-brand-primary'}`}>{brand}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:hidden pb-10">
             <button 
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-lg mt-6 active:scale-95"
            >
              Apply Filters ({filteredProducts.length})
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {status === 'loading' ? (
            <div className="flex flex-col items-center justify-center py-32">
               <div className="w-12 h-12 border-4 border-gray-200 border-t-brand-primary rounded-full animate-spin mb-4"></div>
               <p className="font-bold text-gray-500">Fetching live products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Filter size={32} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6 text-center max-w-sm">We couldn't find any items matching your current filters. Try relaxing them a bit!</p>
              <button onClick={clearAllFilters} className="bg-brand-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-md">
                Clear All Filters
              </button>
            </div>
          ) : (
             <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 lg:gap-6">
              <AnimatePresence>
                {filteredProducts.map(renderProductCard)}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
