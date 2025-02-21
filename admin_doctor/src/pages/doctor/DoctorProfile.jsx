import React, { useState } from "react";
import { useSelector } from "react-redux";

const DoctorProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const doctorData = useSelector((state) => state.Doctor.doctorData);
  
  const [profileDate, setProfileData] = useState({
    about: doctorData.about,
    fees: doctorData.fees,
    address: doctorData.address,
    availability: doctorData.availability,
  });

  console.log(profileDate);
  
  const updateProfile = async () => {

  };

  if (!doctorData)
    return (
      <div className="text-primary flex justify-center">
        fetching doctor data....
      </div>
    );
  return (
    <div className="flex flex-col gap-4 m-5 md:flex-row md:items-start md:gap-6">
      {/* Doctor Image */}
      <div className="flex justify-center">
        <img
          className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
          src={doctorData.picture}
          alt=""
        />
      </div>

      {/* Doctor Info */}
      <div className="flex-1 border border-stone-100 rounded-lg p-5 sm:p-8 bg-white w-full">
        {/* Name, Degree, Experience */}
        <p className="flex items-center gap-2 text-2xl sm:text-3xl font-medium text-gray-700">
          {doctorData.name}
        </p>
        <div className="flex items-center gap-2 mt-1 text-gray-600 flex-wrap">
          <p>
            {doctorData.degree} - {doctorData.specialization}
          </p>
          <button className="py-0.5 px-2 border text-xs rounded-full">
            {doctorData.experience}
          </button>
        </div>

        {/* About */}
        <div>
          <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
            About :
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {isEdit ? (
              <textarea
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    about: e.target.value,
                  }))
                }
                className="w-full outline-primary p-2 border rounded-lg"
                rows={6}
                value={doctorData.about}
              />
            ) : (
              doctorData.about
            )}
          </p>
        </div>

        {/* Appointment Fee */}
        <p className="text-gray-600 font-medium mt-4">
          Appointment fee:{" "}
          <span className="text-gray-800">
            ₹{" "}
            {isEdit ? (
              <input
                type="number"
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    fees: e.target.value,
                  }))
                }
                className="border rounded p-1 w-24"
                value={doctorData.fees}
              />
            ) : (
              doctorData.fees
            )}
          </span>
        </p>

        {/* Address */}
        <div className="flex flex-wrap items-center gap-2 py-2">
          <p className="font-medium">Address:</p>
          <p className="text-sm">
            {isEdit ? (
              <input
                type="text"
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                className="border rounded p-1 w-full sm:w-auto"
                value={doctorData.address}
              />
            ) : (
              doctorData.address
            )}
          </p>
        </div>

        {/* Availability Checkbox */}
        <div className="flex gap-2 pt-2 items-center">
          <input
            type="checkbox"
            onChange={() =>
              isEdit &&
              setProfileData((prev) => ({
                ...prev,
                available: !prev.available,
              }))
            }
            checked={doctorData.available}
          />
          <label className="text-sm">Available</label>
        </div>

        {/* Buttons */}
        <div className="mt-5">
          {isEdit ? (
            <button
              onClick={updateProfile}
              className="px-4 py-1 border border-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit((prev) => !prev)}
              className="px-4 py-1 border border-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
