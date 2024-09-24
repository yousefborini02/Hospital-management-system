import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientRecords } from "../../store/slices/patientRecordsSlice";
import TreatmentForm from "./TreatmentForm";
import PatientHistory from "./PatientHistory";

const PatientRecords = () => {
  const dispatch = useDispatch();
  const patientRecords = useSelector((state) => state.patientRecords.records);
  const status = useSelector((state) => state.patientRecords.status);
  const error = useSelector((state) => state.patientRecords.error);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatientRecords());
    }
  }, [status, dispatch]);

  // Debugging: Log the state
  console.log("Status:", status);
  console.log("Patient Records:", patientRecords);
  console.log("Error:", error);

  if (status === "loading") {
    return <div className="text-center">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Check if patientRecords is an array and has items
  const hasRecords = Array.isArray(patientRecords) && patientRecords.length > 0;

  console.log("Has Records:", hasRecords); // Log if records are found

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patient Records</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Patients</h2>
          {hasRecords ? (
            <ul className="space-y-2">
              {patientRecords.map((record) => (
                <li
                  key={record.record_id}
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                  onClick={() => setSelectedPatient(record)}
                >
                  {record.patient_name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No patient records found.</p>
          )}
        </div>
        <div>
          {selectedPatient && (
            <>
              <PatientHistory patient={selectedPatient} />
              <TreatmentForm
                patientId={selectedPatient.patient_id}
                doctorId={selectedPatient.doctor_id}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;
