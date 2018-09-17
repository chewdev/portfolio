const Validator = require("validator");
const isEmpty = require("./is-empty");
const stringForValid = require("./string-for-valid");

module.exports = function validateContactInput(data) {
  let errors = {};

  if (typeof data !== "object") {
    errors.isJSON = false;
    return {
      errors,
      isValid: false
    };
  }

  let {
    submittedName,
    submittedEmail,
    submittedComments,
    submittedSelectedOption
  } = data;

  submittedName = stringForValid(submittedName);
  submittedEmail = stringForValid(submittedEmail);
  submittedComments = stringForValid(submittedComments);
  submittedSelectedOption = stringForValid(submittedSelectedOption);

  if (!Validator.isEmail(submittedEmail)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(submittedEmail)) {
    errors.email = "Email field is required";
  }

  // if (!/^[a-zA-Z ]+$/.test(submittedName)) {
  //   errors.name = "Name must only contain letters and spaces";
  // }

  if (!Validator.isLength(submittedName, { min: 1, max: 50 })) {
    errors.name = "Name must be 50 characters or less";
  }

  if (Validator.isEmpty(submittedName)) {
    errors.name = "Name is required";
  }

  if (Validator.isEmpty(submittedSelectedOption)) {
    errors.select = "An option must be selected";
  }

  if (
    !["Say Hi", "Let's Chat", "Freelance Work", "Job Opportunity"].includes(
      submittedSelectedOption
    )
  ) {
    errors.select = "That is not a valid option";
  }

  if (submittedComments) {
    if (!Validator.isLength(submittedComments, { min: 1, max: 255 })) {
      errors.comments = "Comments must be 255 characters or less";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
