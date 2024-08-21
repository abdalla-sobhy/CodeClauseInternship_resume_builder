import {
  getValidateloginSchema,
  getValidateUserSchema,
  transformYupErrorsIntoObject,
} from "../utils/index.js";

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next
 * @returns 
 */
export async function formValidation(req, res, next) {
  try {
    const { username, password } = req.body;

    // Validate the input data using the schema
    await getValidateUserSchema().validate(
      {
        username,
        password,
      },
      { abortEarly: false }
    );

    // If validation is successful, set the user data and call next()
    req.user = { username, password };
    next();
  } catch (error) {
    const errors = transformYupErrorsIntoObject(error);
    return res.status(400).json({ errors: errors });
  }
}
export async function loginValidation(req, res, next) {
  try {
    const { username, password } = req.body;

    // Validate the input data using the schema
    await getValidateloginSchema().validate(
      {
        username,
        password,
      },
      { abortEarly: false }
    );

    // If validation is successful, set the user data and call next()
    req.user = { username, password };
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ errors: transformYupErrorsIntoObject(error) });
  }
}
