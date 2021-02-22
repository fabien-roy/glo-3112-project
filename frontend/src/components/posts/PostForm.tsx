import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Box, Button, Grid } from '@material-ui/core';
import TextField from 'components/forms/TextField';
import ImageField from 'components/forms/ImageField';

export interface PostSubmitValues {
  description: string;
  hashtags: string[];
  usertags: string[];
}

interface PostFormValues {
  description: string;
  file: File | null;
}

interface PostFormProps {
  setFile?: ((File) => void) | null;
  onSubmit: (values: PostSubmitValues) => void;
}

const schemaWithoutFile = yup.object({
  description: yup.string().required('A description is required').min(1),
});

// const MAX_FILE_SIZE = 8000000;
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const schemaWithFile = yup.object({
  description: yup.string().required('A description is required').min(1),
  file: yup.mixed().required('An image is required'),
  // TODO : Make sure image tests work
  /*
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      "fileSize",
      "File too large",
      (value) => value && value.size <= MAX_FILE_SIZE
    )
    */
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
  const { setFile, onSubmit } = props;

  const parseHashtags = (description: string) =>
    description!
      .match(/#(\w+)/gm)
      ?.map((s) => s.slice(1))
      ?.filter((v, i, a) => a.indexOf(v) === i) || [];

  const parseUsertags = (description: string) =>
    description!
      .match(/@(\w+)/gm)
      ?.map((s) => s.charAt(1).toUpperCase() + s.slice(2))
      ?.filter((v, i, a) => a.indexOf(v) === i) || [];

  const handleSubmit = (values: PostFormValues) => {
    if (setFile) setFile(values.file);

    onSubmit({
      description: values.description,
      hashtags: parseHashtags(values.description),
      usertags: parseUsertags(values.description),
    });
  };

  return (
    <Formik
      validationSchema={setFile ? schemaWithFile : schemaWithoutFile}
      initialValues={{
        description: '',
        file: null,
      }}
      onSubmit={handleSubmit}
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
            {setFile && (
              <Grid item xs={6}>
                <Box my={6}>
                  <Field
                    name="file"
                    placeholder="Post image"
                    label="Post image"
                    component={ImageField}
                    test={setFile}
                    handleChange={handleChange}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

PostForm.defaultProps = {
  setFile: null,
};

export default PostForm;
