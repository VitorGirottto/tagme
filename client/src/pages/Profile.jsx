import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

export default () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const load = async () => {
    const res = await api.get(`/users/${id}`);
    setUser(res.data);
  };
  useEffect(load, [id]);
  if (!user) return <div>Carregando...</div>;
  return (
    <div>
      <h2>{user.username}</h2>
      <button>{user.following ? 'Desseguir' : 'Seguir'}</button>
    </div>
  );
};
  