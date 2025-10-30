import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import animationFile from "../assets/Hospitals and city.lottie";
import animationFile2 from "../assets/Business Analysis.lottie";
const Home = () => {
  return (
    <div className="bg-[#a3d3f7]">
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <img
          src="https://psgimsr.ac.in/wp-content/themes/psgimsr/assets/images/home-banner2.jpg"
          alt="Hospital Banner"
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
        />

        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 text-black">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hospital Management System
            </h1>
            <p className="text-xl md:text-2xl font-medium">
              Your Health, Our Priority
            </p>
            <p className="text-lg md:text-xl">
              Manage appointments, find trusted doctors, and access records –
              all in one place
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-black px-6 py-3 rounded-lg font-medium transition-colors">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center py-10 text-center  text-4xl text-[#00366b] font-semibold">
        Improve productivity with the most advanced hospital management system
      </div>
      <div className="w-full flex flex-col lg:flex-row bg-[#a3d3f7] mb-10 py-10 px-4 sm:px-6 md:px-8">
        <div className="w-full lg:w-1/2 h-[300px] md:h-[400px] flex items-center justify-center relative order-1 lg:order-2">
          <DotLottieReact
            src={animationFile2}
            loop
            autoplay
            className="absolute w-full h-full object-cover"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-6 md:gap-8 px-4 sm:px-0 order-2 lg:order-1 lg:pr-8 lg:pl-4 mt-6 lg:mt-0">
          <div className="text-gray-600 hover:text-gray-900 transition-colors duration-200 group">
            <h1 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800 group-hover:text-blue-700">
              Patient Registration & Records
            </h1>
            <p className="text-base md:text-lg">
              Easily register patients and maintain their medical history,
              reports, and treatment details in one place.
            </p>
            <div className="w-full border-b border-gray-300 mt-4 group-hover:border-blue-400 transition-colors duration-300"></div>
          </div>

          <div className="text-gray-600 hover:text-gray-900 transition-colors duration-200 group">
            <h1 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800 group-hover:text-blue-700">
              Doctor & Appointment Management
            </h1>
            <p className="text-base md:text-lg">
              Manage doctor profiles and allow patients to book appointments
              online based on availability.
            </p>
            <div className="w-full border-b border-gray-300 mt-4 group-hover:border-blue-400 transition-colors duration-300"></div>
          </div>

          <div className="text-gray-600 hover:text-gray-900 transition-colors duration-200 group">
            <h1 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800 group-hover:text-blue-700">
              Role-Based Login System
            </h1>
            <p className="text-base md:text-lg">
              Separate login access for admin, doctors, and patients with
              permissions based on their roles.
            </p>
            <div className="w-full border-b border-gray-300 mt-4 group-hover:border-blue-400 transition-colors duration-300"></div>
          </div>

          <div className="text-gray-600 hover:text-gray-900 transition-colors duration-200 group">
            <h1 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800 group-hover:text-blue-700">
              Inventory Management
            </h1>
            <p className="text-base md:text-lg">
              Keep track of medicines, medical equipment, and stock levels to
              avoid shortages.
            </p>
            <div className="w-full border-b border-gray-300 mt-4 group-hover:border-blue-400 transition-colors duration-300"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-5 py-8">
        {/* Card 1 */}
        <div className="w-full md:w-[48%] lg:w-[15%] bg-white shadow-md p-4 relative group overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-full bg-gradient-to-t from-[#00B3FF]  to-[#80E961] transition-all duration-200 ease-in-out z-0 border-t-3" />
          <div className="relative z-10">
            <h1 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-200">
              Seamless Patient Records
            </h1>
            <p className="text-sm text-gray-600 group-hover:text-white transition-colors duration-200">
              Digitize patient onboarding with automated profiles, medical
              history tracking, and real-time health updates. Reduce paperwork
              by 70% with our integrated EHR system.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full md:w-[48%] lg:w-[15%] bg-white shadow-md p-4 relative group overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-full bg-gradient-to-t from-[#00B3FF]  to-[#80E961] transition-all duration-200 ease-in-out z-0 border-t-3" />
          <div className="relative z-10">
            <h1 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-200">
              Smart Booking System
            </h1>
            <p className="text-sm text-gray-600 group-hover:text-white transition-colors duration-200">
              Patients can book, reschedule, or cancel appointments online.
              Doctors get AI-powered slot management to minimize no-shows and
              maximize efficiency.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-full md:w-[48%] lg:w-[15%] bg-white shadow-md  p-4 relative group overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-full bg-gradient-to-t from-[#00B3FF]  to-[#80E961] transition-all duration-200 ease-in-out z-0 border-t-3" />
          <div className="relative z-10">
            <h1 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-200">
              Secure Access Control
            </h1>
            <p className="text-sm text-gray-600 group-hover:text-white transition-colors duration-200">
              Admins oversee everything, doctors access patient charts, and
              staff see assigned tasks. HIPAA-compliant permissions protect
              sensitive data.
            </p>
          </div>
        </div>

        {/* card 4 */}
        <div className="w-full md:w-[48%] lg:w-[15%] bg-white shadow-md p-4 relative group overflow-hidden ">
          <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-full bg-gradient-to-t from-[#00B3FF]  to-[#80E961] transition-all duration-200 ease-in-out z-0 border-t-3" />

          <div className="relative z-10 hover:text-white">
            <h1 className="text-xl font-semibold mb-2">
              Doctor & Appointment Management
            </h1>
            <p className="text-sm text-gray-600 group-hover:text-white">
              Manage doctor profiles and allow patients to book appointments
              online based on availability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
