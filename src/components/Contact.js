import React from "react";
import LazyLoad from "react-lazy-load";
import ReactTypist from "react-typist";

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
      commentCount: 0,
      emailError: false,
      nameError: false,
      hadNameError: false,
      hadEmailError: false
    };

    this.setContactName = this.setContactName.bind(this);
    this.setContactEmail = this.setContactEmail.bind(this);
    this.setComments = this.setComments.bind(this);
    this.setSelectOption = this.setSelectOption.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  setContactName(e) {
    const contactName = e.target.value;

    if (this.state.hadNameError) {
      var nameError = false;
      if (contactName === "") {
        nameError = true;
      } else {
        nameError = false;
      }
    }

    if (
      !contactName.slice(contactName.length - 1).match(/[a-zA-Z ]/) &&
      contactName !== ""
    ) {
      return;
    }
    if (contactName.length > 50) {
      return;
    }
    this.setState({ contactName, nameError });
  }

  setContactEmail(e) {
    const email = e.target.value;
    let emailError = false;
    if (this.state.hadEmailError) {
      var isValidEmail = this.validateEmail(email);
      if (isValidEmail) {
        emailError = false;
      } else {
        emailError = true;
      }
    }
    const contactEmail = email;
    if (contactEmail.length > 254) {
      return;
    }
    this.setState({ contactEmail, emailError });
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

  validateEmail(email) {
    return /^.+@.+\..+$/.test(email);
  }

  onSubmit(e) {
    e.preventDefault();

    const submittedName = e.target.contactname.value;
    const submittedEmail = e.target.contactemail.value;
    const submittedComments = e.target.comments.value;
    const submittedSelectedOption = e.target.contactpurpose.value;

    if (!this.validateEmail(submittedEmail)) {
      var emailError = true;
      var hadEmailError = true;
    }
    if (submittedName.length < 1) {
      var nameError = true;
      var hadNameError = true;
    }

    if (nameError || emailError) {
      this.setState({ emailError, nameError, hadEmailError, hadNameError });
      return;
    }

    this.setState({
      submittedName,
      submittedEmail,
      submittedComments,
      submittedSelectedOption,
      contactName: "",
      contactEmail: "",
      comments: "",
      formClass: "fade-away",
      emailError,
      nameError
    });
    this.timeout = setTimeout(() => {
      this.setState({ formClass: "hide-form" });
      this.timeout = null;
    }, 1000);

    // Method to send POST request to server
    const postData = (url = ``, data = {}) => {
      return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        const data = response.json();
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
          <h3 className="contact-error">
            There was an error submitting the form, please try again.
          </h3>
        )}
        <LazyLoad offset={600} throttle={25}>
          <div>
            <div className={`contact-form`}>
              {this.state.submitted ? (
                <ReactTypist
                  avgTypingDelay={30}
                  stdTypingDelay={15}
                  cursor={{ show: false }}
                >
                  <div className="show-success">
                    <h2>Successfully submitted. Thank you for reaching out!</h2>
                  </div>
                </ReactTypist>
              ) : null}
              <form
                className={`${this.state.formClass}`}
                onSubmit={this.onSubmit}
              >
                <h1 className="contact-form-title">Contact</h1>
                <div className="contact-form-label-error-div">
                  <label className="contact-form-label" htmlFor="contactname">
                    Full Name:
                  </label>
                  {this.state.nameError ? (
                    <div className="contact-form-error">Name is required</div>
                  ) : null}
                </div>
                <div className="contact-form-input-div">
                  <input
                    className="contact-form-contactinput"
                    type="text"
                    id="contactname"
                    name="contactname"
                    value={this.state.contactName}
                    onChange={this.setContactName}
                  />
                </div>
                <div className="contact-form-label-error-div">
                  <label className="contact-form-label" htmlFor="contactemail">
                    E-mail:
                  </label>
                  {this.state.emailError ? (
                    <div className="contact-form-error">
                      Please input a valid e-mail
                    </div>
                  ) : null}
                </div>
                <div className="contact-form-input-div">
                  <input
                    className="contact-form-contactinput"
                    type="text"
                    name="contactemail"
                    id="contactemail"
                    value={this.state.contactEmail}
                    onChange={this.setContactEmail}
                  />
                </div>
                <div className="contact-form-label-error-div">
                  <label className="contact-form-label" htmlFor="comments">
                    Comments:
                  </label>
                  {this.state.commentCount > 235 ? (
                    <div className="contact-form-error">
                      {255 - this.state.commentCount} characters left
                    </div>
                  ) : null}
                </div>
                <textarea
                  className="contact-form-comments-area"
                  name="comments"
                  id="comments"
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
            </div>
            <div className="contact-form-whiteboard-bottom">
              <div className="eraser">Expo</div>
              <div className="marker">
                <div className="marker-body" />
                <div className="marker-cap" />
              </div>
            </div>
          </div>
        </LazyLoad>
      </div>
    );
  }
}
