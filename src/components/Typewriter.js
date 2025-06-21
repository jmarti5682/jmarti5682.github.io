import React, { useState, useEffect } from 'react';
import './Typewriter.css';

const phrases = [
  "Bienvenidos",
  "Bienvenue",
  "Welcome",
  "いらっしゃいませ"
];

export default function Typewriter() {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000); // pause before deleting
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((index + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex(subIndex + (deleting ? -1 : 1));
      setText(phrases[index].substring(0, subIndex));
    }, deleting ? 100 : 200);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="typewriter">
      <span>{text}</span>
      <span className={`cursor ${blink ? 'on' : ''}`}>▊</span>
    </div>
  );
}
