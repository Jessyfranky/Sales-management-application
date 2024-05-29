// src/pages/LoginPage.js
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input } from '@chakra-ui/react';

const LoginPage = ({ setIsAuthenticated }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Submitted data:", data); // Debugging log
    const expectedUsername = 'user';
    const expectedPassword = 'password';

    if (data.username === expectedUsername && data.password === expectedPassword) {
      console.log("Login successful"); // Debugging log
      setIsAuthenticated(true);
      navigate('/'); // Navigate to the root path
    } else {
      console.log("Login failed"); // Debugging log
      alert("Incorrect username or password");
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('username')} placeholder="Username" />
        <Input {...register('password')} type="password" placeholder="Password" />
        <Button type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default LoginPage;
