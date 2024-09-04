import { useState } from 'react';
import { login } from '../../../services/AuthService/AuthLogin';
import { LoginContainer, LoginForm, Input, Button } from './style';

const Login = ({ onLogin }) => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errorValidation ] = useState('Usuário ou senha incorretos!');

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      
      const isLoggedIn = login(username, password);
      
      if (isLoggedIn) {
        onLogin();
      } else if (username !== 'admin' || password !== 'password') {
          alert(errorValidation);
      }
    } catch (error) {
      console.error('Usuário não autenticado');
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