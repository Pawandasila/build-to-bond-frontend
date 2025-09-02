"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, User, Sparkles, Check } from "lucide-react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle signup logic here
      console.log("Signup attempt:", formData);
    }, 2000);
  };

  const passwordMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword !== "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-base-50 to-primary-100 dark:from-base-950 dark:via-base-900 dark:to-primary-950 flex">
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-primary-500/20 to-primary-700/30 dark:from-primary-400/20 dark:to-primary-600/40" />
        <Image
          src="/assets/candid.jpg"
          alt="Spiritual journey"
          fill
          className="object-cover"
          priority={true}
          quality={75}
          sizes="50vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-3 sm:p-4 lg:p-4 overflow-y-auto">
        <div className="w-full max-w-lg py-2 sm:py-3">
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600 dark:text-primary-400" />
              <h1 className="font-marcellus text-xl sm:text-2xl">
                <span className="text-primary-700 dark:text-primary-300">Soul</span>
                <span className="text-primary-500 dark:text-primary-400">ara</span>
              </h1>
            </div>
          </div>

          <div className="bg-background/90 dark:bg-card/95 backdrop-blur-sm rounded-xl shadow-lg border border-primary-200/50 dark:border-card p-4 sm:p-6">
            <div className="mb-4">
              <h2 className="font-playfair text-lg sm:text-xl text-foreground mb-1">
                Join Solara
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="firstName"
                    className="block text-xs font-sans font-medium text-foreground"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-400 dark:text-base-500" />
                    <input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className={cn(
                        "w-full pl-9 pr-4 py-2 text-sm rounded-lg border",
                        "border-base-300 dark:border-base-700",
                        "bg-background dark:bg-card text-foreground placeholder:text-base-400 dark:placeholder:text-base-500",
                        "focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                        "transition-colors duration-200 font-sans"
                      )}
                      placeholder="First name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="lastName"
                    className="block text-xs font-sans font-medium text-foreground"
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
                      "w-full px-4 py-2 text-sm rounded-lg border",
                      "border-base-300 dark:border-base-700",
                      "bg-background dark:bg-card text-foreground placeholder:text-base-400 dark:placeholder:text-base-500",
                      "focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                      "transition-colors duration-200 font-sans"
                    )}
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-xs font-sans font-medium text-foreground"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-400 dark:text-base-500" />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={cn(
                      "w-full pl-9 pr-4 py-2 text-sm rounded-lg border",
                      "border-base-300 dark:border-base-700",
                      "bg-background dark:bg-card text-foreground placeholder:text-base-400 dark:placeholder:text-base-500",
                      "focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                      "transition-colors duration-200 font-sans"
                    )}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-xs font-sans font-medium text-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-400 dark:text-base-500" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={cn(
                      "w-full pl-9 pr-12 py-2 text-sm rounded-lg border",
                      "border-base-300 dark:border-base-700",
                      "bg-background dark:bg-card text-foreground placeholder:text-base-400 dark:placeholder:text-base-500",
                      "focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                      "transition-colors duration-200 font-sans"
                    )}
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-400 dark:text-base-500 hover:text-base-600 dark:hover:text-base-300 transition-colors"
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
                              ? level <= 2
                                ? "bg-red-500"
                                : level <= 3
                                ? "bg-yellow-500"
                                : "bg-green-500"
                              : "bg-base-200 dark:bg-base-700"
                          )}
                        />
                      ))}
                    </div>
                    <p
                      className={cn(
                        "text-xs font-sans",
                        getPasswordStrengthText().color
                      )}
                    >
                      {getPasswordStrengthText().text}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-sans font-medium text-foreground"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-400 dark:text-base-500" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className={cn(
                      "w-full pl-9 pr-12 py-2 text-sm rounded-lg border",
                      formData.confirmPassword === ""
                        ? "border-base-300 dark:border-base-700"
                        : passwordMatch
                        ? "border-green-500"
                        : "border-red-500",
                      "bg-background dark:bg-card text-foreground placeholder:text-base-400 dark:placeholder:text-base-500",
                      "focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                      "transition-colors duration-200 font-sans"
                    )}
                    placeholder="Confirm your password"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    {formData.confirmPassword !== "" &&
                      (passwordMatch ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-red-500" />
                      ))}
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-base-400 dark:text-base-500 hover:text-base-600 dark:hover:text-base-300 transition-colors"
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
                  className="mt-1 w-4 h-4 rounded border-base-300 dark:border-base-600 bg-background dark:bg-card text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor="terms"
                  className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !passwordMatch || passwordStrength < 3}
                className={cn(
                  "w-full py-2 px-4 text-sm rounded-lg font-sans font-medium",
                  "bg-primary-600 hover:bg-primary-700 text-white",
                  "focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "transition-all duration-200"
                )}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Getting ready...
                  </div>
                ) : (
                  "Hook Up"
                )}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-base-300 dark:border-base-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background dark:bg-card px-4 text-muted-foreground font-sans">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full py-2 px-4 text-sm rounded-lg font-sans",
                    "border-base-300 dark:border-base-700 hover:bg-base-100 dark:hover:bg-base-800",
                    "transition-colors duration-200"
                  )}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground font-sans">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
