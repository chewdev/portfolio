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

  if (!Validator.isLength(submittedName, { min: 1, max: 50 })) {
    errors.name = "Name must be less than 50 characters";
  }

  if (Validator.isEmpty(submittedName)) {
    errors.name = "Name is required";
  }

  if (Validator.isEmpty(submittedSelectedOption)) {
    errors.select = "An option must be selected";
  }

  if (submittedComments) {
    if (!Validator.isLength(submittedComments, { min: 1, max: 255 })) {
      errors.comments = "Comments must be less than 255 characters";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };

  //check if input is json, if not reject with error
  // const parsedData = JSON.parse(data);
  // if (typeof parsedData !== 'object') {
  //   return res.status(404).json({ error: 'Improper data received' });
  // }
};
