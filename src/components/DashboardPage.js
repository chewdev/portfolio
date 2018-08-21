import React from "react";
import Introduction from "./Introduction";
import Header from "./Header";
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import Contact from "./Contact";
import Walker from "./Walker";
import LazyLoad from "react-lazy-load";

const DashboardPage = () => (
  <div>
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
    <Projects />
    <div className="threshold-transition" />
    <Contact />
  </div>
);

export default DashboardPage;
