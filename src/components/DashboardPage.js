import React from 'react';
import Introduction from './Introduction';
import Header from './Header';
import AboutMe from './AboutMe';
import Projects from './Projects';

const DashboardPage = () => (
  <div>
    <div className="background-div">
      <Header />
      <div className="box-layout">
        <Introduction />
      </div>
    </div>
    
    
    <AboutMe />
    <div className="threshold-transition">

    </div>
    <Projects />
    
  </div>
);

export default DashboardPage;
