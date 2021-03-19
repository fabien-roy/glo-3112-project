import React, { useState, useEffect, useContext } from 'react';
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
import { UserContext } from 'context/userContext';
import LoadingSpinner from 'components/LoadingSpinner';
import CompactImageField from 'components/forms/CompactImageField';
import * as yup from 'yup';
import useDeleteUser from 'hooks/users/useDeleteUser';
import { EditUserFormButtons } from './EditUserFormButtons';

const TableCell = withStyles({
  root: {
    borderBottom: 'none',
  },
})(MuiTableCell);

interface EditUserFormProps {
  setResponse: (response) => void;
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
  input: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  },
}));

const validateAvatarData = (value) => {
  let error;

  if (!value) return error;

  if (
    !/^data:image\/(?:png|jpeg)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/.test(
      value.substring(0, 50)
    )
  ) {
    error = 'Invalid avatar (PNG or JPG only)';
  } else if (value.length > 2097152) {
    error = 'File too large';
  }

  return error;
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('A first name is required')
    .matches(/^[a-zA-Z]+([ '-][a-zA-Z]+)*$/, 'Invalid first name'),
  lastName: yup
    .string()
    .required('A last name is required')
    .matches(/^[a-zA-Z]+([ '-][a-zA-Z]+)*$/, 'Invalid last name'),
  email: yup
    .string()
    .required('An email is required')
    .matches(
      /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
      'Invalid email'
    ),
  description: yup.string().notRequired(),
  phoneNumber: yup
    .string()
    .required('A phone number is required')
    .matches(
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]\d{4}$/,
      'Invalid phone number'
    ),
});

export const EditUserForm = (props: EditUserFormProps) => {
  const classes = useStyles();

  const [formValues, setFormValues] = useState<UserModificationParams>(
    undefined
  );

  const { currentUser: contextUser } = useContext(UserContext);

  const [currentUser, setCurrentUser] = useState<User>(contextUser);

  const { user, updateUser, isLoading, error } = useUpdateUser(
    currentUser.username,
    formValues
  );

  const { deleteUser, error: deleteError } = useDeleteUser(
    currentUser.username
  );

  const onDelete = async () => {
    deleteUser();
  };

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true);
    setFormValues(values);
    onSubmitProps.resetForm(values);
  };

  useEffect(() => {
    if (formValues) {
      updateUser();
    }
  }, [formValues]);

  useEffect(() => {
    if (!error && user) {
      setCurrentUser(user);
      props.setResponse({
        code: 200,
        description: 'User updated succesfully!',
      });
    } else if (error) {
      props.setResponse({
        code: error.code,
        description: error.message,
      });
    }
  }, [user, error]);

  useEffect(() => {
    if (deleteError) {
      props.setResponse({
        code: deleteError.code,
        description: deleteError.message,
      });
    }
  });

  const initialValues = {
    avatarData: undefined,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    description: currentUser.description,
    phoneNumber: currentUser.phoneNumber,
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={formValues || initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => (
        <Form>
          <TableContainer component={Box}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell align="right" className={classes.firstColumn}>
                    <Field
                      name="avatarData"
                      component={CompactImageField}
                      placeholder={currentUser.avatarReference}
                      validate={validateAvatarData}
                      inputProps={{
                        name: 'avatarData',
                        label: currentUser.username,
                        ...formik.getFieldProps('avatarData'),
                      }}
                    />
                    {formik.errors.avatarData && (
                      <Box color="red">{formik.errors.avatarData}</Box>
                    )}
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
                    <Box className={classes.input}>
                      <Field
                        name="firstName"
                        component={TextField}
                        fullWidth
                        inputProps={{
                          name: 'firstName',
                          ...formik.getFieldProps('firstName'),
                        }}
                      />
                      {formik.errors.firstName && (
                        <Box color="red">{formik.errors.firstName}</Box>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" className={classes.firstColumn}>
                    Last name
                  </TableCell>
                  <TableCell>
                    <Box className={classes.input}>
                      <Field
                        name="lastName"
                        component={TextField}
                        fullWidth
                        inputProps={{
                          name: 'lastName',
                          ...formik.getFieldProps('lastName'),
                        }}
                      />
                      {formik.errors.lastName && (
                        <Box color="red">{formik.errors.lastName}</Box>
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
                    <Box className={classes.input}>
                      <Field
                        name="description"
                        multiline
                        rows={10}
                        fullWidth
                        variant="outlined"
                        component={TextField}
                        inputProps={{
                          name: 'description',
                          className: classes.textarea,
                          ...formik.getFieldProps('description'),
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
                    <Box className={classes.input}>
                      <Field
                        name="email"
                        component={TextField}
                        fullWidth
                        inputProps={{
                          name: 'email',
                          ...formik.getFieldProps('email'),
                        }}
                      />
                      {formik.errors.email && (
                        <Box color="red">{formik.errors.email}</Box>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" className={classes.firstColumn}>
                    Phone number
                  </TableCell>
                  <TableCell>
                    <Box className={classes.input}>
                      <Field
                        name="phoneNumber"
                        component={TextField}
                        fullWidth
                        inputProps={{
                          name: 'phoneNumber',
                          ...formik.getFieldProps('phoneNumber'),
                        }}
                      />
                      {formik.errors.phoneNumber && (
                        <Box color="red">{formik.errors.phoneNumber}</Box>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell />
                  <TableCell align="left">
                    <EditUserFormButtons
                      disableSend={
                        !formik.isValid || formik.isSubmitting || !formik.dirty
                      }
                      delete={onDelete}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {isLoading && formik.isSubmitting && <LoadingSpinner absolute />}
        </Form>
      )}
    </Formik>
  );
};
