import React from 'react';

class Projects extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [
                {
                    imgSrc: "/images/budg-it.jpg",
                    title: "React Budg-It App",
                    description: "Budg-It app is a place where you can easily track all your expenses and income to determine a budget. Quickly search expenses by text and date and sort by date or amount. This app was built while learning React and Redux. It can be used with or without logging in. Logging in is simple with Google Auth from Firebase. By logging in, you can store your data in the database hosted on Firebase.",
                    tools: ["React", "Redux", "Firebase", "JavaScript (ES6)", "HTML5", "CSS3"],
                    link: "https://react-budg-it.herokuapp.com"
                },
                {
                    imgSrc: "/images/yelp-camp.jpg",
                    title: "Yelp Camp App",
                    description: "Yelp Camp is an app for posting and commenting on campgrounds. Users can sign up and login to add campgrounds and comments that are stored in the MongoDB database. This app was built following a course on Udemy by Colt Steele. Built with Vanilla JS, Node, Express and MongoDB.",
                    tools: ["Node", "MongoDB", "Express", "JavaScript", "HTML5", "CSS3"],
                    link: "https://polar-ridge-72654.herokuapp.com"
                }
            ],
            currProjInd: 0
        }

        this.nextProj = this.nextProj.bind(this);
    }

    nextProj() {
        const nextInd = this.state.currProjInd === (this.state.projects.length - 1) ? 0 : this.state.currProjInd + 1;
        this.setState({...this.state, currProjInd: nextInd});
    }

    render() {
        const project = this.state.projects[this.state.currProjInd];
        return (
            <div className="projects">
                <div className="project-container">
                    <a className="project-link" href={project.link} target="_blank">
                        <img className="project-tv" src={project.imgSrc} />
                    </a>
                    <div className="top-tv-base">
                    </div>
                    <div className="bottom-tv-base">
                    </div>
                </div>
                <div className="project-info">
                    <h2>
                        {project.title}
                    </h2>
                    <p>
                        {project.description}
                    </p>
                </div>
                <button onClick={this.nextProj}>
                    Next
                </button>
            </div>
        )
    }
}

export default Projects;