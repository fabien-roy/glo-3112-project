import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { CommentCreationParams, Post } from 'types/posts';
import useCreateUserComment from 'hooks/posts/useCreateUserComment';
import LoadingSpinner from 'components/LoadingSpinner';
import { Box, Button } from '@material-ui/core';

export interface CommentFormProps {
  post: Post;
}

const useStyles = makeStyles(() => ({
  submitBox: {
    textAlign: 'right',
    justifyContent: 'flex-end',
    display: 'flex',
  },
}));

const validationSchema = yup.object({
  text: yup.string().required(),
});

export const CommentForm: React.FC<CommentFormProps> = (
  props: CommentFormProps
) => {
  const classes = useStyles();
  const { addToast } = useToasts();

  const [formValues, setFormValues] = useState<CommentCreationParams>(
    undefined
  );

  const { createUserComment, isLoading, error } = useCreateUserComment(
    props.post.id
  );

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true);
    setFormValues(values);
    onSubmitProps.resetForm(values);
  };

  useEffect(() => {
    if (formValues) {
      createUserComment(formValues);
    }
  }, [formValues]);

  useEffect(() => {
    if (!error && formValues) {
      addToast('Comment created succesfully!', {
        appearance: 'success',
        autoDismiss: true,
      });
    } else if (error) {
      addToast(error.message, { appearance: 'error', autoDismiss: true });
    }
  }, [formValues, error]);

  const initialValues = {
    text: '',
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
          <Field
            name="text"
            component={TextField}
            fullWidth
            multiline
            placeholder="Add a comment"
            inputProps={{
              name: 'text',
              ...formik.getFieldProps('text'),
            }}
          />
          <Box mt={5} className={classes.submitBox}>
            <Button
              variant="contained"
              color="primary"
              disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
              type="submit"
            >
              Send
            </Button>
          </Box>
          {isLoading && formik.isSubmitting && <LoadingSpinner absolute />}
        </Form>
      )}
    </Formik>
  );
};

export default CommentForm;
