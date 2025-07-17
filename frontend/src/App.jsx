
import api from './lib/api';
import React, { useState, useEffect } from 'react';
import { Trophy, Sparkles } from "lucide-react"
import AddUserForm from "./components/AddUserForm"
import UserSelector from "./components/UserSelector"
import ClaimButton from "./components/ClaimButton"
import Leaderboard from "./components/Leaderboard"
import ClaimHistory from "./components/ClaimHistory"
import { SparklesText } from "./components/magicui/sparkles-text"

function App() {
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState("")

const fetchUsers = async () => {
      try {
        const res = await api.get("/api/users")
        console.log("fetchUsers", res.data)
        setUsers(res.data)
        if (!selectedUserId && res.data.length > 0) {
          setSelectedUserId(res.data[0]._id)
        }
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

  useEffect(() => {
     
    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFAFA]">

      <div className="bg-[#FAFAFA]  ">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 justify-center">
            <div className="p-3 bg-black">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-center  text-black bg-clip-text  ">
                <SparklesText>Leaderboard</SparklesText>
              </h1>
              <p className="text-gray-600">Track points, compete with friends, and climb the ranks!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6 lg:col-span-3">
            <AddUserForm onUserAdded={fetchUsers} />
            <UserSelector users={users} selectedUserId={selectedUserId} onChange={setSelectedUserId} />
            <ClaimButton userId={selectedUserId} onClaim={fetchUsers} />
          </div>

          {/* Middle Column - Leaderboard */}
          <div className=" lg:col-span-6">
            <Leaderboard />
          </div>

          {/* Right Column - History */}
          <div className="lg:col-span-3">
            <ClaimHistory userId={selectedUserId} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-100 mt-6">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-gray-500">
            <p className="flex items-center justify-center gap-2">
              Made with <Sparkles className="w-4 h-4 text-purple-500" /> and lots of fun!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
