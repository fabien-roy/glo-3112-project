import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Box, Button, Grid, makeStyles } from '@material-ui/core';
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
  setFile: (File) => void;
  onSubmit: (values: PostSubmitValues) => void;
}

// const MAX_FILE_SIZE = 8000000;
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const schema = yup.object({
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

// const useStyles = makeStyles((theme) => ({
//   avatarSize: {
//     width: theme.spacing(5),
//     height: theme.spacing(5),
//   },
//   firstColumn: {
//     fontWeight: 'bold',
//   },
//   textarea: {
//     resize: 'vertical',
//   },
// }));

// const useStyles = makeStyles(() => ({
//   root: {
// width: '50%',
// textAlign: 'center',
// display: 'flex',
// flexDirection: 'column',
// position: 'absolute',
// left: '0px',
// width: '320px',
// height: '100%',
// backgroundColor: '#253053',
//   },
// }));

// TODO : Add tests for PostForm
// TODO : Add stories for PostForm
export const PostForm: React.FC<PostFormProps> = (props: PostFormProps) => {
  const { setFile, onSubmit } = props;
  // const classes = useStyles();
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
    setFile(values.file);

    onSubmit({
      description: values.description,
      hashtags: parseHashtags(values.description),
      usertags: parseUsertags(values.description),
    });
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        description: '',
        file: null,
      }}
      onSubmit={handleSubmit}
    >
      {({ handleChange }) => (
        <Form>
          <Grid
            container
            alignContent="center"
            spacing={2}
            // style={{ width: '100%' }}
          >
            <Grid item>
              <Box my={5}>
                <Field
                  name="description"
                  placeholder="description"
                  label="Description"
                  multiline
                  variant="outlined"
                  rows={5}
                  component={TextField}
                />
              </Box>
            </Grid>
            <Grid item>
              <Box my={6}>
                <Field
                  name="file"
                  placeholder="Post image"
                  label="Post image"
                  variant="outlined"
                  component={ImageField}
                  test={props.setFile}
                  handleChange={handleChange}
                />
              </Box>
              <Box my={6}>
                <Button variant="contained" color="primary" type="submit">
                  Send
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
