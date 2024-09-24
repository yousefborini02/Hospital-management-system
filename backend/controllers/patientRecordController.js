const pool = require("../config/db");

exports.getPatientRecords = async (req, res) => {
  const doctorId = req.user;
  try {
    // First, verify if the doctor exists
    const doctorCheck = await pool.query(
      "SELECT * FROM Doctors WHERE doctor_id = $1",
      [doctorId]
    );

    if (doctorCheck.rows.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Now, fetch the patient records
    const result = await pool.query(
      `SELECT 
        pr.record_id, 
        pr.patient_id, 
        pr.doctor_id, 
        pr.treatment_id, 
        pr.diagnosis, 
        pr.age, 
        pr.treatment_section,
        pr.created_at,
        pr.updated_at,
        u.name as patient_name, 
        pt.treatment_name,
        pt.descreption as treatment_description
       FROM PatientRecords pr 
       JOIN Users u ON pr.patient_id = u.user_id 
       JOIN Patient_Treatment pt ON pr.treatment_id = pt.treatment_id 
       WHERE pr.doctor_id = $1
       ORDER BY pr.created_at DESC`,
      [doctorId]
    );

    if (result.rows.length === 0) {
      return res
        .status(204)
        .json({ message: "No patient records found for this doctor" });
    }

    res.json(result.rows);
  } catch (err) {
    console.error("Error in getPatientRecords:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching patient records" });
  }
};

// ... (other controller methods remain the same)

exports.addTreatment = async (req, res) => {
  const {
    patientId,
    doctorId,
    treatmentName,
    diagnosis,
    age,
    treatmentSection,
  } = req.body;
  try {
    // First, insert the treatment into Patient_Treatment table
    const treatmentResult = await pool.query(
      "INSERT INTO Patient_Treatment (treatment_name, descreption) VALUES ($1, $2) RETURNING treatment_id",
      [treatmentName, diagnosis]
    );
    const treatmentId = treatmentResult.rows[0].treatment_id;

    // Then, insert the record into PatientRecords table
    const recordResult = await pool.query(
      `INSERT INTO PatientRecords 
       (patient_id, doctor_id, treatment_id, diagnosis, age, treatment_section) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [patientId, doctorId, treatmentId, diagnosis, age, treatmentSection]
    );

    res.status(201).json(recordResult.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTreatment = async (req, res) => {
  const { recordId } = req.params;
  const { treatmentName, diagnosis, age, treatmentSection } = req.body;
  try {
    // First, update the Patient_Treatment table
    await pool.query(
      "UPDATE Patient_Treatment SET treatment_name = $1, descreption = $2 WHERE treatment_id = (SELECT treatment_id FROM PatientRecords WHERE record_id = $3)",
      [treatmentName, diagnosis, recordId]
    );

    // Then, update the PatientRecords table
    const result = await pool.query(
      `UPDATE PatientRecords 
       SET diagnosis = $1, age = $2, treatment_section = $3, updated_at = CURRENT_TIMESTAMP 
       WHERE record_id = $4 
       RETURNING *`,
      [diagnosis, age, treatmentSection, recordId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
