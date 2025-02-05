import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion";
import { useState } from 'react';

const Contact = () => {
  const [ripple, setRipple] = useState({ x: -1, y: -1});
  return (
    <div className="relative py-16 px-6 md:px-20 bg-gradient-to-r from-blue-50 to-indigo-100 transition-all duration-1000 ease-in-out">
      <motion.div 
        className="text-center text-4xl font-bold text-gray-800 tracking-wide"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p>
          CONTACT <span className="text-primary">US</span>
        </p>
      </motion.div>

      <motion.div 
        className="mt-12 flex flex-col md:flex-row items-center justify-center gap-12 text-sm"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <motion.img
          className="w-full md:w-[380px] rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
          src={assets.contact_image}
          alt="Contact"
          whileHover={{ scale: 1.1, rotate: 2 }}
          transition={{ duration: 0.4 }}
        />

        <motion.div 
          className="flex flex-col justify-center items-start gap-6 p-8 bg-white shadow-lg rounded-2xl backdrop-blur-lg bg-opacity-90 w-full md:w-[450px]"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div>
            <p className="font-semibold text-xl text-gray-700">OUR OFFICE</p>
            <p className="text-gray-500">
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Tel: (415) 555-0132 <br /> Email: camit8546@gmail.com
            </p>
          </div>

          <div>
            <p className="font-semibold text-xl text-gray-700">CAREERS AT DocEasy</p>
            <p className="text-gray-500">Learn more about our teams and job openings.</p>
          </div>

          <motion.button
            className="relative w-full text-center border border-black px-6 py-3 text-sm font-medium rounded-lg hover:bg-black hover:text-white transition-all duration-300 shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onMouseDown={(e) => {
              const rect = e.target.getBoundingClientRect();
              setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              setTimeout(() => setRipple({ x: -1, y: -1 }), 500);
            }}
          >
            {ripple.x !== -1 && (
              <span
                className="absolute bg-gray-700 opacity-25 rounded-full"
                style={{
                  top: ripple.y,
                  left: ripple.x,
                  width: 100,
                  height: 100,
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
            Explore Jobs
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  
  )
}

export default Contact
