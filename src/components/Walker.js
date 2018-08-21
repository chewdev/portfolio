import React from 'react';

class Walker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            walkerStyles: {
                top: 0,
                left: 0
            }
        }
    }

    handleKeyDown(e) {
        const code = e.which || e.keyCode || null;
        console.log('pressed');
        switch(code) {
            case 40:
                e.preventDefault(); 
                this.setState((prevState) => {
                    const top = prevState.walkerStyles.top + 20;
                    return {
                        walkerStyles: { top, left: prevState.walkerStyles.left }
                    }
                });
                break;  
            case 38:
                e.preventDefault();
                this.setState((prevState) => {
                    const top = prevState.walkerStyles.top - 20;
                    return {
                        walkerStyles: { top, left: prevState.walkerStyles.left }
                    }
                });
                break;
            case 39:
                e.preventDefault();
                this.setState((prevState) => {
                    const left = prevState.walkerStyles.left + 20;
                    console.log(left);
                    return {
                        walkerStyles: { left, top: prevState.walkerStyles.top }
                    }
                });
                break;
            case 37:
                e.preventDefault();
                this.setState((prevState) => {
                    const left = prevState.walkerStyles.left - 20;
                    console.log(left);
                    return {
                        walkerStyles: { left, top: prevState.walkerStyles.top }
                    }
                });
                break;
            default:
        }
    }

    componentWillmount() {
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        this.setState({ walkerStyles: { top: 50, left: 50 } });
    }

    render() {
        return (
        <div style={this.state.walkerStyles} className="walker-container">
            <div className="walker-left">
            </div>
            <div className="walker-right">
            </div>
        </div>
        );
    }
}

export default Walker;