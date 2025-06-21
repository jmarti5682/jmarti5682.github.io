import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Contact.css';

export default function Contact(){
    return(
    <div className="contact">
      <h2>Contact</h2>
      <div className="contact-icons">
        <a
          href="https://github.com/jmarti5682"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub className="icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/josemartinezponce"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="icon" />
        </a>
      </div>
    </div>
    );
}