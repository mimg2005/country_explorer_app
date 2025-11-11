import { create } from 'zustand';
import { useLanguageStore } from './useLanguageStore';

const getCountryDisplayNameForSortingAndSearching = (country, lang) => {
  if (lang === 'fa') {
    // --- Special handling for Iran for sorting ---
    // Identify Iran by its English common name or official Persian name
    const isIran = country.name.common.toLowerCase() === 'iran' ||
                   (country.translations?.fa?.official?.toLowerCase().includes('ایران') ||
                    country.translations?.per?.official?.toLowerCase().includes('ایران'));
    if (isIran) {
      return 'ایران'; // Always return "ایران" for sorting purposes
    }
    // --- End special handling ---

    // General Persian name for other countries
    return country.translations?.fa?.common ||
           country.translations?.per?.common ||
           country.translations?.fa?.official ||
           country.translations?.per?.official ||
           country.name.common; // Fallback to English common name
  }
  return country.name.common; // Default to English common name for English mode
};

export const useCountryStore = create((set, get) => ({
  countries: [],
  filteredCountries: [],
  loading: false,
  error: null,
  searchTerm: '',

  fetchCountries: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,idd,translations');
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await response.json();
      
      set({ countries: data, loading: false });

      const currentLanguage = useLanguageStore.getState().language;
      const initialSorted = [...data].sort((a, b) => {
        const nameA = getCountryDisplayNameForSortingAndSearching(a, currentLanguage);
        const nameB = getCountryDisplayNameForSortingAndSearching(b, currentLanguage);
        // Use 'fa' locale for Persian sorting
        return nameA.localeCompare(nameB, currentLanguage === 'fa' ? 'fa' : 'en', { sensitivity: 'base' });
      });
      set({ filteredCountries: initialSorted });

    } catch (error) {
      console.error("Error fetching countries:", error);
      set({ error: 'Failed to fetch countries.', loading: false });
    }
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
  },

  filterCountries: (term, allCountries) => {
    const currentLanguage = useLanguageStore.getState().language;

    let results = [...allCountries];

    if (term) {
      const lowerCaseTerm = term.toLowerCase();
      results = results.filter(country => {
        // Search by English common name
        const nameMatchEnglish = country.name.common.toLowerCase().includes(lowerCaseTerm);

        let nameMatchPersian = false;
        if (currentLanguage === 'fa') {
          const persianCommonName = country.translations?.fa?.common || country.translations?.per?.common;
          const persianOfficialName = country.translations?.fa?.official || country.translations?.per?.official;

          if (persianCommonName) {
            nameMatchPersian = nameMatchPersian || persianCommonName.toLowerCase().includes(lowerCaseTerm);
          }
          if (persianOfficialName) {
            nameMatchPersian = nameMatchPersian || persianOfficialName.toLowerCase().includes(lowerCaseTerm);
          }
          
          // Special handling for "ایران" in search (remains similar)
          if (lowerCaseTerm.includes('ایران')) {
            const isIranCountry = country.name.common.toLowerCase() === 'iran' ||
                                (persianOfficialName && persianOfficialName.toLowerCase().includes('ایران'));
            nameMatchPersian = nameMatchPersian || isIranCountry;
          }
        }

        const callingCodeMatch = country.idd && country.idd.root
          ? country.idd.suffixes && country.idd.suffixes.length > 0
            ? `${country.idd.root}${country.idd.suffixes[0]}`.includes(lowerCaseTerm)
            : country.idd.root.includes(lowerCaseTerm)
          : false;

        return nameMatchEnglish || nameMatchPersian || callingCodeMatch;
      });
    }

    const finalSortedResults = results.sort((a, b) => {
      const nameA = getCountryDisplayNameForSortingAndSearching(a, currentLanguage);
      const nameB = getCountryDisplayNameForSortingAndSearching(b, currentLanguage);
      return nameA.localeCompare(nameB, currentLanguage === 'fa' ? 'fa' : 'en', { sensitivity: 'base' });
    });

    set({ filteredCountries: finalSortedResults });
  },
}));