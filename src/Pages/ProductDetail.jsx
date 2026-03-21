import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { productId } = useParams();
  const { recommendedProducts, ethnicProducts } = useSelector((state) => state.home);
  const globalProducts = useSelector((state) => state.products.allProducts);
  
  const allProducts = [...globalProducts, ...recommendedProducts, ...(ethnicProducts || [])];
  // Simple find logic
  const product = allProducts.find(p => p.id.toString() === productId) || allProducts[0];
  const status = useSelector((state) => state.products.status);
  
  const [activeImage, setActiveImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);

  // Auto-sync image when product arrives from fetch
  React.useEffect(() => { if (product?.image) setActiveImage(product.image) }, [product]);

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-32 min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-brand-primary rounded-full animate-spin mb-4"></div>
        <p className="font-bold text-gray-500">Loading Product Details...</p>
      </div>
    );
  }

  if (!product) return <div className="p-20 text-center font-bold text-slate-800">Product not found.</div>;

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-sm text-gray-500 font-medium flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-brand-primary">Home</Link>
          <ChevronRight size={14} />
          <Link to={`/category/${product.category}`} className="hover:text-brand-primary">{product.category}</Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 truncate">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
          {/* Images Gallery */}
          <div className="md:w-1/2 flex flex-col md:flex-row-reverse gap-4">
            {/* Main Image */}
            <div className="flex-1 bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative group aspect-square">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={activeImage} 
                className="w-full h-full object-cover select-none pointer-events-none" 
                alt={product.name} 
              />
              <button className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-brand-primary hover:bg-gray-50 shadow-md transition-all">
                <Heart size={24} />
              </button>
            </div>
            
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 md:w-24 overflow-x-auto no-scrollbar md:h-[500px]">
              {[product.image, "https://fakestoreapi.com/img/71li-ujtl-L._AC_UX679_.jpg", "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "https://fakestoreapi.com/img/71li-ujtl-L._AC_UX679_.jpg"].map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${activeImage === img ? 'border-brand-primary shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="md:w-1/2 flex flex-col">
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mt-3 mb-6">
              <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm font-bold text-gray-800 space-x-1">
                <Star size={14} className="text-yellow-500" fill="currentColor" />
                <span>{product.rating}</span>
              </div>
              <span className="text-gray-500 font-medium text-sm">{product.reviews} Reviews</span>
            </div>

            <div className="flex items-baseline gap-4 mb-6 relative">
              <span className="text-xl md:text-xl lg:text-3xl font-black text-slate-800">
                {typeof product.price === 'number' ? `₹${product.price.toLocaleString()}` : product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {typeof product.originalPrice === 'number' ? `₹${product.originalPrice.toLocaleString()}` : product.originalPrice}
                </span>
              )}
              {product.discount && (
                <span className="bg-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide">
                  {product.discount}
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Experience the pinnacle of performance and style. Hand-crafted directly by our master builders. Features next-gen technology that keeps you ahead of the curve.
            </p>

            <div className="h-px bg-gray-200 mb-8 w-full"></div>

            {/* Colors */}
            <div className="mb-6">
              <h3 className="font-bold text-slate-800 mb-3">Color: <span className="text-gray-500 font-semibold">Midnight Black</span></h3>
              <div className="flex gap-3">
                {['bg-black', 'bg-red-500', 'bg-blue-600', 'bg-yellow-400'].map((color, idx) => (
                  <div key={idx} className={`w-10 h-10 rounded-full cursor-pointer border-2 flex items-center justify-center ${idx === 0 ? 'border-brand-primary' : 'border-transparent'} hover:border-brand-primary/50 transition-all`}>
                    <div className={`w-8 h-8 rounded-full ${color}`}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity */}
             <div className="mb-8">
              <h3 className="font-bold text-slate-800 mb-3">Quantity</h3>
              <div className="flex items-center bg-gray-100 rounded-xl w-32 justify-between">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black font-bold text-xl transition-colors"
                >
                  -
                </button>
                <span className="font-bold text-slate-800 w-10 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-black font-bold text-xl transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-auto">
              <button className="flex-1 bg-brand-primary text-white py-4 rounded-xl font-bold md:text-lg flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-brand-primary/30">
                <ShoppingCart size={22} />
                Add to Cart
              </button>
              <button className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold md:text-lg hover:bg-black active:scale-95 transition-all shadow-lg">
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#eaf7fc] rounded-full flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-brand-primary" size={24} />
                </div>
                <div className="text-sm">
                  <span className="font-bold block text-slate-800">1 Year Warranty</span>
                  <span className="text-gray-500">Fully covered</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                  <Truck className="text-green-600" size={24} />
                </div>
                <div className="text-sm">
                  <span className="font-bold block text-slate-800">Free Shipping</span>
                  <span className="text-gray-500">Orders &gt; ₹500</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                  <RotateCcw className="text-red-500" size={24} />
                </div>
                <div className="text-sm">
                  <span className="font-bold block text-slate-800">7-Day Returns</span>
                  <span className="text-gray-500">No questions asked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
