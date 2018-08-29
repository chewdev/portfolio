import React from "react";
import Typist from "react-typist";
import QA from "./QA";

class Introduction extends React.Component {
  constructor(props) {
    super(props);
    this.isIE = /*@cc_on!@*/ false || !!document.documentMode;
    this.isEdge = !this.isIE && !!window.StyleMedia;
    this.isChrome = !!window.chrome && !!window.chrome.webstore;
    this.msClass = this.isIE || this.isEdge ? " paper-text--ms" : "";
    this.chromeClass = this.isChrome ? " paper-text--chrome" : "";
    this.state = {
      qA: []
    };
  }

  componentDidMount() {
    if (this.state.qA.length === 0) {
      fetch("/questions")
        .then(data => data.json())
        .then(data => {
          this.setState({ qA: data });
        });
    }
  }

  scrollContact() {
    document
      .querySelector("#contact")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }

  render() {
    return (
      <div className="paper-box">
        <div className="paper-tape">
          <img
            className="paper-tape--left"
            src="/images/tape-left-cropped-rot.png"
          />
          <img
            className="paper-tape--right"
            src="/images/tape-right-cropped-rot.png"
          />
        </div>
        <Typist
          avgTypingDelay={30}
          stdTypingDelay={15}
          startDelay={2000}
          cursor={{ show: false }}
        >
          <h1 className="paper-header">Chris Ewald</h1>
          <QA qA={this.state.qA} />
          {/* <textarea
            className={`paper-text ${this.chromeClass}`}
            style={{
              background: "inherit",
              border: "none",
              fontFamily: "inherit",
              height: "15rem"
            }}
            placeholder="Get to know me: Click here and type your question"
          /> */}

          <br />
          <p className={`paper-text ${this.chromeClass}`}>
            Want to have a real conversation?
          </p>
        </Typist>
        <div className="paper-contact-link-div">
          <i
            onClick={this.scrollContact}
            className="fas fa-chevron-down paper-contact-link"
          />
        </div>
      </div>
    );
  }
}

export default Introduction;

// &nbsp;Full Stack Developer. <br /><br />&nbsp;Currently working with JavaScript, HTML5 and CSS3. <br /> <br />&nbsp;Current Stack: Node, React, Firebase / MongoDB, and Express. <br /> <br />&nbsp; Tools: webpack, Git / GitHub, Sass, Babel, Jest, Enzyme, GraphQL, Redux and more.
