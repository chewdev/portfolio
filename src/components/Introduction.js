import React from 'react';

const Introduction = () => {
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    const isEdge = !isIE && !!window.StyleMedia;
    const isChrome = !!window.chrome && !!window.chrome.webstore;
    const msClass = (isIE || isEdge) ? " paper-text--ms" : "";
    const chromeClass = isChrome ? " paper-text--chrome" : "";
    return (
    <div className="paper-box">
        <div className="paper-opacity">
            <div className="paper-tape">
                <img className="paper-tape--left" src="/images/tape-left-cropped.png" />
                <img className="paper-tape--right" src="/images/tape-right-cropped.png" />
            </div>
            <h1 className="paper-header">Chris Ewald</h1>
            <p className={`paper-text ${chromeClass}`}>&nbsp;Full Stack Developer. <br /><br />&nbsp;Currently working with JavaScript, HTML5 and CSS3. <br /> <br />&nbsp;Current Stack: Node, React, Firebase / MongoDB, and Express. <br /> <br />&nbsp; Tools: webpack, Git / GitHub, Sass, Babel, Jest, Enzyme, GraphQL, Redux and more.  </p>
        </div>
    </div>
)};

export default Introduction;