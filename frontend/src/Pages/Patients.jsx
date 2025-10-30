import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiPhone, FiMapPin, FiHeart } from 'react-icons/fi';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { token } = useAuth();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5001/api/patients/for-doctor');
        setPatients(response.data);
      } catch (err) {
        const errorMessage = err.response?.data?.error || 'Failed to fetch patients.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPatients();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <h1 className="text-2xl font-bold">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">My Patients</h1>
        
        {patients.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow">
            <p className="text-gray-500">You do not have any patients with appointments yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {patients.map(patient => (
                <li key={patient.id} className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h3 className="font-medium text-lg text-gray-900 flex items-center">
                        <FiUser className="mr-2 text-blue-500" />
                        {patient.full_name}
                      </h3>
                      <div className="mt-2 flex flex-col md:flex-row md:flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                        <span className="flex items-center">
                          <FiMail className="mr-2" /> {patient.email}
                        </span>
                        <span className="flex items-center">
                          <FiPhone className="mr-2" /> {patient.contact_number || 'N/A'}
                        </span>
                        <span className="flex items-center">
                          <FiHeart className="mr-2" /> Blood Group: {patient.blood_group || 'N/A'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 text-sm text-gray-600">
                        <p className="flex items-center">
                            <FiMapPin className="mr-2" /> {patient.address || 'No address provided'}
                        </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;