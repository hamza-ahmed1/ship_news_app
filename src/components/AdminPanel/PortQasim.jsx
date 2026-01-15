import React, { useState, useEffect } from 'react';
import { Ship, Calendar, Anchor, Truck, FileText, Plus, RefreshCw, Edit2, Trash2, X, AlertCircle } from 'lucide-react';
// Import Firestore (you'll need to add your Firebase config)
import { db } from "../../firebase/config";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const TabButton = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center px-4 py-4 transition-all duration-200 border-b-4 flex-1 ${
      active
        ? 'bg-blue-50 text-blue-700 border-blue-600 font-semibold'
        : 'bg-white text-gray-600 border-transparent hover:bg-gray-50'
    }`}
  >
    <Icon className="w-5 h-5 mb-1" />
    <span className="text-sm">{label}</span>
  </button>
);

export default function ShippingDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    vesselName: '',
    port: '',
    eta: '',
    status: '',
    cargo: '',
    tonnage: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // TODO: Replace with your actual Firestore collection name
      const querySnapshot = await getDocs(collection(db, '/port_companies/port_qasim/ExpectedShipArrivalAtOuterAnchorage'));
      const fetchedData = querySnapshot.docs.map(doc => ({
           id: doc.id,
          ...doc.data()
      }));
      setData(fetchedData);
      
      // Temporary: Remove this after connecting to Firestore
      // console.log('Connect to Firestore by uncommenting the code in loadData()');
      setData([]); // Start with empty data - will be populated from Firestore
      
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error loading data from Firestore');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.vesselName || !formData.port || !formData.eta || !formData.status) {
      alert('Please fill all required fields');
      return;
    }
    
    try {
      if (editingId) {
        // Update existing document
        const docRef = doc(db, 'ExpectedShipArrivalAtOuterAnchorage', editingId);
        await updateDoc(docRef, formData);
        setData(prev => prev.map(item => item.id === editingId ? { ...formData, id: editingId } : item));
        setEditingId(null);
      } else {
        // Add new document
        const docRef = await addDoc(collection(db, 'ExpectedShipArrivalAtOuterAnchorage'), formData);
        const newEntry = { ...formData, id: docRef.id };
        setData(prev => [...prev, newEntry]);
      }
      
      setShowDialog(false);
      setFormData({ vesselName: '', port: '', eta: '', status: '', cargo: '', tonnage: '' });
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data to Firestore');
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setShowDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteDoc(doc(db, 'ExpectedShipArrivalAtOuterAnchorage', id));
        setData(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting data:', error);
        alert('Error deleting data from Firestore');
      }
    }
  };

  const handleAddNew = () => {
    setFormData({ vesselName: '', port: '', eta: '', status: '', cargo: '', tonnage: '' });
    setEditingId(null);
    setShowDialog(true);
  };

  const getStatusStyle = (status) => {
    const styles = {
      'In Port': 'bg-green-100 text-green-800',
      'Expected': 'bg-yellow-100 text-yellow-800',
      'Loading': 'bg-blue-100 text-blue-800',
      'Unloading': 'bg-purple-100 text-purple-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const tabs = [
    { icon: Ship, label: 'Current Operations' },
    { icon: Anchor, label: 'Off Port' },
    { icon: Calendar, label: 'Daily Program' },
    { icon: Truck, label: 'Berth Wise Cargo' },
    { icon: FileText, label: 'Reports' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <Ship className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Shipping Management System</h1>
                <p className="text-blue-100 text-sm mt-1">Real-time Port Operations Dashboard</p>
              </div>
            </div>
            <div className="bg-blue-700 px-4 py-2 rounded-lg">
              <span className="text-sm font-semibold">📍 Karachi, Pakistan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex">
            {tabs.map((tab, idx) => (
              <TabButton
                key={idx}
                icon={tab.icon}
                label={tab.label}
                active={activeTab === idx}
                onClick={() => setActiveTab(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 0 && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Current Operations</h2>
                  <p className="text-sm text-gray-500 mt-1">Manage active vessel operations</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={loadData}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh</span>
                  </button>
                  <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Entry</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {loading ? (
                <div className="flex flex-col justify-center items-center py-20">
                  <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-600 font-medium">Loading data...</p>
                </div>
              ) : data.length === 0 ? (
                <div className="flex flex-col justify-center items-center py-20 text-gray-500">
                  <AlertCircle className="w-16 h-16 mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No operations found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Vessel Name</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Port</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">ETA</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Cargo Type</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Tonnage</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.map((row) => (
                        <tr key={row.id} className="hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 font-bold text-gray-900">{row.vesselName}</td>
                          <td className="px-6 py-4 text-gray-700">{row.port}</td>
                          <td className="px-6 py-4 text-gray-700">{row.eta}</td>
                          <td className="px-6 py-4 text-gray-700 font-medium">{row.cargo}</td>
                          <td className="px-6 py-4 text-gray-700 font-semibold">{row.tonnage} MT</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full ${getStatusStyle(row.status)}`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center gap-2">
                              <button 
                                onClick={() => handleEdit(row)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete(row.id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Off Port Operations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-500 rounded-lg p-6 text-white shadow-lg">
                <div className="text-sm font-semibold mb-2">Waiting Vessels</div>
                <div className="text-4xl font-bold">5</div>
              </div>
              <div className="bg-yellow-500 rounded-lg p-6 text-white shadow-lg">
                <div className="text-sm font-semibold mb-2">Avg Wait Time</div>
                <div className="text-4xl font-bold">6.5h</div>
              </div>
              <div className="bg-green-500 rounded-lg p-6 text-white shadow-lg">
                <div className="text-sm font-semibold mb-2">Next Available</div>
                <div className="text-4xl font-bold">2h</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Daily Shipping Program</h2>
            <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-lg">
              <p className="text-green-800 font-medium">Schedule and track daily shipping operations</p>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Berth Wise Cargo Handling</h2>
            <div className="p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
              <p className="text-yellow-800 font-medium">Monitor cargo operations at each berth</p>
            </div>
          </div>
        )}

        {activeTab === 4 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reports & Analytics</h2>
            <div className="p-6 bg-purple-50 border-l-4 border-purple-500 rounded-lg">
              <p className="text-purple-800 font-medium">Generate operational reports and analytics</p>
            </div>
          </div>
        )}
      </div>

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="flex justify-between items-center p-6 border-b bg-blue-50">
              <h3 className="text-xl font-bold text-gray-800">
                {editingId ? 'Edit Entry' : 'Add New Entry'}
              </h3>
              <button 
                onClick={() => {
                  setShowDialog(false);
                  setEditingId(null);
                }}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Vessel Name *</label>
                <input
                  type="text"
                  value={formData.vesselName}
                  onChange={(e) => setFormData({...formData, vesselName: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter vessel name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Port *</label>
                <input
                  type="text"
                  value={formData.port}
                  onChange={(e) => setFormData({...formData, port: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter port name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">ETA *</label>
                <input
                  type="date"
                  value={formData.eta}
                  onChange={(e) => setFormData({...formData, eta: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Cargo Type</label>
                <input
                  type="text"
                  value={formData.cargo}
                  onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Containers, Bulk"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tonnage (MT)</label>
                <input
                  type="text"
                  value={formData.tonnage}
                  onChange={(e) => setFormData({...formData, tonnage: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter tonnage"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Status</option>
                  <option value="Expected">Expected</option>
                  <option value="In Port">In Port</option>
                  <option value="Loading">Loading</option>
                  <option value="Unloading">Unloading</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
              <button
                onClick={() => {
                  setShowDialog(false);
                  setEditingId(null);
                }}
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg transition-colors"
              >
                {editingId ? 'Update' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}