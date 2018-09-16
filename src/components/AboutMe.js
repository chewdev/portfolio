import React from "react";
import skills from "../data/skills";

class AboutMe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      skillsInd: 0
    };

    this.skillsInterval = null;
  }

  componentDidMount() {
    this.skillsInterval = setInterval(() => {
      this.setState(prevState => {
        if (prevState.skillsInd === skills.length - 1) {
          return { skillsInd: 0 };
        }
        return { skillsInd: prevState.skillsInd + 1 };
      });
    }, 1500);
  }

  componentWillUnmount() {
    clearInterval(this.skillsInterval);
  }

  render() {
    const ipadStyles = {
      background: skills[this.state.skillsInd].color
    };
    return (
      <section className="about-me-layout" id="about-me">
        <div className="about-me-resize-container">
          <div className="about-me-container">
            <h2 className="about-me-header">About Me</h2>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;Software development is more than just a
              career for me, it's a hobby. I love creating beautiful,
              interactive websites, overcoming technical challenges and pushing
              the limits of what is possible. I excel when challenged and strive
              to learn something new every day.
              <br />
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;When I'm not working on websites or
              studying new tech, you'll likely find me traveling, at a baseball
              game or tinkering with Arduino and IoT.
              <br />
            </p>
            <p className="about-me-quote">
              <em>Easy is boring, let's have some fun!</em>
            </p>
          </div>
        </div>
        <div className="about-me__chair-table-container">
          <div className="about-me__chairs-container">
            <div className="about-me__chair-container">
              <div className="about-me__chair" />
            </div>
            <div className="about-me__chair-container">
              <div className="about-me__chair" />
            </div>
          </div>
          <div className="about-me__table-container">
            <h2>Skills</h2>
            <div className="table-container">
              <div className="tablet" style={ipadStyles}>
                {skills[this.state.skillsInd].comp}
              </div>
            </div>
          </div>
          <div className="about-me__chairs-container">
            <div className="about-me__chair-container">
              <div className="about-me__chair--right" />
            </div>
            <div className="about-me__chair-container">
              <div className="about-me__chair--right" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default AboutMe;
