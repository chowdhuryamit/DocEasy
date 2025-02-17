import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";
import { updateDoctorAvailability } from "../../store/adminSlice.js";

const DoctorDetails = () => {
  const { docId } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const doctors = useSelector((state) => state.Admin.doctorsList);

  const dispatch = useDispatch()

  const fetchDocInfo = () => {
    const doctorsInfo = doctors.find((item) => item._id === docId);
    setDocInfo(doctorsInfo);
  };

  const changeAvailability = async (id) => {
    try {
        const {data} = await axios.patch('http://localhost:8000/api/v2/admin/change-availability',{},{params: { docId:id },withCredentials: true})
        if(data.success){
            toast.success(data.msg,{
                onClose:()=>{
                   dispatch(updateDoctorAvailability({_id:id}))
                }
            })
        }
        else{
            toast.error(data.msg)
        }
    } catch (error) {
        toast.error('error occured while updating availability')
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  if (docInfo == null)
    return (
      <p className="text-center text-gray-600">
        Featching doctors information...
      </p>
    );
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap items-center md:items-start gap-6 p-4 sm:p-6 md:p-8 bg-gray-200 rounded-lg shadow-lg w-full">
      <div className="w-full sm:w-1/2 md:w-[40%] lg:w-[30%] max-w-[280px] sm:max-w-[250px] md:max-w-[300px] rounded-lg overflow-hidden shadow-md">
        <img
          className="w-full h-auto object-cover rounded-lg bg-primary"
          src={docInfo.picture}
          alt="Doctor"
        />
      </div>

      <div className="flex-1 border border-gray-300 rounded-lg p-4 sm:p-6 md:p-8 bg-white shadow-md w-full md:min-w-[55%]">
        <p className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-medium text-gray-800">
          {docInfo.name}
          <img
            className="w-4 sm:w-5"
            src={assets.verified_icon}
            alt="Verified"
          />
        </p>

        <div className="flex flex-wrap items-center gap-2 mt-1 text-gray-600 text-xs sm:text-sm md:text-base">
          <p>
            {docInfo.degree} - {docInfo.specialization}
          </p>
          <button className="py-1 px-3 border text-xs sm:text-sm rounded-full bg-gray-200">
            {docInfo.experience} Years
          </button>
        </div>

        <div className="mt-3">
          <p className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-700">
            About{" "}
            <img className="w-3 sm:w-4" src={assets.info_icon} alt="Info" />
          </p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {docInfo.about}
          </p>
        </div>

        <div className="mt-3 flex-col">
          <p className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-700">
            Email:{" "}
            <span className="text-xs sm:text-sm text-primary">
              {docInfo.email}
            </span>
          </p>
          <p className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-700 mt-3">
            Phone:{" "}
            <span className="text-xs sm:text-sm text-primary">
              {docInfo.phone}
            </span>
          </p>
          <p className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-700 mt-3">
            Address:{" "}
            <span className="text-xs sm:text-sm text-gray-500">
              {docInfo.address}
            </span>
          </p>
        </div>

        <p className="text-gray-700 font-medium mt-3">
          Appointment Fee: {" ₹ "}
          <span className="text-gray-900 font-semibold">{docInfo.fees}</span>
        </p>

        <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm">
          <input
            onChange={() => changeAvailability(docInfo._id)}
            type="checkbox"
            checked={docInfo.availability}
          />
          <div
            className={`flex items-center gap-2 ${
              docInfo.availability ? "text-green-500" : "text-gray-500"
            }`}
          >
            <p
              className={`w-2 h-2 rounded-full ${
                docInfo.availability ? "bg-green-500" : "bg-gray-500"
              }`}
            ></p>
            <p>{docInfo.availability ? "Available" : "Not Available"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
