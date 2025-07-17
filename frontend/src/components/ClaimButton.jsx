 
import { useState } from "react"
import axios from "axios"
import { Gift, Loader2, Sparkles } from "lucide-react"
import React from 'react'
import api from "../lib/api"
export default function ClaimButton({ userId, onClaim }) {
  const [isLoading, setIsLoading] = useState(false)
  const [justClaimed, setJustClaimed] = useState(false)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const claimPoints = async () => {
    if (!userId) return

    setIsLoading(true)
    try {
      const res = await api.post(`${BACKEND_URL}/api/claim`, { userId })
      onClaim()
      setJustClaimed(true)
      setTimeout(() => setJustClaimed(false), 2000)
    } catch (error) {
      console.error("Error claiming points:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="text-center">
        <div className="inline-flex p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-4">
          <Gift className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">Claim Your Points!</h3>
        <p className="text-gray-600 mb-6">Ready to earn some points? Click the button below!</p>

        <button
          onClick={claimPoints}
          disabled={!userId || isLoading}
          className={`w-full font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg ${
            justClaimed
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
              : "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 text-white"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Claiming Points...
            </>
          ) : justClaimed ? (
            <>
              <Sparkles className="w-5 h-5" />
              Points Claimed!
            </>
          ) : (
            <>
              <Gift className="w-5 h-5" />
              Claim Points
            </>
          )}
        </button>

        {!userId && <p className="text-sm text-gray-500 mt-3">Please select a player first</p>}
      </div>
    </div>
  )
}
