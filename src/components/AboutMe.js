import React from "react";

class AboutMe extends React.Component {
  constructor(props) {
    super(props);
    this.skills = [
      {
        src: "css3",
        color: "#1572B6"
      },
      {
        src: "html5",
        color: "#E34F26"
      },
      {
        src: "javascript",
        color: "#F7DF1E"
      },
      {
        src: "react",
        color: "#61DAFB"
      },
      {
        src: "node-dot-js",
        color: "#339933"
      },
      {
        src: "npm",
        color: "#CB3837"
      },
      {
        src: "git",
        color: "#F05032"
      },
      {
        src: "mysql",
        color: "#4479A1"
      },
      {
        src: "graphql",
        color: "#E10098"
      },
      {
        src: "mongodb",
        color: "#47A248"
      },
      {
        src: "redux",
        color: "#764ABC"
      },
      {
        src: "github",
        color: "#181717"
      },
      {
        src: "webpack",
        color: "#8DD6F9"
      },
      {
        src: "sass",
        color: "#CC6699"
      },
      {
        src: "bootstrap",
        color: "#563D7C"
      },
      {
        src: "jquery",
        color: "#0769AD"
      },
      {
        src: "heroku",
        color: "#430098"
      }
    ];

    this.state = {
      skillsInd: 0
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(prevState => {
        if (prevState.skillsInd === this.skills.length - 1) {
          return { skillsInd: 0 };
        }
        return { skillsInd: prevState.skillsInd + 1 };
      });
    }, 1500);
  }

  render() {
    const skillsStyles = {
      background: this.skills[this.state.skillsInd].color
    };
    const ipadStyles = {
      background: this.skills[this.state.skillsInd].color
    };
    return (
      <div className="about-me-layout" id="about-me">
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
                <img
                  className="tablet-content"
                  src={`/images/${this.skills[this.state.skillsInd].src}.svg`}
                  style={skillsStyles}
                  alt="CSS3 Logo"
                />
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
      </div>
    );
  }
}
export default AboutMe;
