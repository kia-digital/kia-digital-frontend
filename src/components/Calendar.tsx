import React, { useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DayData {
  day: number;
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasSchedule: boolean;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 1)); // April 2025
  const [selectedDate, setSelectedDate] = useState<DayData | null>(null);

  // Data jadwal pemeriksaan
  const scheduleData = [
    {
      date: "2025-04-09",
      title: "Jadwal pemeriksaan ANC ke-2",
      type: "anc",
    },
    {
      date: "2025-05-01",
      title: "Jadwal pemeriksaan Leopold ke-2",
      type: "leopold",
    },
  ];

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

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();
    console.log("Today Date:", todayDate);

    const days = [];

    // Previous month's days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonth.getDate() - i;
      const date = new Date(year, month - 1, day);
      days.push({
        day: day,
        date: date,
        isCurrentMonth: false,
        isToday: false,
        hasSchedule: false,
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split("T")[0];
      const hasSchedule = scheduleData.some(
        (schedule) => schedule.date === dateString
      );

      const isToday =
        year === todayYear && month === todayMonth && day === todayDate;

      days.push({
        day: day,
        date: date,
        isCurrentMonth: true,
        isToday: isToday,
        hasSchedule: hasSchedule,
      });
    }

    // Next month's days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        day: day,
        date: date,
        isCurrentMonth: false,
        isToday: false,
        hasSchedule: false,
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const navigateMonth = (direction: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const handleDateClick = (dayData: DayData) => {
    setSelectedDate(dayData);
    console.log("Tanggal dipilih:", dayData.date.toDateString());

    // Cek apakah tanggal ini memiliki jadwal
    const dateString = dayData.date.toISOString().split("T")[0];
    const schedule = scheduleData.find((s) => s.date === dateString);
    // if (schedule) {
    //   alert(`Jadwal: ${schedule.title}`);
    // } else {
    //   alert(
    //     `Tanggal dipilih: ${dayData.day} ${
    //       monthNames[dayData.date.getMonth()]
    //     } ${dayData.date.getFullYear()}`
    //   );
    // }
  };

  const formatScheduleDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  return (
    <div className="max-w-full sm:max-w-md mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800">
        Jadwal Pemeriksaan Ibu
      </h2>

      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
        <h3 className="font-medium text-pink-500 text-base sm:text-lg text-center sm:text-left">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex space-x-1 justify-center sm:justify-end">
          <button
            onClick={() => navigateMonth(-1)}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="sm" />
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <FontAwesomeIcon icon={faChevronRight} size="sm" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="mb-4 sm:mb-6">
        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day, index) => (
            <div
              key={day}
              className="text-center text-xs text-gray-500 py-2 font-medium"
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">
                {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][index]}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((dayData, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(dayData)}
              className={`
                relative text-center text-xs sm:text-sm py-2 sm:py-3 rounded-lg transition-all duration-200 hover:scale-105 min-h-[40px] sm:min-h-[auto]
                ${
                  dayData.isCurrentMonth
                    ? dayData.isToday
                      ? selectedDate?.date?.getTime() ===
                        dayData.date?.getTime()
                        ? "bg-primary-500 text-white font-medium" // Hari ini SETELAH diklik
                        : "bg-primary-50 border-2 border-primary-200 text-primary-700 font-semibold" // Hari ini DEFAULT
                      : dayData.hasSchedule
                      ? "bg-yellow-400 text-white font-semibold"
                      : selectedDate?.date?.getTime() ===
                        dayData.date?.getTime()
                      ? "bg-primary-500 text-white font-medium" // Tanggal lain SETELAH diklik
                      : "text-gray-900 hover:bg-gray-100" // Tanggal lain DEFAULT
                    : "text-gray-300 hover:bg-gray-50" // Tanggal bulan lain
                }
                ${
                  dayData.hasSchedule && !dayData.isToday
                    ? "ring-2 ring-yellow-300"
                    : ""
                }
              `}
            >
              {dayData.day}
              {dayData.hasSchedule && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule List */}
      <div className="space-y-2 sm:space-y-3">
        {scheduleData.map((schedule, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg"
          >
            <div className="w-1 h-8 sm:h-12 bg-yellow-400 rounded-full flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-xs sm:text-sm text-gray-800">
                {formatScheduleDate(schedule.date)}
              </p>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {schedule.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Date Info */}
      {selectedDate && (
        <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs sm:text-sm text-blue-700">
            <span className="font-medium">Tanggal dipilih:</span>{" "}
            {selectedDate.day} {monthNames[selectedDate.date.getMonth()]}{" "}
            {selectedDate.date.getFullYear()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Calendar;
