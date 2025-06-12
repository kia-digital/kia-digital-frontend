import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import LembarPemantauanModal from "./LembarPemantauanModal";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showLembarPemantauan?: boolean;
  showUserAvatar?: boolean;
}

const UserCirclePlaceholder: React.FC<{ className?: string }> = ({
  className = "w-10 h-10",
}) => <div className={`bg-gray-300 rounded-full ${className}`}></div>;

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showLembarPemantauan = true,
  showUserAvatar = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-4 mb-4 sm:mb-6 space-y-4 sm:space-y-0">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-primary-500">
            {title}
          </h1>
          {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        </div>
        {(showLembarPemantauan || showUserAvatar) && (
          <div className="flex items-center justify-center sm:justify-end space-x-3 sm:space-x-4">
            {showLembarPemantauan && (
              <button
                onClick={handleOpenModal}
                className="bg-primary-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg flex items-center space-x-2 shadow-sm hover:bg-primary-600 text-xs sm:text-sm transition-colors"
              >
                <FontAwesomeIcon icon={faFileAlt} size="sm" />
                <span className="hidden sm:inline">Lembar Pemantauan</span>
                <span className="sm:hidden">Pemantauan</span>
              </button>
            )}
            {showUserAvatar && (
              <UserCirclePlaceholder className="w-8 h-8 sm:w-10 sm:h-10" />
            )}
          </div>
        )}
      </div>

      <LembarPemantauanModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default PageHeader;
