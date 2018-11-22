import React from "react";
import classnames from "classnames";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.scrollToComp = this.scrollToComp.bind(this);
    this.eventAdded = null;
    this.yLoc = 0;

    this.state = {
      isOpen: true,
      hideClass: "",
      hasAnimated: false
    };

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    if (!this.eventAdded) {
      window.addEventListener("scroll", this.onScroll);
      this.eventAdded = true;
      const that = this;
      setTimeout(() => {
        that.setState({ hideClass: "header__title_hide", hasAnimated: true });
      }, 2500);
    }
  }

  onScroll() {
    if (this.state.isOpen && window.pageYOffset < 25) {
      return;
    } else if (window.pageYOffset < 25) {
      this.setState({
        hideClass: "header__title_hide"
      });
      setTimeout(() => this.setState({ isOpen: true }), 20);
      return;
    } else if (
      window.pageYOffset - this.yLoc < 20 &&
      this.yLoc - window.pageYOffset < 20
    ) {
      return;
    } else if (this.state.isOpen) {
      this.setState({ isOpen: false });
      this.yLoc = window.pageYOffset;
    }
  }

  scrollToComp(el) {
    document
      .querySelector(`${el}`)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }

  render() {
    const headerTitleClasses = classnames(
      "header__title",
      { header__title_animate: !this.state.hasAnimated },
      { [this.state.hideClass]: !this.state.isOpen }
    );

    const headerTapeLeft = classnames("header__tape", {
      "header__tape--top-left": !this.state.hasAnimated
    });
    const headerTapeMiddle = classnames("header__tape", {
      "header__tape--middle": !this.state.hasAnimated
    });
    const headerTapeRight = classnames("header__tape", {
      "header__tape--top-right": !this.state.hasAnimated
    });

    return (
      <div>
        <div className="header-spacing" />
        <header className="header">
          <div className="content-container">
            <div className="header__content">
              <a
                className={headerTitleClasses}
                onClick={() => this.scrollToComp("#top-level")}
                onTransitionEnd={e => {
                  if (e.nativeEvent.propertyName === "top") {
                    if (!this.state.isOpen) {
                      this.setState({ hideClass: "header__title_dnone" });
                    }
                  }
                }}
              >
                <img
                  className={headerTapeLeft}
                  src="/images/tape-horizontal.png"
                />
                <div>
                  <i className="fas fa-arrow-up medium-arrow" />
                </div>
              </a>
              <a
                className={headerTitleClasses}
                onClick={() => this.scrollToComp("#projects")}
              >
                <img
                  className={headerTapeLeft}
                  src="/images/tape-horizontal.png"
                />
                <div>Projects</div>
              </a>
              <a
                className={headerTitleClasses}
                onClick={() => this.scrollToComp("#about-me")}
              >
                <img
                  className={headerTapeMiddle}
                  src="/images/tape-horizontal.png"
                />
                <div>About Me</div>
              </a>
              <a
                className={classnames(
                  "header__title",
                  { header__title_animate: !this.state.hasAnimated },
                  {
                    header__title_hide:
                      !this.state.isOpen && this.state.hideClass
                  }
                )}
                onClick={() => {
                  if (this.state.isOpen) {
                    this.scrollToComp("#contact");
                  } else {
                    this.setState({
                      hideClass: "header__title_hide"
                    });
                    const that = this;
                    setTimeout(() => that.setState({ isOpen: true }), 20);
                  }
                }}
              >
                <img
                  className={headerTapeRight}
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
