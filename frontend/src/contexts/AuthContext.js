import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Exemplo simples: aqui você pode decodificar o token ou buscar info do usuário
      // para manter o estado atualizado. Por enquanto, só seto um user fictício:
      setUser({ token }); // substitua conforme sua lógica real
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    // Atualize o estado do usuário conforme o token recebido
    setUser({ token }); // substitua conforme sua lógica real
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exporta o hook para facilitar o uso do contexto
export const useAuth = () => useContext(AuthContext);
