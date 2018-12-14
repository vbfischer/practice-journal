import React from 'react';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import { Field, reduxForm } from 'redux-form';
import isEmail from 'validator/lib/isEmail';
import { requiredFields } from './formHelpers';

const validate = values => {
  const errors = requiredFields(values, ['email', 'password']);

  if (values.email && !isEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const LoginForm = ({ error }) => (
  <form>
    <FormControl margin="normal" required fullWidth>
      <InputLabel htmlFor="email">Email Address</InputLabel>
      <Field name="email" component={Input} id="email" />
    </FormControl>

    <FormControl margin="normal" required fullWidth>
      <InputLabel htmlFor="password">Password</InputLabel>
      <Field name="password" type="password" id="password" component={Input} />
    </FormControl>
    {error && <div>{error}</div>}
    <Button color="primary" variant="contained" type="submit">
      Login
    </Button>
  </form>
);

export default reduxForm({ form: 'loginForm', validate })(LoginForm);
