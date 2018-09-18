import React from "react";
import LazyLoad from "react-lazy-load";
import ReactTypist from "react-typist";
import { isEmail } from "validator";

export default class Contact extends React.Component {
  constructor() {
    super();

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
      hadEmailError: false,
      contactError: ""
    };

    this.setContactName = this.setContactName.bind(this);
    this.setContactEmail = this.setContactEmail.bind(this);
    this.setComments = this.setComments.bind(this);
    this.setSelectOption = this.setSelectOption.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setContactName(e) {
    const contactName = e.target.value;
    // Name must be less than 50 chars
    if (contactName.length > 50) {
      return;
    }

    if (this.state.hadNameError && contactName === "") {
      this.setState({ contactName, nameError: true });
      return;
    }

    this.setState({ contactName, nameError: false });
  }

  setContactEmail(e) {
    const contactEmail = e.target.value;
    // Emails must be less than 254 chars
    if (contactEmail.length > 254) {
      return;
    }
    // If user tried to submit an invalid email and current input is invalid
    // Show email error message
    if (this.state.hadEmailError && !isEmail(contactEmail)) {
      this.setState({ contactEmail, emailError: true });
      return;
    }

    // Don't show error message if user hasn't tried to submit form
    // or if current email input is valid
    this.setState({ contactEmail, emailError: false });
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
    let emailError = false;
    let hadEmailError = false;
    let nameError = false;
    let hadNameError = false;
    // Validate input
    if (!isEmail(submittedEmail)) {
      emailError = true;
      hadEmailError = true;
    }
    if (submittedName.length < 1) {
      nameError = true;
      hadNameError = true;
    }
    // If errors, show errors and return
    if (nameError || emailError) {
      this.setState({ emailError, nameError, hadEmailError, hadNameError });
      return;
    }

    // If valid, set submitted values and begin fading form
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

    // Fading form takes 1 second, afterwards we want to keep it hidden
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
      }).then(data => data.json());
    };

    // Send input data from contact form to the POST route of '/contact'
    postData(`./contact`, {
      submittedName,
      submittedEmail,
      submittedComments,
      submittedSelectedOption
    })
      .then(data => {
        // If successful request/response, but data sent was not accepted
        if (!data.accepted) {
          // If contact form hasn't been hidden, cancel timeout and don't hide form
          if (this.timeout) {
            clearTimeout(this.timeout);
          }
          // If user's email has already submitted contact form 5 times (5 entries in DB)
          // data.alreadysubmitted should be
          // "You have submitted a contact too many times, please contact directly."
          // Show this error to the user
          const contactError = data.alreadysubmitted
            ? data.alreadysubmitted
            : "";
          this.setState({ submitError: true, formClass: "", contactError });
        } else {
          // Successfully submitted contact form
          // Show success message to user
          this.setState({ submitted: true, submitError: false });
        }
      })
      .catch(error => {
        // If there's an error, cancel hiding of form in timeout and show submit error
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.setState({ submitError: true, formClass: "" });
      });
  }

  render() {
    return (
      <section id="contact" className="contact-section">
        {this.state.submitError && (
          <h3 className="contact-error">
            {this.state.contactError
              ? this.state.contactError
              : "There was an error submitting the form, please try again."}
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
      </section>
    );
  }
}
