import axiosInstance from "./axiosInstance";

interface EmergencyContact {
  name: string | null;
  telp: string | null;
  relationship: string | null;
  address: string | null;
}

interface PersonalInfo {
  name: string;
  telp: string | null;
  birth_place: string | null;
  date_of_birth: string | null;
  address: string | null;
  marital_status: string;
  age: number | null;
  blood_group: string | null;
  emergency_contact: EmergencyContact;
}

interface MedicalRecord {
  disease_history: string | null;
  allergies_history: string | null;
  body_height: number | null;
  body_weight: number | null;
  immunization_status: string | null;
  pregnancy_history: string | null;
}

interface UserInformation {
  personal_info: PersonalInfo;
  medical_record: MedicalRecord;
}

interface InformationResponse {
  detail: {
    status: string;
    message: string;
    data: UserInformation;
  };
}

interface UpdateUserRequest {
  name: string;
  phone_number: string;
  birth_place: string;
  date_of_birth: string | null;
  address: string;
  marital_status_id: number;
  age: number;
  blood_group: string;
}

interface UpdateResponse {
  detail: {
    status: string;
    message: string;
  };
}

class InquiryService {
  async getUserInformation(): Promise<InformationResponse> {
    try {
      const response = await axiosInstance.get("/inquiry/information");
      const data: InformationResponse = response.data;
      return data;
    } catch (error) {
      console.error("Get user information error:", error);
      throw error;
    }
  }

  async updateUserInformation(
    userData: UpdateUserRequest
  ): Promise<UpdateResponse> {
    try {
      console.log("Sending update request with data:", userData);
      const response = await axiosInstance.patch(
        "/inquiry/information/update-users",
        userData
      );
      const data: UpdateResponse = response.data;
      console.log("Update response:", data);
      return data;
    } catch (error) {
      console.error("Update user information error:", error);
      throw error;
    }
  }
}

export default new InquiryService();
export type {
  UserInformation,
  PersonalInfo,
  MedicalRecord,
  EmergencyContact,
  UpdateUserRequest,
  UpdateResponse,
};
