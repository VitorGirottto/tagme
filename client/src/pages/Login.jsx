import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import bgImage from './image.jpg'; // ✅ IMPORTAÇÃO CORRETA

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handle = async () => {
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token);
      navigate('/');
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao conectar com o servidor.');
      }
    }
  };

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${bgImage})` }}>
      <div style={styles.box}>
        <h2 style={styles.title}>Login</h2>
        <input
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          type="email"
          style={styles.input}
        />
        <input
          placeholder="Senha"
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          style={styles.input}
        />
        <div style={styles.buttonGroup}>
          <button onClick={handle} style={styles.button}>Entrar</button>
          <button onClick={() => navigate('/cadastro')} style={styles.buttonSecondary}>Cadastro</button>
        </div>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
  },
  box: {
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  button: {
    flex: 1,
    padding: '10px',
    marginRight: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonSecondary: {
    flex: 1,
    padding: '10px',
    marginLeft: '5px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    textAlign: 'center',
  },
};
