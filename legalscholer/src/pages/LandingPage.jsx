import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Image,
  Mic,
  Loader2,
  Send,
  Zap,
  BookOpen,
  Scale,
  Brain,
  ChevronRight,
  X,
  File,
} from "lucide-react";

export default function LandingPage() {
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [randomSubtitle, setRandomSubtitle] = useState("");
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUploadStatus, setImageUploadStatus] = useState("processing");
  const [imageLoadingTextIndex, setImageLoadingTextIndex] = useState(0);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const borderRef = useRef(null);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const placeholders = [
    "Search for legal cases...",
    "Ask about contract law...",
    "Analyze a case brief...",
    "Find relevant statutes...",
  ];

  const subtitles = [
    "Your legal research assistant",
    "Transforming legal research with AI",
    "Precision in legal analysis",
    "Intelligent case law discovery",
    "Simplifying complex legal concepts",
  ];

  const loadingTexts = [
    "Processing your request...",
    "Analyzing legal databases...",
    "Cross-referencing case law...",
    "Generating insights...",
    "Compiling relevant precedents...",
    "Almost done...",
  ];

  const imageLoadingTexts = [
    "Uploading file...",
    "Extracting text from document...",
    "Identifying legal concepts...",
    "Analyzing document structure...",
    "Cross-referencing with case law...",
    "Finalizing analysis...",
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Get answers to complex legal questions in seconds",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Comprehensive Database",
      description: "Access millions of cases, statutes, and legal documents",
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Case Analysis",
      description: "Deep analysis of case law with relevant citations",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Insights",
      description: "Intelligent predictions and recommendations",
    },
  ];

  // Set random subtitle on refresh
  useEffect(() => {
    setRandomSubtitle(subtitles[Math.floor(Math.random() * subtitles.length)]);
  }, []);

  // Rotate placeholders every 3 seconds
  useEffect(() => {
    if (!isFocused && !inputText) {
      const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isFocused, inputText]);

  // Rotate loading texts when loading
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % loadingTexts.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Rotate image loading texts when uploading
  useEffect(() => {
    let interval;
    if (isImageUploading) {
      interval = setInterval(() => {
        setImageLoadingTextIndex((prev) => (prev + 1) % imageLoadingTexts.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isImageUploading]);

  // Rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Drag and drop event handlers
  useEffect(() => {
    const dropZone = dropZoneRef.current;
    if (!dropZone) return;

    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragOver(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);
      
      const files = e.dataTransfer.files;
      if (files.length > 0 && !isImageUploading) {
        handleFileProcess(files[0]);
      }
    };

    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);

    return () => {
      dropZone.removeEventListener('dragover', handleDragOver);
      dropZone.removeEventListener('dragleave', handleDragLeave);
      dropZone.removeEventListener('drop', handleDrop);
    };
  }, [isImageUploading]);

  // Animate border line
  useEffect(() => {
    if (!borderRef.current) return;

    const line = borderRef.current;
    let animation;

    if (!isFocused) {
      let position = 0;
      let direction = 1; // 1 for clockwise, -1 for counter-clockwise

      animation = setInterval(() => {
        position += direction * 0.2;

        if (position >= 100) {
          position = 100;
          direction = -1;
        } else if (position <= 0) {
          position = 0;
          direction = 1;
        }

        line.style.background = `linear-gradient(90deg, transparent ${position}%, #393e46 ${position}%, #948979 ${
          position + 20
        }%, transparent ${position + 20}%)`;
      }, 20);
    } else {
      line.style.background = "#393e46";
    }

    return () => {
      if (animation) clearInterval(animation);
    };
  }, [isFocused]);

  // Handle file processing
  const handleFileProcess = (file) => {
    if (file && !isImageUploading) {
      setIsImageUploading(true);
      setShowImageModal(true);
      setImageUploadStatus("processing");
      
      // Simulate processing for 6 seconds
      setTimeout(() => {
        setImageUploadStatus("error");
        
        // Close modal after 3 seconds
        setTimeout(() => {
          setShowImageModal(false);
          setImageUploadStatus("processing");
          setIsImageUploading(false);
        }, 3000);
      }, 6000);
    }
  };

  // Handle image upload button click
  const handleImageClick = () => {
    if (!isImageUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileProcess(file);
      
      // Reset file input
      e.target.value = '';
    }
  };

  // Simulate voice recording
  const handleVoiceClick = () => {
    setIsRecording(true);
    // Mock recording for 5 seconds
    setTimeout(() => {
      setIsRecording(false);
      setInputText("Voice input: Example query from voice...");
    }, 5000);
  };

  // Simulate loading state on input submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText || isRecording) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setInputText("");
      }, 6000); // Extended to show all loading texts
    }
  };

  const hasInput = inputText.length > 0 || isRecording;

  return (
    <div
      className="relative min-h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      ref={dropZoneRef}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Drag Overlay */}
      <AnimatePresence>
        {isDragOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-blue-500/20 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800/90 backdrop-blur-lg rounded-xl p-8 max-w-md w-full border-2 border-dashed border-blue-400 text-center"
            >
              <File className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white text-xl font-semibold mb-2">
                Drop file to upload
              </h3>
              <p className="text-white/70">
                Upload any document for legal analysis
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 mt-25">
        <div className="flex flex-col items-center justify-center text-center min-h-[80vh] px-4 sm:px-6">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-6"
          >
            Hi, I'm LegalScholer.
          </motion.h1>

          {/* Random Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mt-4 text-lg sm:text-xl md:text-2xl text-white/90 max-w-xl md:max-w-2xl drop-shadow-md mb-2"
          >
            {randomSubtitle}
          </motion.p>

          {/* Features Carousel - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="my-8 hidden md:flex justify-center items-center space-x-4 text-white/80"
          >
            {features[activeFeature].icon}
            <span className="text-sm md:text-base">
              {features[activeFeature].title} •{" "}
              {features[activeFeature].description}
            </span>
          </motion.div>

          {/* AI Input Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="relative mt-8 w-full max-w-md sm:max-w-lg md:max-w-3xl"
          >
            {/* Moving Border */}
            <div
              ref={borderRef}
              className="absolute -inset-0.5 rounded-xl transition-all duration-300 z-0"
            ></div>

            {/* Input Container */}
            <motion.div
              className="relative bg-white/5 backdrop-blur-lg rounded-xl p-3 sm:p-4 shadow-xl border border-white/10 transition-all duration-300 z-10"
              animate={{
                scale: isFocused ? 1.02 : 1,
                backgroundColor: isFocused
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(255, 255, 255, 0.05)",
              }}
            >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-3"
              >
                {/* Search Input */}
                <div className="relative flex-grow w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholders[placeholderIndex]}
                    className="w-full bg-transparent text-white placeholder-white/60 text-base sm:text-lg pl-10 pr-4 py-12 rounded-md focus:outline-none focus:ring-0"
                  />
                </div>

                {/* Icons: File, Voice */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileSelect}
                    disabled={isImageUploading}
                  />
                  <motion.button
                    type="button"
                    title={isImageUploading ? "Processing file..." : "Upload File"}
                    onClick={handleImageClick}
                    className={`p-2 sm:p-3 backdrop-blur-md rounded-full transition-all duration-300 ${
                      isImageUploading
                        ? "bg-blue-500/30 cursor-not-allowed"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                    whileHover={!isImageUploading ? { scale: 1.1 } : {}}
                    whileTap={!isImageUploading ? { scale: 0.95 } : {}}
                    disabled={isImageUploading}
                  >
                    {isImageUploading ? (
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin" />
                    ) : (
                      <File className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    )}
                  </motion.button>
                  <motion.button
                    type="button"
                    title="Voice Input"
                    onClick={handleVoiceClick}
                    className={`p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-md ${
                      isRecording
                        ? "bg-red-500/20 hover:bg-red-500/30 animate-pulse"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.button>

                  {/* Submit Button - Appears only when there's input */}
                  <AnimatePresence>
                    {hasInput && (
                      <motion.button
                        type="submit"
                        title="Submit Query"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="p-2 sm:p-3 bg-blue-600 hover:bg-blue-500 backdrop-blur-md rounded-full transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin" />
                        ) : (
                          <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        )}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </form>

              {/* Mock Suggestions */}
              <AnimatePresence>
                {inputText && !isLoading && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-full mt-2 w-full bg-slate-800/90 backdrop-blur-md text-white text-sm rounded-md shadow-lg overflow-hidden z-50 border border-white/10"
                  >
                    {[
                      "Contract breach examples",
                      "IP law basics",
                      "Case analysis tools",
                      "Recent Supreme Court rulings",
                    ]
                      .filter((sug) =>
                        sug.toLowerCase().includes(inputText.toLowerCase())
                      )
                      .map((suggestion, idx) => (
                        <motion.li
                          key={idx}
                          className="px-4 py-3 hover:bg-white/10 cursor-pointer transition-colors flex items-center justify-between"
                          onClick={() => setInputText(suggestion)}
                          whileHover={{ x: 5 }}
                        >
                          {suggestion}
                          <ChevronRight className="w-4 h-4 text-white/40" />
                        </motion.li>
                      ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              {/* Loading State */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute top-full mt-2 w-full bg-slate-800/90 backdrop-blur-md text-white text-sm py-3 px-4 rounded-md shadow-md border border-white/10 flex items-center space-x-2"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{loadingTexts[loadingTextIndex]}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-white/60 text-sm"
          >
            <p>Trusted by legal professionals at top firms worldwide</p>
            <div className="flex justify-center space-x-8 mt-4 opacity-80">
              <img
                src="/images/firm1.PNG"
                alt="Firm 1"
                className="h-10 object-contain bg-white rounded-full p-1"
              />
              <img
                src="/images/firm3.PNG"
                alt="Firm 2"
                className="h-10 object-contain bg-white rounded-full p-1"
              />
              <img
                src="/images/firm2.PNG"
                alt="Firm 3"
                className="h-10 object-contain bg-white rounded-full p-1"
              />
              <img
                src="/images/firm4.PNG"
                alt="Firm 4"
                className="h-10 object-contain bg-white rounded-full p-1"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* File Upload Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-slate-800/90 backdrop-blur-lg rounded-xl p-6 max-w-md w-full border border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-lg font-semibold">
                  {imageUploadStatus === "processing" ? "Processing File" : "Upload Error"}
                </h3>
                <button
                  onClick={() => {
                    setShowImageModal(false);
                    setIsImageUploading(false);
                  }}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center py-6">
                {imageUploadStatus === "processing" ? (
                  <>
                    <Loader2 className="w-12 h-12 text-blue-400 animate-spin mb-4" />
                    <div className="text-white text-center">
                      <p className="font-medium mb-2">{imageLoadingTexts[imageLoadingTextIndex]}</p>
                      <p className="text-sm text-white/70 mt-2">
                        This may take a few moments...
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                      <X className="w-8 h-8 text-red-400" />
                    </div>
                    <div className="text-white text-center">
                      <p className="font-medium mb-2">Backend is not connected.</p>
                      <p className="text-sm text-white/70">
                        Please try again later or contact support.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated background circles */}
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full animate-float"></div>
      <div
        className="absolute top-1/3 right-1/4 w-48 h-48 bg-cyan-500/10 rounded-full animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Add styles for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }
        .bg-grid-pattern {
          background-image: linear-gradient(
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}