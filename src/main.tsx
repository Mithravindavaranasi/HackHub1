import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import React, { useState } from 'react';

const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1526318472351-bb6e4d6e8ecf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80',
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Smart Doc Checker Agent</h1>
      <p style={styles.description}>
        Welcome! Click the button to cycle through inspiring images.
      </p>

      <img
        src={images[currentIndex]}
        alt="Inspiration"
        style={styles.image}
      />
      <button style={styles.button} onClick={nextImage}>
        Next Image
      </button>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 600,
    margin: '2rem auto',
    padding: '1rem',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f0f4f8',
    borderRadius: 12,
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  title: {
    color: '#0d47a1',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 12,
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#0d47a1',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);  
