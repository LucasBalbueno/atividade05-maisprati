import axios from 'axios';

try {
    const url = `https://ipinfo.io/${ip}/json`
    const response = await axios.get(url);
    setIpData(response.data);
  } catch (error) {
    console.error("Error fetching IP address data:", error);
  }