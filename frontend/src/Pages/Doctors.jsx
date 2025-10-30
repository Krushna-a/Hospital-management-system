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

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const { user, token } = useAuth();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5001/api/doctors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

    if (token) {
      fetchDoctors();
    }
  }, [token]);

  useEffect(() => {
    let filtered = doctors;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (doctor) =>
          doctor.full_name.toLowerCase().includes(term) ||
          doctor.specialty.toLowerCase().includes(term)
      );
    }

    setFilteredDoctors(filtered);
  }, [searchTerm, doctors]);

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Doctors
        </h1>

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search doctor by name, specialty..."
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Doctors List */}
        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Doctors List Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b flex justify-between items-center">
                  <h2 className="font-semibold text-gray-800">
                    Available Doctors
                  </h2>
                  <span className="text-sm text-gray-600">
                    {filteredDoctors.length}{" "}
                    {filteredDoctors.length === 1 ? "doctor" : "doctors"}
                  </span>
                </div>

                {filteredDoctors.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No doctors found matching your criteria
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {filteredDoctors.map((doctor) => (
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
                              <span className="ml-2 text-sm text-gray-500">
                                ({doctor.age}y, {doctor.gender})
                              </span>
                            </h3>
                            <p className="text-sm text-blue-600 font-medium mt-1">
                              {doctor.specialty}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {doctor.bio}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Doctor Details Column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow overflow-hidden sticky top-6">
                {selectedDoctor ? (
                  <>
                    <div className="px-4 py-3 bg-gray-50 border-b">
                      <h2 className="font-semibold text-gray-800">
                        Doctor Details
                      </h2>
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                          <FiUser className="mr-2 text-blue-500" />
                          {selectedDoctor.full_name}
                        </h3>
                        <p className="text-md text-blue-700 mt-1 font-bold">
                          {selectedDoctor.specialty}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {selectedDoctor.age} years, {selectedDoctor.gender}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            Contact
                          </h4>
                          <p className="mt-1 text-sm text-gray-900 flex items-center">
                            <FiPhone className="mr-2" />
                            {selectedDoctor.contact_number}
                          </p>
                          <p className="mt-1 text-sm text-gray-900 flex items-center">
                            <FiMail className="mr-2" />
                            {selectedDoctor.email}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            Bio
                          </h4>
                          <p className="mt-1 text-sm text-gray-600">
                            {selectedDoctor.bio}
                          </p>
                        </div>

                        <button
                          onClick={() => window.location.href = `/appointment?doctorId=${selectedDoctor.id}`}
                          className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    Select a doctor to view details
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
