// src/App.jsx
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCountryStore } from './store/useCountryStore';
import { useLanguageStore } from './store/useLanguageStore';
import useDebounce from './hooks/useDebounce';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CountryCard from './components/CountryCard';

function App() {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const {
    countries,
    filteredCountries,
    loading,
    error,
    searchTerm,
    fetchCountries,
    setSearchTerm,
    filterCountries,
  } = useCountryStore();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  useEffect(() => {
    filterCountries(debouncedSearchTerm, countries);
  }, [debouncedSearchTerm, countries, filterCountries]);

  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'fa' ? 'rtl' : 'ltr');
    filterCountries(searchTerm, countries);
  }, [language, filterCountries, searchTerm, countries]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <p className="text-xl font-semibold">{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-red-600">
        <p className="text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white ${language === 'fa' ? 'font-iransans' : ''}`}>
      <Header />
      <main className="container mx-auto p-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {filteredCountries.length === 0 && !loading && !error && (
          <p className="text-center text-xl text-gray-600 dark:text-gray-400 mt-8">
            {t('no_countries_found')}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredCountries.map((country) => (
            <CountryCard key={country.cca2} country={country} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;