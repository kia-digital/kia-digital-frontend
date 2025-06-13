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
  hpht: string | null;
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
  hpht?: string;
}

interface UpdateResponse {
  detail: {
    status: string;
    message: string;
  };
}

interface UpdateHPHTRequest {
  id: string;
  hpht: string;
}

interface Relationship {
  id: number;
  name: string;
}

interface RelationshipsResponse {
  detail: {
    status: string;
    message: string;
    data: Relationship[];
  };
}

interface UpdateEmergencyContactRequest {
  name: string;
  telp: string;
  address: string;
  relationship_id: number;
}

interface User {
  id: string;
  name: string;
  hpht: string | null;
}

interface UsersResponse {
  detail: {
    status: string;
    message: string;
    data: User[];
  };
}

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
  medical_officer?: string; // Optional karena mungkin tidak ada di response
  checkup_result: {
    body_weight: number;
    heart_rate: number;
    blood_pressure: string;
    status: string;
    uterine_fundus_height: number;
    blood_sugar: number;
    body_temperature: number;
  };
  note?: string; // Optional karena mungkin tidak ada di response
}

interface GetANCResponse {
  detail: {
    status: string;
    message: string;
    data: ANCRecord;
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

  async updateHPHT(hphtData: UpdateHPHTRequest): Promise<UpdateResponse> {
    try {
      console.log("Sending HPHT update request with data:", hphtData);
      const response = await axiosInstance.patch(
        "/inquiry/information/update-hpht",
        hphtData
      );
      const data: UpdateResponse = response.data;
      console.log("HPHT update response:", data);
      return data;
    } catch (error) {
      console.error("Update HPHT error:", error);
      throw error;
    }
  }

  async getRelationships(): Promise<RelationshipsResponse> {
    try {
      const response = await axiosInstance.get("/relationships");
      const data: RelationshipsResponse = response.data;
      return data;
    } catch (error) {
      console.error("Get relationships error:", error);
      throw error;
    }
  }

  async updateEmergencyContact(
    contactData: UpdateEmergencyContactRequest
  ): Promise<UpdateResponse> {
    try {
      console.log(
        "Sending emergency contact update request with data:",
        contactData
      );
      const response = await axiosInstance.patch(
        "/emergency-contact/update",
        contactData
      );
      const data: UpdateResponse = response.data;
      console.log("Emergency contact update response:", data);
      return data;
    } catch (error) {
      console.error("Update emergency contact error:", error);
      throw error;
    }
  }

  async getAllUsers(): Promise<UsersResponse> {
    try {
      const response = await axiosInstance.get("/users");
      const data: UsersResponse = response.data;
      return data;
    } catch (error) {
      console.error("Get all users error:", error);
      throw error;
    }
  }

  async addANCExamination(
    id: string,
    ancData: AddANCRequest
  ): Promise<UpdateResponse> {
    try {
      console.log("Sending ANC examination data:", ancData);
      const response = await axiosInstance.post(
        `/inquiry/anc/add?id=${id}`,
        ancData
      );
      const data: UpdateResponse = response.data;
      console.log("ANC examination response:", data);
      return data;
    } catch (error) {
      console.error("Add ANC examination error:", error);
      throw error;
    }
  }

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
      console.log("Fetching ANC examination with ID:", idAnc);
      const response = await axiosInstance.get(
        `/inquiry/anc/id?id_anc=${idAnc}`
      );
      console.log("Raw API response for getANCExamination:", response.data);

      const data: GetANCResponse = response.data;

      // Validate response structure
      if (!data.detail) {
        console.error("Invalid response: missing detail property");
        throw new Error("Invalid API response structure");
      }

      console.log("Parsed ANC examination response:", data);
      return data;
    } catch (error) {
      console.error("Get ANC examination error:", error);
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as any;
        console.error("Error response data:", axiosError.response?.data);
        console.error("Error response status:", axiosError.response?.status);
      }
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
  UpdateHPHTRequest,
  Relationship,
  RelationshipsResponse,
  UpdateEmergencyContactRequest,
  User,
  UsersResponse,
  AddANCRequest,
  CheckupResult,
  UpdateANCRequest,
  ANCRecord,
  GetANCResponse,
};
