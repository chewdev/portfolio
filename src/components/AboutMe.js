import React from "react";
import {
  JavaScriptSVG,
  BootstrapSVG,
  CSSSVG,
  GitSVG,
  GithubSVG,
  GraphQLSVG,
  HerokuSVG,
  HTMLSVG,
  JQuerySVG,
  MongoDBSVG,
  MySQLSVG,
  NodeSVG,
  NPMSVG,
  ReactSVG,
  ReduxSVG,
  SassSVG,
  WebpackSVG
} from "./SVGs";

class AboutMe extends React.Component {
  constructor(props) {
    super(props);

    this.skills = [
      {
        comp: <JavaScriptSVG color={"#F7DF1E"} />,
        color: "#F7DF1E"
      },
      {
        comp: <BootstrapSVG color={"#563D7C"} />,
        color: "#563D7C"
      },
      {
        comp: <CSSSVG color={"#1572B6"} />,
        color: "#1572B6"
      },
      {
        comp: <GitSVG color={"#F05032"} />,
        color: "#F05032"
      },
      {
        comp: <GithubSVG color={"#181717"} />,
        color: "#181717"
      },
      {
        comp: <GraphQLSVG color={"#E10098"} />,
        color: "#E10098"
      },
      {
        comp: <HerokuSVG color={"#430098"} />,
        color: "#430098"
      },
      {
        comp: <HTMLSVG color={"#E34F26"} />,
        color: "#E34F26"
      },
      {
        comp: <JQuerySVG color={"#0769AD"} />,
        color: "#0769AD"
      },
      {
        comp: <MongoDBSVG color={"#47A248"} />,
        color: "#47A248"
      },
      {
        comp: <MySQLSVG color={"#4479A1"} />,
        color: "#4479A1"
      },
      {
        comp: <NodeSVG color={"#339933"} />,
        color: "#339933"
      },
      {
        comp: <NPMSVG color={"#CB3837"} />,
        color: "#CB3837"
      },
      {
        comp: <ReactSVG color={"#61DAFB"} />,
        color: "#61DAFB"
      },
      {
        comp: <ReduxSVG color={"#764ABC"} />,
        color: "#764ABC"
      },
      {
        comp: <SassSVG color={"#CC6699"} />,
        color: "#CC6699"
      },
      {
        comp: <WebpackSVG color={"#8DD6F9"} />,
        color: "#8DD6F9"
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
                {this.skills[this.state.skillsInd].comp}
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
