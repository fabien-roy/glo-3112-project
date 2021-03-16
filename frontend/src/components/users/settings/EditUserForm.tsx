import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
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
import useDeleteUser from 'hooks/users/useDeleteUser';
import { EditUserAvatar } from 'components/users/avatar/EditUserAvatar';
import * as editUserFormValidation from './EditUserFormValidation';

const TableCell = withStyles({
  root: {
    borderBottom: 'none',
  },
})(MuiTableCell);

interface EditUserFormProps {
  loggedUser: User;
  setError: (error: boolean) => void;
  setSuccess: (success: boolean) => void;
}

interface RouterProps extends RouteComponentProps {
  props: EditUserFormProps;
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

export const EditUserForm = withRouter(({ props, history }: RouterProps) => {
  const classes = useStyles();
  const [formChanged, setFormChanged] = useState(false);
  const [formValues, setFormValues] = useState<UserModificationParams>();
  const [submit, setSubmit] = useState(false);
  const [currentError, setCurrentError] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(props.loggedUser);
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
  };

  const { updateUser, user, error } = useUpdateUser(
    currentUser.username,
    formValues
  );

  const { deleteUser, error: deleteError } = useDeleteUser(
    currentUser.username
  );

  const onDelete = async () => {
    await deleteUser();
    history.push('/');
  };

  useEffect(() => {
    updateUser();
  }, [formValues]);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      if (formValues) {
        setSubmit(true);
      }
    }
  }, [user]);

  useEffect(() => {
    if (!currentError && submit) {
      props.setSuccess(true);
      setFormChanged(false);
      setSubmit(false);
    }
  }, [submit]);

  useEffect(() => {
    if (error !== null) {
      setCurrentError(true);
    }
  }, [error, deleteError]);

  useEffect(() => {
    if (currentError) {
      props.setError(true);
      setCurrentError(false);
    }
  }, [currentError]);

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
      {({ values, handleChange, errors }) => (
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
                    <Box width={1 / 2}>
                      <Field
                        name="firstName"
                        component={TextField}
                        fullWidth
                        inputProps={{
                          name: 'firstName',
                          value: values.firstName,
                          fullWidth: true,
                          onChange: (event) => {
                            onFieldChange(event, handleChange, values);
                          },
                        }}
                        validate={(value) => {
                          return editUserFormValidation.validateFormat(
                            'First name',
                            value,
                            /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/
                          );
                        }}
                      />
                      {errors.firstName && (
                        <Box color="red">{errors.firstName}</Box>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" className={classes.firstColumn}>
                    Last name
                  </TableCell>
                  <TableCell>
                    <Box width={1 / 2}>
                      <Field
                        name="lastName"
                        component={TextField}
                        fullWidth
                        inputProps={{
                          name: 'lastName',
                          value: values.lastName,
                          onChange: (event) => {
                            onFieldChange(event, handleChange, values);
                          },
                        }}
                        validate={(value) => {
                          return editUserFormValidation.validateFormat(
                            'Last name',
                            value,
                            /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/
                          );
                        }}
                      />
                      {errors.lastName && (
                        <Box color="red">{errors.lastName}</Box>
                      )}
                    </Box>
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
                    <Box width={1 / 2}>
                      <Field
                        name="description"
                        multiline
                        fullWidth
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
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" className={classes.firstColumn}>
                    Email
                  </TableCell>
                  <TableCell>
                    <Box width={1 / 2}>
                      <Field
                        name="email"
                        component={TextField}
                        fullWidth
                        inputProps={{
                          name: 'email',
                          value: values.email,
                          onChange: (event) => {
                            onFieldChange(event, handleChange, values);
                          },
                        }}
                        validate={(value) => {
                          return editUserFormValidation.validateFormat(
                            'Email address',
                            value,
                            /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
                          );
                        }}
                      />
                      {errors.email && <Box color="red">{errors.email}</Box>}
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" className={classes.firstColumn}>
                    Phone number
                  </TableCell>
                  <TableCell>
                    <Box width={1 / 2}>
                      <Field
                        name="phoneNumber"
                        component={TextField}
                        fullWidth
                        inputProps={{
                          name: 'phoneNumber',
                          value: values.phoneNumber,
                          onChange: (event) => {
                            onFieldChange(event, handleChange, values);
                          },
                        }}
                        validate={(value) => {
                          return editUserFormValidation.validateFormat(
                            'Phone number',
                            value,
                            /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
                          );
                        }}
                      />
                      {errors.phoneNumber && (
                        <Box color="red">{errors.phoneNumber}</Box>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <Box width={3 / 5}>
                      <Box display="flex" justifyContent="space-between">
                        <Button
                          disabled={!formChanged && !avatarReference}
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Send
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={onDelete}
                        >
                          Delete your account
                        </Button>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Form>
      )}
    </Formik>
  );
});
