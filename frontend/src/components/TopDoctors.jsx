import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const TopDoctors = () => {
  const navigate = useNavigate();
  const doctors = useSelector((state) => state.doctorsList.doctors);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors On Our Site</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              if (item.availability) {
                navigate(`/book-appoinments/${item._id}`);
                scrollTo(0, 0);
              } else {
                toast.error(`${item.name} is not available`);
              }
            }}
            className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img className="bg-[#EAEFFF]" src={item.picture} alt="doctor_image" />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  item.availability ? "text-green-500" : "text-gray-500"
                }`}
              >
                <p
                  className={`w-2 h-2 rounded-full ${
                    item.availability ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></p>
                <p>{item.availability ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-[#262626] text-lg font-medium">{item.name}</p>
              <p className="text-[#5C5C5C] text-sm">{item.specialization}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-[#617edf] text-white px-12 py-3 rounded-full mt-10 hover:bg-orange-400 hover:text-lg duration-200"
      >
        See More
      </button>
    </div>
  );
};

export default TopDoctors;
