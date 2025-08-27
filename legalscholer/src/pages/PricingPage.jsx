import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Zap, Shield, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const PricingPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const plans = [
    {
      name: "Basic",
      price: "49",
      description: "Perfect for individual practitioners",
      features: [
        "100 case searches per month",
        "Basic legal analysis",
        "Email support",
        "5 document downloads",
      ],
    },
    {
      name: "Professional",
      price: "99",
      description: "For small law firms",
      features: [
        "500 case searches per month",
        "Advanced legal analysis",
        "Priority email & chat support",
        "50 document downloads",
        "Case comparison tool",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "199",
      description: "For medium to large firms",
      features: [
        "Unlimited case searches",
        "Premium legal analysis with AI insights",
        "24/7 phone support",
        "Unlimited document downloads",
        "Advanced research tools",
        "Team collaboration features",
      ],
    },
    {
      name: "Custom",
      price: "Custom",
      description: "Tailored for your organization",
      features: [
        "Everything in Enterprise",
        "Custom integrations",
        "Dedicated account manager",
        "Training & onboarding",
        "Custom reporting",
        "API access",
      ],
    },
  ];

  // Card animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 30, rotateX: 0 },
    animate: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.03, rotateX: 2, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/hero-bg.jpg')",
        }}
      ></div>
      <div className="absolute inset-1"></div>

      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16 mt-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Pick the plan that fits your needs
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-xl md:max-w-2xl mx-auto">
            Choose the plan that works best for your legal practice.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className={`relative rounded-2xl overflow-hidden ${plan.popular ? "ring-2 ring-blue-500/50" : ""}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Glow Line Animation on Hover - Edge-only */}
              <AnimatePresence>
                {hoveredCard === index && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent"
                    initial={{ borderImage: "linear-gradient(0deg, #6366f1, #a855f7, #ec4899, #6366f1) 1" }}
                    animate={{
                      borderImage: "linear-gradient(360deg, #6366f1, #a855f7, #ec4899, #6366f1) 1",
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ borderImageSlice: 1 }}
                  />
                )}
              </AnimatePresence>

              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="absolute top-4 right-4 bg-[#222831]/90 text-white text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center"
                >
                  <Star size={12} className="mr-1" /> POPULAR
                </motion.div>
              )}

              {/* Card Content */}
              <div className="bg-white/10 backdrop-blur-md p-6 h-full border border-white/20">
                {/* Plan Name with Shiny Text Effect */}
                <div className="relative inline-block mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white z-10">{plan.name}</h3>
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>

                {/* Price */}
                <div className="my-4">
                  {plan.price === "Custom" ? (
                    <div className="text-2xl sm:text-3xl font-bold text-white">Custom</div>
                  ) : (
                    <>
                      <span className="text-2xl sm:text-3xl font-bold text-white">GHC {plan.price}</span>
                      <span className="text-white/70 text-sm sm:text-base">/month</span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-white/70 text-sm sm:text-base mb-6">{plan.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white mr-2 mt-0.5 flex-shrink-0">
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-white/80 text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Button */}
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 text-white group cursor-pointer ${
                      plan.popular
                        ? " bg-[#222831]/90 hover:bg-[#222831]/10 hover:shadow-lg hover:shadow-blue-500/30"
                        : "bg-white/20 backdrop-blur-md hover:bg-white/30"
                    }`}
                    title={`Choose ${plan.name} Plan`}
                  >
                    Get Started
                    <motion.div
                      className="inline-block ml-2"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight size={16} />
                    </motion.div>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Width Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 relative overflow-hidden"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute top-6 left-6 w-12 h-12 bg-[#222831] rounded-full flex items-center justify-center"
          >
            <Shield size={24} className="text-white" />
          </motion.div>

          {/* Content */}
          <div className="ml-16">
            {/* Shiny Text Title */}
            <div className="relative inline-block mb-2">
              <h3 className="text-lg sm:text-xl font-bold text-white bg-[#222831] p-2">All plans include security guarantees</h3>
             
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="flex items-start"
              >
                <Zap size={18} className="text-white mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">99.9% Uptime Guarantee</p>
                  <p className="text-white/70 text-sm">Reliable access when you need it most</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="flex items-start"
              >
                <Clock size={18} className="text-white mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">24/7 Monitoring</p>
                  <p className="text-white/70 text-sm">Continuous security and performance monitoring</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full filter blur-3xl"
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-500/10 rounded-full filter blur-3xl"
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <style jsx>{`
        @keyframes gradientMove {
          0% {
            border-image-source: linear-gradient(0deg, #6366f1, #a855f7, #ec4899, #6366f1);
          }
          25% {
            border-image-source: linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #6366f1);
          }
          50% {
            border-image-source: linear-gradient(180deg, #6366f1, #a855f7, #ec4899, #6366f1);
          }
          75% {
            border-image-source: linear-gradient(270deg, #6366f1, #a855f7, #ec4899, #6366f1);
          }
          100% {
            border-image-source: linear-gradient(360deg, #6366f1, #a855f7, #ec4899, #6366f1);
          }
        }
        .animate-gradient {
          animation: gradientMove 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PricingPage;