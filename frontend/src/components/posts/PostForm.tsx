import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PhotoIcon from '@material-ui/icons/Photo';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import TextField from 'components/forms/TextField';
import ImageField from 'components/forms/ImageField';
import MultiSelect from 'components/forms/MultiSelect';
import useGetUsers from 'hooks/users/useGetUsers';
import { validateBase64Image } from 'util/imageValidation';
import * as yup from 'yup';
import TagsSection from './TagsSection';

interface PostFormProps {
  onSubmit: (values, onSubmitProps) => void;
  existingDescription?: string;
  existingUsertags?: string[];
  action: 'create' | 'edit' | 'delete';
}

const useStyles = makeStyles(() => ({
  form: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '90vh',
    display: 'flex',
    maxHeight: '500px',
  },
  descriptionItem: {
    flexGrow: 1,
    maxWidth: '100%',
  },
  submitBox: {
    textAlign: 'right',
    justifyContent: 'flex-end',
    display: 'flex',
  },
}));

const parseHashtags = (description: string) =>
  description
    .match(/#[\w.]+/gm)
    ?.map((s) => s.slice(1))
    ?.filter((v, i, a) => a.indexOf(v) === i) || [];

export const PostForm = (props: PostFormProps) => {
  const { users, isLoading } = useGetUsers();
  const [picturePicker, setPicturePicker] = useState('file');
  const classes = useStyles();

  const initialValues = {
    data: undefined,
    description: props.existingDescription,
    usertags: props.existingUsertags || [],
  };

  const validationSchema = yup.object({
    description: yup.string().required('A description is required').min(1),
    data:
      props.action !== 'edit'
        ? yup.mixed().required('An image is required')
        : undefined,
  });

  const handlePicturePickerChange = (event, newValue) => {
    setPicturePicker(newValue);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={props.onSubmit}
    >
      {(formik) => (
        <Form className={classes.form}>
          <Box p={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} className={classes.descriptionItem}>
                <Field
                  name="description"
                  placeholder="For hashtags, type # followed by a tag."
                  label="Description"
                  multiline
                  variant="outlined"
                  rows={10}
                  component={TextField}
                  inputProps={{
                    name: 'description',
                    ...formik.getFieldProps('description'),
                  }}
                />

                <Box my={1}>
                  <Box my={1}>
                    {!isLoading && users && users.results.length > 0 && (
                      <Field
                        name="usertags"
                        placeholder="Usertags"
                        label="Usertags"
                        variant="outlined"
                        component={MultiSelect}
                        options={users.results.map((user) => ({
                          value: user.username,
                          label: `@${user.username}`,
                        }))}
                        inputProps={{
                          onChange: () => {
                            formik.setFieldValue(
                              'hashtags',
                              parseHashtags(formik.values.description),
                              false
                            );
                          },
                        }}
                      />
                    )}
                  </Box>
                  <Box my={1}>
                    <TagsSection
                      type="hashtags"
                      tags={parseHashtags(formik.values.description)}
                    />
                  </Box>
                </Box>
              </Grid>
              {props.action === 'create' && (
                <Grid item xs={12} md={6}>
                  <Box>
                    {picturePicker && (
                      <Field
                        name="data"
                        component={ImageField}
                        validate={validateBase64Image}
                        inputType={picturePicker}
                        inputProps={{
                          name: 'data',
                          ...formik.getFieldProps('data'),
                        }}
                      />
                    )}
                    {formik.errors.data && (
                      <Box color="red">{formik.errors.data}</Box>
                    )}
                  </Box>
                  <BottomNavigation
                    value={picturePicker}
                    onChange={(event, newValue) => {
                      handlePicturePickerChange(event, newValue);
                      formik.resetForm({
                        values: { ...formik.values, data: '' },
                      });
                    }}
                  >
                    <BottomNavigationAction
                      label="File"
                      value="file"
                      icon={<PhotoIcon />}
                    />
                    <BottomNavigationAction
                      label="Camera"
                      value="camera"
                      icon={<PhotoCameraIcon />}
                    />
                  </BottomNavigation>
                </Grid>
              )}
            </Grid>
            <Box mt={5} className={classes.submitBox}>
              <Button
                variant="contained"
                color="primary"
                disabled={
                  !formik.isValid || formik.isSubmitting || !formik.dirty
                }
                type="submit"
                onClick={() =>
                  formik.setFieldValue(
                    'hashtags',
                    parseHashtags(formik.values.description)
                  )
                }
              >
                Send
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

PostForm.defaultProps = {
  existingDescription: '',
  existingUsertags: [],
};

export default PostForm;
