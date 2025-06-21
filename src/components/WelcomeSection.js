import React, { useState, useEffect } from 'react';
import './WelcomeSection.css';

const greetings = [
  'Bienvenidos',
  'Bienvenue',
  'Welcome',
  'いらっしゃいませ'
];

export default function WelcomeSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % greetings.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="welcome">
      <pre className="courier">{greetings[index]}</pre>
    </div>
  );
}
