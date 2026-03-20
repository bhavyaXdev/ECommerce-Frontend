import React, { useState, useEffect, useRef } from "react";
import { Star, ShoppingCart, Heart, ArrowRight, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const EthnicWearSection = () => {
    const products = useSelector((state) => state.home.ethnicProducts);
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
                opacity: { duration: 0.2 }
            }
        },
        exit: (direction) => ({
            x: direction < 0 ? "50%" : "-50%",
            opacity: 0,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.1 }
            }
        }),
    };

    const renderProductCard = (product) => (
        <motion.div
            key={product.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
        >
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable="false"
                />
            </div>
            <div className="p-2 md:p-2.5 lg:p-5 flex flex-col flex-1">
                <div className="text-[11px] font-bold text-brand-primary uppercase tracking-widest mb-1 md:mb-1.5 hidden md:block">
                    {product.category}
                </div>
                <h3 className="text-gray-800 font-bold text-[13px] md:text-sm lg:text-base mb-1 line-clamp-2 leading-tight flex-1">
                    {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-1 md:mb-1.5 lg:mb-3">
                    <div className="flex items-center text-yellow-500">
                        <Star size={12} fill="currentColor" />
                        <span className="text-gray-700 text-[10px] md:text-xs font-bold ml-0.5 md:ml-1">{product.rating}</span>
                    </div>
                    <span className="text-gray-400 text-[9px] md:text-[11px]">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-sm md:text-[15px] lg:text-lg font-black text-slate-800 leading-none">
                            {product.price}
                        </span>
                        <span className="text-[9px] md:text-[9px] lg:text-xs text-gray-400 line-through mt-0.5 hidden md:block">
                            {product.originalPrice}
                        </span>
                    </div>
                    <button className="bg-gray-900 text-white p-2 md:p-2 lg:p-2.5 rounded-lg md:rounded-xl hover:bg-brand-primary transition-colors focus:outline-none shadow-sm hidden md:flex">
                        <ShoppingCart size={16} md:size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );

    return (
        <section className="py-12 bg-[#FDFCF0]">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Promo Banner */}
                <div className="w-full h-[240px] md:h-[300px] rounded-2xl relative overflow-hidden mb-8 bg-gradient-to-r from-[#FDECF0] to-[#FEF9E7] flex items-center px-4 lg:px-16 border border-[#FBEAC9] shadow-md group">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#8B5E3C 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                    {/* Title Group - Left Aligned */}
                    <div className="relative z-10 flex flex-col items-start text-left max-w-[60%]">
                        <span className="text-[#8B5E3C] font-extrabold text-xs md:text-sm tracking-[0.3em] uppercase mb-2">Heritage Collection</span>
                        <h2 className="text-2xl lg:text-6xl md:text-3xl font-black text-slate-900 tracking-tight leading-none mb-4">
                            ETHNIC <span className="text-brand-primary">WEAR</span>
                        </h2>
                        <p className="text-gray-600 text-[10px] md:text-sm font-medium uppercase tracking-widest  md:block">
                            Elegance in every thread. Discover <br className="md:block lg:hidden hidden" /> timeless pieces.
                        </p>
                        <div className="h-1.5 w-20 bg-brand-primary lg:mt-6 mt-4 rounded-full group-hover:w-40 transition-all duration-700"></div>
                    </div>

                    {/* Featured Model Images - Right Side "Stickers" */}
                    <div className="absolute md:right-0 lg:right-30  right-0 top-0 h-full w-[45%] md:w-[50%] flex items-center justify-end pointer-events-none">
                        <div className="relative h-full w-full flex items-center justify-end pr-4 md:pr-12">
                            {/* Sticker 1 */}
                            <motion.div
                                initial={{ rotate: -5 }}
                                whileHover={{ rotate: 0, scale: 1 }}
                                className="absolute right-4 md:right-32 bottom-4 md:bottom-8 w-32 h-44 md:w-56 md:h-72 bg-white p-2 md:p-3 pb-8 md:pb-12 rounded-lg shadow-2xl z-20 border border-gray-100 transform -rotate-6"
                            >
                                <img
                                    src="https://i.pinimg.com/736x/2e/c7/23/2ec723e4d29c99e8dd4d17162e77447b.jpg"
                                    className="w-full h-full object-cover rounded-md"
                                    alt="Ethnic Look 1"
                                />
                                <div className="absolute bottom-2 left-0 w-full text-center text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Heritage</div>
                            </motion.div>

                            {/* Sticker 2 */}
                            <motion.div
                                initial={{ rotate: 8 }}
                                whileHover={{ rotate: 0, scale: 1.05 }}
                                className="absolute right-0 md:right-8 top-4 md:top-8 w-28 h-40 md:w-48 md:h-64 bg-white p-2 md:p-3 pb-8 md:pb-12 rounded-lg shadow-2xl z-10 border border-gray-100 transform rotate-12"
                            >
                                <img
                                    src="https://i.pinimg.com/1200x/12/fa/4c/12fa4c3575188df2a6f5aeff74996ee4.jpg"
                                    className="w-full h-full object-cover rounded-md"
                                    alt="Ethnic Look 2"
                                />
                                <div className="absolute bottom-2 left-0 w-full text-center text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Timeless</div>
                            </motion.div>
                        </div>
                    </div>
                </div>



                {/* Section Title */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
                            Timeless <span className="text-[#8B5E3C]">Ethnic Collection</span>
                        </h3>
                        <p className="text-gray-500 text-xs md:text-sm mt-1 uppercase font-bold tracking-widest">Heritage meets Modernity</p>
                    </div>
                </div>

                {/* Grid/Slider */}
                {isSlider ? (
                    <div className="relative min-h-[300px]">
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
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
                                    else if (swipeDistance > 50 || swipeVelocity > 500) prevSlide();
                                }}
                                className="grid grid-cols-3 gap-3 md:gap-6 w-full cursor-grab active:cursor-grabbing"
                            >
                                {products.slice(currentIndex * 3, currentIndex * 3 + 3).map(renderProductCard)}
                            </motion.div>
                        </AnimatePresence>
                        {totalGroups > 1 && (
                            <div className="flex justify-center items-center mt-8 space-x-2">
                                {Array.from({ length: totalGroups }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === index ? "w-4 bg-[#8B5E3C]" : "w-1.5 bg-gray-300"
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

export default EthnicWearSection;
