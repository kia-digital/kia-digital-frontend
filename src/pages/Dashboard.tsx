import React, { useState } from "react";
import {
  faCalendarAlt,
  faFileAlt,
  faGraduationCap,
  faBabyCarriage,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Assets
import dashboardIcon from "../assets/dashboard.svg";
import dashboardActiveIcon from "../assets/dashboard_active.svg";
import calendarIcon from "../assets/calendar.svg";
import calendarActiveIcon from "../assets/calendar_active.svg";
import pemeriksaanIcon from "../assets/pemeriksaan.svg";
import pemeriksaanActiveIcon from "../assets/pemeriksaan_active.svg";
import edukasiIcon from "../assets/edukasi.svg";
import edukasiActiveIcon from "../assets/edukasi_active.svg";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 1)); // April 2025

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];

    // Previous month's days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day: day,
        isCurrentMonth: true,
        isToday: day === 9, // Highlighting day 9 as shown in the image
      });
    }

    // Next month's days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day: day,
        isCurrentMonth: false,
        isToday: false,
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon
              icon={faBabyCarriage}
              className="text-pink-400 text-5xl"
            />
            <div className="leading-tight">
              <span className="font-bold text-lg text-gradient-primary">
                Kesehatan
              </span>
              <br />
              <span className="font-bold text-lg text-gradient-primary">
                Ibu dan Anak
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 px-4 py-3 text-pink-500 bg-pink-50 rounded-lg border-l-4 border-pink-500"
              >
                <img
                  src={dashboardIcon}
                  alt="Dashboard Icon"
                  className="w-6 h-6 bg-primary-color"
                />
                <span className="font-medium">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <img
                  src={calendarIcon}
                  alt="Calendar Icon"
                  className="w-6 h-6 bg-primary-color"
                />
                <span>Kalender</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <img
                  src={pemeriksaanIcon}
                  alt="Pemeriksaan Icon"
                  className="w-6 h-6 bg-primary-color"
                />
                <span>Pemeriksaan</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <img
                  src={edukasiIcon}
                  alt="Edukasi Icon"
                  className="w-6 h-6 bg-primary-color"
                />
                <span>Edukasi</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-pink-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <FontAwesomeIcon icon={faFileAlt} size="sm" />
              <span>Lombar Pemantauan</span>
            </button>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Carousel Info Cards */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center">
                carosel info card
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="text-sm text-gray-500">Tentang</p>
                      <p className="font-semibold">Imunisasi</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="text-sm text-gray-500">Tentang</p>
                      <p className="font-semibold">Asupan Gizi</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="text-sm text-gray-500">Tentang</p>
                      <p className="font-semibold">Kesehatan Mental</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles Section */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                  <FontAwesomeIcon icon={faChevronLeft} size="sm" />
                </button>
                <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                  <FontAwesomeIcon icon={faChevronRight} size="sm" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-xl shadow-sm border overflow-hidden"
                  >
                    <div className="h-40 bg-gray-300"></div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <p className="text-gray-600 mb-2">Selamat Datang,</p>
              <h3 className="text-xl font-semibold text-pink-500 mb-4">
                Ibu Hanifah
              </h3>
              <div className="text-center">
                <p className="text-pink-400 text-sm mb-1">
                  17 minggu, 1 hari hamil
                </p>
                <p className="text-pink-500 text-2xl font-bold">Hari ke-120</p>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-semibold mb-4">Jadwal Pemeriksaan Ibu</h3>

              {/* Calendar Header */}
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-pink-500">
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </h4>
                <div>
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
                  <div
                    key={index}
                    className={`text-center text-sm py-2 ${
                      date.isCurrentMonth
                        ? date.isToday
                          ? "bg-yellow-400 text-white rounded font-bold"
                          : "text-gray-900"
                        : "text-gray-300"
                    }`}
                  >
                    {date.day}
                  </div>
                ))}
              </div>

              {/* Schedule Items */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-12 bg-yellow-400 rounded"></div>
                  <div>
                    <p className="font-medium text-sm">9 April 2025</p>
                    <p className="text-xs text-gray-600">
                      Jadwal pemeriksaan ANC ke-2
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-12 bg-yellow-400 rounded"></div>
                  <div>
                    <p className="font-medium text-sm">1 Mei 2025</p>
                    <p className="text-xs text-gray-600">
                      Jadwal pemeriksaan Leopold ke-2
                    </p>
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
