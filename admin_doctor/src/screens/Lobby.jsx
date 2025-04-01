import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../socketContext/SocketProvider';
import { useNavigate } from 'react-router-dom';

const Lobby = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [roomId,setRoomId] = useState("");

    const socket = useSocket();
    const navigate = useNavigate();

    const handleSubmit = useCallback((e)=>{
        e.preventDefault();
        
        socket.emit('room:join',{name,email,roomId});
    },[name,roomId,socket])

    const handleJoinRoom = useCallback((data)=>{
        const {name,email,roomId} = data;
        navigate(`/doctor/virtual/appointment/${roomId}`)
      },[navigate])
  
      useEffect(()=>{
        socket.on('room:join',handleJoinRoom);
  
        return ()=>{
          socket.off('room:join',handleJoinRoom);
        }
    },[socket,handleJoinRoom])  


  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 px-4 py-10 w-full">
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
      <h1 className="text-2xl font-bold text-center text-primary mb-4">Join a Room</h1>
  
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-600 font-medium">Your Name:</label>
          <input 
            type="text" 
            id="name" 
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
  
        <div>
          <label htmlFor="email" className="block text-gray-600 font-medium">Email ID:</label>
          <input 
            type="email" 
            id="email" 
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
  
        <div>
          <label htmlFor="roomId" className="block text-gray-600 font-medium">Room ID:</label>
          <input 
            type="text" 
            id="roomId" 
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
            value={roomId} 
            onChange={(e) => setRoomId(e.target.value)}
            required
          />
        </div>
  
        <button 
          type="submit" 
          className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-green-500 transition-all duration-200 shadow-md"
        >
          Join Room
        </button>
      </form>
    </div>
  </div>
  
  )
}

export default Lobby
