import React from "react";
import { useUserInformation } from "../hooks/useUserInformation";

interface UserProfileCardProps {
  className?: string;
  showFullDetails?: boolean;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  className = "",
  showFullDetails = false,
}) => {
  const { data: userInfo, isLoading, error, isError } = useUserInformation();

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg p-4 shadow-sm border ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (isError || error) {
    return (
      <div
        className={`bg-white rounded-lg p-4 shadow-sm border border-red-200 ${className}`}
      >
        <div className="text-red-600 text-sm">
          <p className="font-medium">
            ⚠️ {error?.message || "Terjadi kesalahan saat memuat data"}
          </p>
          <p className="text-xs mt-1">Silakan coba lagi nanti</p>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className={`bg-white rounded-lg p-4 shadow-sm border ${className}`}>
        <p className="text-gray-500 text-sm">Tidak ada data pengguna</p>
      </div>
    );
  }

  const { personal_info, medical_record } = userInfo;

  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm border ${className}`}>
      <div className="space-y-3">
        {/* Basic Info */}
        <div>
          <h3 className="font-semibold text-gray-800">
            {personal_info.name || "Nama belum diisi"}
          </h3>
          <p className="text-sm text-gray-600">
            {personal_info.age
              ? `${personal_info.age} tahun`
              : "Usia tidak diketahui"}
            {personal_info.marital_status &&
              ` • ${personal_info.marital_status}`}
          </p>
        </div>

        {/* Contact Info */}
        {(personal_info.telp || personal_info.address) && (
          <div className="text-sm text-gray-600">
            {personal_info.telp && <p>📱 {personal_info.telp}</p>}
            {personal_info.address && <p>📍 {personal_info.address}</p>}
          </div>
        )}

        {/* Extended Details */}
        {showFullDetails && (
          <div className="pt-3 border-t border-gray-100 space-y-2">
            {personal_info.birth_place && (
              <p className="text-xs text-gray-500">
                <span className="font-medium">Tempat Lahir:</span>{" "}
                {personal_info.birth_place}
              </p>
            )}
            {personal_info.date_of_birth && (
              <p className="text-xs text-gray-500">
                <span className="font-medium">Tanggal Lahir:</span>{" "}
                {personal_info.date_of_birth}
              </p>
            )}
            {personal_info.blood_group && (
              <p className="text-xs text-gray-500">
                <span className="font-medium">Golongan Darah:</span>{" "}
                {personal_info.blood_group}
              </p>
            )}

            {/* Medical Info */}
            {(medical_record.body_height || medical_record.body_weight) && (
              <div className="text-xs text-gray-500">
                {medical_record.body_height && (
                  <span className="mr-3">
                    <span className="font-medium">TB:</span>{" "}
                    {medical_record.body_height} cm
                  </span>
                )}
                {medical_record.body_weight && (
                  <span>
                    <span className="font-medium">BB:</span>{" "}
                    {medical_record.body_weight} kg
                  </span>
                )}
              </div>
            )}

            {/* Emergency Contact */}
            {personal_info.emergency_contact.name && (
              <div className="text-xs text-gray-500">
                <span className="font-medium">Kontak Darurat:</span>{" "}
                {personal_info.emergency_contact.name}
                {personal_info.emergency_contact.relationship &&
                  ` (${personal_info.emergency_contact.relationship})`}
                {personal_info.emergency_contact.telp &&
                  ` - ${personal_info.emergency_contact.telp}`}
              </div>
            )}
          </div>
        )}

        {/* Status Indicator */}
        <div className="flex items-center justify-between pt-2">
          <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            ✓ Data Terintegrasi
          </span>
          <span className="text-xs text-gray-400">
            API: /inquiry/information
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
