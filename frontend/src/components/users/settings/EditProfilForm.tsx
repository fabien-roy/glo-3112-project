import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { User, UserModificationParams } from 'types/users';
import useUpdateUser from 'hooks/users/useUpdateUser';
import { EditUserAvatar } from 'components/users/avatar/EditUserAvatar';
import * as editPorfilFormValidation from './EditProfilFormValidation';

const TableCell = withStyles({
  root: {
    borderBottom: 'none',
  },
})(MuiTableCell);

interface EditProfilFormProps {
  currentUser: User;
  setError: (error: boolean) => void;
  setSuccess: (success: boolean) => void;
}

const useStyles = makeStyles((theme) => ({
  avatarSize: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  firstColumn: {
    fontWeight: 'bold',
  },
  textarea: {
    resize: 'vertical',
  },
}));

export function EditProfilForm(props: EditProfilFormProps) {
  const classes = useStyles();
  const [formChanged, setFormChanged] = useState(false);
  const [formValues, setFormValues] = useState<UserModificationParams>();
  const [submit, setSubmit] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(props.currentUser);
  const [avatarReference, setAvatarReference] = useState<string | null>(null);

  const isFormChanged = (fieldsValues) => {
    return !(
      fieldsValues.firstName === currentUser.firstName &&
      fieldsValues.lastName === currentUser.lastName &&
      fieldsValues.email === currentUser.email &&
      fieldsValues.description === currentUser.description &&
      fieldsValues.phoneNumber === currentUser.phoneNumber
    );
  };

  const onFieldChange = (event, handleChange, fieldsValues) => {
    const values = fieldsValues;
    values[event.target.name] = event.target.value;

    setFormChanged(isFormChanged(values));
    handleChange(event);
  };

  const onSubmit = (values) => {
    const newValues = { ...values };
    if (avatarReference) {
      newValues.avatarReference = avatarReference;
    } else {
      newValues.avatarReference = currentUser.avatarReference;
    }
    setFormValues(newValues);
    setSubmit(true);
  };

  const { act, user, error } = useUpdateUser(currentUser.username, formValues);

  useEffect(() => {
    act();
  }, [formValues]);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (error === null && submit) {
      props.setSuccess(true);
      setFormChanged(false);
      setSubmit(false);
    }
  }, [submit]);

  useEffect(() => {
    if (error !== null) {
      props.setError(true);
    }
  }, [error]);

  return (
    <Formik
      initialValues={{
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        description: currentUser.description,
        phoneNumber: currentUser.phoneNumber,
      }}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form>
          <TableContainer component={Box}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell align="right" className={classes.firstColumn}>
                    <EditUserAvatar
                      src={currentUser.avatarReference}
                      username={currentUser.username}
                      setAvatarReference={setAvatarReference}
                    />
                  </TableCell>
                  <TableCell>
                    <Box fontWeight="fontWeightBold" fontSize="h5.fontSize">
                      {currentUser.username}
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" className={classes.firstColumn}>
                    First name
                  </TableCell>
                  <TableCell>
                    <Field
                      name="firstName"
                      component={TextField}
                      inputProps={{
                        name: 'firstName',
                        value: values.firstName,
                        onChange: (event) => {
                          onFieldChange(event, handleChange, values);
                        },
                      }}
                      validate={(value) => {
                        return editPorfilFormValidation.validateFormat(
                          'First name',
                          value,
                          /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/
                        );
                      }}
                    />
                    {errors.firstName && <div>{errors.firstName}</div>}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" className={classes.firstColumn}>
                    Last name
                  </TableCell>
                  <TableCell>
                    <Field
                      name="lastName"
                      component={TextField}
                      inputProps={{
                        name: 'lastName',
                        value: values.lastName,
                        onChange: (event) => {
                          onFieldChange(event, handleChange, values);
                        },
                      }}
                      validate={(value) => {
                        return editPorfilFormValidation.validateFormat(
                          'Last name',
                          value,
                          /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/
                        );
                      }}
                    />
                    {errors.lastName && <div>{errors.lastName}</div>}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="right"
                    className={classes.firstColumn}
                    style={{ verticalAlign: 'top' }}
                  >
                    Description
                  </TableCell>
                  <TableCell>
                    <Field
                      name="description"
                      multiline
                      rows={10}
                      variant="outlined"
                      component={TextField}
                      inputProps={{
                        name: 'description',
                        value: values.description,
                        className: classes.textarea,
                        onChange: (event) => {
                          onFieldChange(event, handleChange, values);
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" className={classes.firstColumn}>
                    Email
                  </TableCell>
                  <TableCell>
                    <Field
                      name="email"
                      component={TextField}
                      inputProps={{
                        name: 'email',
                        value: values.email,
                        onChange: (event) => {
                          onFieldChange(event, handleChange, values);
                        },
                      }}
                      validate={(value) => {
                        return editPorfilFormValidation.validateFormat(
                          'Email address',
                          value,
                          /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
                        );
                      }}
                    />
                    {errors.email && <div>{errors.email}</div>}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" className={classes.firstColumn}>
                    Phone number
                  </TableCell>
                  <TableCell>
                    <Field
                      name="phoneNumber"
                      component={TextField}
                      inputProps={{
                        name: 'phoneNumber',
                        value: values.phoneNumber,
                        onChange: (event) => {
                          onFieldChange(event, handleChange, values);
                        },
                      }}
                      validate={(value) => {
                        return editPorfilFormValidation.validateFormat(
                          'Phone number',
                          value,
                          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
                        );
                      }}
                    />
                    {errors.phoneNumber && <div>{errors.phoneNumber}</div>}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell />
                  <TableCell align="left">
                    <Button
                      disabled={!formChanged && !avatarReference}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Send
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Form>
      )}
    </Formik>
  );
}
