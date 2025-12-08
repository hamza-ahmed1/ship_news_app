import React, { useState } from 'react';
import { Search, Ship, Anchor, MapPin, Calendar, Clock, Package, ArrowRight, TrendingUp, Activity } from 'lucide-react';
const ShippingCompanySelector = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);

  const companies = [
    { id: 1, name: 'Maersk Line', code: 'MAEU', vessels: 142, status: 'active' },
    { id: 2, name: 'Mediterranean Shipping Company', code: 'MSC', vessels: 128, status: 'active' },
    { id: 3, name: 'CMA CGM Group', code: 'CMDU', vessels: 95, status: 'active' },
    { id: 4, name: 'COSCO Shipping', code: 'COSU', vessels: 87, status: 'active' },
    { id: 5, name: 'Hapag-Lloyd', code: 'HLCU', vessels: 73, status: 'active' },
    { id: 6, name: 'Ocean Network Express', code: 'ONE', vessels: 65, status: 'active' },
    { id: 7, name: 'Evergreen Marine', code: 'EGLV', vessels: 58, status: 'active' },
    { id: 8, name: 'Yang Ming Marine', code: 'YMLU', vessels: 42, status: 'active' },
    { id: 9, name: 'Hyundai Merchant Marine', code: 'HDMU', vessels: 38, status: 'active' },
    { id: 10, name: 'PIL Pacific International', code: 'PCIU', vessels: 35, status: 'active' }
  ];

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
      borderRadius: '24px',
      padding: '32px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(71, 85, 105, 0.5)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{
          padding: '12px',
          background: 'rgba(6, 182, 212, 0.1)',
          borderRadius: '16px'
        }}>
          <Ship style={{ width: '28px', height: '28px', color: '#22d3ee' }} />
        </div>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>Shipping Companies</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Select a carrier to view details</p>
        </div>
      </div>

      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <Search style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#94a3b8',
          width: '20px',
          height: '20px'
        }} />
        <input
          type="text"
          placeholder="Search by company name or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            paddingLeft: '48px',
            paddingRight: '16px',
            paddingTop: '16px',
            paddingBottom: '16px',
            background: 'rgba(30, 41, 59, 0.5)',
            border: '1px solid rgba(71, 85, 105, 0.5)',
            borderRadius: '16px',
            color: 'white',
            fontSize: '14px',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ maxHeight: '384px', overflowY: 'auto', paddingRight: '8px' }}>
        {filteredCompanies.map((company) => (
          <div
            key={company.id}
            onClick={() => setSelectedCompany(company.id)}
            style={{
              background: selectedCompany === company.id 
                ? 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))' 
                : 'rgba(30, 41, 59, 0.4)',
              border: selectedCompany === company.id 
                ? '2px solid rgba(6, 182, 212, 0.5)' 
                : '1px solid rgba(71, 85, 105, 0.3)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: selectedCompany === company.id ? '0 10px 25px rgba(6, 182, 212, 0.2)' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>{company.name}</h3>
                  <span style={{
                    padding: '4px 12px',
                    background: 'rgba(6, 182, 212, 0.1)',
                    color: '#22d3ee',
                    fontSize: '12px',
                    fontWeight: '500',
                    borderRadius: '9999px',
                    border: '1px solid rgba(6, 182, 212, 0.2)'
                  }}>
                    {company.code}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#94a3b8' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Ship style={{ width: '16px', height: '16px' }} />
                    {company.vessels} vessels
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Activity style={{ width: '16px', height: '16px', color: '#4ade80' }} />
                    Active
                  </span>
                </div>
              </div>
              <ArrowRight style={{
                width: '20px',
                height: '20px',
                color: selectedCompany === company.id ? '#22d3ee' : '#475569',
                transition: 'all 0.3s'
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingCompanySelector;