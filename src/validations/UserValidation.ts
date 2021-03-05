import { body } from 'express-validator';
import { User } from '../models/User';

const user = new User()

export const UserValidation = [

  body('firstName').not().isEmpty().trim().escape().
  withMessage("First Name is Required!").customSanitizer(value => {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
  }),

  body('lastName').not().isEmpty().trim().escape().
  withMessage("Last Name is Required!").customSanitizer(value => {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
  }),

  body('username').not().isEmpty().trim().escape().
  withMessage("Username is Required!").isLength({min: 6}).
  withMessage("The Username must contain at least 6 characters!"),

  body('username').custom( async (value) => {
    // Check if the username exists
    if (await user.usernameExist(value)) {
      throw new Error('The Username Already exists; Please choose another username!');
    }
     // Indicates the success of this synchronous custom validator
     return true;
  }),

  body('email').isEmail().
  withMessage("The Email field must contain a valid Email Address!").
  normalizeEmail(),


  body('email').custom( async (value) => {
    // Check if the username exists
    if (await user.emailExist(value)) {
      throw new Error('The Email Address Already exists; Please choose another Enail Address!');
    }
     // Indicates the success of this synchronous custom validator
     return true;
  }),

  body('password').trim().isLength({min: 8}).
  withMessage("The password must contain at least 8 characters!").matches(/\d/)
  .withMessage('The Password must contain a number!'),

  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password!');
    }
     // Indicates the success of this synchronous custom validator
     return true;
  })

]