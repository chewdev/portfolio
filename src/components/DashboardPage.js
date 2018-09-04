import React from "react";
import Introduction from "./Introduction";
import Header from "./Header";
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import Walker from "./Walker";
import LazyLoad from "react-lazy-load";

const DashboardPage = () => (
  <div id="top-level">
    {/* <Walker />  */}
    <div className="background-div">
      <Header />
      <div className="box-layout">
        <Introduction />
      </div>
    </div>
    <div className="dirt-transition" />
    <AboutMe />
    <div className="threshold-transition" />
    <div id="projects" className="projects">
      <LazyLoad offset={800} throttle={25}>
        <Projects />
      </LazyLoad>
    </div>
    <div className="threshold-transition" />
    <Contact />
    <Footer />
  </div>
);

export default DashboardPage;
