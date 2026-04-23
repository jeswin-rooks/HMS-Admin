import React, { createContext, useContext, useState, useEffect } from 'react';
import bedsData from '../data/beds.json';
import statsData from '../data/stats.json';
import departmentsData from '../data/departments.json';
import statusesData from '../data/statuses.json';

const initialData = {
  beds: bedsData,
  stats: statsData,
  departments: departmentsData,
  statuses: statusesData
};

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Attempt to load from localStorage, otherwise use initial json
    const saved = localStorage.getItem('hms_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialData;
      }
    }
    return initialData;
  });

  // Calculate dynamic stats whenever beds change
  useEffect(() => {
    const newStats = [...data.stats];
    
    // Count Occupied
    const occupiedCount = data.beds.filter(b => b.status === 'Occupied').length;
    // Count Available
    const availableCount = data.beds.filter(b => b.status === 'Available').length;
    // Count Cleaning
    const cleaningCount = data.beds.filter(b => b.status === 'Cleaning Required').length;
    // Total
    const totalCount = data.beds.length;

    const updatedStats = newStats.map(stat => {
      if (stat.id === 'total') return { ...stat, value: totalCount };
      if (stat.id === 'occupied') return { ...stat, value: occupiedCount };
      if (stat.id === 'available') return { ...stat, value: availableCount };
      if (stat.id === 'cleaning') return { ...stat, value: cleaningCount };
      return stat;
    });

    // Only update if something changed to avoid loop
    const hasChanges = data.stats.some((s, i) => s.value !== updatedStats[i].value);
    
    if (hasChanges) {
      setData(prev => ({ ...prev, stats: updatedStats }));
    }
    
    localStorage.setItem('hms_data', JSON.stringify(data));
  }, [data.beds, data.stats]);

  const updateBedStatus = (bedId, newStatus) => {
    setData(prev => {
      const newBeds = prev.beds.map(bed => 
        bed.id === bedId ? { ...bed, status: newStatus } : bed
      );
      return { ...prev, beds: newBeds };
    });
  };

  const addBed = (newBed) => {
    setData(prev => {
      const newBeds = [...prev.beds, newBed];
      return { ...prev, beds: newBeds };
    });
  };

  const updateBed = (bedId, updates) => {
    setData(prev => {
      const newBeds = prev.beds.map(bed =>
        bed.id === bedId ? { ...bed, ...updates } : bed
      );
      return { ...prev, beds: newBeds };
    });
  };

  return (
    <DataContext.Provider value={{ data, updateBedStatus, addBed, updateBed }}>
      {children}
    </DataContext.Provider>
  );
};
