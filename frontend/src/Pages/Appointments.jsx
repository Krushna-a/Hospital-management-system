import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FiCalendar, FiClock, FiUser, FiPhone, FiMail, FiSearch } from "react-icons/fi";

const Appointments = () => {
  const { userRole } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("upcoming");
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userRole) return;
      setLoading(true);
      let url = userRole === 'patient' 
        ? 'http://localhost:5001/api/appointments/my' 
        : 'http://localhost:5001/api/appointments/for-me';

      try {
        const response = await axios.get(url);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [userRole]);

  useEffect(() => {
    let filtered = appointments;

    if (statusFilter === "upcoming") {
      filtered = filtered.filter(app => app.status !== "completed");
    } else if (statusFilter === "completed") {
      filtered = filtered.filter(app => app.status === "completed");
    } else if (statusFilter === "pending") {
      filtered = filtered.filter(app => app.status === "pending");
    } // "all" shows all appointments

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(app => {
        const name = userRole === 'doctor' ? app.patient_name : app.doctor_name;
        return name && name.toLowerCase().includes(term);
      });
    }

    setFilteredAppointments(filtered);
    if (filtered.length > 0) {
        setSelectedAppointment(filtered[0]);
    }

  }, [searchTerm, statusFilter, appointments, userRole]);

  const handleStatusChange = async (id, newStatus) => {
    try {
        await axios.put(`http://localhost:5001/api/appointments/${id}/status`, { status: newStatus });
        const updatedAppointments = appointments.map(app => 
          app.id === id ? { ...app, status: newStatus } : app
        );
        setAppointments(updatedAppointments);
        if(selectedAppointment && selectedAppointment.id === id) {
          setSelectedAppointment({ ...selectedAppointment, status: newStatus });
        }
    } catch (error) {
        console.error("Failed to update status", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Appointments Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex items-center justify-between">
                <input
                    type="text"
                    placeholder={`Search by ${userRole === 'doctor' ? 'patient' : 'doctor'} name...`}
                    className="pl-4 pr-4 py-2 w-full border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="border rounded-lg px-3 py-2 ml-4"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="upcoming">Upcoming</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="all">All</option>
                </select>
            </div>
        </div>
        
        {loading ? (
          <p>Loading appointments...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
              {filteredAppointments.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No appointments found.</div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <li key={appointment.id} onClick={() => setSelectedAppointment(appointment)} className={`p-4 cursor-pointer ${selectedAppointment?.id === appointment.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                      <div className="flex justify-between">
                        <div>
                          <p className="font-semibold">{userRole === 'doctor' ? appointment.patient_name : appointment.doctor_name}</p>
                          <p className="text-sm text-gray-600">{formatDate(appointment.appointment_date)} at {appointment.appointment_time}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${appointment.status === 'confirmed' ? 'bg-green-200' : 'bg-yellow-200'}`}>{appointment.status}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="lg:col-span-1">
                {selectedAppointment ? (
                    <div className="bg-white rounded-lg shadow p-4 sticky top-24">
                        <h2 className="font-bold text-lg mb-4">Appointment Details</h2>
                        <p><strong>{userRole === 'doctor' ? 'Patient' : 'Doctor'}:</strong> {userRole === 'doctor' ? selectedAppointment.patient_name : selectedAppointment.doctor_name}</p>
                        <p><strong>Date:</strong> {formatDate(selectedAppointment.appointment_date)}</p>
                        <p><strong>Time:</strong> {selectedAppointment.appointment_time}</p>
                        <p><strong>Status:</strong> {selectedAppointment.status}</p>
                        <p><strong>Reason:</strong> {selectedAppointment.reason_for_visit}</p>
                        {userRole === 'doctor' && (
                            <div className="mt-4 pt-4 border-t">
                                <h3 class="font-semibold">Update Status</h3>
                                <div className="flex space-x-2 mt-2">
                                    <button onClick={() => handleStatusChange(selectedAppointment.id, 'confirmed')} className="bg-green-500 text-white px-2 py-1 rounded">Confirm</button>
                                    <button onClick={() => handleStatusChange(selectedAppointment.id, 'rejected')} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                                    <button onClick={() => handleStatusChange(selectedAppointment.id, 'completed')} className="bg-gray-500 text-white px-2 py-1 rounded">Complete</button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500 bg-white rounded-lg shadow">Select an appointment to see details.</div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;