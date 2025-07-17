 
import { useEffect, useState } from "react"
import axios from "axios"
import { io } from "socket.io-client"
import { Trophy, Medal, Award, Crown, TrendingUp } from "lucide-react"
import React from 'react'
import api from "../lib/api"
const socket = io("https://leaderboard-be-production.up.railway.app", {
    transports: ['websocket'], // ensures WebSocket is prioritized
  });
  console.log("🔍 VITE_BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);
export default function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get("https://leaderboard-be-production.up.railway.app/api/claim/leaderboard")
      console.log("logging leaderboard ",res.data)
      setLeaders(res.data)
    } catch (error) {
      console.error("Error fetching leaderboard:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaderboard()

    socket.on("leaderboardUpdated", () => {
      fetchLeaderboard()
    })

    return () => {
      socket.off("leaderboardUpdated")
    }
  }, [])

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-500" />
      default:
        return <Trophy className="w-5 h-5 text-gray-400" />
    }
  }

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-500 text-white"
      default:
        return "bg-white border border-gray-200 text-gray-300"
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Leaderboard</h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-16 rounded-xl"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Leaderboard</h3>
      </div>

      {leaders.length === 0 ? (
        <div className="text-center py-8">
          <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No players yet. Add some players to get started!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leaders.map((user, index) => (
            <div
              key={user.name}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] 
                ${getRankStyle(user.rank)}
                `}
            >
              <div className="flex items-center gap-3">
                {getRankIcon(user.rank)}
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black bg-opacity-10 font-bold text-sm">
                  #{user.rank}
                </div>
              </div>

              <div className="flex-1">
                <h4 className="font-bold text-lg">{user.name}</h4>
              </div>

              <div className="text-right">
                <div className="font-bold text-xl">{user.totalPoints}</div>
                <div className="text-xs opacity-75">points</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
