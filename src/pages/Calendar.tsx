import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import PageHeader from "../components/PageHeader";

const Calendar: React.FC = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
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
    const scheduleDates = [
      new Date(2025, 3, 9), // 9 April 2025
      new Date(2025, 4, 1), // 1 Mei 2025
      new Date(2025, 5, 15), // 15 Juni 2025
      new Date(2025, 6, 20), // 20 Juli 2025
    ];

    // Helper function to check if a date has an event
    const hasScheduleEvent = (date: Date) => {
      return scheduleDates.some(
        (scheduleDate) => scheduleDate.toDateString() === date.toDateString()
      );
    };

    // Previous month's days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isToday: false,
        hasEvent: false,
        date: new Date(year, month - 1, prevMonth.getDate() - i),
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDayDate = new Date(year, month, day);
      days.push({
        day: day,
        isCurrentMonth: true,
        isToday: currentDayDate.toDateString() === today.toDateString(),
        hasEvent: hasScheduleEvent(currentDayDate),
        date: currentDayDate,
      });
    }

    // Next month's days
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

  const dayNames = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
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
    setSelectedDate(null);
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

  const scheduleItems = [
    {
      date: "9 April 2025",
      event: "Jadwal pemeriksaan ANC ke-2",
      time: "09:00",
      location: "RS Budi Sehat",
      color: "bg-yellow-400",
      type: "ANC",
    },
    {
      date: "1 Mei 2025",
      event: "Jadwal pemeriksaan Leopold ke-2",
      time: "10:30",
      location: "Klinik Ibu & Anak",
      color: "bg-yellow-400",
      type: "Leopold",
    },
    {
      date: "15 Juni 2025",
      event: "Kontrol kehamilan rutin",
      time: "14:00",
      location: "RS Budi Sehat",
      color: "bg-blue-400",
      type: "Kontrol",
    },
    {
      date: "20 Juli 2025",
      event: "USG 4 Dimensi",
      time: "11:00",
      location: "Klinik Spesialis",
      color: "bg-green-400",
      type: "USG",
    },
  ];

  // Get events for selected date
  const getEventsForDate = (date: Date) => {
    const dateString = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return scheduleItems.filter((item) => item.date === dateString);
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <>
      <PageHeader
        title="Kalender"
        subtitle="Kelola jadwal pemeriksaan dan kontrol kehamilan Anda"
        showLembarPemantauan={true}
        showUserAvatar={true}
      />

      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar Section - Takes 3/4 of the space */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              {/* Calendar Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={goToToday}
                    className="px-4 py-2 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors font-medium"
                  >
                    Hari Ini
                  </button>
                  <div className="flex">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="w-10 h-10 bg-gray-100 rounded-l-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} size="sm" />
                    </button>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="w-10 h-10 bg-gray-100 rounded-r-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <FontAwesomeIcon icon={faChevronRight} size="sm" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-semibold text-gray-600 py-4"
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
                    className={`
                      relative text-center text-lg py-6 rounded-lg transition-all duration-200 min-h-[80px] flex flex-col items-center justify-center
                      ${
                        date.isCurrentMonth
                          ? date.isToday
                            ? "bg-blue-500 text-white font-bold shadow-lg"
                            : isDateSelected(date.date)
                            ? "bg-pink-500 text-white font-semibold shadow-lg"
                            : date.hasEvent
                            ? "bg-yellow-100 border-2 border-yellow-400 text-yellow-800 font-medium hover:bg-yellow-200"
                            : "text-gray-900 hover:bg-gray-100 hover:shadow-md border border-gray-200"
                          : "text-gray-300 cursor-not-allowed"
                      }
                      ${
                        date.isCurrentMonth &&
                        !date.isToday &&
                        !isDateSelected(date.date)
                          ? "hover:bg-gray-50 hover:text-gray-700"
                          : ""
                      }
                    `}
                  >
                    <span className="text-lg">{date.day}</span>
                    {date.hasEvent && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Legend */}
              <div className="flex justify-center items-center space-x-6 mt-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-gray-600">Hari Ini</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-pink-500 rounded"></div>
                  <span className="text-gray-600">Tanggal Dipilih</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                  <span className="text-gray-600">Ada Jadwal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Schedule & Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Selected Date Info */}
            {selectedDate && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Tanggal Dipilih
                </h3>
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                  <p className="text-sm text-pink-700 font-medium">
                    {selectedDate.toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {/* Events for selected date */}
                {selectedDateEvents.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">
                      Jadwal Hari Ini:
                    </h4>
                    <div className="space-y-2">
                      {selectedDateEvents.map((event, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-3 border-l-4 border-yellow-400"
                        >
                          <p className="font-medium text-sm text-gray-800">
                            {event.event}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {event.time} - {event.location}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Jadwal Mendatang
              </h3>
              <div className="space-y-4">
                {scheduleItems.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-4 h-16 ${item.color} rounded`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-800 mb-1">
                          {item.event}
                        </p>
                        <p className="text-xs text-gray-600 mb-1">
                          📅 {item.date}
                        </p>
                        <p className="text-xs text-gray-600 mb-1">
                          🕐 {item.time}
                        </p>
                        <p className="text-xs text-gray-600">
                          📍 {item.location}
                        </p>
                        <span
                          className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                            item.type === "ANC"
                              ? "bg-yellow-100 text-yellow-800"
                              : item.type === "Leopold"
                              ? "bg-orange-100 text-orange-800"
                              : item.type === "Kontrol"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Aksi Cepat
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-pink-100 hover:bg-pink-200 text-pink-700 font-medium py-3 px-4 rounded-lg transition-colors text-sm">
                  + Tambah Jadwal Baru
                </button>
                <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 px-4 rounded-lg transition-colors text-sm">
                  📋 Lihat Riwayat Pemeriksaan
                </button>
                <button className="w-full bg-green-100 hover:bg-green-200 text-green-700 font-medium py-3 px-4 rounded-lg transition-colors text-sm">
                  🔔 Atur Pengingat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
