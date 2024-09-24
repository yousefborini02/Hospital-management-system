import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTreatment,
  updateTreatment,
} from "../../store/slices/patientRecordsSlice";

const TreatmentForm = ({ patientId, doctorId, existingTreatment = null }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    treatmentName: existingTreatment?.treatment_name || "",
    diagnosis: existingTreatment?.diagnosis || "",
    age: existingTreatment?.age || "",
    treatmentSection: existingTreatment?.treatment_section || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const treatmentData = {
      patientId,
      doctorId,
      treatmentId: existingTreatment?.treatment_id,
      ...formData,
    };

    if (existingTreatment) {
      dispatch(
        updateTreatment({
          recordId: existingTreatment.record_id,
          treatmentData,
        })
      );
    } else {
      dispatch(addTreatment(treatmentData));
    }

    // Reset form after submission
    setFormData({
      treatmentName: "",
      diagnosis: "",
      age: "",
      treatmentSection: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label
          htmlFor="treatmentName"
          className="block text-sm font-medium text-gray-700"
        >
          Treatment Name
        </label>
        <input
          type="text"
          name="treatmentName"
          id="treatmentName"
          value={formData.treatmentName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label
          htmlFor="diagnosis"
          className="block text-sm font-medium text-gray-700"
        >
          Diagnosis
        </label>
        <textarea
          name="diagnosis"
          id="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        ></textarea>
      </div>
      <div>
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700"
        >
          Age
        </label>
        <input
          type="number"
          name="age"
          id="age"
          value={formData.age}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label
          htmlFor="treatmentSection"
          className="block text-sm font-medium text-gray-700"
        >
          Treatment Section
        </label>
        <input
          type="number"
          name="treatmentSection"
          id="treatmentSection"
          value={formData.treatmentSection}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {existingTreatment ? "Update Treatment" : "Add Treatment"}
      </button>
    </form>
  );
};

export default TreatmentForm;
