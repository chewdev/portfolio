import React from "react";
import projectData from "../data/projects";

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currProjInd: 0,
      projIntervalId: null,
      remoteLightClass: "",
      tvDisplayType: "image"
    };

    this.nextProj = this.nextProj.bind(this);
    this.prevProj = this.prevProj.bind(this);
    this.remoteSetInd = this.remoteSetInd.bind(this);
    this.changeAuto = this.changeAuto.bind(this);
    this.startInterval = this.startInterval.bind(this);
    this.removeRemoteLightClass = this.removeRemoteLightClass.bind(this);
    this.guide = this.guide.bind(this);
    this.info = this.info.bind(this);
    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
    this.ok = this.ok.bind(this);
  }

  startInterval() {
    const projIntervalId = setInterval(() => {
      this.nextProj();
    }, 10000);

    return projIntervalId;
  }

  removeRemoteLightClass() {
    setTimeout(() => {
      this.setState(() => {
        return {
          remoteLightClass: ""
        };
      });
    }, 350);
  }

  componentDidMount() {
    const projIntervalId = this.startInterval();
    this.setState(() => ({ projIntervalId }));
  }

  componentWillUnmount() {
    clearInterval(this.state.projIntervalId);
    this.setState(() => ({
      projIntervalId: null
    }));
  }

  nextProj() {
    if (this.state.projIntervalId !== null) {
      clearInterval(this.state.projIntervalId);

      this.setState(prevState => {
        const projIntervalId = this.startInterval();
        const currProjInd =
          prevState.currProjInd === projectData.length - 1
            ? 0
            : prevState.currProjInd + 1;
        return {
          currProjInd,
          projIntervalId,
          remoteLightClass: "flash-green"
        };
      });
    } else {
      if (this.state.tvDisplayType === "projlist") {
        this.setState({ tvDisplayType: "currprojinfo" });
      } else {
        this.setState(prevState => {
          const currProjInd =
            prevState.currProjInd === projectData.length - 1
              ? 0
              : prevState.currProjInd + 1;
          return {
            currProjInd,
            remoteLightClass: "flash-green"
          };
        });
      }
    }
    this.removeRemoteLightClass();
  }

  prevProj() {
    if (this.state.projIntervalId !== null) {
      clearInterval(this.state.projIntervalId);

      this.setState(prevState => {
        const projIntervalId = this.startInterval();
        const currProjInd =
          prevState.currProjInd === 0
            ? projectData.length - 1
            : prevState.currProjInd - 1;
        return {
          currProjInd,
          projIntervalId,
          remoteLightClass: "flash-green"
        };
      });
    } else {
      if (this.state.tvDisplayType === "projlist") {
        this.setState({ tvDisplayType: "image" });
      } else {
        this.setState(prevState => {
          const currProjInd =
            prevState.currProjInd === 0
              ? projectData.length - 1
              : prevState.currProjInd - 1;
          return {
            currProjInd,
            remoteLightClass: "flash-green"
          };
        });
      }
    }

    this.removeRemoteLightClass();
  }

  remoteSetInd(input) {
    const currProjInd = input;

    if (this.state.projIntervalId !== null) {
      clearInterval(this.state.projIntervalId);
      this.setState(prevState => {
        const projIntervalId = this.startInterval();
        return {
          currProjInd,
          projIntervalId,
          remoteLightClass: "flash-green"
        };
      });
    } else {
      this.setState(() => ({
        currProjInd,
        remoteLightClass: "flash-green"
      }));
    }

    this.removeRemoteLightClass();
  }

  changeAuto() {
    if (this.state.tvDisplayType === "image") {
      if (this.state.projIntervalId === null) {
        this.setState(prevState => {
          const projIntervalId = this.startInterval();
          return {
            projIntervalId,
            remoteLightClass: "flash-green"
          };
        });
      } else {
        clearInterval(this.state.projIntervalId);
        this.setState(prevState => ({
          projIntervalId: null,
          remoteLightClass: "flash-red"
        }));
      }
    } else {
      this.setState(prevState => {
        return {
          remoteLightClass: "flash-red"
        };
      });
    }

    this.removeRemoteLightClass();
  }

  guide() {
    this.setState(prevState => {
      const tvDisplayType =
        prevState.tvDisplayType === "projlist" ? "image" : "projlist";
      if (this.state.projIntervalId !== null) {
        clearInterval(this.state.projIntervalId);
        return {
          tvDisplayType,
          projIntervalId: null,
          remoteLightClass: "flash-red"
        };
      } else {
        return {
          tvDisplayType,
          remoteLightClass: "flash-green"
        };
      }
    });

    this.removeRemoteLightClass();
  }

  info() {
    this.setState(prevState => {
      const tvDisplayType =
        prevState.tvDisplayType === "currprojinfo" ? "image" : "currprojinfo";
      if (this.state.projIntervalId !== null) {
        clearInterval(this.state.projIntervalId);
        return {
          tvDisplayType,
          projIntervalId: null,
          remoteLightClass: "flash-red"
        };
      } else {
        return {
          tvDisplayType,
          remoteLightClass: "flash-green"
        };
      }
    });
    this.removeRemoteLightClass();
  }

  up() {
    if (this.state.tvDisplayType === "projlist") {
      this.setState(prevState => {
        const currProjInd =
          prevState.currProjInd === 0
            ? projectData.length - 1
            : prevState.currProjInd - 1;
        return {
          currProjInd,
          remoteLightClass: "flash-green"
        };
      });
    } else {
      this.setState({ remoteLightClass: "flash-red" });
    }
    this.removeRemoteLightClass();
  }

  down() {
    if (this.state.tvDisplayType === "projlist") {
      this.setState(prevState => {
        const currProjInd =
          prevState.currProjInd === projectData.length - 1
            ? 0
            : prevState.currProjInd + 1;
        return {
          currProjInd,
          remoteLightClass: "flash-green"
        };
      });
    } else {
      this.setState({ remoteLightClass: "flash-red" });
    }

    this.removeRemoteLightClass();
  }

  ok() {
    if (this.state.tvDisplayType === "image") {
      document.querySelector(".project-link").click();
      this.setState({ remoteLightClass: "flash-green" });
    } else {
      this.setState({
        tvDisplayType: "image",
        remoteLightClass: "flash-green"
      });
    }

    this.removeRemoteLightClass();
  }

  render() {
    const project = projectData[this.state.currProjInd];
    const liArr = (() => {
      let liArr = [];
      for (let i = 0; i <= 9; i++) {
        liArr.push(
          <li
            className="projects-remote-input"
            key={`remote-${i}`}
            onClick={() => {
              this.remoteSetInd(i);
            }}
          >
            <button className="projects-remote-input-div">{i}</button>
          </li>
        );
      }
      return liArr;
    })();

    if (this.state.tvDisplayType === "projlist") {
      var projArr = projectData.map((project, ind) => {
        return (
          <li
            className="projects-tv-list-item"
            key={ind}
            onClick={() => {
              this.remoteSetInd(ind);
              this.guide();
            }}
          >
            <span className="channel-name-span">{project.channelName}</span>
            <span className="channel-ind-span">{ind}</span>
            <span
              className={
                "channel-title-span" +
                (this.state.currProjInd === ind
                  ? " projects-tv-list-item--selected"
                  : "")
              }
            >
              {project.title}
            </span>
          </li>
        );
      });
    }

    return (
      <div className="project-tv-remote-container">
        <div className="project-container">
          {this.state.tvDisplayType === "image" ? (
            <a className="project-link" href={project.link} target="_blank">
              <img
                className="project-tv"
                src={project.imgSrc}
                alt={project.alt}
              />
            </a>
          ) : this.state.tvDisplayType === "currprojinfo" ? (
            <div className="project-info project-link">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          ) : (
            <div className="project-link">
              <ul>{projArr}</ul>
            </div>
          )}
          <div className="top-tv-base" />
          <div className="bottom-tv-base" />
        </div>

        <ul className="projects-remote">
          <li className="projects-remote-number-li projects-remote-number-li--container">
            <ul className="projects-remote-number-ul projects-remote-number-ul--power">
              <li className="projects-remote-input" onClick={this.changeAuto}>
                <button className="projects-remote-input-div">
                  {this.state.projIntervalId === null ? (
                    <i className="fas fa-play" />
                  ) : (
                    <i className="fas fa-pause" />
                  )}
                </button>
              </li>
              <li className="projects-remote-input projects-remote-input--power">
                <div
                  className={`projects-remote-power-ind ${
                    this.state.remoteLightClass
                  }`}
                />
              </li>
            </ul>
          </li>
          <li className="projects-remote-number-li projects-remote-number-li--container">
            <ul className="projects-remote-number-ul projects-remote-number-ul--arrows">
              <li
                className="projects-remote-input projects-remote-input--guide"
                onClick={this.guide}
              >
                <button className="projects-remote-input-div projects-remote-input-div--text">
                  {" "}
                  GUIDE{" "}
                </button>
              </li>
              <li
                className="projects-remote-input projects-remote-input--info"
                onClick={this.info}
              >
                <button className="projects-remote-input-div projects-remote-input-div--text">
                  {" "}
                  INFO{" "}
                </button>
              </li>
            </ul>
          </li>
          <li className="projects-remote-number-li projects-remote-number-li--container">
            <ul className="projects-remote-number-ul projects-remote-number-ul--arrows">
              <li className="projects-remote-input" onClick={this.up}>
                <button className="projects-remote-input-div">
                  {" "}
                  <i className="fas fa-chevron-up" />{" "}
                </button>
              </li>
            </ul>
          </li>
          <li className="projects-remote-number-li projects-remote-number-li--container">
            <ul className="projects-remote-number-ul projects-remote-number-ul--arrows">
              <li className="projects-remote-input" onClick={this.prevProj}>
                <button className="projects-remote-input-div">
                  {" "}
                  <i className="fas fa-chevron-left" />{" "}
                </button>
              </li>
              <li
                className="projects-remote-input projects-remote-input--ok"
                onClick={this.ok}
              >
                <button className="projects-remote-input-div projects-remote-input-div--ok">
                  OK
                </button>
              </li>
              <li className="projects-remote-input" onClick={this.nextProj}>
                <button className="projects-remote-input-div">
                  {" "}
                  <i className="fas fa-chevron-right" />{" "}
                </button>
              </li>
            </ul>
          </li>
          <li className="projects-remote-number-li projects-remote-number-li--container">
            <ul className="projects-remote-number-ul projects-remote-number-ul--arrows">
              <li className="projects-remote-input" onClick={this.down}>
                <button className="projects-remote-input-div">
                  {" "}
                  <i className="fas fa-chevron-down" />{" "}
                </button>
              </li>
            </ul>
          </li>
          <li className="projects-remote-number-li">
            <ul className="projects-remote-number-ul">{liArr.slice(1, 4)}</ul>
          </li>
          <li className="projects-remote-number-li">
            <ul className="projects-remote-number-ul">{liArr.slice(4, 7)}</ul>
          </li>
          <li className="projects-remote-number-li">
            <ul className="projects-remote-number-ul">{liArr.slice(7, 10)}</ul>
          </li>
          <li>
            <ul className="projects-remote-number-ul">{liArr.slice(0, 1)}</ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default Projects;
