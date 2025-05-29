import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    bio: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${user.id}`);
        setProfile({
          name: response.data.name || '',
          bio: response.data.bio || ''
        });
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${user.id}`, profile);
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  return (
    <div>
      <h2>Meu Perfil</h2>
      <form onSubmit={handleEdit}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={profile.name}
          onChange={handleChange}
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={profile.bio}
          onChange={handleChange}
        />
        <button type="submit">Salvar Alterações</button>
      </form>
      <button onClick={logout}>Sair</button>
    </div>
  );
};

export default Profile;
