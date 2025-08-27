import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowUp, LogIn, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [statementIndex, setStatementIndex] = useState(0);
  const statements = [
    "Unlock legal insights with AI...",
    "Streamline your research process...",
    "Access case law instantly...",
    "Empower your practice today..."
  ];

  // Typewriter effect for right side statements
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  useEffect(() => {
    let typingTimeout;
    let eraseTimeout;
    let nextStatementTimeout;

    if (isTyping) {
      if (displayedText.length < statements[statementIndex].length) {
        typingTimeout = setTimeout(() => {
          setDisplayedText(statements[statementIndex].slice(0, displayedText.length + 1) + "|");
        }, 100);
      } else {
        setIsTyping(false);
        eraseTimeout = setTimeout(() => {
          setDisplayedText(statements[statementIndex]); // Remove cursor before erasing
        }, 3000); // Pause before erasing
      }
    } else {
      if (displayedText.length > 0) {
        eraseTimeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1) + (displayedText.endsWith("|") ? "" : "|"));
        }, 50);
      } else {
        nextStatementTimeout = setTimeout(() => {
          setStatementIndex((prev) => (prev + 1) % statements.length);
          setIsTyping(true);
        }, 500);
      }
    }

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(eraseTimeout);
      clearTimeout(nextStatementTimeout);
    };
  }, [displayedText, isTyping, statementIndex]);

  const onSubmit = async (data) => {
    setIsLoadingLogin(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Simulate success or failure
      if (data.email && data.password) {
        toast.success("Login successful!", {
          style: {
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
          },
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed: " + error.message, {
        style: {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "8px",
        },
      });
    } finally {
      setIsLoadingLogin(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoadingGoogle(true);
    try {
      // Simulate Google auth
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Signed in with Google!", {
        style: {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "8px",
        },
      });
    } catch (error) {
      toast.error("Google sign-in failed!", {
        style: {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "8px",
        },
      });
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  // Show toast for form validation errors
  useEffect(() => {
    if (errors.email || errors.password) {
      const errorMessage = errors.email?.message || errors.password?.message || "Please fix the errors above";
      toast.error(errorMessage, {
        style: {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "8px",
        },
      });
    }
  }, [errors]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Toaster for notifications */}
      <Toaster position="top-right" />

      {/* Left Side: Login Form */}
      <div className="lg:w-1/2 w-full bg-black flex items-center justify-center p-4 sm:p-8">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mt-25">
            Sign in to your account
          </h2>

          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-white text-sm font-medium">
              Email address
            </label>
            <input
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
              placeholder="email@you.com"
              className="w-full p-3 backdrop-blur-xl bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 mt-3"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Input with Reveal Icon */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-white text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                type={showPassword ? "text" : "password"}
                placeholder="......."
                className="w-full p-3 bg-white/10 backdrop-blur-xl text-white placeholder-white/60 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 mt-3"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-white hover:text-white/40 text-sm">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoadingLogin}
            className={`w-full py-3 bg-white/20 text-white rounded-lg font-medium hover:bg-white/40 hover:shadow-md hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              isLoadingLogin ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoadingLogin ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <LogIn size={18} />
            )}
            Login
          </motion.button>

          {/* Signup Link */}
          <p className="text-center text-white/80 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-white hover:text-white/40">
              Sign Up
            </Link>
          </p>

          {/* Continue with Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-grow h-px bg-white/20"></div>
            <span className="text-white/60 text-sm">or continue with</span>
            <div className="flex-grow h-px bg-white/20"></div>
          </div>

          {/* Google Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoadingGoogle}
            className={`w-full py-3 bg-white/10 backdrop-blur-lg text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              isLoadingGoogle ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoadingGoogle ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google Logo"
                className="w-5 h-5"
              />
            )}
            Continue with Google
          </motion.button>

          {/* Terms Note */}
          <p className="text-center text-white/60 text-xs">
            By logging in, you agree to our{" "}
            <Link to="/terms" className="text-blue-400 hover:text-blue-300">Terms of Service</Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>.
          </p>
        </motion.form>
      </div>

      {/* Right Side: Background Image with Typewriter and Arrow */}
      <div className="lg:w-1/2 w-full hidden lg:flex relative bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-8">
          {/* Typewriter Input Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-lg"
          >
            <div className="relative">
              <input
                type="text"
                value={displayedText}
                readOnly
                className="w-full p-4 bg-white text-black text-lg rounded-lg shadow-md focus:outline-none"
              />
            </div>
          </motion.div>

          {/* Black Round Button with Top Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative bottom-12 left-50"
          >
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg">
              <ArrowUp size={24} className="text-white" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;