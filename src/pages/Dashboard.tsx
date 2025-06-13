import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRole } from "../contexts/RoleContext";
import { useDashboardInfo } from "../hooks/useDashboardInfo";
import DashboardPetugas from "./DashboardPetugas";
import LembarPemantauanModal from "../components/LembarPemantauanModal";
import ArticleRecommendations from "../components/ArticleRecommendations";
import "../styles/CategoryCard.css";

const Dashboard = () => {
  const { currentUser } = useRole();
  const {
    userInfo,
    loading,
    error,
    refetch,
    totalDays,
    pregnancyAge,
    conditionDisplay,
  } = useDashboardInfo();

  // Jika user adalah petugas kesehatan, tampilkan dashboard petugas
  if (currentUser.role === "petugas_kesehatan") {
    return <DashboardPetugas />;
  }

  // Dashboard untuk role Ibu (existing dashboard)
  const navigate = useNavigate();
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today); // Start with today's date
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];

    // Define specific schedule dates
    const scheduleDates = [new Date(2025, 3, 9), new Date(2025, 4, 1)];

    // Helper function to check if a date has an event
    const hasScheduleEvent = (date: Date) => {
      return scheduleDates.some(
        (scheduleDate) => scheduleDate.toDateString() === date.toDateString()
      );
    }; // Previous month's days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isToday: false,
        hasEvent: false,
        date: new Date(year, month - 1, prevMonth.getDate() - i),
      });
    } // Current month's days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDayDate = new Date(year, month, day);
      days.push({
        day: day,
        isCurrentMonth: true,
        isToday: currentDayDate.toDateString() === today.toDateString(), // Check if it's actually today
        hasEvent: hasScheduleEvent(currentDayDate), // Check specific schedule dates
        date: currentDayDate, // Add full date object
      });
    } // Next month's days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day: day,
        isCurrentMonth: false,
        isToday: false,
        hasEvent: false,
        date: new Date(year, month + 1, day),
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const navigateMonth = (direction: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(null); // Clear any selected date
  };

  const handleDateClick = (date: Date, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      setSelectedDate(date);
    }
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  }; // Recommended articles for the user
  const scheduleItems = [
    {
      date: "9 April 2025",
      event: "Jadwal pemeriksaan ANC ke-2",
      color: "bg-yellow-400",
    },
    {
      date: "1 Mei 2025",
      event: "Jadwal pemeriksaan Leopold ke-2",
      color: "bg-yellow-400",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex bg-gray-100">
        {/* Content Area */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-500">
                Dashboard
              </h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleOpenModal}
                  className="bg-pink-400 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-pink-500 transition-colors flex items-center"
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="hidden sm:inline">Lembar Pemantauan</span>
                  <span className="sm:hidden">Pemantauan</span>
                </button>
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                {/* Welcome Card */}
                <div className="relative bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 rounded-3xl shadow-xl overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                    <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-white rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
                    <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-white rounded-full"></div>
                  </div>

                  <div className="relative flex flex-col sm:flex-row items-center min-h-[200px] sm:min-h-[280px] p-4 sm:p-8">
                    {/* Content */}
                    <div className="w-full sm:w-2/3 text-white space-y-4 sm:space-y-6 text-center sm:text-left">
                      <div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 leading-tight">
                          Selamat Datang!
                        </h2>
                        <h3 className="text-lg sm:text-xl font-semibold text-primary-100 mb-3 sm:mb-4">
                          KIA Digital - Pendamping Kehamilan Anda
                        </h3>
                      </div>
                      <p className="text-primary-50 leading-relaxed text-sm sm:text-base">
                        Pendamping kehamilan Anda dalam bentuk digital yang
                        praktis dan mudah digunakan. Nikmati fitur-fitur seperti
                        pengingat cek up, edukasi seputar kehamilan, dan lembar
                        pemantauan kesehatan Ibu selama kehamilan.
                      </p>
                    </div>

                    {/* Visual */}
                    <div className="w-full sm:w-1/3 flex justify-center mt-4 sm:mt-0">
                      <div className="relative">
                        {/* Main Circle Background */}
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white border-opacity-30">
                          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                            <span className="text-2xl sm:text-4xl">🤱</span>
                          </div>
                        </div>

                        {/* Floating Icons */}
                        <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-25 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <span className="text-sm sm:text-lg">💝</span>
                        </div>
                        <div className="absolute -bottom-1 -left-3 sm:-bottom-2 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-25 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <span className="text-xs sm:text-sm">👶</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Articles Recommendations Section */}
                <ArticleRecommendations className="space-y-4 sm:space-y-6" />
              </div>

              {/* Right Column - Schedule */}
              <div className="space-y-6 lg:space-y-8">
                {" "}
                {/* Profile Section */}
                <div className="rounded-xl shadow-lg bg-white w-full min-h-[200px] sm:min-h-[270px] flex justify-center items-center flex-col p-4 sm:p-6">
                  {loading ? (
                    <div className="text-center">
                      <div className="spinner-border h-8 w-8 mx-auto mb-4 border-2 border-t-primary-500 border-primary-200 rounded-full animate-spin"></div>
                      <p className="text-gray-500">Memuat informasi...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center">
                      <div className="text-4xl mb-4">⚠️</div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Gagal Memuat Data
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{error}</p>
                      <button
                        onClick={refetch}
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition-colors"
                      >
                        Coba Lagi
                      </button>
                    </div>
                  ) : userInfo ? (
                    <>
                      <div className="mb-6 sm:mb-8 text-center">
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                          {userInfo.name || "Nama Ibu"}
                        </h3>
                        <span
                          className={`inline-block ${conditionDisplay.bgColor} ${conditionDisplay.textColor} border-2 ${conditionDisplay.borderColor} text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-sm font-medium`}
                        >
                          {conditionDisplay.text}
                        </span>
                      </div>{" "}
                      <div className="text-center">
                        <p className="text-base sm:text-lg text-gray-600 mb-2">
                          {pregnancyAge}
                        </p>
                        <h4 className="text-2xl sm:text-3xl font-bold text-pink-400 mb-4">
                          Hari ke-{totalDays}
                        </h4>
                      </div>
                      {!userInfo.kondisi && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                          <p className="text-sm text-yellow-700 mb-2">
                            💡 Lengkapi data diri dan lakukan pemeriksaan ANC
                            untuk mendapatkan informasi kondisi kesehatan
                          </p>
                          <button
                            onClick={() => navigate("/pemeriksaan")}
                            className="text-xs text-yellow-800 underline hover:text-yellow-900"
                          >
                            Pergi ke Informasi Ibu
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl mb-4">📋</div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Data Tidak Tersedia
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Silakan lengkapi informasi Anda terlebih dahulu
                      </p>
                      <button
                        onClick={() => navigate("/pemeriksaan")}
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition-colors"
                      >
                        Lengkapi Data
                      </button>
                    </div>
                  )}
                </div>
                {/* Schedule Section */}
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                  <h3 className="font-semibold text-lg sm:text-xl mb-4">
                    Jadwal Pemeriksaan Ibu
                  </h3>
                  {/* Calendar Header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
                    <h4 className="font-medium text-pink-500 text-base sm:text-lg">
                      {monthNames[currentDate.getMonth()]}{" "}
                      {currentDate.getFullYear()}
                    </h4>
                    <div className="flex items-center justify-between sm:justify-end space-x-2">
                      <button
                        onClick={goToToday}
                        className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200 transition-colors font-medium"
                      >
                        Hari Ini
                      </button>
                      <div className="flex">
                        <button
                          onClick={() => navigateMonth(-1)}
                          className="w-8 h-8 sm:w-6 sm:h-6 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 mr-1"
                        >
                          <FontAwesomeIcon icon={faChevronLeft} size="xs" />
                        </button>
                        <button
                          onClick={() => navigateMonth(1)}
                          className="w-8 h-8 sm:w-6 sm:h-6 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200"
                        >
                          <FontAwesomeIcon icon={faChevronRight} size="xs" />
                        </button>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {["S", "S", "R", "K", "J", "S", "M"].map((day, index) => (
                      <div
                        key={index}
                        className="text-center text-xs text-gray-500 py-2 font-medium"
                      >
                        <span className="hidden sm:inline">
                          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"][index]}
                        </span>
                        <span className="sm:hidden">{day}</span>
                      </div>
                    ))}
                    {calendarDays.map((date, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handleDateClick(date.date, date.isCurrentMonth)
                        }
                        disabled={!date.isCurrentMonth}
                        className={`text-center text-xs sm:text-sm py-2 rounded transition-all duration-200 min-h-[32px] sm:min-h-[36px] ${
                          date.isCurrentMonth
                            ? date.isToday
                              ? "bg-blue-500 text-white font-bold shadow-md"
                              : isDateSelected(date.date)
                              ? "bg-pink-500 text-white font-semibold shadow-md"
                              : date.hasEvent
                              ? "bg-yellow-400 text-white font-medium hover:bg-yellow-500"
                              : "text-gray-900 hover:bg-gray-100 hover:shadow-sm"
                            : "text-gray-300 cursor-not-allowed"
                        } ${
                          date.isCurrentMonth &&
                          !date.isToday &&
                          !isDateSelected(date.date)
                            ? "hover:bg-gray-50 hover:text-gray-700 active:bg-gray-100"
                            : ""
                        }`}
                      >
                        {date.day}
                      </button>
                    ))}
                  </div>
                  {/* Selected Date Feedback */}
                  {selectedDate && (
                    <div className="mb-4 p-3 bg-pink-50 border border-pink-200 rounded-lg">
                      <p className="text-sm text-pink-700">
                        <span className="font-medium">Tanggal dipilih:</span>{" "}
                        {selectedDate.toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  )}
                  {/* Schedule Items */}
                  <div className="space-y-3">
                    {scheduleItems.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-3 h-12 ${item.color} rounded`}></div>
                        <div>
                          <p className="font-medium text-sm">{item.date}</p>
                          <p className="text-xs text-gray-600">{item.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lembar Pemantauan Modal */}
      <LembarPemantauanModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Dashboard;
