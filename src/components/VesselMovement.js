// make react comp
import React, { useState } from 'react';
import { Search, Ship, Anchor, MapPin, Calendar, Clock, Package, ArrowRight, TrendingUp, Activity } from 'lucide-react';

// Vessel Movement Component
const VesselMovement = () => {
  const [activeTab, setActiveTab] = useState('arrivals');

  const vesselData = {
    arrivals: [
      { id: 1, name: 'MSC AURORA', imo: '9876543', eta: '2024-12-05 08:00', from: 'Dubai', cargo: 'Container', berth: 'QB-1' },
      { id: 2, name: 'MAERSK JAKARTA', imo: '9765432', eta: '2024-12-05 14:30', from: 'Singapore', cargo: 'Container', berth: 'QB-2' },
      { id: 3, name: 'COSCO HARMONY', imo: '9654321', eta: '2024-12-05 18:00', from: 'Shanghai', cargo: 'Container', berth: 'QB-3' },
      { id: 4, name: 'EVER GENIUS', imo: '9543210', eta: '2024-12-06 06:00', from: 'Colombo', cargo: 'Container', berth: 'QB-4' }
    ],
    departures: [
      { id: 1, name: 'CMA CGM NILE', imo: '9432109', etd: '2024-12-05 10:00', to: 'Jeddah', cargo: 'Container', berth: 'QB-1' },
      { id: 2, name: 'HAPAG EXPRESS', imo: '9321098', etd: '2024-12-05 16:00', to: 'Mumbai', cargo: 'Container', berth: 'QB-5' },
      { id: 3, name: 'ONE EXCELLENCE', imo: '9210987', etd: '2024-12-06 08:00', to: 'Salalah', cargo: 'Container', berth: 'QB-2' }
    ],
    docked: [
      { id: 1, name: 'YANG MING UNITY', imo: '9109876', berthed: '2024-12-04 06:00', cargo: 'Container', berth: 'QB-3', status: 'Loading' },
      { id: 2, name: 'HMM SINGAPORE', imo: '9098765', berthed: '2024-12-04 12:00', cargo: 'Container', berth: 'QB-6', status: 'Unloading' },
      { id: 3, name: 'PIL PACIFIC', imo: '8987654', berthed: '2024-12-03 18:00', cargo: 'Container', berth: 'QB-4', status: 'Standby' }
    ],
    inbound: [
      { id: 1, name: 'MSC CHICAGO', imo: '9876012', distance: '45 NM', eta: '2024-12-05 22:00', from: 'Port Said', cargo: 'Container' },
      { id: 2, name: 'MAERSK BOSTON', imo: '9765123', distance: '120 NM', eta: '2024-12-06 10:00', from: 'Suez', cargo: 'Container' }
    ]
  };

  const tabs = [
    { id: 'arrivals', label: 'Expected Arrivals', icon: TrendingUp, count: vesselData.arrivals.length },
    { id: 'departures', label: 'Departures', icon: ArrowRight, count: vesselData.departures.length },
    { id: 'docked', label: 'Docked', icon: Anchor, count: vesselData.docked.length },
    { id: 'inbound', label: 'Inbound', icon: Activity, count: vesselData.inbound.length }
  ];

  const renderVesselCard = (vessel, type) => (
    <div key={vessel.id} style={{
      background: 'rgba(30, 41, 59, 0.4)',
      border: '1px solid rgba(71, 85, 105, 0.3)',
      borderRadius: '16px',
      padding: '20px',
      transition: 'all 0.3s',
      cursor: 'pointer'
    }}>
      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', margin: '0 0 4px 0' }}>{vessel.name}</h4>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>IMO: {vessel.imo}</p>
        </div>
        <div style={{
          padding: '8px',
          background: 'rgba(6, 182, 212, 0.1)',
          borderRadius: '12px'
        }}>
          <Ship style={{ width: '20px', height: '20px', color: '#22d3ee' }} />
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {type === 'arrivals' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Clock style={{ width: '16px', height: '16px', color: '#64748b' }} />
              <span style={{ color: '#cbd5e1' }}>{vessel.eta}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <MapPin style={{ width: '16px', height: '16px', color: '#64748b' }} />
              <span style={{ color: '#cbd5e1' }}>{vessel.from}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Package style={{ width: '16px', height: '16px', color: '#64748b' }} />
              <span style={{ color: '#cbd5e1' }}>{vessel.cargo}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Anchor style={{ width: '16px', height: '16px', color: '#64748b' }} />
              <span style={{ color: '#cbd5e1' }}>Berth {vessel.berth}</span>
            </div>
          </>
        )}
        {type === 'departures' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Clock style={{ width: '16px', height: '16px', color: '#64748b' }} />
              <span style={{ color: '#cbd5e1' }}>{vessel.etd}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <MapPin style={{ width: '16px', height: '16px', color: '#64748b' }} />
              <span style={{ color: '#cbd5e1' }}>{vessel.to}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Package style={{ width: '16px', height: '16px', color: '#64748b' }} />
              <span style={{ color: '#cbd5e1' }}>{vessel.cargo}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Anchor style={{ width: '16px', height: '16px', color: '#64748b' }} />
              <span style={{ color: '#cbd5e1' }}>Berth {vessel.berth}</span>
            </div>
          </>
        )}
        {type === 'docked' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Clock style={{ width: '16px', height: '16px', color: '#64748b' }} />
              <span style={{ color: '#cbd5e1' }}>{vessel.berthed}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Anchor style={{ width: '16px', height: '16px', color: '#64748b' }} />
              <span style={{ color: '#cbd5e1' }}>Berth {vessel.berth}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Package style={{ width: '16px', height: '16px', color: '#64748b' }} />
              <span style={{ color: '#cbd5e1' }}>{vessel.cargo}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Activity style={{ width: '16px', height: '16px', color: '#4ade80' }} />
              <span style={{ color: '#4ade80', fontWeight: '500' }}>{vessel.status}</span>
            </div>
          </>
        )}
        {type === 'inbound' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Activity style={{ width: '16px', height: '16px', color: '#22d3ee' }} />
              <span style={{ color: '#cbd5e1' }}>{vessel.distance}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Clock style={{ width: '16px', height: '16px', color: '#64748b' }} />
              <span style={{ color: '#cbd5e1' }}>{vessel.eta}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <MapPin style={{ width: '16px', height: '16px', color: '#64748b' }} />
              <span style={{ color: '#cbd5e1' }}>{vessel.from}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Package style={{ width: '16px', height: '16px', color: '#64748b' }} />
              <span style={{ color: '#cbd5e1' }}>{vessel.cargo}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
      borderRadius: '24px',
      padding: '32px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(71, 85, 105, 0.5)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            padding: '12px',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '16px'
          }}>
            <Anchor style={{ width: '28px', height: '28px', color: '#60a5fa' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>Daily Vessel Movement</h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Port Qasim, Karachi - Live Updates</p>
          </div>
        </div>
        <div style={{
          padding: '8px 16px',
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.2)',
          borderRadius: '12px'
        }}>
          <span style={{ color: '#4ade80', fontWeight: '500', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity style={{ width: '16px', height: '16px' }} />
            Port Active
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '12px',
                fontWeight: '500',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.3s',
                background: activeTab === tab.id 
                  ? 'linear-gradient(to right, #06b6d4, #3b82f6)' 
                  : 'rgba(30, 41, 59, 0.4)',
                color: activeTab === tab.id ? 'white' : '#94a3b8',
                border: activeTab === tab.id ? 'none' : '1px solid rgba(71, 85, 105, 0.3)',
                boxShadow: activeTab === tab.id ? '0 10px 25px rgba(6, 182, 212, 0.3)' : 'none'
              }}
            >
              <Icon style={{ width: '16px', height: '16px' }} />
              {tab.label}
              <span style={{
                padding: '2px 8px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 'bold',
                background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.2)' : 'rgba(71, 85, 105, 0.5)'
              }}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', maxHeight: '384px', overflowY: 'auto', paddingRight: '8px' }}>
        {vesselData[activeTab].map((vessel) => renderVesselCard(vessel, activeTab))}
      </div>
    </div>
  );
};

export default VesselMovement;
