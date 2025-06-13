import { useMutation } from "@tanstack/react-query";
import MonitoringService from "../services/MonitoringService";
import type { MonitoringData } from "../services/MonitoringService";

export const useAddWeeklyMonitoring = () => {
  return useMutation({
    mutationFn: (data: MonitoringData) =>
      MonitoringService.addWeeklyMonitoring(data),
    onError: (error) => {
      console.error("Monitoring submission failed:", error);
    },
  });
};
