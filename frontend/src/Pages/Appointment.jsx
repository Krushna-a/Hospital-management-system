import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const Appointment = () => {
  const { isLoggedIn, userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get doctor info from navigation state
  const { doctorId, doctorName } = location.state || {};

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reasonForVisit, setReasonForVisit] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // If not logged in or not a patient, redirect to login
    if (!isLoggedIn || userRole !== 'patient') {
      toast.error("You must be logged in as a patient to book an appointment.");
      navigate("/auth");
    }
    // If no doctor is selected, redirect to the doctors list
    if (!doctorId) {
      toast.error("Please select a doctor first.");
      navigate("/doctors");
    }
  }, [isLoggedIn, userRole, doctorId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!appointmentDate || !appointmentTime) {
      setError("Please select a date and time for your appointment.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5001/api/appointments", {
        doctorId,
        appointmentDate,
        appointmentTime,
        reasonForVisit,
      });

      toast.success("Appointment booked successfully!");
      navigate("/appointments"); // Redirect to appointments dashboard

    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to book appointment.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!doctorId) {
    // Render nothing or a loading indicator while redirecting
    return null;
  }

  return (
    <div className="w-full flex justify-center py-10 px-4 bg-gray-50 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 items-center w-full md:w-2/3 lg:w-1/2 xl:w-1/3 border rounded-lg p-8 shadow-lg bg-white h-fit"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Book Appointment</h1>
        <div className="text-lg text-center mb-4">
          with <span className="font-semibold text-blue-600">Dr. {doctorName}</span>
        </div>
        
        {error && (
          <div className="w-full p-3 bg-red-100 text-red-700 rounded text-center">
            {error}
          </div>
        )}
        
        {/* Appointment Date */}
        <div className="w-full">
          <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700 mb-1">
            Appointment Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="appointmentDate"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className={`w-full rounded p-2 border ${!appointmentDate && error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        
        {/* Appointment Time */}
        <div className="w-full">
          <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700 mb-1">
            Appointment Time <span className="text-red-500">*</span>
          </label>
          <select
            id="appointmentTime"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className={`w-full rounded p-2 border ${!appointmentTime && error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select a time slot</option>
            <option value="09:00-10:00">09:00 AM - 10:00 AM</option>
            <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
            <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
            <option value="14:00-15:00">02:00 PM - 03:00 PM</option>
            <option value="15:00-16:00">03:00 PM - 04:00 PM</option>
            <option value="16:00-17:00">04:00 PM - 05:00 PM</option>
          </select>
        </div>
        
        {/* Symptoms */}
        <div className="w-full">
          <label htmlFor="reasonForVisit" className="block text-sm font-medium text-gray-700 mb-1">
            Symptoms or Reason for Visit
          </label>
          <textarea
            id="reasonForVisit"
            value={reasonForVisit}
            onChange={(e) => setReasonForVisit(e.target.value)}
            placeholder="(Optional) Describe your symptoms or reason for visit"
            rows="4"
            className="w-full rounded p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors mt-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
        </button>
      </form>
    </div>
  );
};

export default Appointment;
