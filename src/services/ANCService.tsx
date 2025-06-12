import axiosInstance from "./axiosInstance";

// API Response Interfaces
interface CheckupResult {
  body_weight: number;
  heart_rate: number;
  blood_pressure: string;
  status: string;
  uterine_fundus_height: number;
  blood_sugar: number;
  body_temperature: number;
}

interface ANCRecord {
  id: string;
  scheduled: string;
  location: string;
  checkup_result: CheckupResult;
}

interface ANCResponse {
  detail: {
    status: string;
    message: string;
    data: ANCRecord[];
  };
}

// Component-friendly interfaces
interface ANCCheckupData {
  id: string;
  scheduledDate: string;
  location: string;
  bodyWeight: number;
  heartRate: number;
  bloodPressure: string;
  status: string;
  uterineFundusHeight: number;
  bloodSugar: number;
  bodyTemperature: number;
}

class ANCService {
  async getANCRecords(): Promise<ANCResponse> {
    try {
      const response = await axiosInstance.get("/inquiry/anc/");
      const data: ANCResponse = response.data;
      return data;
    } catch (error) {
      console.error("Get ANC records error:", error);
      throw error;
    }
  }

  // Transform API data to component-friendly format
  transformANCData(apiData: ANCRecord[]): ANCCheckupData[] {
    return apiData.map((record) => ({
      id: record.id,
      scheduledDate: record.scheduled,
      location: record.location,
      bodyWeight: record.checkup_result.body_weight,
      heartRate: record.checkup_result.heart_rate,
      bloodPressure: record.checkup_result.blood_pressure,
      status: record.checkup_result.status,
      uterineFundusHeight: record.checkup_result.uterine_fundus_height,
      bloodSugar: record.checkup_result.blood_sugar,
      bodyTemperature: record.checkup_result.body_temperature,
    }));
  }
}

export default new ANCService();
export type { ANCRecord, CheckupResult, ANCResponse, ANCCheckupData };
