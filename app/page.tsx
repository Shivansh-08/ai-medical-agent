"use client";
import React from "react";
import { motion } from "motion/react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HeroSectionOne() {
  const { user } = useUser();
  
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 dark:from-slate-900 dark:via-gray-900 dark:to-black overflow-hidden">
      {/* Simplified background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-400/10 rounded-full blur-3xl animate-pulse dark:bg-white/5"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-400/10 rounded-full blur-3xl animate-pulse dark:bg-white/5"></div>
      </div>

      <Navbar />

      <div className="relative z-10 px-4 py-10 md:py-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100/80 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse dark:bg-gray-400"></div>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">AI-Powered Healthcare</span>
          </div>
        </motion.div>

        {/* Main Title - Simplified */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 mx-auto max-w-5xl text-center text-3xl font-bold text-slate-900 md:text-5xl lg:text-7xl dark:text-slate-100"
        >
          Transform Healthcare with AI Medical Voice Agents
        </motion.h1>

        {/* Subtitle - Simplified */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 mx-auto max-w-4xl py-8 text-center text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-neutral-600 dark:text-neutral-400"
        >
          Provide 24/7 intelligent medical support using conversational AI. Triage symptoms, book appointments, and deliver empathetic care with voice-first automation.
        </motion.p>

        {/* Visual elements to fill the middle space */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative z-10 mx-auto max-w-4xl mt-16 mb-12"
        >
          {/* Floating cards with key features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Triage</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">AI-powered symptom assessment and priority routing</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Voice-First</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Natural conversation interface for seamless interaction</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Response</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Lightning-fast AI responses for immediate medical guidance</p>
            </motion.div>
          </div>

          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-8"
          >
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Availability</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Accuracy</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">&lt;2s</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Response Time</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Support</div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href={user ? '/dashboard' : '/sign-in'}>
            <motion.button 
              className="group relative w-64 transform rounded-xl bg-black px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-white dark:text-black"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative flex items-center justify-center gap-2">
                {user ? 'Go to Dashboard' : 'Get Started'}
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="relative z-10 mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-600 dark:text-neutral-400"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-600 rounded-full dark:bg-gray-400"></div>
            <span>24/7 Availability</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-700 rounded-full dark:bg-gray-300"></div>
            <span>Voice-First AI</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-800 rounded-full dark:bg-gray-200"></div>
            <span>Instant Response</span>
          </div>
        </motion.div>

        {/* Preview section - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="relative z-10 mt-20"
        >
          <div className="relative mx-auto max-w-5xl">
            <div className="relative rounded-3xl border border-neutral-200/50 bg-white/80 backdrop-blur-sm p-6 shadow-2xl dark:border-neutral-600/50 dark:bg-neutral-800/80">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 bg-neutral-100 dark:bg-neutral-700 rounded-lg px-4 py-1 text-sm text-neutral-600 dark:text-neutral-400">
                  medical-ai-dashboard.com
                </div>
              </div>
              <div className="w-full overflow-hidden rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="aspect-[16/9] relative">
                  <Image
                    src="/dashboard-screenshot.png"
                    alt="Dashboard Preview"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 flex w-full items-center justify-between border-b border-neutral-200/50 bg-white/80 backdrop-blur-md px-6 py-4 dark:border-neutral-700/50 dark:bg-neutral-900/80"
    >
      <div className="flex items-center gap-2">
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          MediVoice AI
        </div>
      </div>
      
      {!user ? (
        <Link href={'/sign-in'}>
          <motion.button 
            className="group relative w-28 transform rounded-lg bg-black px-6 py-2.5 font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg md:w-32 dark:bg-black dark:text-white dark:hover:bg-gray-900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative">Login</span>
          </motion.button>
        </Link>
      ) : (
        <motion.div 
          className="flex gap-4 items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative">
            <UserButton />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-neutral-900"></div>
          </div>
          <Link href={'/dashboard'}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="group relative w-28 transform rounded-lg bg-black px-6 py-2.5 font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg md:w-32 dark:bg-black dark:text-white dark:hover:bg-gray-900">
                Dashboard
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
};