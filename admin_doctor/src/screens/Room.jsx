import React, { useState,useEffect,useCallback } from 'react'
import { useSocket } from '../socketContext/SocketProvider';
import {toast} from 'react-toastify'
import peer from '../service/peer';
import ReactPlayer from 'react-player'
import { Navigate, useNavigate } from 'react-router-dom';

const Room = () => {
  const socket = useSocket();
  const navigate = useNavigate();
  const [remoteSocketId,setRemoteSocketId] = useState(null);
  const [myStream,setMyStream] = useState();
  const [remoteStream,setRemoteStream] = useState();
  const [remoteName,setRemoteName] = useState();
  const [myName,setMyName] = useState();


  const sendStreams = useCallback(()=>{
    for(const track of myStream.getTracks()){
        peer.peer.addTrack(track,myStream)
    }
  },[myStream,peer.peer])

  const handleUserJoined = useCallback((data)=>{
    const {name,id,roomId} = data;
    setRemoteSocketId(id);
    setRemoteName(name);
    toast.success(`${name} joined room ${roomId}`)
  },[])



  const handleCall = useCallback(async()=>{
    const stream = await navigator.mediaDevices.getUserMedia({audio:true,video:true})
    const offer = await peer.getOffer();
    setMyStream(stream);
    socket.emit('user:call',{to:remoteSocketId,offer})
  },[socket,remoteSocketId])



  const handleDisconnect = ()=>{
    if(myStream){
        myStream.getTracks().forEach(track=>{track.stop()});
        setMyStream(null);
    }
    if(remoteStream){
        remoteStream.getTracks().forEach(track=>{track.stop()});
        setRemoteStream(null);
    }
    
    //peer.peer.close();
    socket.emit('user:disconnect',{to:remoteSocketId})
    setRemoteSocketId(null);
    setRemoteName(null);
    setMyName(null);
    toast.warn('Disconnected',{
        onClose:()=>{
            navigate('/doctor/virtual/appointment/');
            window.location.reload();
        }
    });
  }


  const handleUserDisconnect = useCallback(()=>{
    if(myStream){
        myStream.getTracks().forEach(track=>{track.stop()});
        setMyStream(null);
    }
    if(remoteStream){
        remoteStream.getTracks().forEach(track=>{track.stop()});
        setRemoteStream(null);
    }
    
    //peer.peer.close();
    setRemoteSocketId(null);
    setRemoteName(null);
    setMyName(null);
    toast.warn('Disconnected',{
        onClose:()=>{
            navigate('/doctor/virtual/appointment/');
            window.location.reload();
        }
    })
  },[socket])


  
  const handleIncommingCall = useCallback(async({from,offer,nameFrom,nameTo})=>{
    setRemoteSocketId(from);
    const stream = await navigator.mediaDevices.getUserMedia({audio:true,video:true});
    setMyStream(stream);
    setRemoteName(nameFrom);
    setMyName(nameTo);
    const ans = await peer.getAns(offer);
    socket.emit('call:accepted',{to:from,ans});
  },[socket])


  const handleCallAccepted = useCallback(async({from,ans,name})=>{
    await peer.setRemoteDescription(ans);
    setMyName(name);
  },[sendStreams])


  const handleNegoNedded = useCallback(async()=>{
    const offer = await peer.getOffer();
    socket.emit('peer:nego:nedded',{to:remoteSocketId,offer})
  },[socket,remoteSocketId])


  const handleNegoNeddedIncomming = useCallback(async({from,offer})=>{
    const ans = await peer.getAns(offer);
    socket.emit('peer:nego:done',{to:from,ans})
  },[socket])


  const handleNegoNeddedFinal = useCallback(async({from,ans})=>{
    await peer.setRemoteDescription(ans);
  },[socket])


  useEffect(()=>{
    peer.peer.addEventListener('negotiationneeded',handleNegoNedded);
    return ()=>{
      peer.peer.removeEventListener('negotiationneeded',handleNegoNedded);
    }
  },[handleNegoNedded])


  useEffect(()=>{
    peer.peer.addEventListener('track',(ev)=>{
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    })
  },[])


  useEffect(()=>{
    socket.on('user:joined',handleUserJoined);
    socket.on('incomming:call',handleIncommingCall);
    socket.on('call:accepted',handleCallAccepted);
    socket.on('peer:nego:nedded',handleNegoNeddedIncomming);
    socket.on('peer:nego:final',handleNegoNeddedFinal);
    socket.on('user:disconnect',handleUserDisconnect);
    return ()=>{
      socket.off('user:joined',handleUserJoined);
      socket.off('incomming:call',handleIncommingCall);
      socket.off('call:accepted',handleCallAccepted);
      socket.off('peer:nego:nedded',handleNegoNeddedIncomming);
      socket.off('peer:nego:final',handleNegoNeddedFinal);
      socket.off('user:disconnect',handleUserDisconnect)
    }
  },[socket,handleUserJoined])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6 w-full">
      <h1 className="text-4xl font-extrabold mb-6 tracking-wide text-blue-400">Appointment Room</h1>
      
      <h4 className={`text-lg font-semibold mb-4 px-4 py-2 rounded-lg shadow-lg ${remoteSocketId ? "bg-green-600" : "bg-red-600"}`}>
        {remoteSocketId ? "✅ Connected" : "❌ No one in the room"}
      </h4>

      {/* Buttons */}
      <div className="mt-4 flex gap-6">
        {myStream && (
          <button
            onClick={sendStreams}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            🎥 Share Video
          </button>
        )}
        
        {remoteSocketId && !myName && (
          <button
            onClick={handleCall}
            className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            📞 Call
          </button>
        )}
        {
            myName &&(
                <button
            onClick={handleDisconnect}
            className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            📞 Disconnect
          </button>
            )
        }
      </div>

      {/* Video Streams */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-10 w-full">
        {myStream && (
          <div className="p-4 bg-gray-800 rounded-xl shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">📹 {myName}</h3>
            <ReactPlayer 
              playing 
              muted 
              className="rounded-lg overflow-hidden"
              url={myStream} 
              width="100%" 
              height="250px"
            />
          </div>
        )}
        
        {remoteStream && (
          <div className="p-4 bg-gray-800 rounded-xl shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-3 text-green-300">🎥 {remoteName}</h3>
            <ReactPlayer 
              playing 
              muted 
              className="rounded-lg overflow-hidden"
              url={remoteStream} 
              width="100%" 
              height="250px"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Room
