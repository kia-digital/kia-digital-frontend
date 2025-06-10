import { useState } from "react";
import {
  faFileAlt,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../components/Sidebar";
import Calendar from "../components/Calendar";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 1)); // April 2025

  interface InfoCard {
    id: number;
    title: string;
  }

  const infoCards: InfoCard[] = [
    { id: 1, title: "Imunisasi" },
    { id: 2, title: "Asupan Gizi" },
    { id: 3, title: "Kesehatan Mental" },
  ];

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
        isToday: day === 20, // Highlighting day 20 as shown in the image
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
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary-500">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-gradient text-white px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer">
              <FontAwesomeIcon icon={faFileAlt} size="sm" />
              <span>Lembar Pemantauan</span>
            </button>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Carousel Info Cards */}
            <div>
              <div className="bg-white rounded-xl shadow-sm border mb-6 h-[270px] flex items-center justify-center">
                <img src="" alt="" />
                <h2 className="text-xl font-semibold mb-4 text-center">
                  carosel info card
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {infoCards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white rounded-xl shadow-sm border flex justify-center items-center h-32 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-4 w-40">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <div>
                        <p className="text-sm text-gray-500">Tentang</p>
                        <p className="font-semibold">{card.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Articles Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex justify-between">
                <h2 className="text-xl text-primary font-bold">
                  Artikel Minggu Ini
                </h2>
                <div className="flex justify-between items-center">
                  <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                    <FontAwesomeIcon icon={faChevronLeft} size="sm" />
                  </button>
                  <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                    <FontAwesomeIcon icon={faChevronRight} size="sm" />
                  </button>
                </div>
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
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
