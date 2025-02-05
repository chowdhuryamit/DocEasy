import React from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="relative py-16 px-6 md:px-20 bg-gradient-to-r from-indigo-50 to-blue-100 transition-all duration-1000 ease-in-out">
      <motion.div 
        className="text-center text-4xl font-bold text-gray-800 tracking-wide"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p>
          ABOUT <span className="text-primary">US</span>
        </p>
      </motion.div>

      <motion.div 
        className="mt-12 flex flex-col md:flex-row items-center justify-center gap-12 text-sm"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.img
          className="w-full md:w-[400px] rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
          src={assets.about_image}
          alt="About"
          whileHover={{ scale: 1.07, rotate: 2 }}
          transition={{ duration: 0.4 }}
        />

        <motion.div 
          className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-lg p-6 bg-white shadow-lg rounded-2xl backdrop-blur-lg bg-opacity-90"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <p>
            Welcome to <b className="text-primary">DocEasy</b>, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges of scheduling doctor appointments and managing health records.
          </p>
          <p>
            Our platform integrates the latest advancements in healthcare technology, ensuring a seamless experience. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <b className="text-gray-800 text-xl">Our Vision</b>
          <p>
            Our vision is to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </motion.div>
      </motion.div>

      <motion.div 
        className="text-center text-3xl font-bold mt-16 text-gray-800 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p>
          WHY <span className="text-primary">CHOOSE US</span>
        </p>
      </motion.div>

      <motion.div 
        className="mt-10 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {[
          { title: "EFFICIENCY", desc: "Streamlined appointment scheduling that fits into your busy lifestyle." },
          { title: "CONVENIENCE", desc: "Access to a network of trusted healthcare professionals in your area." },
          { title: "PERSONALIZATION", desc: "Tailored recommendations and reminders to help you stay on top of your health." },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[16px] text-gray-600 cursor-pointer w-full md:w-1/3 text-center rounded-lg shadow-lg bg-white hover:bg-primary hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <b className="text-xl">{feature.title}</b>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default About
