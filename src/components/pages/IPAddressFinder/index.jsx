import { useState } from 'react';
import axios from 'axios';

import { Container, Title, Input, Button, ResultsContainer } from './style'

const IPAddressFinder = () => {
  const [ip, setIp] = useState('');
  const [ipData, setIpData] = useState(null);


  const findIP = async () => {
    try {
      const url = `https://ipinfo.io/${ip}/json`
      const response = await axios.get(url);
      setIpData(response.data);
    } catch (error) {
      console.error("Error fetching IP address data:", error);
    }
  };

  return (
    <Container>
      <Title>IP Address Finder</Title>
      <Input
        type="text"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        placeholder="Enter IP address"
      />
      <Button onClick={findIP}>Find IP</Button>
      {ipData && (
        <ResultsContainer>
          <p><strong>IP:</strong> {ipData.ip}</p>
          <p><strong>Location:</strong> {ipData.city}, {ipData.region}, {ipData.country}</p>
          <p><strong>ISP:</strong> {ipData.org}</p>
        </ResultsContainer>
      )}
    </Container>
  );
};

export default IPAddressFinder;
