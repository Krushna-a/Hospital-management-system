import React, { useState, useEffect } from "react";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiPhone,
  FiMail,
  FiSearch,
} from "react-icons/fi";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        // The backend route for getting all doctors is public, 
        // but sending the token if available is fine.
        const response = await axios.get("http://localhost:5001/api/doctors");

        setDoctors(response.data);
        setFilteredDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError("Failed to load doctors");
        toast.error("Failed to load doctors. Please try again.");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    let filtered = doctors;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (doctor) =>
          doctor.full_name.toLowerCase().includes(term) ||
          (doctor.specialty && doctor.specialty.toLowerCase().includes(term))
      );
    }

    setFilteredDoctors(filtered);
  }, [searchTerm, doctors]);

  const handleBookAppointment = (doctor) => {
    if (!doctor) return;
    navigate('/appointment', { 
      state: { doctorId: doctor.id, doctorName: doctor.full_name } 
    });
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Find a Doctor
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by doctor name or specialty..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {filteredDoctors.length > 0 ? filteredDoctors.map((doctor) => (
                    <li
                      key={doctor.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedDoctor?.id === doctor.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedDoctor(doctor)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900 flex items-center">
                            <FiUser className="mr-2 text-blue-500" />
                            {doctor.full_name}
                          </h3>
                          <p className="text-sm text-blue-600 font-medium mt-1">
                            {doctor.specialty}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            {doctor.bio}
                          </p>
                        </div>
                      </div>
                    </li>
                  )) : (
                    <div className="p-8 text-center text-gray-500">
                      No doctors found.
                    </div>
                  )}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow overflow-hidden sticky top-24">
                {selectedDoctor ? (
                  <>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {selectedDoctor.full_name}
                      </h3>
                      <p className="text-md text-blue-700 mt-1 font-semibold">
                        {selectedDoctor.specialty}
                      </p>
                      <div className="mt-4 space-y-2 text-sm text-gray-600">
                          <p><strong>Age:</strong> {selectedDoctor.age}</p>
                          <p><strong>Gender:</strong> {selectedDoctor.gender}</p>
                          <p><strong>Contact:</strong> {selectedDoctor.contact_number}</p>
                          <p><strong>Bio:</strong> {selectedDoctor.bio}</p>
                      </div>
                      <button
                        onClick={() => handleBookAppointment(selectedDoctor)}
                        className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors font-medium"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    Select a doctor to view details and book an appointment.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;