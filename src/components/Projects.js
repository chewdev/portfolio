import React from "react";

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.projects = [
      {
        imgSrc: "/images/budg-it.jpg",
        alt: "Screenshot of Budg-It project homepage",
        title: "React Budg-It App",
        description:
          "Budg-It app is a place where you can easily track all your expenses and income to determine a budget. Quickly search expenses by text and date and sort by date or amount. This app was built while learning React and Redux. It can be used with or without logging in. Logging in is simple with Google Auth from Firebase. By logging in, you can store your data in the database hosted on Firebase.",
        tools: [
          "React",
          "Redux",
          "Firebase",
          "JavaScript (ES6)",
          "HTML5",
          "CSS3"
        ],
        link: "https://react-budg-it.herokuapp.com",
        channelName: "RBA"
      },
      {
        imgSrc: "/images/yelp-camp.jpg",
        alt: "Screenshot of Yelp Camp project homepage",
        title: "Yelp Camp App",
        description:
          "Yelp Camp is an app for posting and commenting on campgrounds. Users can sign up and login to add campgrounds and comments that are stored in the MongoDB database. This app was built following a course on Udemy by Colt Steele. Built with Vanilla JS, Node, Express and MongoDB.",
        tools: ["Node", "MongoDB", "Express", "JavaScript", "HTML5", "CSS3"],
        link: "https://polar-ridge-72654.herokuapp.com",
        channelName: "YCA"
      },
      {
        imgSrc: "/images/indecision-app.JPG",
        alt: "Screenshot of Indecision App project",
        title: "Indecision App",
        description:
          "Indecision App is a simple CRUD application that allows a user to add and remove items to a list. User can then allow the app to make a decision for them. Built with React.",
        tools: ["React", "JavaScript", "HTML5", "CSS3"],
        link: "https://github.com/chewdev/react-indecision-app",
        channelName: "IDA"
      },
      {
        imgSrc: "/images/color-guessing-game.JPG",
        alt: "Screenshot of Color Guessing Game project",
        title: "Color Guessing Game",
        description:
          "Color guessing game is a simple game for practicing your RGB colors. Built with Vanilla JavaScript, HTML and CSS with Bootstrap.",
        tools: ["Bootstrap", "JavaScript", "HTML5", "CSS3"],
        link: "https://github.com/chewdev/color-game",
        channelName: "CGG"
      },
      {
        imgSrc: "/images/portfolio.JPG",
        alt: "Screenshot of this portfolio's homepage",
        title: "Portfolio",
        description:
          "This site was built from scratch using Node, React, Express and MySQL. Built a strong foundation in responsive web design with HTML and CSS while developing this site. Used Google's Gmail API and Nodemailer to connect contact form to email and practiced form validation. Most importantly, this site was essential in building my comfort level working with state management and React lifecycle methods and improving performance.",
        tools: [
          "Node",
          "MongoDB",
          "Express",
          "JavaScript",
          "HTML5",
          "CSS3",
          "MySQL"
        ],
        link: "/",
        channelName: "YCA"
      },
      {
        imgSrc: "/images/now-brewing.jpg",
        alt: 'Sign with text "Now Brewing"',
        title: "Coming Soon",
        description: "Always working on new projects. More to come!",
        tools: [],
        link: "#",
        channelName: "CS1"
      },
      {
        imgSrc: "/images/good-day.jpg",
        alt: 'Sign with text "today was a good day"',
        title: "Coming Soon",
        description: "Always working on new projects. More to come!",
        tools: [],
        link: "#",
        channelName: "CS2"
      },
      {
        imgSrc: "/images/passion.jpg",
        alt: '"PASSION LED US HERE" written on the ground',
        title: "Coming Soon",
        description: "Always working on new projects. More to come!",
        tools: [],
        link: "#",
        channelName: "CS3"
      },
      {
        imgSrc: "/images/live-work-create.jpg",
        alt: '"LIVE, WORK, CREATE" written on a wall',
        title: "Coming Soon",
        description: "Always working on new projects. More to come!",
        tools: [],
        link: "#",
        channelName: "CS4"
      },
      {
        imgSrc: "/images/closed.jpg",
        alt: 'Sign with text "Closed"',
        title: "Coming Soon",
        description: "Always working on new projects. More to come!",
        tools: [],
        link: "#",
        channelName: "CS5"
      }
    ];

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
          prevState.currProjInd === this.projects.length - 1
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
            prevState.currProjInd === this.projects.length - 1
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
            ? this.projects.length - 1
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
              ? this.projects.length - 1
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
            ? this.projects.length - 1
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
          prevState.currProjInd === this.projects.length - 1
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
    const project = this.projects[this.state.currProjInd];
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
      var projArr = this.projects.map((project, ind) => {
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
