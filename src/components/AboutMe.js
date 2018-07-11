import React from 'react';

const AboutMe = () => (
    <div className="about-me-layout" id="about-me">
        <div className="about-me-resize-container">
            <div className="about-me-container">
                <h2>
                    I'm Chris Ewald and I develop web apps.
                </h2>
                <p>
                    Designing and building is my passion. Comfortable with both front-end and back-end development, I enjoy building apps from the ground up. As a self-motivated, problem solver, I'm always looking for my next challenge.
                </p>
            </div>
        </div>
        <div className="about-me__chair-table-container">
            <div className="about-me__chairs-container">
                <div className="about-me__chair-container">
                    <div className="about-me__chair">
                    </div>
                </div>
                <div className="about-me__chair-container">
                    <div className="about-me__chair">
                    </div>
                </div>
            </div>
            <div className="about-me__table-container">
                <h2>
                    Education
                </h2>
                <p>
                    While earning my Bachelors of Science in Mechanical Engineering (Mechatronics focus) from California Polytechnic State University, San Luis Obispo, I discovered my passion for coding. From there, I chose to become a self-taught developer. 
                </p>
                <span><em>"Learn by doing"</em></span>
            </div>
            <div className="about-me__chairs-container">
                <div className="about-me__chair-container">
                    <div className="about-me__chair--right">
                    </div>
                </div>
                <div className="about-me__chair-container">
                    <div className="about-me__chair--right">
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default AboutMe;