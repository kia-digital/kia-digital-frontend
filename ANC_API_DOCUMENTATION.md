# API Penambahan Pemeriksaan ANC

## Overview

API ini digunakan untuk menambahkan data pemeriksaan ANC (Antenatal Care) baru dalam sistem dashboard petugas kesehatan.

## Endpoint

```
PATCH /inquiry/anc/add?id={user_id}
```

## Service Implementation

### InquiryService.tsx

```typescript
interface CheckupResult {
  body_weight: number;
  heart_rate: number;
  blood_pressure: string;
  status_inquiry_anc_id: number;
  uterine_fundus_height: number;
  blood_sugar: number;
  body_temperatur: number;
}

interface AddANCRequest {
  scheduled: string;
  location: string;
  medical_officer: string;
  checkup_result: CheckupResult;
  note: string;
}

async addANCExamination(
  id: string,
  ancData: AddANCRequest
): Promise<UpdateResponse>
```

### Hook Usage

```typescript
import { useAddANCExamination } from "../hooks/useAddANCExamination";

const addANCMutation = useAddANCExamination();

// Usage dalam component
addANCMutation.mutate(
  { id: selectedMother, ancData: ancRequestData },
  {
    onSuccess: () => {
      alert("Data pemeriksaan ANC berhasil disimpan!");
    },
    onError: (error) => {
      alert(`Gagal menyimpan data: ${error.message}`);
    },
  }
);
```

## Request Body Example

```json
{
  "scheduled": "2026-06-11",
  "location": "rs mku",
  "medical_officer": "coding camp",
  "checkup_result": {
    "body_weight": 60.1,
    "heart_rate": 123,
    "blood_pressure": "123/123",
    "status_inquiry_anc_id": 1,
    "uterine_fundus_height": 62.1,
    "blood_sugar": 11.2,
    "body_temperatur": 123.3
  },
  "note": "catatan"
}
```

## Form Fields Mapping

| Form Field      | API Field                            | Type   | Description                             |
| --------------- | ------------------------------------ | ------ | --------------------------------------- |
| scheduledDate   | scheduled                            | string | Tanggal jadwal pemeriksaan (YYYY-MM-DD) |
| location        | location                             | string | Lokasi pemeriksaan                      |
| officer         | medical_officer                      | string | Nama petugas medis                      |
| weight          | checkup_result.body_weight           | number | Berat badan (kg)                        |
| fetalHeartRate  | checkup_result.heart_rate            | number | Detak jantung janin (bpm)               |
| bloodPressure   | checkup_result.blood_pressure        | string | Tekanan darah (format: "120/80")        |
| fundalHeight    | checkup_result.uterine_fundus_height | number | Tinggi fundus uteri (cm)                |
| bloodSugar      | checkup_result.blood_sugar           | number | Gula darah (mg/dL)                      |
| bodyTemperature | checkup_result.body_temperatur       | number | Suhu tubuh (°C)                         |
| notes           | note                                 | string | Catatan pemeriksaan                     |

## Implementation in DashboardPetugas.tsx

### Form Data Interface

```typescript
interface ANCFormData {
  checkupNumber: number;
  scheduledDate: string;
  location: string;
  officer: string;
  weight: string;
  bloodPressure: string;
  fundalHeight: string;
  fetalHeartRate: string;
  bloodSugar: string;
  hemoglobin: string;
  proteinUrine: string;
  bodyTemperature: string;
  notes: string;
}
```

### Submit Handler

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!selectedMother) {
    alert("Silakan pilih ibu terlebih dahulu!");
    return;
  }

  const ancRequestData = {
    scheduled: formData.scheduledDate,
    location: formData.location,
    medical_officer: formData.officer,
    checkup_result: {
      body_weight: parseFloat(formData.weight) || 0,
      heart_rate: parseFloat(formData.fetalHeartRate) || 0,
      blood_pressure: formData.bloodPressure,
      status_inquiry_anc_id: 1,
      uterine_fundus_height: parseFloat(formData.fundalHeight) || 0,
      blood_sugar: parseFloat(formData.bloodSugar) || 0,
      body_temperatur: parseFloat(formData.bodyTemperature) || 36.5,
    },
    note: formData.notes,
  };

  addANCMutation.mutate(
    { id: selectedMother, ancData: ancRequestData },
    {
      onSuccess: () => {
        alert(`Data pemeriksaan ANC berhasil disimpan!`);
        // Reset form after successful submission
        setFormData({
          /* reset all fields */
        });
      },
      onError: (error) => {
        alert(`Gagal menyimpan data: ${error.message}`);
      },
    }
  );
};
```

## Features Added

1. **Service Method**: `addANCExamination()` in `InquiryService.tsx`
2. **Hook**: `useAddANCExamination()` for easy component integration
3. **Form Field**: Added "Suhu Tubuh" field to the ANC form
4. **Type Safety**: Full TypeScript interfaces for request/response
5. **Error Handling**: Proper error handling with user feedback
6. **Form Reset**: Automatic form reset after successful submission

## Query Invalidation

The hook automatically invalidates related queries after successful submission:

- `['users']` - Refreshes user list
- `['anc-records']` - Refreshes ANC records (if implemented)

## Required Fields

Form fields marked as required (with red asterisk):

- Tanggal Pemeriksaan
- Lokasi Pemeriksaan
- Petugas Medis
- Berat Badan
- Tekanan Darah
- Tinggi Fundus Uteri
- Detak Jantung Janin
- Suhu Tubuh

## Notes

1. The `status_inquiry_anc_id` is currently hardcoded to `1`. This might need to be configurable based on business requirements.
2. The API expects `body_temperatur` (note the spelling) in the request body.
3. Form validation ensures required fields are filled before submission.
4. The implementation uses React Query for caching and state management.
