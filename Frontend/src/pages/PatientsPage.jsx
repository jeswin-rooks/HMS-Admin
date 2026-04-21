import React from 'react';
import { useData } from '../context/DataContext';

const PatientsPage = () => {
  const { patients } = useData();

  return (
    <div className="px-5 py-8">
      <h1 className="text-2xl font-bold mb-4">Patients Directory</h1>
      <p>Data linked to context!</p>
    </div>
  );
};

export default PatientsPage;
