import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5001/api/bills/my-bills');
        setBills(response.data);
      } catch (err) {
        setError('Failed to fetch bills.');
        toast.error('Failed to fetch bills.');
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Bills</h1>
      {bills.length === 0 ? (
        <p>You have no bills.</p>
      ) : (
        <div className="space-y-4">
          {bills.map(bill => (
            <div key={bill.id} className="p-4 border rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Appointment with Dr. {bill.doctor_name}</p>
                  <p className="text-sm text-gray-600">on {new Date(bill.appointment_date).toLocaleDateString()}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${bill.status === 'paid' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                  {bill.status}
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold">${bill.amount}</p>
                  <p className="text-sm text-gray-500">Issued: {new Date(bill.issue_date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Due: {new Date(bill.due_date).toLocaleDateString()}</p>
                </div>
                {bill.status === 'unpaid' && (
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Pay Now</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bills;
