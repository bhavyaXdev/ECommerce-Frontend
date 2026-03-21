import React, { useState, useEffect, useRef } from "react";
import { Star, ShoppingCart, Heart, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../Utility/ProductSlice.js";

const TopDealsSection = () => {
  const dispatch = useDispatch();
  // Dynamically pull from FakeStoreAPI store instead of broken local ethnic models
  const allProducts = useSelector((state) => state.products.allProducts);

  // Pick some products that are specifically Top Rated or just a different slice
  // We'll reverse the array to get different items than the suggestions section
  const products = [...allProducts].reverse().slice(0, 6);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [direction, setDirection] = useState(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      let ipv = 1;
      if (window.innerWidth >= 1024) {
        ipv = 4;
      } else if (window.innerWidth >= 768) {
        ipv = 3;
      } else {
        ipv = 2; // For mobile grid
      }
      setItemsPerView(ipv);
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSlider = itemsPerView === 3;
  const totalGroups = Math.ceil(products.length / (isSlider ? 3 : 4));

  const nextSlide = () => {
    if (totalGroups <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev === totalGroups - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (totalGroups <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? totalGroups - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "50%" : "-50%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? "50%" : "-50%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.1 },
      },
    }),
  };

  if (products.length === 0) return null;

  const renderProductCard = (product) => (
    <motion.div
      key={product.id}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          onError={() => dispatch(removeProduct(product.id))}
          className="w-full h-full object-contain select-none pointer-events-none mix-blend-multiply"
          draggable="false"
        />
      </div>
      <div className="p-3 md:p-4 lg:p-5 flex flex-col flex-1">
        <div className="text-[11px] font-bold text-brand-primary uppercase tracking-widest mb-1 hidden md:block">
          {product.category}
        </div>
        <h3 className="text-gray-800 font-bold text-[13px] md:text-sm lg:text-base mb-1 line-clamp-2 flex-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col">
            <span className="text-sm md:text-md lg:text-lg font-black text-slate-800">
              {typeof product.price === "number"
                ? `₹${product.price.toLocaleString()}`
                : product.price}
            </span>
            <span className="text-[10px] text-gray-400 line-through hidden md:block">
              {typeof product.originalPrice === "number"
                ? `₹${product.originalPrice.toLocaleString()}`
                : product.originalPrice}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Grab exactly two images from the array safely to serve as the banner highlights
  const safeBannerImg1 =
    products[1]?.image ||
    "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg";
  const safeBannerImg2 =
    products[2]?.image ||
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg";

  return (
    <section className="py-12 bg-[#F8F9FA]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Promo Banner */}
        <div className="w-full h-[240px] md:h-[300px] rounded-2xl relative overflow-hidden mb-12 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center px-6 lg:px-16 border border-slate-700 shadow-xl group">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          ></div>

          {/* Title Group */}
          <div className="relative z-10 flex flex-col items-start text-left max-w-[60%]">
            <span className="text-brand-primary font-black text-xs md:text-sm tracking-[0.3em] uppercase mb-2">
              Editor's Pick
            </span>
            <h2 className="text-3xl lg:text-6xl md:text-4xl font-black text-white tracking-tight leading-none mb-4">
              TOP{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                DEALS
              </span>
            </h2>
            <p className="text-gray-300 text-[10px] md:text-sm font-medium uppercase tracking-widest hidden md:block">
              Handpicked for quality and performance.
            </p>
            <button className="mt-6 bg-brand-primary hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all shadow-lg active:scale-95">
              Shop Now
            </button>
          </div>

          {/* Featured Model Images - Right Side "Stickers" */}
          <div className="absolute md:right-0 lg:right-32 right-0 top-0 h-full w-[45%] md:w-[50%] flex items-center justify-end pointer-events-none">
            <div className="relative h-full w-full flex items-center justify-end pr-4 md:pr-12">
              {/* Sticker 1 */}
              <motion.div
                initial={{ rotate: -5 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                className="absolute right-4 md:right-32 bottom-4 md:bottom-8 w-28 h-40 md:w-48 md:h-64 bg-white p-2 md:p-3 pb-8 md:pb-12 rounded-lg shadow-2xl z-20 border border-gray-100 transform -rotate-6"
              >
                <img
                  src={safeBannerImg1}
                  className="w-full h-full object-contain mix-blend-multiply rounded-md"
                  alt="Top Pick 1"
                  onError={(e) =>
                    (e.target.src =
                      "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg")
                  }
                />
                <div className="absolute bottom-2 left-0 w-full text-center text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Premium
                </div>
              </motion.div>

              {/* Sticker 2 */}
              <motion.div
                initial={{ rotate: 8 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                className="absolute right-0 md:right-8 top-4 md:top-8 w-24 h-36 md:w-36 md:h-52 bg-white p-2 md:p-3 pb-8 md:pb-12 rounded-lg shadow-2xl z-10 border border-gray-100 transform rotate-12"
              >
                <img
                  src={safeBannerImg2}
                  className="w-full h-full object-contain mix-blend-multiply rounded-md"
                  alt="Top Pick 2"
                  onError={(e) =>
                    (e.target.src =
                      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg")
                  }
                />
                <div className="absolute bottom-2 left-0 w-full text-center text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Trending
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Grid/Slider */}
        {isSlider ? (
          <div className="relative min-h-[300px]">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipeDistance = offset.x;
                  const swipeVelocity = velocity.x;
                  if (swipeDistance < -50 || swipeVelocity < -500) nextSlide();
                  else if (swipeDistance > 50 || swipeVelocity > 500)
                    prevSlide();
                }}
                className="grid grid-cols-3 gap-3 md:gap-6 w-full cursor-grab active:cursor-grabbing"
              >
                {products
                  .slice(currentIndex * 3, currentIndex * 3 + 3)
                  .map(renderProductCard)}
              </motion.div>
            </AnimatePresence>
            {totalGroups > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                {Array.from({ length: totalGroups }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? "w-4 bg-slate-800"
                        : "w-1.5 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {products.map(renderProductCard)}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopDealsSection;
