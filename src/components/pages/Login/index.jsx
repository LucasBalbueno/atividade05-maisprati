import { useState } from 'react';

import { LoginContainer, LoginForm, Input, Button } from './style';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
  
      if (username === 'admin' && password === 'password') {
        onLogin();
      } else {
        alert('Credenciais Inválidas, tente novamente!');
      }
    } catch (error){
        console.error('Erro na autenticação do usuário:', error);
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="User: admin"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password: password"
        />
        <Button type="submit">Login</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;