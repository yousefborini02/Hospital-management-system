import React from 'react';
import { useSelector } from 'react-redux';

const PatientHistory = ({ patient }) => {
  const patientRecords = useSelector((state) =>
    state.patientRecords.records.filter((record) => record.patient_id === patient.patient_id)
  );

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Patient History</h2>
      <h3 className="text-lg font-medium">{patient.patient_name}</h3>
      {patientRecords.length === 0 ? (
        <p className="text-gray-500 mt-2">No treatment history available.</p>
      ) : (
        <ul className="mt-2 space-y-4">
          {patientRecords.map((record) => (
            <li key={record.record_id} className="border-b pb-2">
              <p className="font-medium">{record.treatment_name}</p>
              <p className="text-sm text-gray-600">Diagnosis: {record.diagnosis}</p>
              <p className="text-sm text-gray-600">Age at Treatment: {record.age}</p>
              <p className="text-sm text-gray-600">Treatment Section: {record.treatment_section}</p>
              <p className="text-xs text-gray-400">
                Date: {new Date(record.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientHistory;