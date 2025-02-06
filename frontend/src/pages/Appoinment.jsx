import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { RelatedDoctors } from "../components/index.js";

const Appoinment = () => {
  const { docId } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const doctors = useSelector((state) => state.doctorsList.doctors);

  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

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
        <RelatedDoctors speciality={docInfo.speciality} docId={docId}/>
      </div>
  );
};

export default Appoinment;
