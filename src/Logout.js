import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem('jwtToken');
    
    // Optional: Redirect to login page or home page
    window.location.href = '/login'; // Adjust the path as needed
  };

  return (
    <button onClick={handleLogout} style={styles.button}>
      Logout
    </button>
  );
};

// Optional: Inline styles for the button
const styles = {
  button: {
    padding: '8px 10px',
    fontSize: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    float:'right'
  }
};

export default LogoutButton;
