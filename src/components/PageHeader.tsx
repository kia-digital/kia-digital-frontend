import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

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
  return (
    <div className="flex justify-between items-center px-6 py-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-pink-500">{title}</h1>
        {subtitle && (
          <p className="text-gray-500 text-sm">{subtitle}</p>
        )}
      </div>
      {(showLembarPemantauan || showUserAvatar) && (
        <div className="flex items-center space-x-4">
          {showLembarPemantauan && (
            <button className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-sm hover:bg-pink-600 text-sm">
              <FontAwesomeIcon icon={faFileAlt} size="sm" />
              <span>Lembar Pemantauan</span>
            </button>
          )}
          {showUserAvatar && <UserCirclePlaceholder />}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
