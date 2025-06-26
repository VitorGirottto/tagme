import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // corrigido import
import api from '../api/api';
import PostCard from '../components/PostCard';
import bgImage from './image.jpg';
import { AuthContext } from '../context/AuthContext';

export default function Feed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const { token } = useContext(AuthContext);
  const currentUserId = token ? jwtDecode(token).id : null; // userId do token

  useEffect(() => {
    api.get('/posts').then(res => {
      setPosts(res.data);
      setFilteredPosts(res.data);
    });
  }, []);

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setSearchQuery(q);
    setFilteredPosts(posts.filter(p =>
      p.username.toLowerCase().includes(q)
    ));
  };

  const goToProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  // Navegação barra lateral
  const goToFeed = () => navigate('/'); // ou '/' se for a rota raiz
  const goToCreatePost = () => navigate('/create-post');
  const goToUserProfile = () => navigate(`/profile/${currentUserId}`);

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${bgImage})` }}>
      <div style={styles.feedBox}>
        <h2 style={styles.title}>Feed</h2>
        <input
          type="text"
          placeholder="Buscar usuário..."
          value={searchQuery}
          onChange={handleSearch}
          style={styles.searchInput}
        />
        <div style={styles.postsList}>
          {filteredPosts.map(p => (
            <PostCard
              key={p.id}
              post={p}
              goToProfile={goToProfile}
              isOwnPost={currentUserId === p.user_id}
            />
          ))}
        </div>
      </div>

      {/* Barra lateral direita */}
      <div style={styles.sidebar}>
        <button title="Feed" style={styles.iconButton} onClick={goToFeed}>🏠</button>
        <button title="Criar Postagem" style={styles.iconButton} onClick={goToCreatePost}>➕</button>
        <button title="Meu Perfil" style={styles.iconButton} onClick={goToUserProfile}>👤</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    position: 'relative', // para barra fixa funcionar bem
  },
  feedBox: {
    maxWidth: '750px',
    width: '90%',
    margin: '0 10px',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    overflowY: 'auto',
    maxHeight: '90vh',
  },
  title: {
    marginBottom: '10px',
    color: '#333',
    textAlign: 'center',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '20px',
  },
  postsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },

  // Barra lateral
  sidebar: {
    position: 'fixed',
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
    zIndex: 1000,
  },
  iconButton: {
    fontSize: '24px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
  },
};
