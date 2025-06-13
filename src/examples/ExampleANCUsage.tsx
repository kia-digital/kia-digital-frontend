// Contoh penggunaan API Penambahan Pemeriksaan ANC
// File ini sebagai referensi cara menggunakan API yang sudah dibuat

import React from "react";
import { useAddANCExamination } from "../hooks/useAddANCExamination";

const ExampleANCForm: React.FC = () => {
  const addANCMutation = useAddANCExamination();

  const handleSubmitExample = () => {
    const exampleData = {
      scheduled: "2025-06-15",
      location: "RS PKU Muhammadiyah",
      medical_officer: "Dr. Sarah",
      checkup_result: {
        body_weight: 65.2,
        heart_rate: 140,
        blood_pressure: "120/80",
        status_inquiry_anc_id: 1,
        uterine_fundus_height: 28,
        blood_sugar: 95,
        body_temperatur: 36.7,
      },
      note: "Pemeriksaan rutin trimester kedua. Kondisi ibu dan janin baik.",
    };

    const userId = "3cc5b0e9-ada3-4b73-ba21-c9b9b13f4d58"; // contoh ID

    addANCMutation.mutate(
      { id: userId, ancData: exampleData },
      {
        onSuccess: (response) => {
          console.log("Success:", response);
          alert("Data ANC berhasil disimpan!");
        },
        onError: (error) => {
          console.error("Error:", error);
          alert("Gagal menyimpan data ANC");
        },
      }
    );
  };

  return (
    <div>
      <h2>Contoh Penggunaan API ANC</h2>
      <button onClick={handleSubmitExample} disabled={addANCMutation.isPending}>
        {addANCMutation.isPending ? "Menyimpan..." : "Simpan Data ANC"}
      </button>
    </div>
  );
};

export default ExampleANCForm;

/* 
CATATAN PENTING:

1. Import hook yang sudah dibuat:
   import { useAddANCExamination } from '../hooks/useAddANCExamination';

2. Gunakan mutation:
   const addANCMutation = useAddANCExamination();

3. Call mutation dengan data:
   addANCMutation.mutate({ id, ancData }, { onSuccess, onError });

4. Data structure yang diperlukan:
   - scheduled: string (format date YYYY-MM-DD)
   - location: string
   - medical_officer: string
   - checkup_result: object dengan field yang diperlukan
   - note: string

5. Field checkup_result yang diperlukan:
   - body_weight: number (kg)
   - heart_rate: number (bpm)
   - blood_pressure: string (format "120/80")
   - status_inquiry_anc_id: number (default: 1)
   - uterine_fundus_height: number (cm)
   - blood_sugar: number (mg/dL)
   - body_temperatur: number (°C)

6. Status mutation yang bisa digunakan:
   - addANCMutation.isPending: boolean (sedang loading)
   - addANCMutation.isError: boolean (ada error)
   - addANCMutation.isSuccess: boolean (berhasil)
   - addANCMutation.error: error object
*/
