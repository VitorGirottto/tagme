import React, { useState, useRef, useEffect } from 'react';

export default function PostCard({ post, goToProfile, currentUserId }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => setMenuOpen(prev => !prev);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isOwner = post.user_id === currentUserId;

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <p
            style={styles.username}
            onClick={() => goToProfile(post.user_id)}
          >
            {post.username}
          </p>

          {isOwner && (
            <div style={styles.menuContainer} ref={menuRef}>
              <span style={styles.menuButton} onClick={toggleMenu}>⋮</span>
              {menuOpen && (
                <div style={styles.dropdown}>
                  <button style={styles.dropdownItem}>Editar</button>
                  <button style={styles.dropdownItem}>Excluir</button>
                </div>
              )}
            </div>
          )}
        </div>

        <p>{post.content}</p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 5px rgba(0,0,0,0.05)',
    width: '100%',
    maxWidth: '600px',
    boxSizing: 'border-box',
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  username: {
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#007bff',
  },
  menuContainer: {
    position: 'relative',
  },
  menuButton: {
    cursor: 'pointer',
    fontSize: '20px',
    padding: '0 8px',
    lineHeight: '1',
    color: '#333',
  },
  dropdown: {
    position: 'absolute',
    top: '25px',
    right: '0',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100px',
  },
  dropdownItem: {
    padding: '10px',
    border: 'none',
    background: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '14px',
  },
};
