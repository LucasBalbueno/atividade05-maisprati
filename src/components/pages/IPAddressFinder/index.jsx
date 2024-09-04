import { useState } from 'react';
import { getIpApi } from '../../../services/IpFinder';
import { Container, Title, Input, Button, ResultsContainer } from './style'

const IPAddressFinder = () => {
  const [ ip, setIp ] = useState('');
  const [ ipData, setIpData ] = useState(null);
  const [ error, setError ] = useState('');

  const findIP = async () => {
    try {
      const data = await getIpApi(ip)
      console.log(data)
      setIpData(data);

    } catch (error) {
      console.error("Error fetching IP address data:", error);
      setError('Não foi possível localizar o IP digitado!')
    }

    error && alert(error);
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
          <p>{ipData.org ? (<strong>ISP: {ipData.org}</strong>) : (<strong>POSTAL: {ipData.postal}</strong>)}</p>
        </ResultsContainer>
      )}
    </Container>
  );
};

export default IPAddressFinder;