import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import { Field, reduxForm, SubmissionError } from 'redux-form';
import isEmail from 'validator/lib/isEmail';
import { requiredFields } from './formHelpers';
import { loginAndLoadUser } from '../../redux/actions';
import withStyles from '@material-ui/core/styles/withStyles';

const onSubmit = async ({ email, password }, dispatch, { loginAndLoadUser }) => {
  try {
    await loginAndLoadUser(email, password);
  } catch (e) {
    throw new SubmissionError({ _error: e.message || 'Incorrect email or password.' });
  }
};

const validate = values => {
  const errors = requiredFields(values, ['email', 'password']);

  if (values.email && !isEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => {
  return (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      {...input}
      {...custom}
      margin="normal"
      fullWidth
    />
  );
};

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

const LoginForm = ({ error, handleSubmit, classes }) => (
  <main className={classes.main}>
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Field name="email" component={renderTextField} label="Email Address" />
        <Field name="password" component={renderTextField} label="Password" type="password" />
        {error && <div>{error}</div>}
        <Button color="primary" variant="contained" type="submit" className={classes.submit}>
          Login
        </Button>
      </form>
    </Paper>
  </main>
);

export default compose(
  connect(
    null,
    { loginAndLoadUser }
  ),
  reduxForm({ form: 'loginForm', validate }),
  withStyles(styles)
)(LoginForm);
