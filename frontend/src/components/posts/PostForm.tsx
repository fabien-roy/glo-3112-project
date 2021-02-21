import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Box, Button, Grid } from '@material-ui/core';
import TextField from 'components/forms/TextField';
import ImageField from 'components/forms/ImageField';

interface SubmitValues {
  title: string;
  description: string;
  file: File | null;
}

interface PostFormProps {
  setFile: (File) => void;
  onSubmit: (values: SubmitValues) => void;
}

const MAX_FILE_SIZE = 8000000;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const schema = yup.object({
  title: yup.string().required('A title is required').min(1),
  description: yup.string().required('A description is required').min(1),
  file: yup
    .mixed()
    .required('An image is required')
    // TODO : Make sure image tests work
    .test(
      'fileFormat',
      'Unsupported Format',
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      'fileSize',
      'File too large',
      (value) => value && value.size <= MAX_FILE_SIZE
    ),
});

// TODO : Use styles
/*
const useStyles = makeStyles({
  formBox: {
    width: '50%',
    textAlign: 'center',
  },
});
*/

// TODO : Add tests for PostForm
// TODO : Add stories for PostForm
export const PostForm: React.FC<PostFormProps> = (props: PostFormProps) => {
  const { onSubmit } = props;

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        title: '',
        description: '',
        file: null,
      }}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ handleChange }) => (
        <Form>
          <Grid container alignContent="center" spacing={2}>
            <Grid item xs={6}>
              <Box my={5}>
                <Field
                  name="description"
                  placeholder="description"
                  label="Description"
                  multiline
                  rows={5}
                  component={TextField}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box my={6}>
                <Field
                  name="file"
                  placeholder="Post image"
                  label="Post image"
                  component={ImageField}
                  test={props.setFile}
                  handleChange={handleChange}
                />
              </Box>
            </Grid>
          </Grid>
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
