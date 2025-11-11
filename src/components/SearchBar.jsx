import React from 'react';
import { useTranslation } from 'react-i18next';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder={t('search_placeholder')}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;