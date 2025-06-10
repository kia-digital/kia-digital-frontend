import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today); // Start with today's date
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
  };

  const categories = [
    "Trimester 1",
    "Trimester 2",
    "Trimester 3",
    "Imunisasi",
    "Asupan Gizi",
    "Kesehatan Mental",
  ];
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
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex bg-gray-100">
        {/* Content Area */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-gray-100 px-8 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-primary-500">Dashboard</h2>
              <div className="flex items-center space-x-4">
                <button className="bg-pink-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-500 transition-colors flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Lembar Pemantauan
                </button>
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Welcome Card */}
                <div className="bg-gradient rounded-xl shadow-sm h-[270px] flex items-center justify-between p-8">
                  <div className="text-white flex-1">
                    <h2 className="text-3xl font-bold mb-4">Selamat Datang!</h2>
                    <p className="text-base text-pink-100 leading-relaxed max-w-2xl text-justify mr-20">
                      Pendamping kehamilan Anda dalam bentuk digital yang
                      praktis dan mudah digunakan. Nikmati fitur-fitur seperti
                      pengingat cek up, edukasi seputar kehamilan, dan lembar
                      pemantauan kesehatan Ibu selama kehamilan
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Articles Section */}
                <div className="space-y-6">
                  <h2 className="text-xl text-gray-800 font-bold">
                    Eksplorasi kategori artikel yang Anda ingin pelajari
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6">
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center p-6 cursor-pointer hover:shadow-xl transition-shadow border border-gray-100"
                      >
                        <div className="w-32 h-32 bg-gray-300 rounded-full mb-4"></div>
                        <div className="text-center">
                          <p className="text-gray-500 font-medium text-sm mb-1">
                            Tentang
                          </p>
                          <p className="text-gray-800 text-lg font-medium">
                            {category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Schedule */}
              <div>
                {/* Profile Section */}
                <div className="rounded-xl shadow-lg bg-white w-full h-[270px] flex justify-center items-center flex-col mb-8">
                  <div className="mb-8 text-center">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      Ibu Hanifah
                    </h3>
                    <span className="inline-block bg-green-100 text-green-800 border-2 border-green-400 text-sm px-3 py-1 rounded-sm font-medium">
                      Kondisi Ibu Sehat
                    </span>
                  </div>

                  <div className="text-center">
                    <p className="text-lg text-gray-600 mb-2">
                      17 minggu, 1 hari hamil
                    </p>
                    <h4 className="text-3xl font-bold text-pink-400 mb-4">
                      Hari ke-120
                    </h4>
                  </div>
                </div>

                {/* Schedule Section */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-semibold text-xl mb-4">
                    Jadwal Pemeriksaan Ibu
                  </h3>{" "}
                  {/* Calendar Header */}
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-pink-500 text-lg">
                      {monthNames[currentDate.getMonth()]}{" "}
                      {currentDate.getFullYear()}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={goToToday}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200 transition-colors font-medium"
                      >
                        Hari Ini
                      </button>
                      <div className="flex">
                        <button
                          onClick={() => navigateMonth(-1)}
                          className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 mr-1"
                        >
                          <FontAwesomeIcon icon={faChevronLeft} size="xs" />
                        </button>
                        <button
                          onClick={() => navigateMonth(1)}
                          className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200"
                        >
                          <FontAwesomeIcon icon={faChevronRight} size="xs" />
                        </button>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                      <div
                        key={day}
                        className="text-center text-xs text-gray-500 py-2 font-medium"
                      >
                        {day}
                      </div>
                    ))}
                    {calendarDays.map((date, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handleDateClick(date.date, date.isCurrentMonth)
                        }
                        disabled={!date.isCurrentMonth}
                        className={`text-center text-sm py-2 rounded transition-all duration-200 ${
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
                    ))}{" "}
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
                  )}{" "}
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
    </div>
  );
};

export default Dashboard;
