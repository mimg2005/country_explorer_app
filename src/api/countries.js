import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1/all?fields=name,flags,idd,translations';

export const fetchAllCountries = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};