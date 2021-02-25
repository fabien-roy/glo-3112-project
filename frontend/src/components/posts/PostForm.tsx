import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import TextField from 'components/forms/TextField';
import ImageField from 'components/forms/ImageField';
import { TagChipList } from './TagChipList';

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

const useStyles = makeStyles(() => ({
  form: {
    overflow: 'scroll',
    maxHeight: '90vh',
  },
  descriptionItem: {
    flexGrow: 1,
    maxWidth: '100%',
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
  const { setFile, onSubmit } = props;
  const [hashtags, setHashtags] = useState([]);
  const [usertags, setUsertags] = useState([]);
  const classes = useStyles();
  const parseHashtags = (description: string) =>
    description
      .match(/#[\w.]+/gm)
      ?.map((s) => s.slice(1))
      ?.filter((v, i, a) => a.indexOf(v) === i) || [];

  const parseUsertags = (description: string) =>
    description
      .match(/@[\w.]+/gm)
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
        <Form className={classes.form}>
          <Box p={5} style={{ height: '100%' }}>
            <Box style={{ maxHeight: '80%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} className={classes.descriptionItem}>
                  <Field
                    name="description"
                    placeholder="description"
                    label="Description"
                    multiline
                    variant="outlined"
                    rows={5}
                    component={TextField}
                  />
                  <Box my={2}>
                    <TagChipList
                      tagType="hashtag"
                      tags={['cacestunhashtag', 'monchatestbeau']}
                    />
                  </Box>
                  <Box my={2}>
                    <TagChipList
                      tagType="usertag"
                      tags={['garcon717', 'bonjourraymond213']}
                    />
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
            </Box>
            <Box mt={5}>
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
};

export default PostForm;
