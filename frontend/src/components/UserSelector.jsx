 
import { Users, ChevronDown } from "lucide-react"
import React from 'react'
export default function UserSelector({ users, selectedUserId, onChange }) {
  const selectedUser = users.find((u) => u._id === selectedUserId)

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg">
          <Users className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Select Player</h3>
      </div>

      <div className="relative">
        <select
          value={selectedUserId}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-white appearance-none cursor-pointer"
        >
          <option value="">Choose a player...</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>

      {selectedUser && (
        <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-100">
          <p className="text-sm text-green-700">
            <span className="font-medium">Selected:</span> {selectedUser.name}
          </p>
        </div>
      )}
    </div>
  )
}
