import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import bgImage from './image.jpg'; // ✅ IMPORTAÇÃO CORRETA

export default function Cadastro() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleCadastro = async () => {
    setErro('');
    try {
      await api.post('/auth/register', { username, email, password });
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (err) {
      setErro(err.response?.data?.message || 'Erro ao cadastrar usuário');
    }
  };

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${bgImage})` }}>
      <div style={styles.box}>
        <h2 style={styles.title}>Cadastro</h2>
        <input
          placeholder="Nome de usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />
        <div style={styles.buttonGroup}>
          <button onClick={handleCadastro} style={styles.button}>Cadastrar</button>
          <button onClick={() => navigate('/login')} style={styles.buttonSecondary}>Voltar</button>
        </div>
        {erro && <p style={styles.error}>{erro}</p>}
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
    backgroundColor: '#28a745',
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
