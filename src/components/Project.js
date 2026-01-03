import React from 'react';
import './Project.css';

export default function Project() {
    return (
        <div className="project">
            <h2>Other Projects</h2>
            <p>
                <ul>
                    <li><a href="https://github.com/jmarti5682/FPGA-labs-NEXYS-A7" target="_blank" rel="noopener noreferrer">
                        FPGA VHDL to SystemVerilog
                    </a>
                    </li>
                    <li><a href="https://github.com/BFox03/sight" target="_blank" rel="noopener noreferrer">
                        Attachable Module for Facial Recognition
                    </a>
                    </li>
                    <li><a href="https://github.com/Gipeon12/3DMapGenerator" target="_blank" rel="noopener noreferrer">
                        Random Perlin Map Generator
                    </a>
                    </li>
                    <li><a href="https://github.com/jmarti5682/CPE556_Final_Project" target="_blank" rel="noopener noreferrer">
                        Temperature and Humidity Senor w/ B-U585-IOT02
                    </a>
                    </li>
                </ul>
            </p>

        </div>

    );
}

