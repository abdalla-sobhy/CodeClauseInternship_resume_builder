import * as Yup from "yup";

/**
 * Transforms Yup errors into an object.
 * @param {ValidationError} errors - The Yup validation errors.
 * @returns {Record<string, string>} - An object containing the error messages.
 */
export const transformYupErrorsIntoObject = (errors) => {
  const validationErrors = {};

  errors.inner.forEach((error) => {
    if (error.path !== undefined) {
      validationErrors[error.path] = error.errors[0];
    }
  });

  return validationErrors;
};

export const getValidateUserSchema = () => {
  return Yup.object().shape({
    username: Yup.string()
      .required("Please enter a valid username")
      .min(5, "Username should be at least 5 characters")
      .label("Username"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters")
      .label("Password"),
  });
};

export const getValidateloginSchema = () => {
  return Yup.object().shape({
    username: Yup.string()
      .required("Please enter a valid username")
      .label("Username"),
    password: Yup.string()
      .required("Password is required")
      .label("Password"),
  });
};

export const getValidateResumeSchema = () => {
  return Yup.object().shape({
    jobTitle: Yup.string()
      .required("Please enter a valid username")
      .min(5, "Username should be at least 5 characters")
      .label("Username"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters")
      .label("Password"),
  });
};
