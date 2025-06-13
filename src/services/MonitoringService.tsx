import axiosInstance from "./axiosInstance";
import toast from "react-hot-toast";

export interface MonitoringData {
  weekly_pregnantcy: number;
  fever: boolean;
  headache: boolean;
  insomnia_or_anxiety: boolean;
  tb_risk: boolean;
  fetal_movement: boolean;
  abdominal_pain: boolean;
  discharge: boolean;
  urination_issues: boolean;
  diarrhea: boolean;
  type_inquiry: number;
}

export interface MonitoringResponse {
  detail: {
    status: string;
    message: string;
    data: MonitoringData;
  };
}

class MonitoringService {
  async addWeeklyMonitoring(data: MonitoringData): Promise<MonitoringResponse> {
    try {
      toast.loading("Menyimpan data pemantauan...", { id: "monitoring" });

      const response = await axiosInstance.post(
        "/inquiry/pemantauan/add",
        data
      );
      const responseData: MonitoringResponse = response.data;

      if (responseData.detail.status === "success") {
        toast.success("Data pemantauan berhasil disimpan!", {
          id: "monitoring",
        });
      } else {
        toast.error(responseData.detail.message || "Gagal menyimpan data", {
          id: "monitoring",
        });
      }

      return responseData;
    } catch (error: any) {
      console.error("Monitoring submission error:", error);

      const errorMessage =
        error.response?.data?.detail?.message ||
        error.response?.data?.message ||
        "Gagal menyimpan data pemantauan. Coba lagi.";

      toast.error(errorMessage, { id: "monitoring" });
      throw error;
    }
  }
}

export default new MonitoringService();
