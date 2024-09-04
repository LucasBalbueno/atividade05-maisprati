import axios from 'axios';

export const getIpApi = async (ip) => {
  try {
      const url = `https://ipinfo.io/${ip}/json`
      const response = await axios.get(url);
      const data = response.data;
      
      return data;
    } catch (error) {
      console.error("Error fetching IP address data:", error);
    }
}