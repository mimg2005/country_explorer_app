import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../store/useLanguageStore';

const CountryCard = ({ country }) => {
  const { t } = useTranslation();
  const { language } = useLanguageStore();

  const getFirstCallingCode = (country) => {
    if (country.idd?.root) {
      const suffixes = country.idd.suffixes || [''];
      if (suffixes.length > 0 && suffixes[0] !== '') {
        return `${country.idd.root}${suffixes[0]}`;
      }
      return country.idd.root;
    }
    return 'N/A';
  };

  const getCountryDisplayName = (country, currentLanguage) => {
    if (currentLanguage === 'fa') {
      // Prioritize checking for 'fa' (Farsi) translation in 'translations'
      if (country.translations?.fa?.common) {
        return country.translations.fa.common;
      }
      // Fallback: Check for 'per' (Persian) translation in 'translations'
      if (country.translations?.per?.common) {
        return country.translations.per.common;
      }
      // Fallback: Check for nativeName (though less reliable for all countries)
      if (country.name?.nativeName) {
        const persianNative = country.name.nativeName.fas || country.name.nativeName.per;
        if (persianNative && persianNative.common) {
          return persianNative.common;
        }
      }
    }
    // Default to common English name if no Persian translation found or language is English
    return country.name.common;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700">
      <img
        src={country.flags?.png || country.flags?.svg}
        alt={`${country.name.common} flag`}
        className="w-full h-32 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate" title={country.name.common}>
          {getCountryDisplayName(country, language)}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">{t('calling_code')}:</span> {getFirstCallingCode(country)}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;