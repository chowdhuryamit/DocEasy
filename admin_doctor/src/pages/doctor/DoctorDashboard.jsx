import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import dateFormater from '../dateFormater';


const DoctorDashboard = () => {
  const [dashData, setDashData] = useState(null);

  const fetchDashData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v3/doctor/get-dashData",
        { withCredentials: true }
      );
      if (data.success) {
        
        setDashData(data);
      } else {
        toast.warn(data.msg);
      }
    } catch (error) {
      
      toast.error("error occured while fetching dashboard data");
    }
  };

  useEffect(() => {
    fetchDashData();
  }, []);


  if (dashData === null)
    return (
      <div className="font-bold text-primary text-2xl flex text-center">
        fetching Dashboard...
      </div>
    );
  return (
    <div className="m-5">
    <div className="flex flex-wrap justify-center sm:justify-start gap-3">
      <div
        onClick={() => navigate("/doctor-appoinments")}
        className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all"
      >
        <img className="w-12 sm:w-14" src={assets.patients_icon} alt="" />
        <div>
          <p className="text-lg sm:text-xl font-semibold text-gray-600">
            {dashData.totalPatients}
          </p>
          <p className="text-gray-400 text-sm sm:text-base">Patients</p>
        </div>
      </div>
      <div
        onClick={() => navigate("/doctor-appoinments")}
        className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all"
      >
        <img src={assets.appointments_icon} className="w-12 sm:w-14" alt="" />
        <div>
          <p className="text-lg sm:text-xl font-semibold text-gray-600">
            {dashData.totalAppoinments}
          </p>
          <p className="text-gray-400 text-sm sm:text-base">Total Appointments</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
        <img className="w-12 sm:w-14" src={assets.appointments_icon} alt="" />
        <div>
          <p className="text-lg sm:text-xl font-semibold text-gray-600">
            {dashData.totalCompletedAppoinments}
          </p>
          <p className="text-gray-400 text-sm sm:text-base">Completed Appoinments</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
        <img className="w-12 sm:w-14" src={assets.appointments_icon} alt="" />
        <div>
          <p className="text-lg sm:text-xl font-semibold text-gray-600">
            {dashData.totalCancelledAppoinments}
          </p>
          <p className="text-gray-400 text-sm sm:text-base">Cancelled Appoinments</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
        <img className="w-12 sm:w-14" src={assets.appointments_icon} alt="" />
        <div>
          <p className="text-lg sm:text-xl font-semibold text-gray-600">
            {dashData.pendingAppoinments}
          </p>
          <p className="text-gray-400 text-sm sm:text-base">Pending Appoinments</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
        <img className="w-12 sm:w-14" src={assets.earning_icon} alt="" />
        <div>
          <p className="text-lg sm:text-xl font-semibold text-gray-600">
           {dashData.earnings}
          </p>
          <p className="text-gray-400 text-sm sm:text-base">Total Earnings</p>
        </div>
      </div>
    </div>

    <div className="bg-white mt-10 p-4 sm:p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2.5 px-2 sm:px-4 py-4 border-b">
        <img src={assets.list_icon} alt="" className="w-5 sm:w-6" />
        <p className="font-semibold text-base sm:text-lg">Latest Bookings</p>
      </div>

      <div className="overflow-x-auto">
        {dashData.topAppoinments.map((item, index) => (
          <div
            className="flex flex-wrap sm:flex-nowrap items-center px-4 py-3 gap-3 sm:gap-4 hover:bg-gray-100 transition"
            key={index}
          >
            <img
              className="rounded-full w-10 sm:w-12 border shadow-sm"
              src={item.patient[0].photo}
              alt=""
            />
            <div className="flex-1 text-sm sm:text-base">
              <p className="text-gray-800 font-medium">
                {item.patient[0].name}
              </p>
              <p className="text-gray-600">
                Booking on {dateFormater(item.slot_date)}
              </p>
              <p className="text-gray-600">
                {item.slot_time}
              </p>
            </div>
            <p
              className={`text-xs sm:text-sm font-medium ${
                item.cancelled
                  ? "text-red-500"
                  : item.isCompleted
                  ? "text-green-500"
                  : "text-gray-500"
              }`}
            >
              {item.cancelled
                ? "Cancelled"
                : item.isCompleted
                ? "Completed"
                : "Pending"}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default DoctorDashboard
