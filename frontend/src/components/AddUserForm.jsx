 
import { useState } from "react"
import axios from "axios"
import { UserPlus, Loader2 } from "lucide-react"
import React from "react"

export default function AddUserForm({ onUserAdded }) {
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsLoading(true)
    try {
      const res = await axios.post("http://localhost:5000/api/users", { name: name.trim() })
      console.log("logging res from adduesrform ",res.data)
      setName("")
      onUserAdded()
    } catch (error) {
      console.error("Error adding user:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
          <UserPlus className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Add New Player</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter player name..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={!name.trim() || isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Adding Player...
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              Add Player
            </>
          )}
        </button>
      </form>
    </div>
  )
}
