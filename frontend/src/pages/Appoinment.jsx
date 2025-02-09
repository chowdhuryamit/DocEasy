import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { RelatedDoctors } from "../components/index.js";
import { toast } from "react-toastify";

const Appoinment = () => {
  const { docId } = useParams();
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots,setDocSlots]=useState([])
  const [slotIndex, setSlotIndex]=useState(0);
  const [slotTime,setSlotTime]=useState('');

  const doctors = useSelector((state) => state.doctorsList.doctors);
  const authstatus= useSelector((state) =>state.auth.status)
  const days=['SUN','MON','TUE','WED','THU','FRI','SAT']
  const navigate=useNavigate()

  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    let today=new Date();

    for(let i=0;i<7;i++){
      let currDate=new Date(today)
      currDate.setDate(today.getDate()+ i)

      let endTime=new Date()
      endTime.setDate(today.getDate() +i)
      endTime.setHours(17,0,0,0)

      if (today.getDate() === currDate.getDate()) {
        currDate.setHours(currDate.getHours()>10?currDate.getHours()+1:10)
        currDate.setMinutes(currDate.getMinutes()>30?30:0)
      }
      else{
        currDate.setHours(10)
        currDate.setMinutes(0)
      }

      let timeSlots=[]

      while(currDate<=endTime){
        let formattedTime=currDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})

        timeSlots.push({
          dateTime:new Date(currDate),
          time:formattedTime
        })

        currDate.setMinutes(currDate.getMinutes()+30)
      }
      setDocSlots((prev)=>([...prev,timeSlots]))
    }
  }

  const bookAppoinment= ()=>{
     if(!authstatus){
        toast.error('Please login to book an appoinment', {
          onClose: () => {
            navigate('/signup'),
            scrollTo(0,0)
          }
        });
     }
  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(()=>{
    getAvailableSlots();
  },[docInfo])


  if(docInfo==null) return <p className="text-center text-gray-600">Loading...</p>;
  return (
      <div className="px-10">
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-10 bg-gray-200 rounded-lg shadow-lg w-full">
          <div className="w-full max-w-[320px] sm:max-w-[280px] md:max-w-[350px] rounded-lg overflow-hidden shadow-md">
            <img
              className="w-full h-auto object-cover rounded-lg bg-primary"
              src={docInfo.image}
              alt="Doctor"
            />
          </div>

          <div className="flex-1 border border-gray-300 rounded-lg p-6 md:p-8 bg-white shadow-md w-full">
            <p className="flex items-center gap-2 text-2xl md:text-3xl font-medium text-gray-800">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="Verified" />
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-1 text-gray-600 text-sm md:text-base">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-1 px-3 border text-xs md:text-sm rounded-full bg-gray-200">
                {docInfo.experience} Years
              </button>
            </div>
            <div className="mt-3">
              <p className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                About <img className="w-4" src={assets.info_icon} alt="Info" />
              </p>
              <p className="text-sm text-gray-600 mt-1">{docInfo.about}</p>
            </div>

            <p className="text-gray-700 font-medium mt-4">
              Appointment Fee : {" ₹ "} 
              <span className="text-gray-900 font-semibold">
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>


        <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
          <p>Book Your slots :</p>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
            {
              docSlots.length && docSlots.map((item,index) => (
                <div onClick={()=>setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'}`}>
                  <p>{item[0] && days[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))
            }
          </div>
          <div className='flex items-center gap-3 w-full overflow-x-scroll mt-10'>
            {
              docSlots.length && docSlots[slotIndex].map((item,index) => (
                <p onClick={()=>setSlotTime(item.time)} key={index} className={`text-sm font-light  flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}>{item.time.toLowerCase()}</p>
              ))
            }
          </div>
          <button onClick={bookAppoinment} className='bg-primary text-white text-sm font-light px-20 py-3 rounded-full mt-7'> Book an appoinment</button>
        </div>
        
        
        <RelatedDoctors speciality={docInfo.speciality} docId={docId}/>
      </div>
  );
};

export default Appoinment;
