import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.scrollToComp = this.scrollToComp.bind(this);
    this.eventAdded = false;
    this.yLoc = 0;

    this.state = {
      isOpen: true,
      hideClass: ""
    };
  }

  componentDidMount() {
    const that = this;
    if (!this.eventAdded) {
      (function(that) {
        window.addEventListener("scroll", function() {
          if (window.pageYOffset < 25) {
            that.setState({ isOpen: true });
            return;
          }
          if (
            window.pageYOffset - that.yLoc < 20 &&
            that.yLoc - window.pageYOffset < 20
          ) {
            return;
          }
          that.yLoc = window.pageYOffset;
          that.setState({ isOpen: false });
        });
        that.eventAdded = true;
        setTimeout(() => {
          that.setState({ hideClass: "header__title_hide" });
        }, 2500);
      })(that);
    }
  }

  scrollToComp(el) {
    document
      .querySelector(`${el}`)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }

  render() {
    return (
      <div>
        <div className="header-spacing" />
        <header className="header">
          <div className="content-container">
            <div className="header__content">
              <a
                className={`header__title ${
                  this.state.isOpen ? "" : this.state.hideClass
                }`}
                onClick={() => this.scrollToComp("#top-level")}
              >
                <img
                  className="header__tape header__tape--top-left"
                  src="/images/tape-horizontal.png"
                />
                <div>
                  <i className="fas fa-arrow-up medium-arrow" />
                </div>
              </a>
              <a
                className={`header__title ${
                  this.state.isOpen ? "" : this.state.hideClass
                }`}
                onClick={() => this.scrollToComp("#projects")}
              >
                <img
                  className="header__tape header__tape--top-left"
                  src="/images/tape-horizontal.png"
                />
                <div>Projects</div>
              </a>
              <a
                className={`header__title ${
                  this.state.isOpen ? "" : this.state.hideClass
                }`}
                onClick={() => this.scrollToComp("#about-me")}
              >
                <img
                  className="header__tape header__tape--middle"
                  src="/images/tape-horizontal.png"
                />
                <div>About Me</div>
              </a>
              <a
                className={`header__title ${
                  this.state.isOpen ? "" : this.state.hideClass
                }`}
                onClick={() => {
                  if (this.state.isOpen) {
                    this.scrollToComp("#contact");
                  } else {
                    this.setState({ isOpen: true });
                  }
                }}
              >
                <img
                  className="header__tape header__tape--top-right"
                  src="/images/tape-horizontal.png"
                />
                <div>
                  {!this.state.isOpen && this.state.hideClass !== "" ? (
                    <i className="fas fa-arrow-left bigger-arrow" />
                  ) : (
                    "Contact"
                  )}
                </div>
              </a>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
