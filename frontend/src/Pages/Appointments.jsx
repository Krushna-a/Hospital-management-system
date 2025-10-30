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

      let url = '';
      if (userRole === 'patient') {
        url = 'http://localhost:5001/api/appointments/my';
      } else if (userRole === 'doctor') {
        url = 'http://localhost:5001/api/appointments/for-me';
      }

      if (!url) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(url);
        const fetchedAppointments = response.data;
        
        setAppointments(fetchedAppointments);
        setFilteredAppointments(fetchedAppointments.filter(app => app.status !== "completed"));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
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
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(app => 
        (app.patientName && app.patientName.toLowerCase().includes(term)) ||
        (app.phone && app.phone.includes(term)) ||
        (app.email && app.email.toLowerCase().includes(term))
      );
    }
    
    setFilteredAppointments(filtered);
  }, [searchTerm, statusFilter, appointments]);

  const handleStatusChange = async (id, newStatus) => {
    // In a real app, you would make an API call to update the status
    // For example: await axios.put(`http://localhost:5001/api/appointments/${id}/status`, { status: newStatus });
    const updatedAppointments = appointments.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    );
    setAppointments(updatedAppointments);
    if(selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, status: newStatus });
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Filter:</label>
              <select
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {filteredAppointments.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No appointments found.</div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {filteredAppointments.map((appointment) => (
                      <li 
                        key={appointment.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedAppointment?.id === appointment.id ? "bg-blue-50" : ""
                        }`}
                        onClick={() => setSelectedAppointment(appointment)}
                      >
                        {/* ... appointment item JSX ... */}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow overflow-hidden sticky top-24">
                {selectedAppointment ? (
                  <>
                    {/* ... appointment details JSX ... */}
                  </>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    Select an appointment to view details.
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

export default Appointments;
