# Update dan Get ANC API Implementation

## Overview

Implementasi API untuk Update ANC dan Get ANC dalam dashboard petugas kesehatan.

## API Endpoints

### 1. Update ANC

```
PATCH /inquiry/anc/update?id_anc=09ee5062-5761-4d79-b81c-7dc2180c1674
Authorization: Bearer <token>
```

### 2. Get ANC

```
GET /inquiry/anc/id?id_anc=09ee5062-5761-4d79-b81c-7dc2180c1674
Authorization: Bearer <token>
```

## Service Implementation

### InquiryService.tsx - Interface Additions

```typescript
interface UpdateANCRequest {
  scheduled: string;
  location: string;
  medical_officer: string;
  checkup_result: CheckupResult;
  note: string;
}

interface ANCRecord {
  id: string;
  scheduled: string;
  location: string;
  medical_officer: string;
  checkup_result: CheckupResult;
  note: string;
  created_at: string;
  updated_at: string;
}

interface GetANCResponse {
  detail: {
    status: string;
    message: string;
    data: ANCRecord;
  };
}
```

### InquiryService.tsx - Methods

```typescript
async updateANCExamination(
  idAnc: string,
  ancData: UpdateANCRequest
): Promise<UpdateResponse> {
  try {
    console.log("Sending ANC examination update data:", ancData);
    const response = await axiosInstance.patch(
      `/inquiry/anc/update?id_anc=${idAnc}`,
      ancData
    );
    const data: UpdateResponse = response.data;
    console.log("ANC examination update response:", data);
    return data;
  } catch (error) {
    console.error("Update ANC examination error:", error);
    throw error;
  }
}

async getANCExamination(idAnc: string): Promise<GetANCResponse> {
  try {
    const response = await axiosInstance.get(`/inquiry/anc/id?id_anc=${idAnc}`);
    const data: GetANCResponse = response.data;
    return data;
  } catch (error) {
    console.error("Get ANC examination error:", error);
    throw error;
  }
}
```

## Hook Implementation

### useANCOperations.ts

```typescript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import InquiryService, {
  type UpdateANCRequest,
} from "../services/InquiryService";

interface UpdateANCParams {
  idAnc: string;
  ancData: UpdateANCRequest;
}

// Hook untuk update ANC
export const useUpdateANCExamination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ idAnc, ancData }: UpdateANCParams) =>
      InquiryService.updateANCExamination(idAnc, ancData),
    onSuccess: (data) => {
      console.log("ANC examination updated successfully:", data);
      // Invalidate and refetch any related queries
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["anc-records"] });
    },
    onError: (error) => {
      console.error("Failed to update ANC examination:", error);
    },
  });
};

// Hook untuk get ANC
export const useGetANCExamination = (idAnc: string | null) => {
  return useQuery({
    queryKey: ["anc-record", idAnc],
    queryFn: () => InquiryService.getANCExamination(idAnc!),
    enabled: !!idAnc, // Hanya jalankan query jika idAnc tersedia
    staleTime: 5 * 60 * 1000, // 5 menit
  });
};
```

## Dashboard Integration

### State Management

```typescript
const [isEditMode, setIsEditMode] = useState<boolean>(false);
const [editingANCId, setEditingANCId] = useState<string | null>(null);
const { data: ancRecord } = useGetANCExamination(editingANCId);
const updateANCMutation = useUpdateANCExamination();
```

### Fill Form with ANC Data

```typescript
useEffect(() => {
  if (ancRecord && ancRecord.detail.data && isEditMode) {
    const data = ancRecord.detail.data;
    setFormData({
      checkupNumber: 1,
      scheduledDate: data.scheduled,
      location: data.location,
      officer: data.medical_officer,
      weight: data.checkup_result.body_weight.toString(),
      bloodPressure: data.checkup_result.blood_pressure,
      fundalHeight: data.checkup_result.uterine_fundus_height.toString(),
      fetalHeartRate: data.checkup_result.heart_rate.toString(),
      bloodSugar: data.checkup_result.blood_sugar.toString(),
      hemoglobin: "",
      proteinUrine: "",
      bodyTemperature: data.checkup_result.body_temperatur.toString(),
      notes: data.note,
    });
  }
}, [ancRecord, isEditMode]);
```

### Form Submit Handler

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

  if (isEditMode && editingANCId) {
    // Update existing ANC record
    updateANCMutation.mutate(
      { idAnc: editingANCId, ancData: ancRequestData },
      {
        onSuccess: () => {
          alert("Data pemeriksaan ANC berhasil diperbarui!");
          resetForm();
          setIsEditMode(false);
          setEditingANCId(null);
        },
        onError: (error) => {
          alert(`Gagal memperbarui data: ${error.message}`);
        },
      }
    );
  } else {
    // Add new ANC record
    addANCMutation.mutate(
      { id: selectedMother, ancData: ancRequestData },
      {
        onSuccess: () => {
          alert("Data pemeriksaan ANC berhasil disimpan!");
          resetForm();
        },
        onError: (error) => {
          alert(`Gagal menyimpan data: ${error.message}`);
        },
      }
    );
  }
};
```

### Helper Functions

```typescript
const resetForm = () => {
  setFormData({
    checkupNumber: 1,
    scheduledDate: "",
    location: "",
    officer: "",
    weight: "",
    bloodPressure: "",
    fundalHeight: "",
    fetalHeartRate: "",
    bloodSugar: "",
    hemoglobin: "",
    proteinUrine: "",
    bodyTemperature: "",
    notes: "",
  });
};

const handleEditANC = (ancId: string) => {
  setEditingANCId(ancId);
  setIsEditMode(true);
};

const handleCancelEdit = () => {
  setIsEditMode(false);
  setEditingANCId(null);
  resetForm();
};
```

### UI Updates

```typescript
// Submit button with conditional text
<button
  type="submit"
  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
>
  {isEditMode ? "Update Data ANC" : "Simpan Data ANC"}
</button>;

// Cancel edit button (shown only in edit mode)
{
  isEditMode && (
    <button
      type="button"
      onClick={handleCancelEdit}
      className="px-6 py-2 border border-orange-300 text-orange-700 rounded-md"
    >
      Batal Edit
    </button>
  );
}
```

## Request Body Format

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

## Usage Flow

1. **View Mode**: Tampilan default untuk input data ANC baru
2. **Edit Mode**: Dipicu saat user klik edit pada record ANC yang ada
3. **Load Data**: Hook `useGetANCExamination` mengambil data ANC berdasarkan ID
4. **Fill Form**: useEffect mengisi form dengan data yang diambil
5. **Submit**: Handler menentukan apakah akan melakukan add atau update
6. **Reset**: Form direset setelah operasi berhasil

## Features Added

✅ **Update ANC**: Edit record ANC yang sudah ada
✅ **Get ANC**: Ambil detail record ANC berdasarkan ID  
✅ **Form Fill**: Auto-fill form saat edit mode
✅ **Conditional UI**: Button text berubah sesuai mode
✅ **Error Handling**: Proper error handling untuk semua operasi
✅ **Query Invalidation**: Cache refresh otomatis setelah update

## Next Steps

1. Tambahkan UI untuk list ANC records dengan tombol edit
2. Implementasikan pagination untuk list ANC
3. Tambahkan konfirmasi dialog sebelum update
4. Implementasikan soft delete untuk ANC records
