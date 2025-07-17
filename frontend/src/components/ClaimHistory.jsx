 
import { useEffect, useState } from "react"
import axios from "axios"
import { History, Clock, Gift, TrendingUp } from "lucide-react"
import React from 'react'
import api from "../lib/api"

export default function ClaimHistory({ userId }) {
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!userId) {
      setHistory([])
      return
    }

    setIsLoading(true)
    api
      .get(`/api/claim/history/${userId}`)
      .then((res) => {
        setHistory(res.data)
      })
      .catch((error) => {
        console.error("Error fetching claim history:", error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [userId])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg">
          <History className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Claim History</h3>
      </div>

      {!userId ? (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Select a player to view their claim history</p>
        </div>
      ) : isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-12 rounded-lg"></div>
          ))}
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-8">
          <Gift className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No claims yet. Start claiming points!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {history.map((h, i) => {
            const { date, time } = formatDate(h.claimedAt)
            return (
              <div
                key={i}
                className="flex items-center gap-4 p-3 bg-gradient-to-r from-gray-200 to-blue-50 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <div className="p-2 bg-slate-300 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-black">+{h.points}</span>
                    <span className="text-sm text-gray-500">points</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>
                      {date} at {time}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
