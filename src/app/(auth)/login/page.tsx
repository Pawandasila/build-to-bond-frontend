"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, Sparkles } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle login logic here
      console.log("Login attempt:", { email, password });
    }, 2000);
  };

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

      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-base-50 to-primary-100 dark:from-base-950 dark:via-base-900 dark:to-primary-950 flex">
        <div className="hidden lg:flex flex-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-primary-500/20 to-primary-700/30 dark:from-primary-400/20 dark:to-primary-600/40" />
          <Image
            src="/assets/candid.jpg"
            alt="Login page illustration"
            fill
            className="object-cover"
            priority={true}
            quality={75}
            sizes="50vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>

        <div className="flex-1 flex items-center justify-center p-3 sm:p-4 lg:p-8 overflow-y-auto">
          <div className="w-full max-w-md py-4 sm:py-8">
            <div className="text-center mb-4 sm:mb-6 max-w-md">
              <div className="inline-flex items-center gap-2 mb-3">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600 dark:text-primary-400" />
                <h1 className="font-marcellus text-xl sm:text-2xl">
                  <span className="text-primary-700 dark:text-primary-300">Soul</span>
                  <span className="text-primary-500 dark:text-primary-400">ara</span>
                </h1>
              </div>
            </div>

            <div className="bg-background/90 dark:bg-card/95 backdrop-blur-sm rounded-xl shadow-lg border border-primary-200/50 dark:border-card p-4 sm:p-6">
              <div className="mb-3 sm:mb-4">
                <h2 className="font-playfair text-lg sm:text-xl text-foreground mb-1">
                  Welcome Back
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={cn(
                        "w-full pl-9 pr-10 py-2 text-sm rounded-lg border",
                        "border-base-300 dark:border-base-700",
                        "bg-background dark:bg-card text-foreground placeholder:text-base-400 dark:placeholder:text-base-500",
                        "focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                        "transition-colors duration-200 font-sans"
                      )}
                      placeholder="Enter your password"
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
                </div>

                <div className="text-center">
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors font-sans"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
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
                      Signing in...
                    </div>
                  ) : (
                    "Slide In"
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

                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full py-3 px-4 rounded-lg font-sans",
                      "border-base-300 dark:border-base-700 hover:bg-base-100 dark:hover:bg-base-800",
                      "transition-colors duration-200"
                    )}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground font-sans">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
