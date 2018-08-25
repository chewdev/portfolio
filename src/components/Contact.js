import React from "react";
import LazyLoad from "react-lazy-load";

export default class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.timeout = null;

    this.state = {
      contactName: "",
      contactEmail: "",
      comments: "",
      selectedoption: "",
      submittedName: "",
      submittedEmail: "",
      submittedComments: "",
      submittedSelectedOption: "",
      formClass: "",
      submitted: false,
      submitError: false,
      commentCount: 0
    };

    this.setContactName = this.setContactName.bind(this);
    this.setContactEmail = this.setContactEmail.bind(this);
    this.setComments = this.setComments.bind(this);
    this.setSelectOption = this.setSelectOption.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setContactName(e) {
    const contactName = e.target.value;
    if (!contactName.slice(contactName.length - 1).match(/[a-zA-Z ]/) && contactName !== "") {
      return;
    }
    if (contactName.length > 50) {
      return;
    }
    this.setState({ contactName });
  }

  setContactEmail(e) {
    const contactEmail = e.target.value;
    if (contactEmail.length > 254) {
      return;
    }
    this.setState({ contactEmail });
  }

  setComments(e) {
    const comments = e.target.value;
    const commentCount = comments.length;
    if (commentCount > 255) {
      return;
    }
    this.setState({ comments, commentCount });
  }

  setSelectOption(e) {
    this.setState({ selectedOption: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const submittedName = e.target.contactname.value;
    const submittedEmail = e.target.contactemail.value;
    const submittedComments = e.target.comments.value;
    const submittedSelectedOption = e.target.contactpurpose.value;

    this.setState({
      submittedName,
      submittedEmail,
      submittedComments,
      submittedSelectedOption,
      contactName: "",
      contactEmail: "",
      comments: "",
      formClass: "fade-away"
    });
    this.timeout = setTimeout(() => {
      this.setState({ formClass: "hide-form" });
      this.timeout = null;
    }, 1000);

    // Method to send POST request to server
    const postData = (url = ``, data = {}) => {
      console.log(data);
      return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        const data = response.json();
        console.log(data);
        return data;
      });
    };

    // Send input data from contact form to the POST route of '/contact'
    postData(`./contact`, {
      submittedName,
      submittedEmail,
      submittedComments,
      submittedSelectedOption
    })
      .then(data => {
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        //Server should send back accepted as true if email was successful

        //If error sending email, set submitError to true to show error message to user
        //Also cancel removal of form and re-display form under error message to allow
        //user to attempt to send form again.
        if (!parsedData.accepted) {
          if (this.timeout) {
            clearTimeout(this.timeout);
          }
          this.setState({ submitError: true, formClass: "" });
        } else {
          //Set submitted to true in order to show success message to user
          this.setState({ submitted: true });
        }
      })
      .catch(error => {
        console.log(error);
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.setState({ submitError: true, formClass: "" });
      });
  }

  render() {
    return (
      <div id="contact" className="contact-section">
        {this.state.submitError && (
          <h3>There was an error submitting the form, please try again.</h3>
        )}
        <LazyLoad offset={700} throttle={100}>
          <div className={this.state.formClass}>
            <form
              className={`contact-form ${this.state.formClass}`}
              onSubmit={this.onSubmit}
            >
              <h1 className="contact-form-title">Contact</h1>
              <label className="contact-form-label" htmlFor="contactname">
                Full Name:
              </label>
              <div className="contact-form-input-div">
                <input
                  className="contact-form-contactinput"
                  type="text"
                  name="contactname"
                  value={this.state.contactName}
                  onChange={this.setContactName}
                />
              </div>
              <label className="contact-form-label" htmlFor="contactemail">
                E-mail:
              </label>
              <div className="contact-form-input-div">
                <input
                  className="contact-form-contactinput"
                  type="text"
                  name="contactemail"
                  value={this.state.contactEmail}
                  onChange={this.setContactEmail}
                />
              </div>
              <div className="contact-form-label-count-div">
                <label className="contact-form-label" htmlFor="comments">
                  Comments:
                </label>
                {this.state.commentCount > 235 ? (
                  <div className="contact-form-comment-count">
                    {255 - this.state.commentCount} characters left
                  </div>
                ) : null}
              </div>
              <textarea
                className="contact-form-comments-area"
                name="comments"
                value={this.state.comments}
                onChange={this.setComments}
              />
              <label className="contact-form-label" htmlFor="contactpurpose">
                Reason For Contact:
              </label>
              <select
                onChange={this.setSelectOption}
                value={this.state.selectedOption}
                className="contact-form-contactinput"
                name="contactpurpose"
              >
                <option className="contact-form-reason-option" value="Say Hi">
                  {" "}
                  Say Hi{" "}
                </option>
                <option
                  className="contact-form-reason-option"
                  value="Let's Chat"
                >
                  {" "}
                  Let's Chat{" "}
                </option>
                <option
                  className="contact-form-reason-option"
                  value="Freelance Work"
                >
                  {" "}
                  Freelance Opportunity{" "}
                </option>
                <option
                  className="contact-form-reason-option"
                  value="Job Opportunity"
                >
                  {" "}
                  Job Opportunity{" "}
                </option>
              </select>
              <input
                className="contact-form-submit"
                type="submit"
                value="Submit"
              />
            </form>
            <div className="contact-form-whiteboard-bottom" />
          </div>
        </LazyLoad>
        <div className={this.state.submitted ? "show-success" : "hide-form"}>
          <h2>Successfully submitted. Thank you for reaching out!</h2>
        </div>
      </div>
    );
  }
}
