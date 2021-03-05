import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import TextField from 'components/forms/TextField';
import ImageField from 'components/forms/ImageField';
import MultiSelect from 'components/forms/MultiSelect';
import useGetUsers from 'hooks/users/useGetUsers';
import TagsSection from './TagsSection';

export interface PostSubmitValues {
  description: string;
  hashtags: string[];
  usertags: string[];
}

interface PostFormValues {
  description: string;
  file: File | null;
  usertags: string[];
}

interface PostFormProps {
  setFile?: ((File) => void) | null;
  onSubmit: (values: PostSubmitValues) => void;
  existingDescription?: string;
  existingUsertags?: string[];
}

const useStyles = makeStyles(() => ({
  form: {
    overflow: 'scroll',
    maxHeight: '90vh',
  },
  descriptionItem: {
    flexGrow: 1,
    maxWidth: '100%',
  },
  submitBox: {
    textAlign: 'right',
  },
}));

const schemaWithoutFile = yup.object({
  description: yup.string().required('A description is required').min(1),
});

const schemaWithFile = yup.object({
  description: yup.string().required('A description is required').min(1),
  file: yup.mixed().required('An image is required'),
});

export const PostForm: React.FC<PostFormProps> = (props: PostFormProps) => {
  const { setFile, onSubmit, existingDescription, existingUsertags } = props;
  const { users, isLoading } = useGetUsers();
  const classes = useStyles();

  const parseHashtags = (description: string) =>
    description
      .match(/#[\w.]+/gm)
      ?.map((s) => s.slice(1))
      ?.filter((v, i, a) => a.indexOf(v) === i) || [];

  const handleSubmit = (values: PostFormValues) => {
    if (setFile) setFile(values.file);

    onSubmit({
      description: values.description,
      hashtags: parseHashtags(values.description),
      usertags: values?.usertags || null,
    });
  };

  return (
    <Formik
      validationSchema={setFile ? schemaWithFile : schemaWithoutFile}
      initialValues={{
        description: existingDescription || '',
        file: null,
        usertags: existingUsertags || [],
      }}
      onSubmit={handleSubmit}
    >
      {({ handleChange, values }) => (
        <Form className={classes.form}>
          <Box p={5}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} className={classes.descriptionItem}>
                <Field
                  name="description"
                  placeholder="description"
                  label="Description"
                  multiline
                  variant="outlined"
                  rows={10}
                  component={TextField}
                />
                <Box my={1}>
                  <Box my={1}>
                    {!isLoading && users.length > 0 && (
                      <Field
                        name="usertags"
                        placeholder="Usertags"
                        label="Usertags"
                        variant="outlined"
                        component={MultiSelect}
                        options={users?.map((user) => ({
                          value: user.username,
                          label: `@${user.username}`,
                        }))}
                      />
                    )}
                  </Box>
                  <Box my={1}>
                    <TagsSection
                      tags={parseHashtags(values.description)}
                      type="hashtags"
                    />
                  </Box>
                </Box>
              </Grid>
              {setFile && (
                <Grid item xs={12} md={6}>
                  <Field
                    name="file"
                    placeholder="Post image"
                    label="Post image"
                    component={ImageField}
                    test={setFile}
                    handleChange={handleChange}
                  />
                </Grid>
              )}
            </Grid>
            <Box mt={5} className={classes.submitBox}>
              <Button variant="contained" color="primary" type="submit">
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
  setFile: null,
  existingDescription: '',
  existingUsertags: [],
};

export default PostForm;
