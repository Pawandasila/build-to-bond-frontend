"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, User, Check, Phone } from "lucide-react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Calculate password strength
    if (field === "password") {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[a-z]/.test(value)) strength++;
      if (/\d/.test(value)) strength++;
      if (/[^A-Za-z\d]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return { text: "Weak", color: "text-red-500" };
      case 2:
      case 3:
        return { text: "Medium", color: "text-yellow-500" };
      case 4:
      case 5:
        return { text: "Strong", color: "text-green-500" };
      default:
        return { text: "", color: "" };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      console.log("Signup attempt:", formData);
    }, 2000);
  };

  const passwordMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword !== "";

  return (
    <>
      <style jsx global>{`
        /* Hide scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for Firefox */
        html {
          scrollbar-width: none;
        }

        /* Hide scrollbar for IE/Edge */
        body {
          -ms-overflow-style: none;
        }
      `}</style>

      <div className="min-h-screen max-h-screen bg-gradient-to-br from-primary-50 via-background to-primary-100 dark:from-background dark:via-card dark:to-primary-950 flex items-center justify-center p-1 overflow-hidden"
      >
        <div className="w-full max-w-5xl bg-card/95 dark:bg-card/95 backdrop-blur-xl rounded-2xl shadow-xl border border-border dark:border-border overflow-hidden relative">
          <div className="flex flex-col lg:flex-row relative z-10">
            {/* Image Section */}
            <div className="lg:w-2/5 h-48 lg:h-auto relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-50 to-primary-100 dark:from-primary-800/20 dark:via-primary-700/30 dark:to-primary-600/40"></div>
              <Image
                src="/assets/auth/login.png"
                alt="Spiritual journey"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={true}
                quality={95}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Decorative elements */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-card/95 dark:bg-card/95 backdrop-blur-sm rounded-xl p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    Start Your Journey
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Join thousands finding meaningful connections every day.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:w-[60%] p-6 lg:p-8 flex flex-col justify-center bg-gradient-to-b from-transparent to-background/50 dark:to-card/50">
              <div className="w-full max-w-lg mx-auto">

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1 group">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-foreground"
                      >
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary-500 transition-colors">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className={cn(
                            "w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border-2",
                            "border-border dark:border-border",
                            "bg-background dark:bg-input text-foreground",
                            "placeholder:text-muted-foreground",
                            "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                            "transition-all duration-300",
                            "hover:border-muted-foreground"
                          )}
                          placeholder="First name"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1 group">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-foreground"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className={cn(
                          "w-full px-4 py-2.5 text-sm rounded-lg border-2",
                          "border-border dark:border-border",
                          "bg-background dark:bg-input text-foreground",
                          "placeholder:text-muted-foreground",
                          "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                          "transition-all duration-300",
                          "hover:border-muted-foreground"
                        )}
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1 group">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary-500 transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={cn(
                          "w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border-2",
                          "border-border dark:border-border",
                          "bg-background dark:bg-input text-foreground",
                          "placeholder:text-muted-foreground",
                          "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                          "transition-all duration-300",
                          "hover:border-muted-foreground"
                        )}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1 group">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-foreground"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary-500 transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className={cn(
                          "w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border-2",
                          "border-border dark:border-border",
                          "bg-background dark:bg-input text-foreground",
                          "placeholder:text-muted-foreground",
                          "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                          "transition-all duration-300",
                          "hover:border-muted-foreground"
                        )}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1 group">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-foreground"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary-500 transition-colors">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className={cn(
                          "w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border-2",
                          "border-border dark:border-border",
                          "bg-background dark:bg-input text-foreground",
                          "placeholder:text-muted-foreground",
                          "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                          "transition-all duration-300",
                          "hover:border-muted-foreground"
                        )}
                        placeholder="Create a password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {formData.password && (
                      <div className="space-y-1">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={cn(
                                "h-1 flex-1 rounded-full transition-colors duration-200",
                                passwordStrength >= level
                                  ? passwordStrength <= 2
                                    ? "bg-red-500"
                                    : passwordStrength <= 3
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                  : "bg-border"
                              )}
                            />
                          ))}
                        </div>
                        <p
                          className={cn(
                            "text-xs font-medium",
                            getPasswordStrengthText().color
                          )}
                        >
                          {getPasswordStrengthText().text}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 group">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-foreground"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary-500 transition-colors">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        className={cn(
                          "w-full pl-10 pr-12 py-2.5 text-sm rounded-lg border-2",
                          formData.confirmPassword === ""
                            ? "border-border"
                            : passwordMatch
                            ? "border-primary-500"
                            : "border-destructive",
                          "bg-background dark:bg-input text-foreground",
                          "placeholder:text-muted-foreground",
                          "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                          "transition-all duration-300",
                          "hover:border-muted-foreground"
                        )}
                        placeholder="Confirm your password"
                        required
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                        {formData.confirmPassword !== "" &&
                          (passwordMatch ? (
                            <Check className="w-4 h-4 text-primary-500" />
                          ) : (
                            <div className="w-4 h-4 rounded-full bg-destructive" />
                          ))}
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="terms"
                      type="checkbox"
                      required
                      className="mt-1 w-4 h-4 rounded border-border bg-background text-primary-500 focus:ring-primary-500 focus:ring-2"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground leading-relaxed"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={
                      isLoading || !passwordMatch || passwordStrength < 3
                    }
                    className={cn(
                      "w-full py-2.5 px-4 text-sm rounded-lg font-medium",
                      "bg-primary-600 hover:bg-primary-700 text-white",
                      "shadow-md hover:shadow-lg",
                      "focus:ring-2 focus:ring-primary-500/25 focus:outline-none",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "transition-all duration-200"
                    )}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Getting ready...
                      </div>
                    ) : (
                      "Hook Up"
                    )}
                  </Button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-card px-4 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full py-2.5 px-4 rounded-lg",
                      "border-border hover:bg-accent",
                      "transition-all duration-200"
                    )}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-muted-foreground text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors relative group"
                    >
                      Sign in
                      <span className="absolute bottom-[-1px] left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        /* Enhanced focus styles */
        .group:focus-within .w-4.h-4 {
          color: rgb(var(--primary-500));
        }
      `}</style>
    </>
  );
};

export default SignupPage;
